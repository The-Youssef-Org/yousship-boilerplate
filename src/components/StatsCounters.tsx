import config from "@/config";

const StatsCounters = () => {
  const stats = config.stats;

  if (!stats.showSection || !stats.items.length) {
    return null;
  }

  return (
    <section className="bg-base-100 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-balance text-base-content sm:text-5xl">
            {stats.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-base-content/50">
            {stats.subheading}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.items.map((item) => (
            <article
              key={item.value + item.label}
              className="rounded-2xl border border-base-content/10 bg-base-content/[0.02] p-5 text-center"
            >
              <p className="text-3xl font-black tracking-tight text-base-content sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-base-content/70">
                {item.label}
              </p>
              {item.note ? (
                <p className="mt-1 text-xs text-base-content/45">{item.note}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounters;
