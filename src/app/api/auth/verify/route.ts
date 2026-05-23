import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { sendEmail } from "@/libs/resend";
import { welcomeEmail } from "@/emails/WelcomeEmail";
import config from "@/config";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const token_hash = searchParams.get("token_hash");
  const next = searchParams.get("next") ?? config.auth.callbackUrl;

  if (!token_hash) {
    return NextResponse.redirect(`${origin}/signin?error=auth`);
  }

  const supabase = await createClient();

  // Try 'email' first (GoTrue stores magic-link OTPs as type 'email' internally),
  // then fall back to 'magiclink' for older Supabase project configurations.
  let verifyError = null;
  let user = null;

  for (const type of ["email", "magiclink"] as const) {
    const { data, error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error && data?.user) {
      user = data.user;
      break;
    }
    verifyError = error;
  }

  if (!user) {
    console.error("[auth/verify] all verifyOtp attempts failed:", verifyError?.message);
    return NextResponse.redirect(`${origin}/signin?error=auth`);
  }

  // Upsert profile row.
  await supabase
    .from("profiles")
    .upsert({ id: user.id, email: user.email }, { onConflict: "id" });

  // Welcome email for new accounts (created ≤ 2 min ago).
  if (user.email) {
    const createdMs = user.created_at ? Date.parse(user.created_at) : 0;
    const lastMs = user.last_sign_in_at ? Date.parse(user.last_sign_in_at) : 0;
    if (createdMs > 0 && Math.abs(lastMs - createdMs) <= 120_000) {
      const name =
        (user.user_metadata?.given_name as string | undefined) ??
        (user.user_metadata?.name as string | undefined)?.split(" ")[0] ??
        "there";
      (async () => {
        try {
          await sendEmail({
            to: user!.email!,
            subject: `Welcome to ${config.appName}!`,
            html: await welcomeEmail({ name }),
          });
        } catch (err) {
          console.warn("[auth/verify] welcome email failed:", err);
        }
      })();
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
