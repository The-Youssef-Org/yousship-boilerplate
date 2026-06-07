"use client";

import { useState } from "react";
import config from "@/config";
import ButtonPrimary from "./ButtonPrimary";

type BillingMode = "payment" | "subscription";

const Pricing = () => {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const pricingCtaLabel = `Get ${config.appName}`;
  const provider = config.paymentProvider;
  const providerLabel = provider === "lemonsqueezy" ? "Lemon Squeezy" : "Stripe";

  const getMode = (mode?: BillingMode): BillingMode => mode ?? "payment";

  // Match each pricing card to the active provider's plan by name.
  const cards = config.pricing.cards.map((card) => {
    if (provider === "lemonsqueezy") {
      const plan = config.lemonsqueezy.plans.find((p) => p.name === card.planName);
      return { card, planId: plan?.variantId ?? null, mode: getMode(plan?.mode), isConfigured: !!plan?.variantId };
    }
    const plan = config.stripe.plans.find((p) => p.name === card.planName);
    return { card, planId: plan?.priceId ?? null, mode: getMode(plan?.mode), isConfigured: !!plan?.priceId };
  });

  const getPriceSuffix = (mode?: BillingMode) =>
    getMode(mode) === "subscription" ? "USD / month" : "USD";

  const getBillingFootnote = (mode?: BillingMode) =>
    getMode(mode) === "subscription" ? "Billed monthly. Cancel anytime." : "Pay once. Lifetime access.";

  const handleCheckout = async (planId: string, mode?: BillingMode) => {
    setLoadingPlanId(planId);
    try {
      let res: Response;

      if (provider === "lemonsqueezy") {
        res = await fetch("/api/lemonsqueezy/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            variantId: planId,
            redirectUrl: `${window.location.origin}/purchase-successful`,
          }),
        });
      } else {
        res = await fetch("/api/stripe/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId: planId, mode: getMode(mode) }),
        });
      }

      const bodyText = await res.text();
      let data: { url?: string; error?: string } = {};
      if (bodyText) {
        try {
          data = JSON.parse(bodyText) as { url?: string; error?: string };
        } catch {
          data = { error: "Unexpected response from checkout API." };
        }
      }

      if (!res.ok) throw new Error(data.error ?? "Failed to start checkout.");
      if (data.url) window.location.assign(data.url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPlanId(null);
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
            {config.pricing.heading}
          </h2>
          <p className="mt-3 text-base-content/50">
            {config.pricing.subheading}
          </p>
        </div>

        <div className="mt-12">
          <div className="grid justify-center gap-5 md:items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),360px))]">
            {cards.map(({ card, planId, mode, isConfigured }) => {
              const isLoading = !!planId && loadingPlanId === planId;

              return (
                <article
                  key={card.planName}
                  className={`relative flex h-full flex-col rounded-3xl bg-base-content/[0.03] p-7 ${
                    card.featured
                      ? "border-2 border-emerald-500/40"
                      : "border border-base-content/10"
                  }`}
                >
                  {card.featured && card.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral px-3 py-1 text-xs font-semibold text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {card.badge}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex rounded-full bg-base-content/[0.07] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-base-content/60">
                        {card.eyebrow}
                      </span>
                      <h3 className="mt-3 text-2xl font-extrabold text-base-content">{card.planName}</h3>
                    </div>
                    {card.oldPrice && (
                      <span className="text-lg text-base-content/40 line-through">{card.oldPrice}</span>
                    )}
                  </div>

                  <p className="mt-2 min-h-[2.5rem] text-sm text-base-content/70">
                    {card.description}
                  </p>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-5xl font-extrabold text-base-content">{card.displayPrice}</span>
                    <span className="pb-2 text-sm text-base-content/60">{getPriceSuffix(mode)}</span>
                  </div>

                  <ul className="mt-7 space-y-3 border-t border-base-content/10 pt-6 text-sm text-base-content/80">
                    {card.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-base-content/70 text-xs text-white">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {isConfigured ? (
                    <>
                      <ButtonPrimary
                        onClick={() => planId && handleCheckout(planId, mode)}
                        disabled={!planId || isLoading}
                        className="mt-8 w-full cursor-pointer px-5 py-3 shadow-sm shadow-amber-900/10 disabled:cursor-default"
                      >
                        {isLoading ? `Redirecting to ${providerLabel}...` : pricingCtaLabel}
                      </ButtonPrimary>
                      <p className="mt-3 text-center text-xs text-base-content/60">{getBillingFootnote(mode)}</p>
                    </>
                  ) : (
                    <div className="mt-8 rounded-xl border border-base-content/10 bg-base-content/[0.03] px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-base-content/40">
                        Coming soon
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-base-content/60">
                        Checkout for this plan is not yet available. Contact us to get started.
                      </p>
                    </div>
                  )}
                </article>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
