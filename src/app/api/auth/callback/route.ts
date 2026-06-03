import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";
import { sendEmail } from "@/libs/resend";
import { welcomeEmail } from "@/emails/WelcomeEmail";
import type { Profile } from "@/libs/types";
import { getAdminClient } from "@/libs/supabase/admin";

const normalizeNextPath = (rawNext: string | null, fallback: string) => {
  if (!rawNext) return fallback;
  // Allow only same-origin relative paths.
  if (!rawNext.startsWith("/") || rawNext.startsWith("//")) return fallback;
  return rawNext;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const sendWelcome = async (email: string, firstName: string) => {
  await sendEmail({
    to: email,
    subject: `Welcome to ${config.appName}!`,
    html: await welcomeEmail({ name: firstName }),
  });
};

const markWelcomeSent = async (userId: string, appMetadata: Record<string, unknown> | null | undefined) => {
  const admin = getAdminClient();
  await admin.auth.admin.updateUserById(userId, {
    app_metadata: {
      ...(appMetadata ?? {}),
      welcome_email_sent: true,
    },
  });
};

const profileEmailExistsForOtherUser = async (email: string, userId: string) => {
  const admin = getAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("id")
    .eq("email", email)
    .neq("id", userId)
    .limit(1)
    .maybeSingle<{ id: string }>();

  if (error) throw error;
  return !!data?.id;
};

const syncProfileFromAuthMetadata = async (
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<{
  shouldSendWelcome: boolean;
  welcomeEmailTo?: string;
  welcomeName: string;
  userId?: string;
  appMetadata?: Record<string, unknown>;
}> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { shouldSendWelcome: false, welcomeName: "there" };
  }

  const normalizedEmail = user.email ? normalizeEmail(user.email) : undefined;

  // Send welcome only if this email does not already belong to another user.
  let emailExistsOnAnotherProfile = false;
  if (normalizedEmail) {
    emailExistsOnAnotherProfile = await profileEmailExistsForOtherUser(
      normalizedEmail,
      user.id,
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, image, email")
    .eq("id", user.id)
    .maybeSingle<Pick<Profile, "name" | "image" | "email">>();

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
    (user.user_metadata?.avatar_url as string | undefined) ??
    (user.user_metadata?.picture as string | undefined) ??
    undefined;

  const updates: Partial<Pick<Profile, "name" | "image" | "email">> = {};
  if (!profile?.name && candidateName) updates.name = candidateName;
  if (!profile?.image && candidateImage) updates.image = candidateImage;
  if (!profile?.email && normalizedEmail) updates.email = normalizedEmail;

  // Upsert so new users get a profile row even without a database trigger.
  await supabase.from("profiles").upsert(
    { id: user.id, ...updates },
    { onConflict: "id", ignoreDuplicates: Object.keys(updates).length === 0 },
  );

  const welcomeName =
    (user.user_metadata?.first_name as string | undefined) ??
    (user.user_metadata?.given_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined)?.split(" ")[0] ??
    "there";

  const welcomeAlreadySent = user.app_metadata?.welcome_email_sent === true;

  return {
    shouldSendWelcome:
      !!normalizedEmail &&
      !emailExistsOnAnotherProfile &&
      !welcomeAlreadySent,
    welcomeEmailTo: normalizedEmail,
    welcomeName,
    userId: user.id,
    appMetadata: (user.app_metadata ?? {}) as Record<string, unknown>,
  };
};

// OAuth / magic-link callback. Supabase redirects here with `?code=...`.
// We exchange the code for a session cookie, then send the user on their way.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = normalizeNextPath(searchParams.get("next"), config.auth.callbackUrl);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      let welcome: { shouldSendWelcome: boolean; welcomeEmailTo?: string; welcomeName: string } = {
        shouldSendWelcome: false,
        welcomeName: "there",
      };
      try {
        welcome = await syncProfileFromAuthMetadata(supabase);
      } catch (profileSyncError) {
        console.warn("[auth/callback] profile sync failed", profileSyncError);
      }
      try {
        if (welcome.shouldSendWelcome && welcome.welcomeEmailTo) {
          await sendWelcome(welcome.welcomeEmailTo, welcome.welcomeName);
          if (welcome.userId) {
            await markWelcomeSent(welcome.userId, welcome.appMetadata);
          }
        }
      } catch (emailError) {
        console.warn("[auth/callback] welcome email failed", emailError);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/signin?error=auth`);
}
