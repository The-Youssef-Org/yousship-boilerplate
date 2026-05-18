import config from "@/config";
import TestimonialsAvatars from "./TestimonialsAvatars";
import ButtonPrimary from "./ButtonPrimary";
import type { ReactNode } from "react";
// import ButtonLead from "./ButtonLead"; // Uncomment to use waitlist mode

type StackItem = { label: string; detail: string; icon: ReactNode };

const STACK: StackItem[] = [
  {
    label: "Auth",
    detail: "Magic links & OAuth",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path
          d="M8.5 11V8a3.5 3.5 0 1 1 7 0v3m-9 0h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Payments",
    detail: "Stripe checkout & subscriptions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path
          d="M3 8.5h18M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm9 9h3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Email",
    detail: "Transactional via Resend",
    icon: <span className="text-base leading-none -translate-y-[3px] inline-block">@</span>,
  },
  {
    label: "Database",
    detail: "Supabase + row-level security",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path
          d="M12 4c-4.97 0-9 1.79-9 4s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4Zm-9 8v4c0 2.21 4.03 4 9 4s9-1.79 9-4v-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "SEO",
    detail: "OG images, sitemaps, metadata",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path
          d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Styling",
    detail: "DaisyUI + Tailwind, fully themeable",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path
          d="M12 4.5a8.5 8.5 0 1 0 0 17h1.2a1.8 1.8 0 0 0 0-3.6h-.9a2.3 2.3 0 0 1 0-4.6h1.2A5.5 5.5 0 0 0 19 7.8 8.5 8.5 0 0 0 12 4.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="10" r="1" fill="currentColor" />
        <circle cx="10.5" cy="7.8" r="1" fill="currentColor" />
        <circle cx="13.7" cy="8" r="1" fill="currentColor" />
        <circle cx="16" cy="10.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden px-8 pb-24 pt-20 lg:pb-32 lg:pt-32">
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_40%_at_50%_-5%,rgba(59,130,246,0.18),transparent)]"
      />
      {/* ── Main copy ── */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-8 inline-block rounded-full border border-base-content/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/40">
          {config.appName} &mdash; Next.js SaaS Boilerplate
        </p>

        <h1 className="text-balance text-5xl font-black leading-[1.05] tracking-tight text-base-content sm:text-6xl lg:text-[4.5rem]">
          Stop building infrastructure.
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Start shipping product.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-base-content/50 sm:text-lg">
          Auth, Stripe, email, and a polished landing page — wired together and
          ready on day one. Every hour you would have spent on setup is now
          spent on the thing only you can build.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonPrimary
            href="#pricing"
            className="px-8 py-3 shadow-sm shadow-amber-900/10 hover:-translate-y-0.5"
          >
            Get {config.appName}
          </ButtonPrimary>
          {/* <ButtonLead /> */}
          <a
            href="#features"
            className="rounded-xl border border-base-content/15 px-8 py-3 text-sm font-semibold text-base-content/60 transition-colors hover:border-base-content/30 hover:text-base-content"
          >
            See what&apos;s included
          </a>
        </div>

        <div className="mt-10 flex justify-center">
          <TestimonialsAvatars />
        </div>
      </div>

      {/* ── Stack grid ── */}
      <div className="mx-auto mt-24 max-w-3xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-base-content/10" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/30">
            Everything pre-wired
          </p>
          <div className="h-px flex-1 bg-base-content/10" />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map(({ label, detail, icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-base-content/10 bg-base-content/[0.03] px-4 py-3.5 transition-colors hover:border-base-content/20 hover:bg-base-content/[0.06]"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                {icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-base-content">
                  {label}
                </p>
                <p className="text-xs text-base-content/40">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
