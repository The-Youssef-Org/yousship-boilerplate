import { NextRequest, NextResponse } from "next/server";
import stripe from "@/libs/stripe";
import { sendEmail } from "@/libs/resend";
import { orderConfirmationEmail } from "@/libs/emailTemplates";
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

      const customerEmail =
        session.customer_details?.email ?? session.customer_email ?? null;
      const customerId = typeof session.customer === "string" ? session.customer : null;
      const metadataUserId =
        typeof session.metadata?.userId === "string" && session.metadata.userId.length > 0
          ? session.metadata.userId
          : null;

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
      const purchasedPriceId = lineItems.data[0]?.price?.id ?? null;

      try {
        const admin = getAdmin();
        const updates = { customer_id: customerId, price_id: purchasedPriceId, has_access: true };
        if (metadataUserId) {
          await admin.from("profiles").update(updates).eq("id", metadataUserId);
        } else if (customerEmail) {
          await admin.from("profiles").update(updates).eq("email", customerEmail.toLowerCase());
        }
      } catch (err) {
        console.error("checkout.session.completed: failed to update profile", err);
      }

      if (customerEmail) {
        const customerName = session.customer_details?.name ?? "there";
        const amountTotal = session.amount_total
          ? `$${(session.amount_total / 100).toFixed(2)}`
          : undefined;
        const productName =
          config.stripe.plans.find((p) => p.priceId === purchasedPriceId)?.name ?? config.appName;

        try {
          await sendEmail({
            to: customerEmail,
            subject: `You're in! Welcome to ${config.appName}`,
            html: orderConfirmationEmail({ customerName, productName, amountTotal }),
            replyTo: config.mail.replyTo,
          });
        } catch (err) {
          console.error("checkout.session.completed: failed to send email", err);
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

    // ❌ Subscription cancelled — revoke access
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId =
        typeof subscription.customer === "string" ? subscription.customer : null;

      if (customerId) {
        try {
          await revokeAccess(customerId);
        } catch (err) {
          console.error("customer.subscription.deleted: failed to revoke access", err);
        }
      }

      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
