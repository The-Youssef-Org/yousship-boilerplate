import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";
import { sendEmail } from "@/libs/resend";
import { welcomeEmail } from "@/libs/emailTemplates";
import type { Profile } from "@/libs/types";

const isFirstSignIn = (createdAt?: string, lastSignInAt?: string) => {
  if (!createdAt || !lastSignInAt) return false;
  const createdMs = Date.parse(createdAt);
  const lastSignInMs = Date.parse(lastSignInAt);
  if (Number.isNaN(createdMs) || Number.isNaN(lastSignInMs)) return false;
  return Math.abs(lastSignInMs - createdMs) <= 120000;
};

const sendWelcomeIfFirstOAuthSignIn = async (supabase: Awaited<ReturnType<typeof createClient>>) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return;
  if (!isFirstSignIn(user.created_at, user.last_sign_in_at)) return;

  const firstName =
    (user.user_metadata?.first_name as string | undefined) ??
    (user.user_metadata?.given_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined)?.split(" ")[0] ??
    "there";

  await sendEmail({
    to: user.email,
    subject: `Welcome to ${config.appName}!`,
    html: welcomeEmail({ name: firstName }),
  });
};

const syncProfileFromAuthMetadata = async (
  supabase: Awaited<ReturnType<typeof createClient>>,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, image, email")
    .eq("id", user.id)
    .single<Pick<Profile, "name" | "image" | "email">>();

  const candidateName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    ([
      user.user_metadata?.given_name as string | undefined,
      user.user_metadata?.family_name as string | undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined);

  const candidateImage =
    (user.user_metadata?.avatar_url as string | undefined) ?? undefined;

  const updates: Partial<Pick<Profile, "name" | "image" | "email">> = {};
  if (!profile?.name && candidateName) updates.name = candidateName;
  if (!profile?.image && candidateImage) updates.image = candidateImage;
  if (!profile?.email && user.email) updates.email = user.email;

  if (Object.keys(updates).length > 0) {
    await supabase.from("profiles").update(updates).eq("id", user.id);
  }
};

// OAuth / magic-link callback. Supabase redirects here with `?code=...`.
// We exchange the code for a session cookie, then send the user on their way.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? config.auth.callbackUrl;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      try {
        await syncProfileFromAuthMetadata(supabase);
      } catch (profileSyncError) {
        console.warn("[auth/callback] profile sync failed", profileSyncError);
      }
      try {
        await sendWelcomeIfFirstOAuthSignIn(supabase);
      } catch (emailError) {
        console.warn("[auth/callback] welcome email failed", emailError);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/signin?error=auth`);
}
