import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";
import Link from "next/link";
// import ButtonLead from "./ButtonLead"; // Uncomment to use waitlist mode

const CTA = () => {
  const primaryCtaLabel = `Get ${config.appName}`;
  const ctaPlan =
    config.paymentProvider === "lemonsqueezy"
      ? config.lemonsqueezy.plans.find((plan) => plan.name === config.hero.showcase.primaryCtaPlanName)
      : config.stripe.plans.find((plan) => plan.name === config.hero.showcase.primaryCtaPlanName);
  const ctaPlanId =
    ctaPlan && "variantId" in ctaPlan
      ? ctaPlan.variantId
      : ctaPlan && "priceId" in ctaPlan
        ? ctaPlan.priceId
        : null;
  const ctaMode = ctaPlan && "mode" in ctaPlan ? ctaPlan.mode : undefined;

  return (
    <section className="relative isolate flex min-h-[75vh] items-center overflow-hidden">
      {/* Background photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat brightness-50"
        style={{
          backgroundImage: "url('/cta.jpg')",
        }}
      />
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/60"
      />

      <div className="mx-auto w-full max-w-4xl px-8 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Join thousands of teams
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-balance text-white sm:text-6xl">
          Start building something great.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
          Get up and running today. No long contracts, no hidden fees — just a
          product your team will actually love.
        </p>

        <div className="mt-10 flex justify-center">
          {ctaPlanId ? (
            <ButtonCheckout
              planId={ctaPlanId}
              mode={ctaMode}
              label={primaryCtaLabel}
              fullWidth={false}
              className="!bg-white px-8 py-3.5 text-sm font-semibold !text-neutral shadow-xl transition hover:-translate-y-0.5 hover:!bg-base-200"
            />
          ) : (
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-neutral shadow-xl transition hover:-translate-y-0.5 hover:bg-base-200"
            >
              {primaryCtaLabel}
            </Link>
          )}
          {/* <ButtonLead cta="Join the waitlist" /> */}
        </div>
      </div>
    </section>
  );
};

export default CTA;
