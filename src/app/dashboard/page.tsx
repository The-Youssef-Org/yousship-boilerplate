import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";
import Logo from "@/components/Logo";
import stripe from "@/libs/stripe";
import ButtonAccount from "@/components/ButtonAccount";
import ButtonBillingPortal from "@/components/ButtonBillingPortal";
import ProfileForm from "./ProfileForm";
import DeleteAccount from "./DeleteAccount";
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

const getMembershipLabel = async (priceId: string | null) => {
  if (!priceId) return "No active plan";

  const planName = config.stripe.plans.find((p) => p.priceId === priceId)?.name ?? "Custom";

  try {
    const price = await stripe.prices.retrieve(priceId);

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
};

const getSubscriptionStatus = async (
  customerId: string | null,
  priceId: string | null,
): Promise<SubscriptionStatus | null> => {
  if (!customerId) return null;

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      limit: 10,
    });

    // Prefer the profile-linked price when available; otherwise fall back to the
    // most relevant non-canceled subscription for this customer.
    const matchingByPrice = priceId
      ? subscriptions.data.find((sub) =>
          sub.items.data.some((item) => item.price.id === priceId),
        )
      : null;

    const matchingActive = subscriptions.data.find(
      (sub) => sub.status === "active" || sub.status === "trialing" || sub.cancel_at_period_end,
    );

    const matching = matchingByPrice ?? matchingActive ?? subscriptions.data[0] ?? null;

    if (!matching) return null;

    return {
      cancelAtPeriodEnd: matching.cancel_at_period_end,
      endsAt: matching.cancel_at ?? matching.current_period_end ?? null,
    };
  } catch {
    return null;
  }
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(config.auth.loginUrl);

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  // The trigger should always create a row, but stay defensive.
  const safeProfile: Profile =
    profile ?? {
      id: user.id,
      name: null,
      email: user.email ?? null,
      image: null,
      customer_id: null,
      price_id: null,
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
  const membershipLabel = await getMembershipLabel(safeProfile.price_id);
  const subscriptionStatus = await getSubscriptionStatus(
    safeProfile.customer_id,
    safeProfile.price_id,
  );
  const membershipEndingDate =
    subscriptionStatus?.cancelAtPeriodEnd && subscriptionStatus.endsAt
      ? new Date(subscriptionStatus.endsAt * 1000).toLocaleDateString(DATE_LOCALE, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

  return (
    <div className="min-h-screen bg-base-200">
      <header className="border-b border-base-300 bg-base-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Logo size={28} />
          <ButtonAccount
            user={{
              email: displayEmail,
              name: displayName,
              avatarUrl: displayImage,
            }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
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
              {safeProfile.has_access ? (
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

          {safeProfile.has_access && subscriptionStatus?.cancelAtPeriodEnd && (
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
            {(safeProfile.customer_id || safeProfile.has_access) && <ButtonBillingPortal />}
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
