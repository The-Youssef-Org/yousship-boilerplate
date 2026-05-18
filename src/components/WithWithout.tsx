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

const WithWithout = () => {
  return (
    <section className="bg-base-100 px-8 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-balance text-base-content sm:text-4xl">
            Two ways to start a SaaS.
          </h2>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-base-content/10">
          {/* ── Without ── */}
          <div className="md:pr-16">
            <div className="mb-8 flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-error/15">
                <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 text-error" aria-hidden="true">
                  <path d="M2 2l8 8M10 2 2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-error/70">
                Without {config.appName}
              </p>
            </div>
            <ul className="space-y-5">
              {without.map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-error/60" aria-hidden="true">
                    <path d="M4 4l8 8M12 4 4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p className="text-sm leading-relaxed text-base-content/80">{it}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* ── With ── */}
          <div className="md:pl-16">
            <div className="mb-8 flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 text-emerald-400" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                With {config.appName}
              </p>
            </div>
            <ul className="space-y-5">
              {withList.map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true">
                    <path d="M2.5 8l4 4 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm leading-relaxed text-base-content/80">{it}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WithWithout;

