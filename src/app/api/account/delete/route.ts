import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/libs/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import config from "@/config";

// Deletes the currently signed-in user's profile row and their auth account.
// Requires SUPABASE_SERVICE_ROLE_KEY to be set (server-only env var).
export async function POST() {
  const supabase = await createServerSupabase();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 500 },
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !url) {
    return NextResponse.json(
      {
        error:
          "Delete account is not configured: missing SUPABASE_SERVICE_ROLE_KEY on the server.",
      },
      { status: 500 },
    );
  }

  const admin = createAdminClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Guard: do not allow deleting the account while a live subscription exists.
  // This avoids orphaned billing relationships (Stripe keeps charging with no user to cancel).
  const { data: profile } = await admin
    .from("profiles")
    .select("customer_id, email")
    .eq("id", user.id)
    .maybeSingle<{ customer_id: string | null; email: string | null }>();

  if (config.paymentProvider === "stripe") {
    const stripe = (await import("@/libs/stripe")).default;

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 },
      );
    }

    let customerId = profile?.customer_id ?? null;

    if (!customerId && profile?.email) {
      const customers = await stripe.customers.list({
        email: profile.email,
        limit: 1,
      });
      customerId = customers.data[0]?.id ?? null;
    }

    if (customerId) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "all",
        limit: 10,
      });

      const hasLiveSubscription = subscriptions.data.some(
        (sub: any) =>
          sub.status === "active" ||
          sub.status === "trialing" ||
          sub.status === "past_due" ||
          sub.status === "unpaid",
      );

      if (hasLiveSubscription) {
        return NextResponse.json(
          {
            error:
              "You still have an active subscription. Please cancel it in Billing and wait until it ends before deleting your account.",
          },
          { status: 409 },
        );
      }
    }
  } else if (config.paymentProvider === "lemonsqueezy" && profile?.email) {
    const { getLSSubscriptionStatus } = await import("@/libs/lemonsqueezy");
    const lsStatus = await getLSSubscriptionStatus(profile.email);

    // Block deletion only if the subscription is genuinely active (not just cancelled/in grace period).
    // A user in a cancellation grace period can still delete — they've already opted out.
    if (lsStatus && (lsStatus.liveHasAccess && !lsStatus.cancelAtPeriodEnd)) {
      return NextResponse.json(
        {
          error:
            "You still have an active subscription. Please cancel it in Billing and wait until it ends before deleting your account.",
        },
        { status: 409 },
      );
    }
  }

  // Remove the profile row first; then delete the auth user. The trigger
  // on auth.users will not fire on delete, so the profile cleanup is explicit.
  const { error: profileError } = await admin
    .from("profiles")
    .delete()
    .eq("id", user.id);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  const { error: authError } = await admin.auth.admin.deleteUser(user.id);
  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
