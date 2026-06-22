import { NextRequest, NextResponse } from "next/server";
import stripe from "@/libs/stripe";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";
import type { Profile } from "@/libs/types";

const isStripeCustomerId = (value: string | null | undefined) =>
  typeof value === "string" && value.startsWith("cus_");

const hasAccessLikeStatus = (status: string) =>
  status === "active" ||
  status === "trialing" ||
  status === "past_due" ||
  status === "unpaid";

const pickBestCustomerId = async (
  candidateIds: string[],
  planId: string | null,
): Promise<string | null> => {
  if (!candidateIds.length) return null;

  const scored = await Promise.all(
    candidateIds.map(async (id) => {
      try {
        const subscriptions = await stripe.subscriptions.list({
          customer: id,
          status: "all",
          limit: 20,
        });

        const hasPlanMatch =
          !!planId &&
          subscriptions.data.some((sub) =>
            sub.items.data.some((item) => item.price.id === planId),
          );

        const hasLiveLike = subscriptions.data.some(
          (sub) => hasAccessLikeStatus(sub.status) || sub.cancel_at_period_end,
        );

        return {
          id,
          // Prefer customers with live-like subscriptions first, then plan matching.
          score: (hasLiveLike ? 100 : 0) + (hasPlanMatch ? 10 : 0),
        };
      } catch {
        return { id, score: -1 };
      }
    }),
  );

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.score >= 0 ? scored[0].id : null;
};

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 },
    );
  }

  const origin = new URL(req.url).origin;
  const body = (await req.json().catch(() => ({}))) as { returnPath?: string };
  const requestedReturnPath = typeof body.returnPath === "string" ? body.returnPath : "";
  const isSafeReturnPath =
    requestedReturnPath.startsWith("/") && !requestedReturnPath.startsWith("//");
  const returnPath = isSafeReturnPath ? requestedReturnPath : config.auth.dashboardUrl;

  const supabase = await createClient();

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("customer_id, email, plan_id")
    .eq("id", user.id)
    .maybeSingle<Pick<Profile, "customer_id" | "email" | "plan_id">>();

  const candidateIds: string[] = [];
  const profileCustomerId = profile?.customer_id ?? null;
  if (profileCustomerId && isStripeCustomerId(profileCustomerId)) {
    candidateIds.push(profileCustomerId);
  }
  if (profile?.email) {
    const customers = await stripe.customers.list({ email: profile.email, limit: 20 });
    for (const customer of customers.data) {
      if (isStripeCustomerId(customer.id) && !candidateIds.includes(customer.id)) {
        candidateIds.push(customer.id);
      }
    }
  }

  const customerId = await pickBestCustomerId(candidateIds, profile?.plan_id ?? null);

  if (customerId && customerId !== profile?.customer_id) {
    await supabase
      .from("profiles")
      .update({ customer_id: customerId, payment_provider: "stripe" })
      .eq("id", user.id);
  }

  if (!customerId) {
    return NextResponse.json({ url: `${origin}/#pricing` });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}${returnPath}`,
  });

  return NextResponse.json({ url: session.url });
}
