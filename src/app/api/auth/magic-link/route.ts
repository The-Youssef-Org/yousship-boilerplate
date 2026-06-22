import { NextRequest, NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/libs/supabase/server";
import { sendEmail } from "@/libs/resend";
import { magicLinkEmail } from "@/emails/MagicLinkEmail";
import config from "@/config";

export async function POST(req: NextRequest) {
  let body: { email?: unknown; next?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, next: rawNext } = body;

  // Allow only same-origin relative paths — prevents open redirect.
  const next = (typeof rawNext === "string" && rawNext.startsWith("/") && !rawNext.startsWith("//"))
    ? rawNext
    : config.auth.callbackUrl;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const origin = req.nextUrl.origin;

  // Fallback: let Supabase send its own email via the PKCE callback flow.
  const otpFallback = async () => {
    const supabase = await createClient();
    if (!supabase) {
      return;
    }
    const callbackUrl = `${origin}/api/auth/callback?next=${encodeURIComponent(next)}`;
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: callbackUrl, shouldCreateUser: true },
    });
  };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hasResend = !!process.env.RESEND_API_KEY;

  // Without Resend or admin credentials we can't send a custom email.
  if (!hasResend || !supabaseUrl || !serviceRoleKey) {
    await otpFallback();
    return NextResponse.json({ success: true });
  }

  // admin.generateLink creates the user if they don't exist yet, and returns
  // a hashed_token we can verify server-side — no PKCE round-trip needed.
  const admin = createAdminClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });

  const hashedToken = data?.properties?.hashed_token;

  if (error || !hashedToken) {
    console.error("[magic-link] generateLink failed:", error);
    await otpFallback();
    return NextResponse.json({ success: true });
  }

  const verifyUrl =
    `${origin}/api/auth/verify` +
    `?token_hash=${encodeURIComponent(hashedToken)}` +
    `&type=magiclink` +
    `&next=${encodeURIComponent(next)}`;

  try {
    await sendEmail({
      to: email,
      subject: `Sign in to ${config.appName}`,
      html: await magicLinkEmail({ confirmationUrl: verifyUrl }),
    });
  } catch (err) {
    console.error("[magic-link] sendEmail failed — falling back to Supabase mailer:", err);
    await otpFallback();
  }

  return NextResponse.json({ success: true });
}


