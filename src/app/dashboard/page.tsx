import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";
import Logo from "@/components/Logo";
import stripe from "@/libs/stripe";
import { getLSSubscriptionStatus } from "@/libs/lemonsqueezy";
import ButtonAccount from "@/components/ButtonAccount";
import ButtonBillingPortal from "@/components/ButtonBillingPortal";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileForm from "./ProfileForm";
import DeleteAccount from "./DeleteAccount";
import Breadcrumb from "@/components/Breadcrumb";
import type { Profile } from "@/libs/types";

export const metadata: Metadata = {
  title: `Dashboard | ${config.appName}`,
};

export const dynamic = "force-dynamic";

const DATE_LOCALE = "en-US";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(DATE_LOCALE, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const formatInterval = (interval: "day" | "week" | "month" | "year", count: number) => {
  if (interval === "month" && count === 1) return "mo";
  if (interval === "year" && count === 1) return "yr";
  return `${count}${interval[0]}`;
};

const formatAmount = (unitAmount: number, currency: string) => {
  const value = unitAmount / 100;
  const amount = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
  return amount;
};

const getMembershipLabel = async (planId: string | null, paymentProvider: string | null) => {
  if (!planId) return "No active plan";

  // Lemon Squeezy — look up plan name and display price from config.
  if (paymentProvider === "lemonsqueezy") {
    const plan = config.lemonsqueezy.plans.find((p) => p.variantId === planId);
    if (!plan) return "Active plan";
    if (plan.mode === "subscription") {
      const card = config.pricing.cards.find((c) => c.planName === plan.name);
      const price = card?.displayPrice ? `${card.displayPrice}/mo` : "Monthly";
      return `${plan.name} (${price})`;
    }
    return `${plan.name} (Lifetime)`;
  }

  // Stripe — retrieve live price details.
  const planName = config.stripe.plans.find((p) => p.priceId === planId)?.name ?? "Custom";

  try {
    const price = await stripe.prices.retrieve(planId);

    if (price.recurring && price.unit_amount !== null) {
      const amount = formatAmount(price.unit_amount, price.currency);
      const interval = formatInterval(
        price.recurring.interval,
        price.recurring.interval_count,
      );
      return `${planName} (${amount}/${interval})`;
    }

    return `${planName} (Lifetime)`;
  } catch {
    return `${planName} (Paid)`;
  }
};

type SubscriptionStatus = {
  cancelAtPeriodEnd: boolean;
  endsAt: number | null;
  // True when Stripe confirms the subscription is currently active or trialing.
  // Derived from live Stripe data so it reflects manual cancellations immediately,
  // without waiting for a webhook to update the database.
  liveHasAccess: boolean;
};

const getSubscriptionStatus = async (
  customerId: string | null,
  planId: string | null,
  paymentProvider: string | null,
  email: string | null,
): Promise<SubscriptionStatus | null> => {
  if (!stripe) return null;

  // Lemon Squeezy — fetch live subscription status the same way Stripe does.
  if (paymentProvider === "lemonsqueezy") {
    const lsPlan = config.lemonsqueezy.plans.find((p) => p.variantId === planId);
    if (lsPlan?.mode !== "subscription" || !email) return null;
    try {
      return await getLSSubscriptionStatus(email);
    } catch {
      return null;
    }
  }

  let resolvedCustomerId = customerId;

  // Stripe fallback: resolve customer by email when profile customer_id is missing.
  if (!resolvedCustomerId && email) {
    try {
      const customers = await stripe.customers.list({ email, limit: 1 });
      resolvedCustomerId = customers.data[0]?.id ?? null;
    } catch {
      return null;
    }
  }

  if (!resolvedCustomerId) return null;

  // For one-time Stripe payment plans there are no subscriptions.
  // Check for a succeeded charge on this customer instead.
  const stripePlan = config.stripe.plans.find(
    (p) => p.priceId === planId && (p.mode === "payment" || !p.mode),
  );
  if (stripePlan) {
    try {
      const charges = await stripe.charges.list({
        customer: resolvedCustomerId,
        limit: 10,
      });
      const hasPaid = charges.data.some((c: any) => c.status === "succeeded");
      return hasPaid
        ? { cancelAtPeriodEnd: false, endsAt: null, liveHasAccess: true }
        : null;
    } catch {
      return null;
    }
  }

  const fetchSubscriptions = (customer: string) =>
    stripe!.subscriptions.list({
      customer,
      status: "all",
      limit: 10,
    });

  try {
    let subscriptions = await fetchSubscriptions(resolvedCustomerId);

    // Stale customer_id can happen; retry by email and use that customer's subscriptions.
    if (!subscriptions.data.length && email) {
      const customers = await stripe!.customers.list({ email, limit: 1 });
      const fallbackCustomerId = customers.data[0]?.id ?? null;
      if (fallbackCustomerId && fallbackCustomerId !== resolvedCustomerId) {
        subscriptions = await fetchSubscriptions(fallbackCustomerId);
      }
    }

    const accessLike = (sub: any) =>
      sub.status === "active" ||
      sub.status === "trialing" ||
      sub.status === "past_due" ||
      sub.status === "unpaid" ||
      sub.cancel_at_period_end;

    const isCancellationScheduled = (sub: any) => sub.cancel_at_period_end || sub.cancel_at !== null;

    // Ignore fully ended subscriptions when selecting the dashboard badge source.
    const relevant = subscriptions.data.filter(accessLike);

    // Prefer plan match, but always prioritize subscriptions that are set to
    // cancel at period end so dashboard state immediately turns yellow.
    const matchingByPrice = planId
      ? relevant.find((sub: any) =>
          sub.items.data.some((item: any) => item.price.id === planId),
        )
      : null;

    const matchingCancelAtPeriodEndByPrice = planId
      ? relevant.find(
          (sub: any) =>
            isCancellationScheduled(sub) &&
            sub.items.data.some((item: any) => item.price.id === planId),
        )
      : null;

    const matchingCancelAtPeriodEndAny = relevant.find(
      (sub: any) => isCancellationScheduled(sub),
    );

    const matchingActive = relevant.find(
      (sub: any) => sub.status === "active" || sub.status === "trialing" || sub.cancel_at_period_end,
    );

    const matching =
      matchingCancelAtPeriodEndByPrice ??
      matchingCancelAtPeriodEndAny ??
      matchingByPrice ??
      matchingActive ??
      relevant[0] ??
      subscriptions.data[0] ??
      null;

    if (!matching) return null;

    return {
      cancelAtPeriodEnd: isCancellationScheduled(matching),
      endsAt: matching.cancel_at ?? matching.items.data[0]?.current_period_end ?? null,
      liveHasAccess: matching.status === "active" || matching.status === "trialing",
    };
  } catch {
    return null;
  }
};

export default async function ProfilePage() {
  const supabase = await createClient();

  if (!supabase) redirect(config.auth.loginUrl);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  // The trigger should always create a row, but stay defensive.
  const safeProfile: Profile =
    profile ?? {
      id: user.id,
      name: null,
      email: user.email ?? null,
      image: null,
      customer_id: null,
      plan_id: null,
      payment_provider: null,
      has_access: false,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

  const displayName =
    safeProfile.name ??
    ((user.user_metadata?.full_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined) ??
      ([
        user.user_metadata?.given_name as string | undefined,
        user.user_metadata?.family_name as string | undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined) ??
      null);
  const displayEmail = safeProfile.email ?? user.email ?? null;
  const displayImage =
    safeProfile.image ??
    ((user.user_metadata?.avatar_url as string | undefined) ?? null);

  const initial =
    displayName?.[0]?.toUpperCase() ??
    displayEmail?.[0]?.toUpperCase() ??
    "U";
  const subscriptionStatus = await getSubscriptionStatus(
    safeProfile.customer_id,
    safeProfile.plan_id,
    safeProfile.payment_provider,
    safeProfile.email,
  );

  // Only subscription plans have a manageable billing portal.
  // One-time purchases have no recurring billing to cancel or update.
  const showBillingPortal = (() => {
    if (safeProfile.payment_provider === "lemonsqueezy") {
      const lsPlan = config.lemonsqueezy.plans.find(
        (p) => p.variantId === safeProfile.plan_id,
      );
      return lsPlan?.mode === "subscription";
    }
    const stripePlan = config.stripe.plans.find(
      (p) => p.priceId === safeProfile.plan_id,
    );
    return stripePlan?.mode === "subscription";
  })();
  const membershipEndingDate =
    subscriptionStatus?.cancelAtPeriodEnd && subscriptionStatus.endsAt
      ? new Date(subscriptionStatus.endsAt * 1000).toLocaleDateString(DATE_LOCALE, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

  // For subscriptions: use live Stripe status (catches manual cancellations immediately).
  // For one-time payments: no subscription exists, so fall back to the database flag.
  const effectiveHasAccess =
    subscriptionStatus !== null
      ? subscriptionStatus.liveHasAccess
      : safeProfile.has_access;

  // Only show the plan name when the user actually has active access.
  // A stale plan_id with has_access=false (e.g. after cancellation or a failed
  // provider switch) should show "No active plan" to match the badge state.
  const membershipLabel = effectiveHasAccess
    ? await getMembershipLabel(safeProfile.plan_id, safeProfile.payment_provider)
    : "No active plan";

  return (
    <div className="min-h-screen bg-base-200">
      <header className="border-b border-base-300 bg-base-100">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Logo size={32} className="-m-1.5 p-1.5 text-lg font-semibold" />
          <div className="flex items-center gap-5">
            {config.enableThemeToggle && <ThemeToggle />}
            <ButtonAccount
              user={{
                email: displayEmail,
                name: displayName,
                avatarUrl: displayImage,
              }}
              billingProvider={
                safeProfile.payment_provider === "lemonsqueezy" ? "lemonsqueezy" : "stripe"
              }
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6">
          {config.breadcrumbs.enabled && <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Dashboard" },
          ]} />}
        </div>
        {/* Page heading */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-base-content">Dashboard</h1>
            <p className="mt-1 text-base-content/70">
              Manage your membership, billing, and account settings.
            </p>
          </div>
          <Link
            href="/"
            className="hidden rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content hover:bg-base-200 sm:inline-flex"
          >
            ← Home
          </Link>
        </div>

        {/* Identity card */}
        <section className="mt-10 rounded-3xl bg-base-100 p-8 ring-1 ring-base-300">
          <div className="flex flex-wrap items-center gap-6">
            {displayImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={displayImage}
                alt={displayName ?? "Avatar"}
                className="h-20 w-20 rounded-full object-cover ring-2 ring-base-300"
              />
            ) : (
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-content">
                {initial}
              </span>
            )}
            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold text-base-content">
                {displayName ?? displayEmail ?? "Your account"}
              </h2>
              <p className="truncate text-sm text-base-content/70">
                {displayEmail}
              </p>
              <p className="mt-1 text-xs text-base-content/60">
                Member since {formatDate(safeProfile.created_at)}
              </p>
            </div>

            <div className="ml-auto">
              {effectiveHasAccess ? (
                subscriptionStatus?.cancelAtPeriodEnd ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Active until {membershipEndingDate ?? "period end"}
                  </span>
                ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active membership
                </span>
                )
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-1 text-xs font-semibold text-base-content/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-base-content/40" />
                  No paid plan
                </span>
              )}
            </div>
          </div>

          {effectiveHasAccess && subscriptionStatus?.cancelAtPeriodEnd && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Your subscription is canceled and will remain active until
              {membershipEndingDate ? ` ${membershipEndingDate}` : " the end of the current billing period"}.
            </div>
          )}
        </section>

        {/* Edit form */}
        <section className="mt-8 rounded-3xl bg-base-100 p-8 ring-1 ring-base-300">
          <h2 className="text-lg font-semibold text-base-content">
            Account details
          </h2>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-base-300 pb-6">
            <p className="text-sm text-base-content">
              <span className="font-semibold">Plan:</span> {membershipLabel}
            </p>
            {showBillingPortal && (
              <ButtonBillingPortal
                provider={safeProfile.payment_provider === "lemonsqueezy" ? "lemonsqueezy" : "stripe"}
              />
            )}
          </div>
          <div className="mt-6">
            <ProfileForm
              initialName={displayName ?? ""}
              initialImage={displayImage ?? ""}
              email={displayEmail ?? ""}
            />
          </div>
        </section>

        {/* Close account */}
        <section className="mt-8 rounded-3xl border border-red-200 bg-base-100 p-8">
          <h2 className="text-lg font-semibold text-base-content">
            Close account
          </h2>
          <div className="mt-4">
            <DeleteAccount email={safeProfile.email ?? ""} />
          </div>
        </section>
      </main>
    </div>
  );
}
