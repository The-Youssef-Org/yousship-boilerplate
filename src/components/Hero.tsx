import config from "@/config";
import ButtonPrimary from "./ButtonPrimary";
import ButtonCheckout from "./ButtonCheckout";
import AvatarGroup from "./AvatarGroup";
import Image from "next/image";
// import ButtonLead from "./ButtonLead"; // Uncomment to use waitlist mode

const Hero = () => {
  const showcase = config.hero.showcase;
  const primaryCtaLabel = `Get ${config.appName}`;
  const primaryCtaPlan =
    config.paymentProvider === "lemonsqueezy"
      ? config.lemonsqueezy.plans.find((plan) => plan.name === showcase.primaryCtaPlanName)
      : config.stripe.plans.find((plan) => plan.name === showcase.primaryCtaPlanName);
  const primaryCtaPlanId =
    primaryCtaPlan && "variantId" in primaryCtaPlan
      ? primaryCtaPlan.variantId
      : primaryCtaPlan && "priceId" in primaryCtaPlan
        ? primaryCtaPlan.priceId
        : null;
  const primaryCtaMode =
    primaryCtaPlan && "mode" in primaryCtaPlan ? primaryCtaPlan.mode : undefined;

  return (
    <section className="relative isolate overflow-hidden px-8 pb-24 pt-16 lg:pb-32 lg:pt-24">
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_40%_at_50%_-5%,rgba(59,130,246,0.18),transparent)]"
      />
      {/* ── Main hero ── */}
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-8 inline-block rounded-full border border-base-content/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/40">
            {showcase.kicker}
          </p>

          <h1 className="text-balance text-5xl font-black leading-[1.05] tracking-tight text-base-content sm:text-6xl lg:text-[4.25rem]">
            {showcase.title}
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {showcase.titleHighlight}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-base-content/50 sm:text-lg">
            {showcase.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {primaryCtaPlanId ? (
              <ButtonCheckout
                planId={primaryCtaPlanId}
                mode={primaryCtaMode}
                label={primaryCtaLabel}
                fullWidth={false}
                className="px-8 py-3 shadow-sm shadow-amber-900/10 hover:-translate-y-0.5 disabled:cursor-default"
              />
            ) : (
              <ButtonPrimary
                href="#pricing"
                className="px-8 py-3 shadow-sm shadow-amber-900/10 hover:-translate-y-0.5"
              >
                {primaryCtaLabel}
              </ButtonPrimary>
            )}
            {/* <ButtonLead /> */}
            <a
              href="#features"
              className="text-sm font-semibold text-base-content/55 underline-offset-4 transition-colors hover:text-base-content hover:underline"
            >
              See what&apos;s included
            </a>
          </div>

          <AvatarGroup />
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-6 top-8 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 bottom-2 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl"
          />

          {showcase.imageSrc ? (
            <Image
              src={showcase.imageSrc}
              alt={showcase.imageAlt}
              width={1600}
              height={1100}
              className="relative z-10 h-full min-h-[24rem] w-full overflow-hidden rounded-2xl object-contain lg:min-h-[30rem]"
            />
          ) : (
            <div className="relative z-10 flex min-h-[24rem] items-stretch justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent p-4 shadow-2xl shadow-black/20 ring-1 ring-base-content/10 lg:min-h-[30rem]">
              <div className="w-full overflow-hidden rounded-xl border border-base-content/15 bg-base-100/85 text-left shadow-lg shadow-black/10 lg:min-h-[26rem]">
                <div className="flex items-center justify-between border-b border-base-content/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <div className="h-2.5 w-28 rounded bg-base-content/10" />
                </div>

                <div className="grid gap-4 p-4 sm:grid-cols-[0.3fr_0.7fr]">
                  <div className="hidden space-y-2 border-r border-base-content/10 pr-4 sm:block">
                    <div className="h-3 w-4/5 rounded bg-base-content/12" />
                    <div className="h-3 w-3/5 rounded bg-base-content/10" />
                    <div className="h-3 w-2/3 rounded bg-base-content/10" />
                    <div className="mt-3 h-10 rounded-lg bg-base-content/8" />
                    <div className="h-10 rounded-lg bg-base-content/8" />
                    <div className="h-10 rounded-lg bg-base-content/8" />
                  </div>

                  <div className="space-y-3 sm:pl-1">
                    <div className="h-3 w-2/5 rounded bg-base-content/15" />
                    <div className="h-3 w-4/5 rounded bg-base-content/10" />

                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-lg bg-base-content/8 p-3">
                        <div className="h-2 w-3/5 rounded bg-base-content/15" />
                        <div className="mt-2 h-5 w-4/5 rounded bg-base-content/20" />
                      </div>
                      <div className="rounded-lg bg-base-content/8 p-3">
                        <div className="h-2 w-1/2 rounded bg-base-content/15" />
                        <div className="mt-2 h-5 w-3/4 rounded bg-base-content/20" />
                      </div>
                      <div className="rounded-lg bg-base-content/8 p-3">
                        <div className="h-2 w-2/3 rounded bg-base-content/15" />
                        <div className="mt-2 h-5 w-4/5 rounded bg-base-content/20" />
                      </div>
                    </div>

                    <div className="rounded-lg bg-base-content/8 p-3">
                      <div className="mb-3 h-2.5 w-1/3 rounded bg-base-content/15" />
                      <div className="flex h-28 items-end gap-2">
                        <div className="h-8 w-full rounded bg-blue-400/40" />
                        <div className="h-14 w-full rounded bg-blue-400/50" />
                        <div className="h-11 w-full rounded bg-blue-400/45" />
                        <div className="h-20 w-full rounded bg-blue-400/60" />
                        <div className="h-16 w-full rounded bg-blue-400/50" />
                        <div className="h-24 w-full rounded bg-cyan-400/60" />
                      </div>
                    </div>

                    <div className="rounded-lg bg-base-content/8 p-3">
                      <div className="mb-3 h-2.5 w-2/5 rounded bg-base-content/15" />
                      <div className="relative h-14 overflow-hidden rounded bg-base-content/6">
                        <div className="absolute inset-x-0 top-8 h-px bg-base-content/10" />
                        <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="h-full w-full text-cyan-300/70">
                          <path d="M0 22 C 12 18, 20 10, 32 12 C 46 14, 58 24, 70 18 C 80 13, 90 8, 100 4" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
