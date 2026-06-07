const painPoints = [
  {
    label: "01",
    title: "Week one becomes week six",
    description:
      "You plan to build, but your time disappears into details that have nothing to do with your product.",
  },
  {
    label: "02",
    title: "You start losing momentum",
    description:
      "Delays stack up, progress feels invisible, and the gap between where you are and where you wanted to be keeps growing.",
  },
  {
    label: "03",
    title: "The project quietly dies",
    description:
      "When progress stays invisible for too long, priorities shift and the idea gets abandoned.",
  },
];

const Problem = () => {
  return (
    <section className="relative py-24 bg-base-200">
      <div className="relative mx-auto max-w-6xl px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-balance text-base-content sm:text-5xl">
            The real risk isn&apos;t failure. It&apos;s never shipping.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-base-content/50">
            Most products don&apos;t fail because of bad ideas. They fail because momentum dies before launch.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-stretch md:flex-row md:items-center md:justify-center">
          {painPoints.map((point, index) => (
            <div key={point.title} className="flex flex-col items-center md:flex-row md:items-center">
              <article className="w-full max-w-sm rounded-2xl border border-base-content/10 bg-base-content/[0.03] p-6 backdrop-blur-sm md:w-80">
                <p className="text-xs font-semibold tracking-[0.2em] text-base-content/35">
                  {point.label}
                </p>
                <h3 className="mt-3 text-xl font-bold leading-tight text-base-content">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-base-content/50">
                  {point.description}
                </p>
              </article>

              {index < painPoints.length - 1 && (
                <>
                  <span className="my-4 flex h-14 items-center justify-center self-center md:mx-5 md:my-0 md:h-auto md:w-14" aria-hidden="true">
                    <span className="flex flex-col items-center md:hidden">
                      <span className="h-8 w-px bg-gradient-to-b from-base-content/10 to-base-content/40" />
                      <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 text-base-content/40">
                        <path
                          d="M2.25 4.5 6 8.25 9.75 4.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <span className="hidden items-center md:flex">
                      <span className="h-px w-10 bg-gradient-to-r from-base-content/10 to-base-content/40" />
                      <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 text-base-content/40">
                        <path
                          d="M4.5 2.25 8.25 6 4.5 9.75"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                  <span className="sr-only">then</span>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Problem;
