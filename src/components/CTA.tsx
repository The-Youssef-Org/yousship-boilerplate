import Link from "next/link";
// import ButtonLead from "./ButtonLead"; // Uncomment to use waitlist mode

const CTA = () => {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/cta-bg.svg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/55 to-black/65" />

      <div className="mx-auto w-full max-w-5xl px-8 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Build faster, launch sooner
        </p>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Stop wasting weeks on setup.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/85 sm:text-xl">
          Skip auth, billing, and email wiring. Stay focused on your product and
          start generating revenue.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-neutral shadow-xl transition hover:-translate-y-0.5 hover:bg-base-200"
          >
            Get SaaS Boilerplate
          </Link>
          {/* <ButtonLead cta="Join the waitlist" /> */}
        </div>
      </div>
    </section>
  );
};

export default CTA;
