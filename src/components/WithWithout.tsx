import config from "@/config";

const without = [
  "Wire up auth, payments and email from scratch — again",
  "Miss transactional emails until a user complains",
  "Figure out SEO, sitemaps and OG tags by hand",
  "Spend weeks choosing tools that don't work together",
  "Launch late, if the landing page ever gets finished",
];

const withList = [
  "Sign-in, magic links and OAuth working out of the box",
  "Transactional email templates ready to send on day one",
  "SEO, sitemaps and social cards built in from the start",
  "A proven stack that scales as your product grows",
  "A professional landing page before your first product commit",
];

const PathPanel = ({
  title,
  items,
  positive,
}: {
  title: string;
  items: string[];
  positive: boolean;
}) => {
  const tone = positive
    ? {
        panel: "border-success/35 bg-success/10",
        badge: "bg-success text-success-content",
        line: "bg-success/45",
        title: "text-base-content",
        text: "text-base-content/85",
      }
    : {
        panel: "border-error/35 bg-error/10",
        badge: "bg-error text-error-content",
        line: "bg-error/45",
        title: "text-base-content",
        text: "text-base-content/85",
      };

  return (
    <article className={`relative rounded-3xl border p-7 shadow-sm ${tone.panel}`}>
      <div className="flex items-center gap-3">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${tone.badge}`}>
          {positive ? "With" : "Without"}
        </span>
        <h3 className={`text-lg font-extrabold sm:text-xl ${tone.title}`}>{title}</h3>
      </div>

      <ul className="mt-6 space-y-4">
        {items.map((it, idx) => (
          <li key={it} className="flex items-start gap-3.5">
            <div className="mt-0.5 flex w-5 shrink-0 flex-col items-center">
              <span className={`h-2.5 w-2.5 rounded-full ${tone.badge}`} aria-hidden="true" />
              {idx < items.length - 1 && <span className={`mt-1 h-6 w-px ${tone.line}`} aria-hidden="true" />}
            </div>
            <p className={`text-sm leading-relaxed ${tone.text}`}>{it}</p>
          </li>
        ))}
      </ul>
    </article>
  );
};

const WithWithout = () => {
  return (
    <section className="mx-auto max-w-6xl px-8 py-24">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
          Two ways to start a SaaS.
        </h2>
      </div>

      <div className="relative mt-12 rounded-[2rem] border border-base-300 bg-base-100 p-4 shadow-xl shadow-black/5 sm:p-6">
        <div className="pointer-events-none absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-base-300 to-transparent md:block" />

        <div className="grid gap-5 md:grid-cols-2">
          <PathPanel
            title={config.appName}
            items={without}
            positive={false}
          />
          <PathPanel
            title={config.appName}
            items={withList}
            positive
          />
        </div>
      </div>
    </section>
  );
};

export default WithWithout;
