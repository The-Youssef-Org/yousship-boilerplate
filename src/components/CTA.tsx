import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";
import Link from "next/link";
// import ButtonLead from "./ButtonLead"; // Uncomment to use waitlist mode

const CTA = () => {
  const primaryCtaLabel = `Get ${config.appName}`;
  const ctaPlan = config.stripe.plans.find(
    (plan) => plan.name === config.hero.showcase.primaryCtaPlanName,
  );

  return (
    <section className="relative isolate flex min-h-[75vh] items-center overflow-hidden">
      {/* Background photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat brightness-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/60"
      />

      <div className="mx-auto w-full max-w-4xl px-8 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Build faster, launch sooner
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-balance text-white sm:text-6xl">
          Stop wasting weeks on setup.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
          Skip auth, billing, and email wiring. Stay focused on your product and
          start generating revenue.
        </p>

        <div className="mt-10 flex justify-center">
          {ctaPlan ? (
            <ButtonCheckout
              priceId={ctaPlan.priceId}
              mode={ctaPlan.mode}
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
