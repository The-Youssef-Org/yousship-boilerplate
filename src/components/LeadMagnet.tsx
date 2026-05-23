import config from "@/config";
import ButtonLead from "./ButtonLead";

const CheckIcon = () => (
  <svg
    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
);

const LeadMagnet = () => {
  const lm = config.leadMagnet;
  if (!lm.show) return null;

  return (
    <section className="bg-base-200 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* Left: copy */}
          <div>
            {lm.badge && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20">
                {lm.badge}
              </span>
            )}
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              {lm.heading}
            </h2>
            <p className="mt-4 text-base leading-7 text-base-content/70">
              {lm.subheading}
            </p>
            {lm.bulletPoints.length > 0 && (
              <ul className="mt-6 space-y-3">
                {lm.bulletPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-base-content/80">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: form */}
          <div className="mt-10 lg:mt-0">
            <ButtonLead cta={lm.ctaLabel} />
            {lm.formNote && (
              <p className="mt-3 text-xs text-base-content/40">
                {lm.formNote}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
