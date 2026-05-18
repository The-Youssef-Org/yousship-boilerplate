"use client";

import { useState } from "react";

/* ─── Visual mockups ──────────────────────────────────────────────────── */

const AuthVisual = () => (
  <div className="w-full max-w-[440px] rounded-2xl border border-base-content/20 bg-base-100 p-8 shadow-2xl">
    <p className="text-center text-xl font-black text-base-content">Welcome</p>
    <p className="mt-2 text-center text-sm text-base-content/50">Sign in with Google or a magic link.</p>

    <div className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-amber-600 px-4 py-3.5 text-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
      <span className="text-sm font-medium text-white">Continue with Google</span>
    </div>

    <div className="mt-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-base-content/15" />
      <span className="text-xs text-base-content/25">OR</span>
      <div className="h-px flex-1 bg-base-content/15" />
    </div>

    <p className="mt-5 text-sm font-medium text-base-content/60">Email address</p>
    <div className="mt-2 rounded-xl border border-base-content/20 bg-base-100 px-4 py-3.5 text-sm text-base-content/25">
      you@example.com
    </div>
    <div className="mt-3 rounded-xl bg-amber-600 py-3.5 text-center text-sm font-semibold text-white">
      Send magic link
    </div>
  </div>
);

const PaymentsVisual = () => (
  <div className="flex flex-col items-center gap-6">
    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/20">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500">
        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-white">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
    <div className="text-center">
      <p className="text-6xl font-black tracking-tight text-base-content">$29.00</p>
      <span className="mt-3 inline-block rounded-full bg-emerald-500/15 px-4 py-1.5 text-sm font-semibold text-emerald-400">
        Payment successful
      </span>
    </div>
  </div>
);

const EmailVisual = () => (
  <div className="w-full max-w-[440px] rounded-2xl border border-base-content/10 bg-base-100 p-7 shadow-2xl">
    <div className="flex items-center gap-3 border-b border-base-content/[0.07] pb-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">Y</div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-base-content/80">Yousship</p>
        <p className="truncate text-xs text-base-content/40">no-reply@yousship.com</p>
      </div>
      <p className="shrink-0 text-xs text-base-content/30">just now</p>
    </div>
    <p className="mt-5 text-base font-semibold text-base-content/80">Welcome to Yousship 👋</p>
    <p className="mt-2 text-sm leading-relaxed text-base-content/40">
      Your account is ready. Everything is pre-configured and waiting for you.
    </p>
    <div className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white">
      Get started
    </div>
  </div>
);

const DatabaseVisual = () => (
  <div className="w-full max-w-[440px] overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 font-mono shadow-2xl">
    <div className="flex gap-4 border-b border-base-content/[0.07] bg-base-200/50 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-base-content/30">
      <span className="w-6">id</span>
      <span className="flex-1">email</span>
      <span>role</span>
    </div>
    <div className="divide-y divide-base-content/[0.05]">
      {[
        { id: 1, email: "alex@startup.co", role: "admin" },
        { id: 2, email: "sara@product.io", role: "user"  },
        { id: 3, email: "tom@saas.dev",    role: "user"  },
        { id: 4, email: "lisa@agency.co",  role: "user"  },
      ].map((r) => (
        <div key={r.id} className="flex gap-4 px-6 py-3 text-sm text-base-content/40">
          <span className="w-6 text-blue-400/70">{r.id}</span>
          <span className="flex-1 truncate">{r.email}</span>
          <span className={r.role === "admin" ? "font-medium text-amber-400/80" : "text-base-content/25"}>{r.role}</span>
        </div>
      ))}
    </div>
  </div>
);

const SEOVisual = () => (
  <div className="w-full max-w-[440px] space-y-4">
    <div className="rounded-2xl border border-base-content/10 bg-base-100 p-6 shadow-2xl">
      <p className="text-xs text-green-500/70">https://yousship.com</p>
      <p className="mt-2 text-lg font-semibold text-blue-400">Yousship — Ship your SaaS faster</p>
      <p className="mt-2 text-sm leading-relaxed text-base-content/40">
        The Next.js boilerplate with Auth, Stripe, Supabase and Resend. Go from idea to production in days.
      </p>
    </div>
    <div className="flex items-center gap-2 px-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 12 12" fill="currentColor" className="h-4 w-4 text-amber-400">
          <path d="M6 0l1.35 2.73L10.5 3.27l-2.25 2.19.53 3.09L6 7.02l-2.78 1.53.53-3.09L1.5 3.27l3.15-.54z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-base-content/40">4.9 · 200+ happy builders</span>
    </div>
  </div>
);

/* ─── Feature data ────────────────────────────────────────────────────── */

const FEATURES = [
  {
    id: "auth",
    title: "Authentication",
    description: "Magic links, Google OAuth, server-side sessions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="M8.5 11V8a3.5 3.5 0 1 1 7 0v3m-9 0h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: <AuthVisual />,
  },
  {
    id: "payments",
    title: "Payments",
    description: "Stripe checkout, subscriptions, billing portal.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="M3 8.5h18M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm9 9h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: <PaymentsVisual />,
  },
  {
    id: "email",
    title: "Email",
    description: "React Email templates, Resend, ready on day one.",
    icon: <span className="-translate-y-[3px] inline-block text-[17px] font-thin leading-none">@</span>,
    visual: <EmailVisual />,
  },
  {
    id: "database",
    title: "Database",
    description: "Supabase Postgres with RLS and type-safe client.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="M12 4c-4.97 0-9 1.79-9 4s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4Zm-9 8v4c0 2.21 4.03 4 9 4s9-1.79 9-4v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: <DatabaseVisual />,
  },
  {
    id: "seo",
    title: "SEO & Blog",
    description: "Auto-sitemaps, OG images, MDX blog out of the box.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: <SEOVisual />,
  },
];

/* ─── Main component ──────────────────────────────────────────────────── */

export default function FeaturesAccordion() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-base-100 px-8 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-base-content/40">
          What&apos;s included
        </p>
        <h2 className="mt-3 text-center text-3xl font-black tracking-tight text-balance text-base-content sm:text-4xl">
          Everything pre-wired.
        </h2>

        <div className="mt-12 flex flex-col gap-3 md:flex-row md:gap-2">

          {/* Vertical floating tab list */}
          <div className="flex shrink-0 flex-row gap-1 md:w-48 md:flex-col">
            {FEATURES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActive(i)}
                className={`flex flex-1 items-center gap-3 rounded-xl px-4 py-4 text-left transition-all duration-200 ${
                  active === i
                    ? "bg-base-content/[0.07] text-base-content"
                    : "text-base-content/55 hover:bg-base-content/[0.04] hover:text-base-content/75 dark:text-base-content/35 dark:hover:text-base-content/60"
                }`}
              >
                <span
                    className={`flex shrink-0 [&>svg]:h-6 [&>svg]:w-6 [&>span]:text-2xl [&>span]:leading-none transition-colors duration-200 ${
                    active === i ? "text-blue-400" : "text-base-content/50 dark:text-base-content/30"
                  }`}
                >
                  {f.icon}
                </span>
                <p className="text-sm font-semibold">{f.title}</p>
              </button>
            ))}
          </div>

          {/* Visual panel */}
          <div className="flex min-h-[480px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-base-content/10 bg-base-200/30 p-8">
            {FEATURES[active].visual}
          </div>

        </div>
      </div>
    </section>
  );
}
