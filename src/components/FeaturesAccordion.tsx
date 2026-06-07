"use client";

import { useState } from "react";
import Image from "next/image";

// ─── Edit your features here ───────────────────────────────────────────────
//
// Each feature needs:
//   title       — the tab label
//   description — shown when the tab is active (1–2 sentences)
//   icon        — any inline SVG or character
//   img         — path to an image in /public  e.g. "/features/dashboard.png"
//                 Take a screenshot of your product, drop it in /public/features/,
//                 and set the path here. Set to null to show a placeholder.
//   visual      — (optional) render a custom JSX element instead of an image.
//                 Useful for demo cards, stats, or any inline mockup.
//
// Add, remove, or reorder items freely.
// ──────────────────────────────────────────────────────────────────────────

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  img: string | null;
  visual?: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    id: "onboarding",
    title: "Easy Onboarding",
    description:
      "Get your users up and running in minutes. A guided setup flow, sensible defaults, and contextual tips eliminate friction so people see value immediately — before they have a chance to drop off.",
    img: "/features/onboarding.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "dashboard",
    title: "Powerful Dashboard",
    description:
      "Everything you need at a glance. A clean, customisable dashboard surfaces the metrics that matter most so you can monitor progress, spot trends, and act before small issues become big ones.",
    img: "/features/dashboard.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="M3 3h7v9H3zm11 0h7v5h-7zm0 9h7v9h-7zM3 16h7v5H3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "collaboration",
    title: "Team Collaboration",
    description:
      "Invite teammates, assign roles, and work together without stepping on each other. Real-time updates, shared views, and granular permissions keep every team member aligned and in control.",
    img: "/features/collaboration.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "automation",
    title: "Automation",
    description:
      "Eliminate repetitive tasks with rule-based workflows. Set triggers, define actions, and let the product handle the busywork — so your team can focus on the work that actually moves the needle.",
    img: "/features/automation.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ─── Main component ──────────────────────────────────────────────────── */

export default function FeaturesAccordion() {
  const [active, setActive] = useState(0);
  const feature = FEATURES[active];

  return (
    <section className="bg-base-100 px-8 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-base-content/40">
          What&apos;s included
        </p>
        <h2 className="mt-3 text-center text-3xl font-black tracking-tight text-balance text-base-content sm:text-4xl">
          Everything you need.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">

          {/* Feature tabs */}
          <div className="flex flex-col gap-1">
            {FEATURES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActive(i)}
                className={`rounded-xl px-4 py-4 text-left transition-all duration-200 ${
                  active === i
                    ? "bg-base-content/[0.07] text-base-content"
                    : "text-base-content/55 hover:bg-base-content/[0.04] hover:text-base-content/75 dark:text-base-content/35 dark:hover:text-base-content/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex shrink-0 [&>svg]:h-6 [&>svg]:w-6 [&>span]:text-2xl [&>span]:leading-none transition-colors duration-200 ${
                      active === i ? "text-blue-400" : "text-base-content/50 dark:text-base-content/30"
                    }`}
                  >
                    {f.icon}
                  </span>
                  <p className="text-sm font-semibold">{f.title}</p>
                </div>
                {active === i && (
                  <p className="mt-2 pl-9 text-sm leading-relaxed text-base-content/60">
                    {f.description}
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* Image panel — priority: visual > img > placeholder */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-base-content/10 bg-base-200/30">
            {feature.visual ? (
              feature.visual
            ) : feature.img ? (
              <Image
                key={feature.id}
                src={feature.img}
                alt={feature.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-base-200 to-base-300/60" />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
