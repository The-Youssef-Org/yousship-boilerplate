import Link from "next/link";
import config from "@/config";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      {/* Logo */}
      <Logo className="mb-10" />

      {/* 404 badge */}
      <span className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-widest text-primary ring-1 ring-inset ring-primary/20">
        404
      </span>

      {/* Heading */}
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl">
        Page not found.
      </h1>

      {/* Subtext */}
      <p className="mb-10 max-w-sm text-base leading-relaxed text-base-content/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-content shadow-sm transition hover:opacity-90"
        >
          Back to home
        </Link>
        <a
          href={`mailto:${config.mail.supportEmail}`}
          className="rounded-xl border border-base-300 px-6 py-2.5 text-sm font-semibold text-base-content transition hover:bg-base-200"
        >
          Contact support
        </a>
      </div>
    </main>
  );
}
