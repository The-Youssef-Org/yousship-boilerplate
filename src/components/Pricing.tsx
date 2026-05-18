"use client";

import { useState } from "react";
import config from "@/config";
import ButtonPrimary from "./ButtonPrimary";

const Pricing = () => {
  const starterPlan = config.stripe.plans[0];
  const advancedPlan = config.stripe.plans[1];
  const proPlan = config.stripe.plans[2];
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoadingPriceId(priceId);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode: "payment" }),
      });
      const { url } = (await res.json()) as { url?: string };
      if (url) window.location.href = url;
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPriceId(null);
    }
  };

  return (
    <section id="pricing" className="bg-base-100">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/40">
            Pricing
          </p>
          <h2 className="text-3xl font-black tracking-tight text-balance text-base-content sm:text-4xl">
            One payment. Full ownership.
          </h2>
          <p className="mt-3 text-base-content/50">
            Choose the plan that matches your stage, then ship without rebuilding
            the same stack over and over.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid gap-5 md:items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">

            {/* ========== PLAN 1 — STARTER | uses config.stripe.plans[0].priceId ========== */}
            <article className="relative flex h-full flex-col rounded-3xl border border-base-content/10 bg-base-content/[0.03] p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex rounded-full bg-base-content/[0.07] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-base-content/60">
                    For your first launch
                  </span>
                  <h3 className="mt-3 text-2xl font-extrabold text-base-content">Starter</h3>
                </div>
                <span className="text-lg text-base-content/40 line-through">$149</span>
              </div>

              <p className="mt-2 min-h-[2.5rem] text-sm text-base-content/70">
                Perfect for solo founders shipping their first SaaS.
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-extrabold text-base-content">$99</span>
                <span className="pb-2 text-sm text-base-content/60">USD</span>
              </div>

              <ul className="mt-7 space-y-3 border-t border-base-content/10 pt-6 text-sm text-base-content/80">
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Next.js boilerplate</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Supabase auth & database</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Stripe payments</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Email integration</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>SEO & blog</li>
              </ul>

              <ButtonPrimary
                onClick={() => starterPlan?.priceId && handleCheckout(starterPlan.priceId)}
                disabled={!starterPlan?.priceId || loadingPriceId === starterPlan.priceId}
                className="mt-8 w-full cursor-pointer px-5 py-3 shadow-sm shadow-amber-900/10 disabled:cursor-not-allowed"
              >
                {loadingPriceId === starterPlan?.priceId ? "Redirecting to Stripe..." : "Get Starter"}
              </ButtonPrimary>
              <p className="mt-3 text-center text-xs text-base-content/60">Pay once. Lifetime access.</p>
            </article>
            {/* ========== END PLAN 1 — STARTER ========== */}

            {/* ========== PLAN 2 — ADVANCED | uses config.stripe.plans[1].priceId ========== */}
            <article className="relative flex h-full flex-col rounded-3xl border-2 border-emerald-500/40 bg-base-content/[0.03] p-7">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral px-3 py-1 text-xs font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />POPULAR
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex rounded-full bg-base-content/[0.07] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-base-content/60">
                    For growing products
                  </span>
                  <h3 className="mt-3 text-2xl font-extrabold text-base-content">Advanced</h3>
                </div>
                <span className="text-lg text-base-content/40 line-through">$249</span>
              </div>

              <p className="mt-2 min-h-[2.5rem] text-sm text-base-content/70">
                For teams that want every advantage on day one.
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-extrabold text-base-content">$149</span>
                <span className="pb-2 text-sm text-base-content/60">USD</span>
              </div>

              <ul className="mt-7 space-y-3 border-t border-base-content/10 pt-6 text-sm text-base-content/80">
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Everything in Starter</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Discord community access</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Lifetime updates</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Premium support</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Priority feature requests</li>
              </ul>

              <ButtonPrimary
                onClick={() => advancedPlan?.priceId && handleCheckout(advancedPlan.priceId)}
                disabled={!advancedPlan?.priceId || loadingPriceId === advancedPlan.priceId}
                className="mt-8 w-full cursor-pointer px-5 py-3 shadow-sm shadow-amber-900/10 disabled:cursor-not-allowed"
              >
                {loadingPriceId === advancedPlan?.priceId ? "Redirecting to Stripe..." : "Get Advanced"}
              </ButtonPrimary>
              <p className="mt-3 text-center text-xs text-base-content/60">Pay once. Lifetime access.</p>
            </article>
            {/* ========== END PLAN 2 — ADVANCED ========== */}

            {/* ========== PLAN 3 — PRO | uses config.stripe.plans[2].priceId ========== */}
            <article className="relative flex h-full flex-col rounded-3xl border border-base-content/10 bg-base-content/[0.03] p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex rounded-full bg-base-content/[0.07] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-base-content/60">
                    For serious scale
                  </span>
                  <h3 className="mt-3 text-2xl font-extrabold text-base-content">Pro</h3>
                </div>
                <span className="text-lg text-base-content/40 line-through">$449</span>
              </div>

              <p className="mt-2 min-h-[2.5rem] text-sm text-base-content/70">
                For agencies and product studios.
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-extrabold text-base-content">$299</span>
                <span className="pb-2 text-sm text-base-content/60">USD</span>
              </div>

              <ul className="mt-7 space-y-3 border-t border-base-content/10 pt-6 text-sm text-base-content/80">
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Everything in Advanced</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Unlimited projects & licenses</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>White-label rights</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>1-on-1 onboarding call</li>
                <li className="flex items-start gap-3"><span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>Dedicated Slack channel</li>
              </ul>

              <ButtonPrimary
                onClick={() => proPlan?.priceId && handleCheckout(proPlan.priceId)}
                disabled={!proPlan?.priceId || loadingPriceId === proPlan.priceId}
                className="mt-8 w-full cursor-pointer px-5 py-3 shadow-sm shadow-amber-900/10 disabled:cursor-not-allowed"
              >
                {loadingPriceId === proPlan?.priceId ? "Redirecting to Stripe..." : "Get Pro"}
              </ButtonPrimary>
              <p className="mt-3 text-center text-xs text-base-content/60">Pay once. Lifetime access.</p>
            </article>
            {/* ========== END PLAN 3 — PRO ========== */}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
