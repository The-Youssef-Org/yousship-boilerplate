import { Suspense } from "react";
import Link from "next/link";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import { LogoMark } from "@/components/Logo";
import SigninForm from "./SigninForm";

export const metadata = getSEOTags({
  title: `Sign in to ${config.appName}`,
  canonicalUrlRelative: "/signin",
  index: false,
});

const SigninPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base-200 px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-lg font-semibold text-base-content"
      >
        <LogoMark size={32} />
        {config.appName}
      </Link>

      <div className="w-full max-w-md rounded-3xl border border-base-content/10 bg-base-100 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-base-content">Welcome</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Sign in with Google or a magic link.</p>
        </div>

        <Suspense fallback={<div className="h-72 animate-pulse rounded-xl bg-base-200" />}>
          <SigninForm />
        </Suspense>
      </div>
    </main>
  );
};

export default SigninPage;
