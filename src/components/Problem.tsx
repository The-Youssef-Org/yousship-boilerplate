const painPoints = [
  {
    label: "01",
    title: "Week one turns into week six",
    description:
      "You plan to ship features, but your time disappears into setting up email, billing, auth, and infrastructure.",
  },
  {
    label: "02",
    title: "You start losing motivation",
    description:
      "Delays stack up, progress feels slow, and motivation starts to fade.",
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#123564] to-[#0e2a52] py-24 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-[#4f83ff]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#6fa5ff]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            The real risk is months spent wiring basics.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Most SaaS projects fail in setup, not strategy. Scope grows, momentum drops,
            and eventually the project dies.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-stretch md:flex-row md:items-center md:justify-center">
          {painPoints.map((point, index) => (
            <div key={point.title} className="flex flex-col items-center md:flex-row md:items-center">
              <article className="h-[220px] w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:w-80">
                <p className="text-xs font-semibold tracking-[0.16em] text-white/50">
                  {point.label}
                </p>
                <h3 className="mt-3 text-xl font-bold leading-tight">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {point.description}
                </p>
              </article>

              {index < painPoints.length - 1 && (
                <>
                  <span className="my-4 flex h-14 items-center justify-center self-center md:mx-5 md:my-0 md:h-auto md:w-14" aria-hidden="true">
                    <span className="flex flex-col items-center md:hidden">
                      <span className="h-8 w-px bg-gradient-to-b from-white/20 to-white/60" />
                      <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 text-white/70">
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
                      <span className="h-px w-10 bg-gradient-to-r from-white/20 to-white/60" />
                      <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 text-white/70">
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
