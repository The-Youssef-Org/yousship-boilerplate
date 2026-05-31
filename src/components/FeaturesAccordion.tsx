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
    id: "auth",
    title: "Authentication",
    description:
      "Magic links and Google OAuth out of the box, fully connected to Supabase with secure server-side session cookies. Protected routes are pre-built so you can lock pages to authenticated users from day one — no custom middleware to write.",
    img: "/features/auth.png", // ← replace with "/features/auth.png"
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="M8.5 11V8a3.5 3.5 0 1 1 7 0v3m-9 0h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    description:
      "Stripe Checkout and subscription management fully wired — one-time purchases, recurring plans, the customer billing portal and webhook handling are all set up and waiting for your products and prices.",
    img: "/features/payments.png", // ← replace with "/features/payments.png"
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="M3 8.5h18M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm9 9h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "email",
    title: "Email",
    description:
      "Transactional email templates wired to Resend. Welcome messages, magic-link delivery and purchase confirmations are all templated — drop in your sender details and they are ready to go.",
    img: "/features/email.png", // ← swap for "/features/email.png" when you have your own screenshot
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "seo",
    title: "SEO & Blog",
    description:
      "An MDX-powered blog, auto-generated sitemap, dynamic OG images and structured data included. Write a post in markdown and push — search engines pick it up immediately and every page gets its own social preview image automatically.",
    img: "/features/seo.png", // ← swap for "/features/seo.png" when you have your own screenshot
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
          Everything pre-wired.
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
              <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
                <p className="text-sm font-medium text-base-content/30">No image yet</p>
                <p className="max-w-[220px] text-xs text-base-content/20">
                  Add a screenshot to <code className="text-base-content/30">/public/features/</code> and set the <code className="text-base-content/30">img</code> path above.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
