import { NextRequest, NextResponse } from "next/server";
import stripe from "@/libs/stripe";
import { sendEmail } from "@/libs/resend";
import {
  orderConfirmationEmail,
  subscriptionCancelledEmail,
  subscriptionCancellationScheduledEmail,
} from "@/libs/emailTemplates";
import config from "@/config";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import Stripe from "stripe";

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
// Profile helpers
// ---------------------------------------------------------------------------
const grantAccess = async (
  customerId: string | null,
  customerEmail: string | null,
  priceId: string | null,
) => {
  const admin = getAdmin();
  const updates = { has_access: true, price_id: priceId, customer_id: customerId };
  if (customerId) {
    const { error } = await admin.from("profiles").update(updates).eq("customer_id", customerId);
    if (!error) return;
  }
  if (customerEmail) {
    await admin.from("profiles").update(updates).eq("email", customerEmail.toLowerCase());
  }
};

const revokeAccess = async (customerId: string) => {
  const admin = getAdmin();
  await admin.from("profiles").update({ has_access: false }).eq("customer_id", customerId);
};

const getProfileByCustomerId = async (customerId: string) => {
  const admin = getAdmin();
  const { data, error } = await admin
    .from("profiles")
    .select("email, name, price_id")
    .eq("customer_id", customerId)
    .maybeSingle<{ email: string | null; name: string | null; price_id: string | null }>();
  if (error) throw error;
  return data;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const formatUnixDate = (unixSeconds: number | null | undefined) => {
  if (!unixSeconds) return undefined;
  return new Date(unixSeconds * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const findAuthUserIdByEmail = async (email: string): Promise<string | null> => {
  const admin = getAdmin();
  const normalizedEmail = normalizeEmail(email);

  // Supabase admin API does not expose a direct get-by-email endpoint.
  let page = 1;
  const perPage = 200;

  while (page <= 10) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;

    const found = data?.users?.find(
      (user) => user.email && normalizeEmail(user.email) === normalizedEmail,
    );
    if (found?.id) return found.id;

    const users = data?.users ?? [];
    if (users.length < perPage) break;
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

  if (existingProfile?.id) {
    return { userId: existingProfile.id, autoCreated: false };
  }

  const existingAuthUserId = await findAuthUserIdByEmail(normalizedEmail);
  if (existingAuthUserId) {
    const { error: upsertError } = await admin
      .from("profiles")
      .upsert({ id: existingAuthUserId, email: normalizedEmail }, { onConflict: "id" });
    if (upsertError) throw upsertError;
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

    if (retryProfile?.id) {
      return { userId: retryProfile.id, autoCreated: false };
    }

    throw error;
  }

  const userId = data.user?.id ?? null;
  if (!userId) {
    throw new Error(`Could not resolve user id for ${normalizedEmail}`);
  }

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
    options: {
      redirectTo: `${origin}/api/auth/callback?next=${encodeURIComponent(config.auth.dashboardUrl)}`,
    },
  });

  if (error) {
    throw error;
  }

  return data.properties?.action_link ?? null;
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

  const { error } = await admin.from("profiles").update({ name }).eq("id", userId);
  if (error) throw error;
};

// ---------------------------------------------------------------------------
// Webhook handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook verification failed: ${message}` },
      { status: 400 },
    );
  }

  switch (event.type) {
    // ✅ User paid — provision access + send confirmation email
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const origin = new URL(req.url).origin;

      // Only provision or create users after Stripe confirms payment success.
      if (session.payment_status !== "paid") {
        break;
      }

      const customerEmail =
        session.customer_details?.email ?? session.customer_email ?? null;
      const customerId = typeof session.customer === "string" ? session.customer : null;
      const metadataUserId =
        typeof session.metadata?.userId === "string" && session.metadata.userId.length > 0
          ? session.metadata.userId
          : null;
      let resolvedUserId = metadataUserId;
      let autoCreated = false;

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
      const purchasedPriceId = lineItems.data[0]?.price?.id ?? null;

      try {
        const admin = getAdmin();
        const stripeCustomerName = session.customer_details?.name ?? null;

        // Logged-in buyer: use metadata user id and ensure profile exists.
        if (resolvedUserId) {
          const normalized = customerEmail ? normalizeEmail(customerEmail) : null;
          const { error: upsertError } = await admin
            .from("profiles")
            .upsert(
              normalized
                ? { id: resolvedUserId, email: normalized }
                : { id: resolvedUserId },
              { onConflict: "id" },
            );
          if (upsertError) throw upsertError;
        }

        // Guest buyer: either attach to existing user by email or create user + profile.
        if (!resolvedUserId && customerEmail) {
          const created = await ensureUserForPurchasedEmail(customerEmail);
          resolvedUserId = created.userId;
          autoCreated = created.autoCreated;
        }

        if (!resolvedUserId) {
          throw new Error("Could not resolve user id for successful checkout");
        }

        const updates = { customer_id: customerId, price_id: purchasedPriceId, has_access: true };
        const { error: updateError } = await admin
          .from("profiles")
          .update(updates)
          .eq("id", resolvedUserId);
        if (updateError) throw updateError;

        await setProfileNameIfEmpty(resolvedUserId, stripeCustomerName);
      } catch (err) {
        console.error("checkout.session.completed: failed to update profile", err);
        return NextResponse.json(
          { error: "Failed to provision user after successful payment" },
          { status: 500 },
        );
      }

      if (customerEmail) {
        let accessUrl: string | null = null;
        if (autoCreated) {
          try {
            accessUrl = await generateAccessMagicLink(customerEmail, origin);
          } catch (err) {
            console.error("checkout.session.completed: failed to generate magic link", err);
          }
        }

        const customerName = session.customer_details?.name ?? "there";
        const amountTotal = session.amount_total
          ? `$${(session.amount_total / 100).toFixed(2)}`
          : undefined;
        const productName =
          config.stripe.plans.find((p) => p.priceId === purchasedPriceId)?.name ?? config.appName;

        try {
          await sendEmail({
            to: customerEmail,
            subject: `Purchase confirmation from ${config.appName}`,
            html: orderConfirmationEmail({ customerName, productName, amountTotal, accessUrl: accessUrl ?? undefined }),
            replyTo: config.mail.replyTo,
          });
        } catch (err) {
          console.error("checkout.session.completed: failed to send email", err);
          return NextResponse.json(
            { error: "Failed to send purchase confirmation email" },
            { status: 500 },
          );
        }
      }

      break;
    }

    // ✅ Subscription renewed — keep access active
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = typeof invoice.customer === "string" ? invoice.customer : null;
      const customerEmail =
        typeof invoice.customer_email === "string" ? invoice.customer_email : null;
      const priceRaw = invoice.lines.data[0]?.pricing?.price_details?.price;
      const priceId = typeof priceRaw === "string" ? priceRaw : (priceRaw?.id ?? null);

      if (customerId || customerEmail) {
        try {
          await grantAccess(customerId, customerEmail, priceId);
        } catch (err) {
          console.error("invoice.paid: failed to update profile", err);
        }
      }

      break;
    }

    // ⏱ Payment failed — Stripe will retry and send its own dunning emails.
    // If all retries fail, customer.subscription.deleted fires and we revoke access.
    case "invoice.payment_failed": {
      break;
    }

    // 🔄 Subscription changed (including "Don't cancel" / reactivation)
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const previousAttributes = (event.data.previous_attributes ?? {}) as {
        cancel_at_period_end?: boolean;
      };
      const customerId =
        typeof subscription.customer === "string" ? subscription.customer : null;
      const currentPriceId =
        typeof subscription.items.data[0]?.price?.id === "string"
          ? subscription.items.data[0].price.id
          : null;
      const cancellationEmailAlreadySent =
        subscription.metadata?.cancellation_scheduled_email_sent === "true";
      const becameCancellationScheduled =
        subscription.cancel_at_period_end === true &&
        previousAttributes.cancel_at_period_end === false;

      if (customerId) {
        try {
          // Keep access active for live subscriptions. This makes dashboard state
          // update immediately when a user reverses a pending cancellation.
          const isActiveLike =
            subscription.status === "active" ||
            subscription.status === "trialing" ||
            subscription.status === "past_due" ||
            subscription.status === "unpaid";

          if (isActiveLike) {
            await grantAccess(customerId, null, currentPriceId);
          }

          // Send at most once per subscription id when cancellation is first scheduled.
          if (becameCancellationScheduled && !cancellationEmailAlreadySent) {
            const profile = await getProfileByCustomerId(customerId);
            const email = profile?.email ? normalizeEmail(profile.email) : null;
            if (email) {
              const customerName = profile?.name?.trim() || "there";
              const productName =
                config.stripe.plans.find((plan) => plan.priceId === currentPriceId)?.name;
              const endDate = formatUnixDate(subscription.cancel_at ?? subscription.ended_at ?? null);

              await sendEmail({
                to: email,
                subject: `Subscription update - ${config.appName}`,
                html: subscriptionCancellationScheduledEmail({
                  customerName,
                  productName,
                  endDate,
                }),
                replyTo: config.mail.replyTo,
              });

              await stripe.subscriptions.update(subscription.id, {
                metadata: {
                  ...subscription.metadata,
                  cancellation_scheduled_email_sent: "true",
                },
              });
            }
          }
        } catch (err) {
          console.error("customer.subscription.updated: failed to sync access", err);
        }
      }

      break;
    }

    // ❌ Subscription cancelled — revoke access
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId =
        typeof subscription.customer === "string" ? subscription.customer : null;
      const cancelledPriceId =
        typeof subscription.items.data[0]?.price?.id === "string"
          ? subscription.items.data[0].price.id
          : null;

      if (customerId) {
        try {
          await revokeAccess(customerId);

          const profile = await getProfileByCustomerId(customerId);
          const email = profile?.email ? normalizeEmail(profile.email) : null;
          if (email) {
            const customerName = profile?.name?.trim() || "there";
            const productName =
              config.stripe.plans.find((plan) => plan.priceId === cancelledPriceId)?.name;

            await sendEmail({
              to: email,
              subject: `Subscription canceled - ${config.appName}`,
              html: subscriptionCancelledEmail({ customerName, productName }),
              replyTo: config.mail.replyTo,
            });
          }
        } catch (err) {
          console.error("customer.subscription.deleted: failed to handle cancellation", err);
        }
      }

      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
