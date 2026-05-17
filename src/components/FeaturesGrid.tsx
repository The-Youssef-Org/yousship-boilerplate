"use client";

import { useState, type ComponentType } from "react";

const AuthDemo = () => {
  const providers = ["Email", "Google"] as const;
  const [provider, setProvider] = useState<(typeof providers)[number]>("Google");

  return (
    <div className="rounded-xl bg-base-100 p-4 ring-1 ring-base-300">
      <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Provider</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {providers.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setProvider(p)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              provider === p
                ? "bg-neutral text-white"
                : "bg-base-200 text-base-content/80 hover:bg-base-300"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-base-content/70">Ready to sign in with {provider}.</p>
    </div>
  );
};

const BillingDemo = () => {
  const [seats, setSeats] = useState(3);
  const monthly = seats * 12;

  return (
    <div className="rounded-xl bg-base-100 p-4 ring-1 ring-base-300">
      <div className="flex items-end justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Team seats</p>
        <p className="text-lg font-bold text-base-content">${monthly}/mo</p>
      </div>
      <input
        type="range"
        min={1}
        max={20}
        value={seats}
        onChange={(e) => setSeats(Number(e.target.value))}
        className="range range-sm mt-3 w-full"
      />
      <p className="mt-2 text-sm text-base-content/70">{seats} active seats selected.</p>
    </div>
  );
};

const EmailDemo = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-xl bg-base-100 p-4 ring-1 ring-base-300">
      <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Transactional event</p>
      <p className="mt-2 text-sm text-base-content">Subject: Welcome to your workspace</p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setSent((v) => !v)}
          className="rounded-full bg-neutral px-3 py-1.5 text-xs font-semibold text-white"
        >
          {sent ? "Undo send" : "Send test"}
        </button>
        <span className={`text-xs font-medium ${sent ? "text-emerald-600" : "text-base-content/60"}`}>
          {sent ? "Delivered" : "Draft"}
        </span>
      </div>
    </div>
  );
};

const ThemeDemo = () => {
  const themes = [
    { name: "Corporate", bg: "#e6f0ff", fg: "#1f2937" },
    { name: "Forest", bg: "#dff2e0", fg: "#14532d" },
    { name: "Sunset", bg: "#ffe7d6", fg: "#7c2d12" },
  ] as const;
  const [idx, setIdx] = useState(0);

  return (
    <div className="rounded-xl bg-base-100 p-4 ring-1 ring-base-300">
      <div className="flex gap-2">
        {themes.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setIdx(i)}
            className={`rounded-full border px-3 py-1 text-xs ${
              i === idx
                ? "border-base-content/20 bg-base-200 text-base-content"
                : "border-base-300 text-base-content/70"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div
        className="mt-3 rounded-lg px-3 py-2 text-sm font-medium"
        style={{ background: themes[idx].bg, color: themes[idx].fg }}
      >
        Active theme: {themes[idx].name}
      </div>
    </div>
  );
};

const DatabaseDemo = () => {
  const [rls, setRls] = useState(true);

  return (
    <div className="rounded-xl bg-base-100 p-4 ring-1 ring-base-300">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Row level security</p>
        <button
          type="button"
          onClick={() => setRls((v) => !v)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            rls ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
          }`}
        >
          {rls ? "ON" : "OFF"}
        </button>
      </div>
      <p className="mt-3 text-sm text-base-content/70">
        {rls ? "Users can only access their own rows." : "All rows are accessible."}
      </p>
    </div>
  );
};

const SeoDemo = () => {
  const [title, setTitle] = useState("Your SaaS homepage");

  return (
    <div className="rounded-xl bg-base-100 p-4 ring-1 ring-base-300">
      <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Meta title</p>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-2 w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm"
      />
      <p className="mt-2 text-xs text-base-content/60">{title.length}/60 characters</p>
    </div>
  );
};

type FeatureItem = {
  title: string;
  description: string;
  span: 2 | 3;
  Demo: ComponentType;
};

const items: FeatureItem[] = [
  {
    title: "Auth Flows",
    description: "Switch providers and validate login UX in seconds.",
    span: 3,
    Demo: AuthDemo,
  },
  {
    title: "Billing Logic",
    description: "Model pricing instantly with interactive seat controls.",
    span: 3,
    Demo: BillingDemo,
  },
  {
    title: "Email Events",
    description: "Preview and trigger key transactional states.",
    span: 2,
    Demo: EmailDemo,
  },
  {
    title: "Theme Switch",
    description: "Try live style changes with simple theme presets.",
    span: 2,
    Demo: ThemeDemo,
  },
  {
    title: "Data Rules",
    description: "Test secure data-access behavior interactively.",
    span: 2,
    Demo: DatabaseDemo,
  },
  {
    title: "SEO Preview",
    description: "Tune metadata and check title length limits.",
    span: 2,
    Demo: SeoDemo,
  },
];

const FeaturesGrid = () => {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
          One codebase. Every essential.
        </h2>
        <p className="mt-3 text-base-content/70">
          Everything a production SaaS needs — set up, configured and ready to
          extend.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        {items.map((it) => (
          <div
            key={it.title}
            className={`rounded-2xl bg-base-100 p-6 shadow-xl shadow-black/5 ring-1 ring-base-300 transition hover:-translate-y-0.5 ${
              it.span === 3 ? "lg:col-span-3" : "lg:col-span-2"
            }`}
          >
            <h3 className="text-lg font-semibold text-base-content">{it.title}</h3>
            <p className="mt-1 text-sm text-base-content/70">{it.description}</p>
            <div className="mt-5">
              <it.Demo />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
