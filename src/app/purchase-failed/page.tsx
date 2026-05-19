import Link from "next/link";
import { redirect } from "next/navigation";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `Payment not completed | ${config.appName}`,
  canonicalUrlRelative: "/purchase-failed",
  index: false,
});

const PurchaseFailedPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) => {
  const { from } = await searchParams;

  if (from !== "checkout") {
    redirect("/");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200 px-6 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(239,68,68,0.22),transparent)]"
      />

      <section className="relative w-full max-w-2xl rounded-3xl border border-base-content/10 bg-base-100/95 p-8 shadow-2xl shadow-black/10 backdrop-blur sm:p-10">
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <circle cx="10" cy="10" r="9" fill="currentColor" className="text-red-500/20" />
              <path d="M6.8 6.8 13.2 13.2M13.2 6.8 6.8 13.2" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className="text-red-600" />
            </svg>
            Payment Not Completed
          </div>

          <h1 className="mt-5 text-balance text-4xl font-black tracking-tight text-base-content sm:text-5xl">
            Your purchase did not go through
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-base-content/65 sm:text-lg">
            This can happen if the payment was canceled, declined, or timed out. You can try again safely.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-base-content/10 bg-base-content/[0.03] p-5 sm:p-6">
          <p className="text-sm font-semibold text-base-content">What to do next</p>
          <ul className="mt-3 space-y-2 text-sm text-base-content/70">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">1.</span>
              Return to pricing and complete checkout again.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">2.</span>
              Double-check your card details or try another payment method.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">3.</span>
              Need help? Contact us at {config.mail.supportEmail}.
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/#pricing"
            className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Try payment again
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-base-content/15 px-6 py-3 text-sm font-semibold text-base-content/70 transition-colors hover:text-base-content"
          >
            Return to home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PurchaseFailedPage;
