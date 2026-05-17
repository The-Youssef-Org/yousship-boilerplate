import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import stripe from "@/libs/stripe";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { priceId, mode = "payment" } = (await req.json()) as {
    priceId: string;
    mode?: "payment" | "subscription";
  };

  if (!priceId) {
    return NextResponse.json({ error: "priceId is required" }, { status: 400 });
  }

  const origin = new URL(req.url).origin;
  const session = await stripe.checkout.sessions.create({
    mode,
    customer_email: user?.email,
    customer_creation: mode === "payment" ? "always" : undefined,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      priceId,
      userId: user?.id ?? "",
      userEmail: user?.email ?? "",
    },
    success_url: `${origin}/dashboard`,
    cancel_url: `${origin}/#pricing`,
  });

  return NextResponse.json({ url: session.url });
}
