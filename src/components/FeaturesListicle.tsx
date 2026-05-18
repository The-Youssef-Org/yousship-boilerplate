"use client";

import { useState, type ReactNode } from "react";

type Feature = {
  name: string;
  description: string;
  bullets: string[];
  icon: ReactNode;
};

const defaultFeatures: Feature[] = [
  {
    name: "Authentication",
    description:
      "Magic links and Google OAuth out of the box, fully connected to Supabase with secure server-side session cookies. Protected routes are pre-built so you can lock pages to authenticated users from day one — no custom middleware to write.",
    bullets: ["Magic link & Google OAuth", "Secure server-side sessions", "Protected routes ready"],
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
    name: "Payments",
    description: "Stripe Checkout and subscription management fully wired — one-time purchases, recurring plans, the customer billing portal and webhook handling are all set up and waiting for your products and prices.",
    bullets: ["One-time & subscription plans", "Customer billing portal", "Webhook handler included"],
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
    name: "Emails",
    description: "Transactional email templates built with React Email, wired to Resend or any SMTP provider. Welcome messages, magic-link delivery and receipt emails are all templated — drop in your sender details and they are ready to send.",
    bullets: ["Welcome email", "Magic link delivery", "Receipt templates"],
    icon: <span className="text-[17px] font-thin leading-none -translate-y-[3px] inline-block">@</span>,
  },
  {
    name: "Styles with DaisyUI",
    description:
      "DaisyUI is pre-wired on Tailwind v4, so you can switch between 20+ themes, tune tokens, and keep UI consistency without rebuilding components. All design tokens are semantic, so a one-line theme change updates every colour across the entire app.",
    bullets: ["20+ switchable themes", "Customisable color tokens", "Component-first classes"],
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
  {
    name: "Database",
    description:
      "Supabase Postgres gives you a reliable data layer from day one, with typed access patterns and secure policies for production use. Row-level security is structured in from the start, so you never accidentally expose data as your product grows.",
    bullets: ["Managed Postgres on Supabase", "Row-level security ready", "Full TypeScript support"],
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
    name: "SEO & Blog",
    description: "An MDX-powered blog, auto-generated sitemap, dynamic OG images and structured data included. Write a post in markdown and push — search engines pick it up immediately and every page gets its own social preview image automatically.",
    bullets: ["MDX-powered blog", "Auto-generated sitemap", "Dynamic OG images"],
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
];

// Listicle-style: horizontal pill tabs at top, detailed content panel below.
const FeaturesListicle = ({
  features = defaultFeatures,
}: {
  features?: Feature[];
}) => {
  const [active, setActive] = useState(0);
  const item = features[active];

  return (
    <section id="features" className="bg-base-100 px-8 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/40">
            What&apos;s included
          </p>
          <h2 className="text-3xl font-black tracking-tight text-balance text-base-content sm:text-4xl">
            Everything you need to ship.
          </h2>
        </div>

        {/* Floating tab strip */}
        <div className="mt-10 grid grid-cols-3 sm:grid-cols-6">
          {features.map((f, i) => (
            <button
              key={f.name}
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-2 rounded-xl px-2 py-4 text-sm font-semibold transition-all duration-200 ${
                i === active
                  ? "bg-base-content/[0.07] text-base-content"
                  : "text-base-content/55 hover:bg-base-content/[0.04] hover:text-base-content/75 dark:text-base-content/35 dark:hover:text-base-content/60"
              }`}
            >
              <span
                className={`[&>svg]:h-6 [&>svg]:w-6 [&>span]:text-2xl ${i === active ? "text-blue-400" : "text-base-content/50 dark:text-base-content/30"}`}
                aria-hidden="true"
              >
                {f.icon}
              </span>
              {f.name}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="mt-3 rounded-2xl border border-base-content/10 bg-base-content/[0.03] p-8 lg:p-10">
            <div className="flex items-start gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-black text-base-content">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-base-content/50">{item.description}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-2">
              {item.bullets.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-2 text-sm font-medium text-base-content/60"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true">
                    <path d="M2.5 8l4 4 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </span>
              ))}
            </div>
          </div>

      </div>
    </section>
  );
};

export default FeaturesListicle;
