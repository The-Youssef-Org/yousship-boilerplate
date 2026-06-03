import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import stripe from "@/libs/stripe";
import config from "@/config";
import type { Profile } from "@/libs/types";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { priceId } = (await req.json()) as { priceId: string };

  if (!priceId) {
    return NextResponse.json({ error: "priceId is required" }, { status: 400 });
  }

  // Validate priceId against known plans — reject arbitrary price IDs from the client.
  const validPlan = config.stripe.plans.find((p) => p.priceId === priceId);
  if (!validPlan) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }
  const mode = validPlan.mode ?? "payment";

  // Reuse the existing Stripe customer for logged-in users to prevent duplicate records.
  let existingCustomerId: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("customer_id")
      .eq("id", user.id)
      .maybeSingle<Pick<Profile, "customer_id">>();
    // Only reuse the stored ID if it's actually a Stripe customer ID.
    // Guards against stale IDs from a previous payment provider (e.g. Lemon Squeezy).
    existingCustomerId = profile?.customer_id?.startsWith("cus_")
      ? profile.customer_id
      : null;
  }

  const origin = new URL(req.url).origin;
  const successPath = config.auth.purchaseSuccessUrl;

  try {
    const session = await stripe.checkout.sessions.create({
      mode,
      ...(existingCustomerId
        ? { customer: existingCustomerId }
        : {
            customer_email: user?.email,
            customer_creation: mode === "payment" ? "always" : undefined,
          }),
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        priceId,
        userId: user?.id ?? "",
        userEmail: user?.email ?? "",
      },
      success_url: `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/purchase-failed?from=checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[create-checkout] Stripe error:", err);
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
