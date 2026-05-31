import Link from "next/link";
import { redirect } from "next/navigation";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import stripe from "@/libs/stripe";
import { createClient } from "@/libs/supabase/server";

export const metadata = getSEOTags({
  title: `Purchase complete | ${config.appName}`,
  canonicalUrlRelative: "/purchase-successful",
  index: false,
});

const PurchaseSuccessfulPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; order_id?: string }>;
}) => {
  const { session_id: sessionId, order_id: orderId } = await searchParams;

  // Stripe flow: validate the checkout session server-side.
  if (sessionId) {
    let checkoutSession: Awaited<ReturnType<typeof stripe.checkout.sessions.retrieve>> | null = null;
    try {
      checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    } catch {
      redirect("/");
    }
    if (!checkoutSession || checkoutSession.payment_status !== "paid") {
      redirect("/");
    }
  } else if (!orderId) {
    // Neither provider supplied a recognisable success param — bail.
    redirect("/");
  }
  // Lemon Squeezy flow: LS appends ?order_id=... to the redirect URL.
  // The webhook has already provisioned the user's access server-side,
  // so no additional validation is needed here.

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200 px-6 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(16,185,129,0.2),transparent)]"
      />

      <section className="relative w-full max-w-2xl rounded-3xl border border-base-content/10 bg-base-100/95 p-8 shadow-2xl shadow-black/10 backdrop-blur sm:p-10">
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <circle cx="10" cy="10" r="9" fill="currentColor" className="text-emerald-500/20" />
              <path d="M6 10.3 8.5 12.8 14 7.3" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600" />
            </svg>
            Payment Successful
          </div>

          <h1 className="mt-5 text-balance text-4xl font-black tracking-tight text-base-content sm:text-5xl">
            Purchase successful
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-base-content/65 sm:text-lg">
            Thank you for your purchase. Your access is now active and you are ready to get started.
            We also sent your confirmation and a sign-in link to your email.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-base-content/10 bg-base-content/[0.03] p-5 sm:p-6">
          <p className="text-sm font-semibold text-base-content">What happens next</p>
          <ul className="mt-3 space-y-2 text-sm text-base-content/70">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">1.</span>
              Check your email for your purchase confirmation and sign-in link.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">2.</span>
              Sign in to open your dashboard and start using your purchase.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">3.</span>
              Need help? Contact us at {config.mail.supportEmail}.
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={isLoggedIn ? config.auth.dashboardUrl : config.auth.loginUrl}
            className="rounded-xl bg-base-content px-6 py-3 text-sm font-semibold text-base-100 transition-opacity hover:opacity-90"
          >
            {isLoggedIn ? "Go to dashboard" : "Go to sign in"}
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

export default PurchaseSuccessfulPage;
