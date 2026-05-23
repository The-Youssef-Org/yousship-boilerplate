import { NextResponse } from "next/server";
import config from "@/config";
import { sendEmail, addToResendAudience } from "@/libs/resend";
import { leadMagnetEmail } from "@/emails/LeadMagnetEmail";

// POST /api/lead
// Body: { email: string }
//
// Does three things, each independently — a failure in one never blocks the others:
//   1. Saves the email to the Supabase `leads` table (requires the table to exist).
//   2. Adds the contact to a Resend Audience (requires RESEND_API_KEY + RESEND_AUDIENCE_ID).
//   3. Sends a delivery email to the lead (requires RESEND_API_KEY).
//
// To activate Supabase saving:
//   Run in your Supabase SQL editor:
//     create table leads (
//       id uuid primary key default gen_random_uuid(),
//       email text unique not null,
//       created_at timestamptz default now()
//     );
//
// To activate Resend audience + delivery email:
//   Set RESEND_API_KEY and RESEND_AUDIENCE_ID in your .env.local

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({})) as { email?: unknown };
  const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // 1. Save to Supabase leads table
  try {
    const { createClient } = await import("@/libs/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert({ email });
    if (error) {
      if (error.message.includes("duplicate") || error.code === "23505") {
        // Already captured — not an error worth surfacing
      } else {
        console.warn("[lead] Supabase insert failed:", error.message);
      }
    }
  } catch (err) {
    console.warn("[lead] Supabase unavailable or leads table missing:", err);
  }

  // 2. Add to Resend Audience
  try {
    await addToResendAudience(email);
  } catch (err) {
    console.warn("[lead] Resend audience add failed:", err);
  }

  // 3. Send delivery email
  try {
    const lm = config.leadMagnet;
    await sendEmail({
      to: email,
      subject: lm.heading,
      html: await leadMagnetEmail({
        heading: lm.heading,
        subheading: lm.subheading,
        bulletPoints: [...lm.bulletPoints],
      }),
    });
  } catch (err) {
    console.warn("[lead] Delivery email failed:", err);
  }

  return NextResponse.json({ success: true });
}
