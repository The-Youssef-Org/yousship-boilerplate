import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { sendEmail } from "@/libs/resend";
import { orderConfirmationEmail } from "@/emails/OrderConfirmationEmail";
import { subscriptionCancellationScheduledEmail } from "@/emails/SubscriptionCancellationScheduledEmail";
import { subscriptionCancelledEmail } from "@/emails/SubscriptionCancelledEmail";
import { getLemonSqueezySubscriptionVariantId } from "@/libs/lemonsqueezy";
import config from "@/config";

// ---------------------------------------------------------------------------
// Lemon Squeezy webhook payload types (subset we use)
// ---------------------------------------------------------------------------
type LSWebhookPayload = {
  meta: {
    event_name: string;
    custom_data?: { user_id?: string };
  };
  data: {
    attributes: {
      status: string;
      user_name?: string | null;
      user_email: string;
      customer_id: number;
      // subscription_created
      variant_id?: number;
      // order_created
      first_order_item?: {
        variant_id: number;
        product_name?: string;
      };
      // subscription_cancelled / subscription_expired
      ends_at?: string | null;
      // subscription_payment_success
      subscription_id?: number;
      billing_reason?: string;
    };
  };
};

// ---------------------------------------------------------------------------
// Admin Supabase client — bypasses RLS for server-side profile updates
// ---------------------------------------------------------------------------
const getAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing SUPABASE env vars for webhook");
  return createAdminClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
};

// ---------------------------------------------------------------------------
// Profile helpers (same pattern as Stripe webhook)
// ---------------------------------------------------------------------------
const normalizeEmail = (email: string) => email.trim().toLowerCase();

const findAuthUserIdByEmail = async (email: string): Promise<string | null> => {
  const admin = getAdmin();
  const normalizedEmail = normalizeEmail(email);
  let page = 1;
  const perPage = 200;
  while (page <= 10) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const found = data?.users?.find(
      (user) => user.email && normalizeEmail(user.email) === normalizedEmail,
    );
    if (found?.id) return found.id;
    if ((data?.users ?? []).length < perPage) break;
    page += 1;
  }
  return null;
};

const ensureUserForPurchasedEmail = async (email: string) => {
  const admin = getAdmin();
  const normalizedEmail = normalizeEmail(email);

  const { data: existingProfile } = await admin
    .from("profiles")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle<{ id: string }>();
  if (existingProfile?.id) return { userId: existingProfile.id, autoCreated: false };

  const existingAuthUserId = await findAuthUserIdByEmail(normalizedEmail);
  if (existingAuthUserId) {
    const { error } = await admin
      .from("profiles")
      .upsert({ id: existingAuthUserId, email: normalizedEmail }, { onConflict: "id" });
    if (error) throw error;
    return { userId: existingAuthUserId, autoCreated: false };
  }

  const { data, error } = await admin.auth.admin.createUser({
    email: normalizedEmail,
    email_confirm: true,
  });

  if (error) {
    const { data: retryProfile } = await admin
      .from("profiles")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle<{ id: string }>();
    if (retryProfile?.id) return { userId: retryProfile.id, autoCreated: false };
    throw error;
  }

  const userId = data.user?.id ?? null;
  if (!userId) throw new Error(`Could not resolve user id for ${normalizedEmail}`);

  const { error: upsertError } = await admin
    .from("profiles")
    .upsert({ id: userId, email: normalizedEmail }, { onConflict: "id" });
  if (upsertError) throw upsertError;

  return { userId, autoCreated: true };
};

const generateAccessMagicLink = async (email: string, origin: string) => {
  const admin = getAdmin();
  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: normalizeEmail(email),
  });
  if (error) throw error;
  const hashedToken = data?.properties?.hashed_token;
  if (!hashedToken) return null;
  return (
    `${origin}/api/auth/verify` +
    `?token_hash=${encodeURIComponent(hashedToken)}` +
    `&type=magiclink` +
    `&next=${encodeURIComponent(config.auth.dashboardUrl)}`
  );
};

const setProfileNameIfEmpty = async (userId: string, candidateName: string | null) => {
  const name = candidateName?.trim();
  if (!name) return;
  const admin = getAdmin();
  const { data: profile } = await admin
    .from("profiles")
    .select("name")
    .eq("id", userId)
    .maybeSingle<{ name: string | null }>();
  if (profile?.name && profile.name.trim().length > 0) return;
  await admin.from("profiles").update({ name }).eq("id", userId);
};

// ---------------------------------------------------------------------------
// Provision a purchase — shared by order_created and subscription_created
// ---------------------------------------------------------------------------
const provisionPurchase = async ({
  customerEmail,
  customerId,
  variantId,
  customerName,
  metadataUserId,
  origin,
  sendConfirmation = true,
}: {
  customerEmail: string;
  customerId: string;
  variantId: string;
  customerName: string | null;
  metadataUserId: string | null;
  origin: string;
  /** Set false when another event (e.g. subscription_payment_success) owns the email. */
  sendConfirmation?: boolean;
}) => {
  const admin = getAdmin();

  console.log(`[ls/webhook] provisionPurchase — email=${customerEmail} customerId=${customerId} variantId=${variantId} metadataUserId=${metadataUserId}`);

  const plan = config.lemonsqueezy.plans.find((p) => p.variantId === variantId);
  if (!plan) {
    console.warn(`[ls/webhook] BAIL: variantId "${variantId}" not found in config. Configured variantIds: ${config.lemonsqueezy.plans.map((p) => p.variantId).join(", ")}`);
    return;
  }
  console.log(`[ls/webhook] Matched plan: ${plan.name} sendConfirmation=${sendConfirmation}`);

  let resolvedUserId = metadataUserId;

  if (!resolvedUserId) {
    console.log(`[ls/webhook] No metadataUserId — looking up user by email`);
    const created = await ensureUserForPurchasedEmail(customerEmail);
    resolvedUserId = created.userId;
    console.log(`[ls/webhook] Resolved userId=${resolvedUserId} autoCreated=${created.autoCreated}`);
  } else {
    console.log(`[ls/webhook] Using metadataUserId=${resolvedUserId}`);
  }

  if (!resolvedUserId) throw new Error("Could not resolve user id");

  // Single atomic upsert — sets every plan field in one statement so there is
  // no silent "0 rows updated" failure that would leave the profile unchanged.
  console.log(`[ls/webhook] Upserting profile id=${resolvedUserId} → customer_id=${customerId} plan_id=${variantId} payment_provider=lemonsqueezy has_access=true`);
  const { error: upsertError } = await admin
    .from("profiles")
    .upsert(
      {
        id: resolvedUserId,
        email: normalizeEmail(customerEmail),
        customer_id: customerId,
        plan_id: variantId,
        payment_provider: "lemonsqueezy",
        has_access: true,
      },
      { onConflict: "id" },
    );

  if (upsertError) {
    throw new Error(`[ls/webhook] Failed to upsert profile for user ${resolvedUserId}: ${upsertError.message}`);
  }
  console.log(`[ls/webhook] Profile upsert complete for user ${resolvedUserId}`);

  await setProfileNameIfEmpty(resolvedUserId, customerName);

  if (sendConfirmation) {
    let accessUrl: string | null = null;
    if (!metadataUserId) {
      try {
        accessUrl = await generateAccessMagicLink(customerEmail, origin);
      } catch (err) {
        console.error("[ls/webhook] Failed to generate magic link:", err);
      }
    }

    // Normalize email before sending — Resend's test mode does a case-sensitive
    // match, so "Youssef@..." would be rejected when the account is "youssef@...".
    try {
      await sendEmail({
        to: normalizeEmail(customerEmail),
        subject: `Purchase confirmation from ${config.appName}`,
        html: await orderConfirmationEmail({
          customerName: customerName ?? "there",
          productName: plan.name,
          accessUrl: accessUrl ?? undefined,
        }),
        replyTo: config.mail.replyTo,
      });
      console.log(`[ls/webhook] Confirmation email sent to ${normalizeEmail(customerEmail)}`);
    } catch (err) {
      // Log but do NOT re-throw. The profile is already provisioned — if this error
      // bubbles up we return 500, LS retries, alreadyProvisioned=true on retry,
      // and the email is permanently skipped.
      console.error("[ls/webhook] Failed to send confirmation email (non-fatal):", err);
    }
  }
};

// ---------------------------------------------------------------------------
// Webhook handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const body = await req.text();
  const origin = new URL(req.url).origin;

  const secret = process.env.LEMONSQUEEZY_SIGNING_SECRET;
  if (!secret) {
    console.error("[ls/webhook] LEMONSQUEEZY_SIGNING_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
  const rawSignature = req.headers.get("x-signature") ?? "";
  const signature = Buffer.from(rawSignature, "utf8");

  if (digest.length !== signature.length || !crypto.timingSafeEqual(digest, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(body) as LSWebhookPayload;
  const eventName = payload.meta.event_name;
  console.log(`[ls/webhook] Received event: ${eventName} status=${payload.data.attributes.status ?? "n/a"}`);

  try {
    switch (eventName) {
      // ✅ One-time purchase paid — provision access
      case "order_created": {
        if (payload.data.attributes.status !== "paid") break;

        const orderVariantId = payload.data.attributes.first_order_item?.variant_id.toString() ?? "";
        const orderPlan = config.lemonsqueezy.plans.find((p) => p.variantId === orderVariantId);

        // Subscription purchases also fire order_created for the first invoice.
        // subscription_payment_success owns the confirmation email for those, so
        // we skip it here to avoid a double send.
        const isSubscriptionOrder = orderPlan?.mode === "subscription";

        await provisionPurchase({
          customerEmail: payload.data.attributes.user_email,
          customerId: payload.data.attributes.customer_id.toString(),
          variantId: orderVariantId,
          customerName: payload.data.attributes.user_name ?? null,
          metadataUserId: payload.meta.custom_data?.user_id ?? null,
          origin,
          sendConfirmation: !isSubscriptionOrder,
        });

        break;
      }

      // ✅ New subscription activated — provision access but let subscription_payment_success
      // send the confirmation email. This avoids a race-condition double-email when both
      // events fire simultaneously for the same purchase.
      case "subscription_created": {
        const status = payload.data.attributes.status;
        if (status !== "active" && status !== "on_trial") break;

        await provisionPurchase({
          customerEmail: payload.data.attributes.user_email,
          customerId: payload.data.attributes.customer_id.toString(),
          variantId: payload.data.attributes.variant_id?.toString() ?? "",
          customerName: payload.data.attributes.user_name ?? null,
          metadataUserId: payload.meta.custom_data?.user_id ?? null,
          origin,
          sendConfirmation: false,
        });

        break;
      }

      // 🔄 Subscription resumed after being paused — restore access
      case "subscription_resumed": {
        const customerId = payload.data.attributes.customer_id.toString();
        await getAdmin()
          .from("profiles")
          .update({ has_access: true })
          .eq("customer_id", customerId);
        break;
      }

      // ⏱ Subscription cancelled — notify user only for soft cancels (cancel at period end).
      // For hard cancels, LS fires subscription_cancelled immediately followed by
      // subscription_expired. We detect the difference via ends_at: if it is in the
      // future the user still has access until that date (soft cancel); if it is null
      // or in the near-past it is a hard cancel and subscription_expired will send
      // the right email instead.
      case "subscription_cancelled": {
        const attrs = payload.data.attributes;
        const endsAtMs = attrs.ends_at ? new Date(attrs.ends_at).getTime() : null;
        const isSoftCancel = endsAtMs !== null && endsAtMs > Date.now() + 5 * 60 * 1000;
        if (!isSoftCancel) break;

        const customerEmail = normalizeEmail(attrs.user_email);
        const customerName = attrs.user_name?.trim() || "there";
        const variantId = attrs.variant_id?.toString() ?? "";
        const plan = config.lemonsqueezy.plans.find((p) => p.variantId === variantId);
        const endDate = new Date(endsAtMs!).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        try {
          await sendEmail({
            to: customerEmail,
            subject: `Subscription update - ${config.appName}`,
            html: await subscriptionCancellationScheduledEmail({
              customerName,
              productName: plan?.name,
              endDate,
            }),
            replyTo: config.mail.replyTo,
          });
          console.log(`[ls/webhook] Cancellation scheduled email sent to ${customerEmail}`);
        } catch (err) {
          console.error("[ls/webhook] Failed to send cancellation scheduled email (non-fatal):", err);
        }
        break;
      }

      // ❌ Subscription fully expired — revoke access and notify user
      case "subscription_expired": {
        const attrs = payload.data.attributes;
        const customerId = attrs.customer_id.toString();
        const customerEmail = normalizeEmail(attrs.user_email);
        const customerName = attrs.user_name?.trim() || "there";
        const variantId = attrs.variant_id?.toString() ?? "";
        const plan = config.lemonsqueezy.plans.find((p) => p.variantId === variantId);

        await getAdmin()
          .from("profiles")
          .update({ has_access: false })
          .eq("customer_id", customerId);

        try {
          await sendEmail({
            to: customerEmail,
            subject: `Subscription canceled - ${config.appName}`,
            html: await subscriptionCancelledEmail({
              customerName,
              productName: plan?.name,
            }),
            replyTo: config.mail.replyTo,
          });
          console.log(`[ls/webhook] Subscription expired email sent to ${customerEmail}`);
        } catch (err) {
          console.error("[ls/webhook] Failed to send subscription expired email (non-fatal):", err);
        }
        break;
      }

      // 💳 Subscription payment succeeded — covers initial + renewals.
      // Initial payment is the canonical trigger for the confirmation email; it fires
      // after payment is confirmed, unlike subscription_created which can fire earlier
      // with status "pending". subscription_created provisions the profile without email.
      case "subscription_payment_success": {
        const attrs = payload.data.attributes;
        if (attrs.status !== "paid") break;

        const customerId = attrs.customer_id.toString();

        if (attrs.billing_reason === "renewal") {
          // Renewal — keep has_access alive, no re-provisioning needed.
          console.log(`[ls/webhook] Renewal payment for customer ${customerId} — refreshing has_access`);
          await getAdmin()
            .from("profiles")
            .update({ has_access: true })
            .eq("customer_id", customerId);
          break;
        }

        // Initial (or trial_conversion) payment — provision profile + send confirmation.
        const subscriptionId = attrs.subscription_id?.toString();
        if (!subscriptionId) {
          throw new Error("[ls/webhook] subscription_payment_success missing subscription_id");
        }

        const variantId = await getLemonSqueezySubscriptionVariantId(subscriptionId);
        if (!variantId) {
          throw new Error(`[ls/webhook] Could not fetch variant_id for subscription ${subscriptionId}`);
        }
        console.log(`[ls/webhook] subscription_payment_success initial — variantId=${variantId}`);

        await provisionPurchase({
          customerEmail: attrs.user_email,
          customerId,
          variantId,
          customerName: attrs.user_name ?? null,
          metadataUserId: payload.meta.custom_data?.user_id ?? null,
          origin,
          sendConfirmation: true,
        });
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error(`[ls/webhook] Error handling ${eventName}:`, err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({});
}
