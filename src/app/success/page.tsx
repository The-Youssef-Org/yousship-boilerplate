import Link from "next/link";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import Logo from "@/components/Logo";
import { createClient } from "@/libs/supabase/server";

export const metadata = getSEOTags({
  title: `Purchase complete | ${config.appName}`,
  canonicalUrlRelative: "/success",
  index: false,
});

export const dynamic = "force-dynamic";

const SuccessPage = async () => {
  const supabase = await createClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;
  const isLoggedIn = !!user;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base-200 px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 flex justify-center">
          <Logo size={36} />
        </div>

        <div className="rounded-3xl border border-base-content/10 bg-base-100 p-8 sm:p-10">
          <h1 className="text-2xl font-bold text-base-content">
            You&apos;re in. Welcome aboard.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-base-content/65">
            Check your email — I sent you a sign-in link. Click it and you&apos;ll land straight in your dashboard where you can connect your GitHub account and get the code.
          </p>

          <div className="mt-8 border-t border-base-content/[0.07] pt-8">
            <p className="text-sm font-semibold text-base-content">
              Didn&apos;t get the email?
            </p>
            <ol className="mt-3 space-y-2 text-sm text-base-content/60">
              <li>1. Check your spam folder</li>
              <li>
                2.{" "}
                <Link
                  href={isLoggedIn ? config.auth.dashboardUrl : config.auth.loginUrl}
                  className="underline underline-offset-2 hover:text-base-content"
                >
                  Sign in with your purchase email
                </Link>
              </li>
              <li>
                3. Still stuck?{" "}
                <a
                  href={`mailto:${config.mail.supportEmail}`}
                  className="underline underline-offset-2 hover:text-base-content"
                >
                  Contact support
                </a>
              </li>
            </ol>
          </div>

          <Link
            href={isLoggedIn ? config.auth.dashboardUrl : config.auth.loginUrl}
            className="mt-8 flex w-full items-center justify-center rounded-xl bg-base-content px-6 py-3 text-sm font-semibold text-base-100 transition-opacity hover:opacity-80"
          >
            {isLoggedIn ? "Go to dashboard" : "Sign in"}
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-base-content/40">
          — Youssef
        </p>
      </div>
    </main>
  );
};

export default SuccessPage;
