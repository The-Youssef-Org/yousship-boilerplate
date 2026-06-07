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
    name: "Speed",
    description:
      "Deliver results in seconds, not minutes. Optimised from the ground up so your users never wait — every interaction is instant, every load is smooth, no matter the scale.",
    bullets: ["Sub-second response times", "Optimised for any load", "Edge-ready infrastructure"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path
          d="M13 2 4.09 12.37a1 1 0 0 0 .83 1.63H11l-1 8 8.91-10.37A1 1 0 0 0 19.08 10H13l1-8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Reliability",
    description: "Built for production from day one. Redundant by design, monitored continuously, and recovers automatically so your users always get through — even when things go wrong.",
    bullets: ["99.9% uptime SLA", "Automatic failover", "Continuous monitoring"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Security",
    description: "Your data is encrypted in transit and at rest. Role-based access controls, audit logs, and secure authentication ensure only the right people see the right things — always.",
    bullets: ["End-to-end encryption", "Role-based access control", "Full audit logs"],
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
    name: "Insights",
    description:
      "Real-time dashboards and detailed reports give you a clear picture of how your product is performing and how your users are engaging — so you can make confident, data-driven decisions.",
    bullets: ["Real-time dashboards", "Custom reports", "User behaviour tracking"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path
          d="M3 12h4l3 7 4-14 3 7h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Integrations",
    description:
      "Connect the tools you already rely on with a single click. A growing library of native integrations and a clean API mean your workflow stays exactly the way you like it.",
    bullets: ["Native third-party connectors", "Webhooks & REST API", "No-code integration builder"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path
          d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Support",
    description: "Detailed documentation, step-by-step guides, and a responsive support team mean you are never stuck. Get answers fast and keep moving — we are with you every step of the way.",
    bullets: ["Comprehensive docs", "Video walkthroughs", "Priority support channel"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
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
