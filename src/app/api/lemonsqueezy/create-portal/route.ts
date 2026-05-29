import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { createLemonSqueezyCustomerPortal } from "@/libs/lemonsqueezy";
import config from "@/config";
import type { Profile } from "@/libs/types";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("customer_id")
    .eq("id", user.id)
    .single<Pick<Profile, "customer_id">>();

  if (!profile?.customer_id) {
    return NextResponse.json({ url: `/#pricing` });
  }

  try {
    const url = await createLemonSqueezyCustomerPortal({
      customerId: profile.customer_id,
    });

    if (!url) {
      return NextResponse.json({ error: "Could not retrieve portal URL" }, { status: 500 });
    }

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[ls/create-portal]", err);
    const message = err instanceof Error ? err.message : "Failed to open billing portal";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Silence the unused import warning — config is used for future extensibility.
void config;
