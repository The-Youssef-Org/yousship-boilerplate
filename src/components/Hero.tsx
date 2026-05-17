import config from "@/config";
import TestimonialsAvatars from "./TestimonialsAvatars";
import ButtonPrimary from "./ButtonPrimary";
// import ButtonLead from "./ButtonLead"; // Uncomment to use waitlist mode

const Hero = () => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-8 py-16 lg:flex-row lg:gap-20 lg:py-24">
      <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-6xl">
          Your SaaS foundation,
          <br />
          production-ready on day one
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-base-content/70">
          {config.appDescription} Auth, payments, emails, and a polished
          landing page — already connected and ready to extend. Open your editor
          and write product code from the very first commit.
        </p>

        <ButtonPrimary
          href="#pricing"
          className="px-6 py-3 shadow-lg shadow-blue-800/25 hover:-translate-y-0.5"
        >
          Get {config.appName}
        </ButtonPrimary>
        {/* <ButtonLead /> */}

        <div className="flex w-full justify-center lg:justify-center">
          <TestimonialsAvatars />
        </div>
      </div>

      <div className="w-full max-w-lg lg:max-w-xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-200 via-sky-100 to-cyan-100 p-4 shadow-2xl ring-1 ring-black/5 sm:p-6">
          {/* Mock browser window */}
          <div className="flex h-full flex-col rounded-xl bg-base-100 shadow-lg ring-1 ring-black/5">
            <div className="flex items-center gap-1.5 border-b border-neutral-100 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 hidden h-4 flex-1 rounded bg-base-200 sm:block" />
            </div>
            <div className="grid flex-1 grid-cols-[80px_1fr] gap-3 p-3 sm:grid-cols-[110px_1fr] sm:p-4">
              {/* Sidebar */}
              <div className="space-y-2">
                <div className="h-5 rounded bg-neutral" />
                <div className="h-3 w-3/4 rounded bg-neutral-200" />
                <div className="h-3 w-2/3 rounded bg-neutral-200" />
                <div className="h-3 w-3/5 rounded bg-neutral-200" />
                <div className="h-3 w-1/2 rounded bg-neutral-200" />
              </div>
              {/* Main */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-neutral-300" />
                  <div className="h-6 w-20 rounded-full bg-blue-700" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-14 rounded-lg bg-blue-100" />
                  <div className="h-14 rounded-lg bg-sky-100" />
                  <div className="h-14 rounded-lg bg-amber-100" />
                </div>
                <div className="flex h-20 items-end gap-1.5 rounded-lg bg-base-200 p-3 sm:h-24">
                  {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-blue-700 to-sky-500"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="space-y-1.5">
                  <div className="h-2.5 w-full rounded bg-neutral-200" />
                  <div className="h-2.5 w-5/6 rounded bg-neutral-200" />
                  <div className="h-2.5 w-2/3 rounded bg-neutral-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
