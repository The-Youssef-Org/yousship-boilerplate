"use client";

import { useState, type ReactNode } from "react";

type AccordionFeature = {
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
};

const defaultFeatures: AccordionFeature[] = [
  {
    title: "Authentication",
    description:
      "Add your Supabase keys and authentication is live — magic links and Google included. No custom middleware, no session handling from scratch.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M8.5 11V8a3.5 3.5 0 1 1 7 0v3m-9 0h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    image: "/features/auth.svg",
  },
  {
    title: "Emails",
    description:
      "Pre-built transactional templates connected to Resend. Welcome emails, password resets and receipts work on day one.",
    icon: <span className="text-[17px] font-bold leading-none">@</span>,
    image: "/features/email.svg",
  },
  {
    title: "Payments",
    description:
      "One-time and recurring Stripe payments with webhook handling already wired in. Go from zero to a checkout page in under an hour.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M3 8.5h18M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm9 9h3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    image: "/features/payments.svg",
  },
  {
    title: "SEO & Blog",
    description:
      "Automatic sitemaps, dynamic OG images and an MDX blog that search engines index from the start. No plugins, no extra setup.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    image: "/features/seo.svg",
  },
];

const FeaturesAccordion = ({
  features = defaultFeatures,
}: {
  features?: AccordionFeature[];
}) => {
  if (features.length === 0) return null;

  const [open, setOpen] = useState(0);
  const active = features[open];

  return (
    <section className="mx-auto max-w-6xl px-8 py-24">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
          Built-in, not bolted-on
        </h2>
      </div>

      <div className="mt-12">
        <div className="overflow-x-auto">
          <div className="flex min-w-max items-center gap-1 border-b border-base-300/80 pb-1 md:min-w-0 md:justify-center">
          {features.map((f, i) => {
            const isOpen = i === open;
            return (
              <button
                key={f.title}
                onClick={() => setOpen(i)}
                className={`cursor-pointer rounded-t-lg px-4 py-3 text-left transition ${
                  isOpen
                    ? "bg-base-100 text-base-content"
                    : "text-base-content/65 hover:text-base-content"
                }`}
                aria-pressed={isOpen}
              >
                <span className="flex items-center gap-2.5 text-sm font-semibold whitespace-nowrap">
                  <span aria-hidden="true" className={isOpen ? "text-base-content" : "text-base-content/50"}>
                    {f.icon}
                  </span>
                  <span>{f.title}</span>
                </span>
                <span
                  className={`mt-2 block h-[1.5px] rounded-full transition-all duration-300 ${
                    isOpen ? "w-full bg-base-content/80" : "w-0 bg-transparent"
                  }`}
                />
              </button>
            );
          })}
          </div>
        </div>

        <div className="mt-6 grid gap-6 rounded-2xl border border-base-300/70 bg-gradient-to-b from-base-100 to-base-200/35 p-6 shadow-xl shadow-black/5 ring-1 ring-base-300/60 md:grid-cols-[1fr_1.15fr] md:p-8">
          <div>
            <p className="text-base font-semibold text-base-content">{active.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-base-content/70">{active.description}</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-base-300/60 bg-base-200/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={open}
              src={active.image}
              alt={active.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
