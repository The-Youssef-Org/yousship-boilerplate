"use client";

import { useState, type ReactNode } from "react";

type QA = { q: string; a: ReactNode };

// Add or edit FAQ entries here. Each item needs a `q` (question) and `a` (answer).
const defaults: QA[] = [
  {
    q: "How do I get started?",
    a: "Sign up, pick a plan, and you are up and running in minutes. No installation or technical setup required — just create an account and go.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel your subscription at any time from your account settings. You will keep full access until the end of your current billing period.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — we offer a 14-day free trial on all plans. No credit card required to get started.",
  },
  {
    q: "How secure is my data?",
    a: "Your data is encrypted in transit and at rest. We follow industry best practices for security and take privacy seriously.",
  },
];

const Item = ({
  item,
  open,
  onClick,
}: {
  item: QA;
  open: boolean;
  onClick: () => void;
}) => (
  <li>
    <article
      className={`rounded-xl border p-4 transition-all duration-300 ${
        open
          ? "border-base-content/20 bg-base-content/[0.05]"
          : "border-base-content/10 bg-base-content/[0.03] hover:border-base-content/20"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold text-base-content">{item.q}</span>
        <span
          className={`inline-flex items-center justify-center text-base-content/55 transition-transform duration-200 ${
            open ? "rotate-90" : ""
          }`}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
            <path
              d="M7 4.5 12.5 10 7 15.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden text-sm leading-relaxed text-base-content/75">{item.a}</div>
      </div>
    </article>
  </li>
);

const FAQ = ({ items = defaults }: { items?: QA[] }) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-base-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-8 py-14 md:grid-cols-[0.95fr_1.25fr]">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/40">
            Common questions
          </p>
          <h2 className="text-2xl font-black tracking-tight text-balance text-base-content sm:text-3xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 max-w-sm text-sm text-base-content/50">
            Clear answers to the practical questions most founders ask before getting started.
          </p>
        </div>

        <ul className="space-y-3">
          {items.map((it, index) => (
            <Item
              key={it.q}
              item={it}
              open={open === index}
              onClick={() => setOpen(open === index ? null : index)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
