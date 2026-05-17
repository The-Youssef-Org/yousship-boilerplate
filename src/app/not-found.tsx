import Link from "next/link";
import config from "@/config";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight md:text-5xl">
        404 — Page not found
      </h1>
      <p className="mb-8 max-w-md text-base text-base-content/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-neutral px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Back to home
        </Link>
        <a
          href={`mailto:${config.mail.supportEmail}`}
          className="rounded-xl border border-base-300 px-5 py-2.5 text-sm font-semibold text-base-content transition hover:bg-base-200"
        >
          Contact support
        </a>
      </div>
    </main>
  );
}
