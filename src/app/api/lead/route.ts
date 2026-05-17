import { NextResponse } from "next/server";
// import { createClient } from "@/libs/supabase/server";

// POST /api/lead
// Body: { email: string }
// Collects emails for a waitlist. To activate:
//   1. Run the leads table SQL in your Supabase SQL editor (see README)
//   2. Uncomment the Supabase import and insert block below
//   3. In Hero.tsx and CTA.tsx, swap ButtonPrimary/Link for <ButtonLead />

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Uncomment to save to Supabase:
  // const supabase = await createClient();
  // const { error } = await supabase
  //   .from("leads")
  //   .insert({ email: email.toLowerCase().trim() });
  // if (error && !error.message.includes("duplicate")) {
  //   console.error("[lead] Supabase insert error:", error.message);
  //   return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  // }

  return NextResponse.json({ success: true });
}
