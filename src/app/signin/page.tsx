import { Suspense } from "react";
import Link from "next/link";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import Logo from "@/components/Logo";
import SigninForm from "./SigninForm";

export const metadata = getSEOTags({
  title: `Sign in to ${config.appName}`,
  canonicalUrlRelative: "/signin",
  index: false,
});

const SigninPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base-200 px-6 py-12">
      <Logo className="mb-8" />

      <div className="w-full max-w-md rounded-3xl border border-base-content/10 bg-base-100 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-base-content">Sign in</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Continue with Google OAuth or a secure magic link.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-base-content/10 bg-base-content/[0.03] px-3 py-1.5 text-xs font-medium text-base-content/60">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            No account yet? We&apos;ll create one automatically.
          </p>
        </div>

        <Suspense fallback={<div className="h-72 animate-pulse rounded-xl bg-base-200" />}>
          <SigninForm />
        </Suspense>
      </div>
    </main>
  );
};

export default SigninPage;
