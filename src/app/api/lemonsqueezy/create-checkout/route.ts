import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { createLemonSqueezyCheckout } from "@/libs/lemonsqueezy";
import config from "@/config";
import type { Profile } from "@/libs/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { variantId?: string; redirectUrl?: string };

  if (!body.variantId) {
    return NextResponse.json({ error: "variantId is required" }, { status: 400 });
  }
  if (!body.redirectUrl) {
    return NextResponse.json({ error: "redirectUrl is required" }, { status: 400 });
  }

  // Validate variantId against known plans — reject arbitrary IDs from the client.
  const validPlan = config.lemonsqueezy.plans.find((p) => p.variantId === body.variantId);
  if (!validPlan) {
    return NextResponse.json({ error: "Invalid variant" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let userId: string | undefined;
    let email: string | undefined;

    if (user) {
      userId = user.id;
      const { data: profile } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", user.id)
        .maybeSingle<Pick<Profile, "email">>();
      email = profile?.email ?? user.email ?? undefined;
    }

    const url = await createLemonSqueezyCheckout({
      variantId: body.variantId,
      redirectUrl: body.redirectUrl,
      userId,
      email,
    });

    if (!url) {
      return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
    }

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[ls/create-checkout]", err);
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
