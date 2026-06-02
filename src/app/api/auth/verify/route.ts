import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { sendEmail } from "@/libs/resend";
import { welcomeEmail } from "@/emails/WelcomeEmail";
import config from "@/config";
import type { Profile } from "@/libs/types";

const normalizeNextPath = (rawNext: string | null, fallback: string) => {
  if (!rawNext) return fallback;
  // Allow only same-origin relative paths.
  if (!rawNext.startsWith("/") || rawNext.startsWith("//")) return fallback;
  return rawNext;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const token_hash = searchParams.get("token_hash");
  const next = normalizeNextPath(searchParams.get("next"), config.auth.callbackUrl);

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

  const normalizedEmail = user.email ? normalizeEmail(user.email) : null;

  // Welcome email should only fire when this email is first added to profiles.
  let hadProfileWithEmail = false;
  if (normalizedEmail) {
    const { data: existingByEmail } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle<Pick<Profile, "id">>();
    hadProfileWithEmail = !!existingByEmail?.id;
  }

  // Upsert profile row.
  await supabase
    .from("profiles")
    .upsert({ id: user.id, email: normalizedEmail ?? user.email }, { onConflict: "id" });

  if (normalizedEmail && !hadProfileWithEmail) {
    const name =
      (user.user_metadata?.given_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined)?.split(" ")[0] ??
      "there";
    (async () => {
      try {
        await sendEmail({
          to: normalizedEmail,
          subject: `Welcome to ${config.appName}!`,
          html: await welcomeEmail({ name }),
        });
      } catch (err) {
        console.warn("[auth/verify] welcome email failed:", err);
      }
    })();
  }

  return NextResponse.redirect(`${origin}${next}`);
}
