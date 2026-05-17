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
      "Email, magic links, and Google — fully connected to Supabase with secure server-side session cookies.",
    bullets: ["Email + OAuth", "Server-side sessions", "Protected routes"],
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
    description: "Stripe checkout, subscription management and webhooks pre-configured and ready to customise.",
    bullets: ["One-time & subscriptions", "Customer portal", "Webhooks handler"],
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
    description: "Transactional email templates built with React Email, wired to Resend or any SMTP provider.",
    bullets: ["Welcome", "Receipts", "Password reset"],
    icon: <span className="text-[17px] font-bold leading-none">@</span>,
  },
  {
    name: "Styles with DaisyUI",
    description:
      "DaisyUI is pre-wired on Tailwind v4, so you can switch between 20+ themes, tune tokens, and keep UI consistency without rebuilding components.",
    bullets: ["Theme switch ready", "Semantic color tokens", "Composable component classes"],
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
      "Supabase Postgres gives you a reliable data layer from day one, with typed access patterns and secure policies for production use.",
    bullets: ["Managed Postgres", "RLS-friendly structure", "Type-safe client usage"],
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
    description: "An MDX-powered blog, auto-generated sitemap, dynamic OG images and structured data included.",
    bullets: ["MDX articles", "Auto sitemap", "Dynamic OG"],
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

// Listicle-style: vertical list of features on the left, detailed
// content on the right. Click an item to expand.
const FeaturesListicle = ({
  features = defaultFeatures,
}: {
  features?: Feature[];
}) => {
  const [active, setActive] = useState(0);
  const item = features[active];

  return (
    <section id="features" className="mx-auto max-w-7xl px-8 py-24">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
          Launch faster without rebuilding the same SaaS stack
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base-content/70">
          Authentication, payments, emails, database, and SEO are already wired together,
          so you can focus on your product and get to real users sooner.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_2.15fr]">
        <ul className="flex flex-col gap-1">
          {features.map((f, i) => (
            <li key={f.name}>
              <button
                onClick={() => setActive(i)}
                className={`w-full cursor-pointer border-l-2 px-4 py-3 text-left transition ${
                  i === active
                    ? "border-base-content/80 bg-base-200/70"
                    : "border-base-content/20 text-base-content/80 hover:border-base-content/45"
                }`}
              >
                <span
                  className={`flex items-center gap-2.5 text-sm font-semibold ${
                    i === active ? "text-base-content" : "text-base-content/60"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={i === active ? "text-base-content" : "text-base-content/45"}
                  >
                    {f.icon}
                  </span>
                  <span>{f.name}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-base-300/70 bg-gradient-to-b from-base-100 to-base-200/35 p-8 shadow-xl shadow-black/5 ring-1 ring-base-300/60">
          <div>
            <h3 className="text-2xl font-bold text-base-content">{item.name}</h3>
            <p className="mt-2 text-base-content/70">{item.description}</p>
          </div>

          <ul className="mt-6 space-y-3">
            {item.bullets.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 text-sm text-base-content"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral text-xs text-white">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FeaturesListicle;
