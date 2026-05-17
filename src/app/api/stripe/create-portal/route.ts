import { NextRequest, NextResponse } from "next/server";
import stripe from "@/libs/stripe";
import { createClient } from "@/libs/supabase/server";
import type { Profile } from "@/libs/types";

export async function POST(req: NextRequest) {
  const origin = new URL(req.url).origin;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("customer_id, email")
    .eq("id", user.id)
    .single<Pick<Profile, "customer_id" | "email">>();

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  let customerId = profile?.customer_id;

  if (!customerId && profile?.email) {
    const customers = await stripe.customers.list({
      email: profile.email,
      limit: 1,
    });

    customerId = customers.data[0]?.id ?? null;

    if (customerId) {
      await supabase
        .from("profiles")
        .update({ customer_id: customerId })
        .eq("id", user.id);
    }
  }

  if (!customerId) {
    return NextResponse.json({ url: `${origin}/#pricing` });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}
