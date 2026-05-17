"use client";

import { useEffect } from "react";
import Link from "next/link";
import config from "@/config";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight md:text-5xl">
        Something went wrong
      </h1>
      <p className="mb-8 max-w-md text-base text-base-content/60">
        An unexpected error occurred. You can try again or contact support if the problem persists.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-xl bg-neutral px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Try again
        </button>
        <a
          href={`mailto:${config.mail.supportEmail}`}
          className="rounded-xl border border-base-300 px-5 py-2.5 text-sm font-semibold text-base-content transition hover:bg-base-200"
        >
          Contact support
        </a>
      </div>
      <Link
        href="/"
        className="mt-8 text-sm text-base-content/50 underline hover:text-base-content"
      >
        Back to home
      </Link>
    </main>
  );
}
