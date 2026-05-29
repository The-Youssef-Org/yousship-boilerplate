import {
  lemonSqueezySetup,
  createCheckout,
  getCustomer,
  getSubscription,
  listSubscriptions,
  type NewCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";

const setup = () => {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) throw new Error("LEMONSQUEEZY_API_KEY is not set");
  lemonSqueezySetup({ apiKey });
};

export const createLemonSqueezyCheckout = async ({
  variantId,
  redirectUrl,
  userId,
  email,
}: {
  variantId: string;
  redirectUrl: string;
  userId?: string;
  email?: string;
}): Promise<string | null> => {
  setup();

  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  if (!storeId) throw new Error("LEMONSQUEEZY_STORE_ID is not set");

  const newCheckout: NewCheckout = {
    productOptions: {
      redirectUrl,
    },
    checkoutData: {
      email,
      custom: userId ? { user_id: userId } : undefined,
    },
  };

  const { data, error } = await createCheckout(storeId, variantId, newCheckout);
  if (error) throw error;
  return data?.data.attributes.url ?? null;
};

export const getLemonSqueezySubscriptionVariantId = async (
  subscriptionId: string,
): Promise<string | null> => {
  setup();
  const { data, error } = await getSubscription(subscriptionId);
  if (error || !data) return null;
  return String(data.data.attributes.variant_id);
};

/**
 * Fetch live subscription status for a user, mirroring what getSubscriptionStatus does
 * for Stripe. Only meaningful for subscription-mode plans.
 */
export const getLSSubscriptionStatus = async (
  email: string,
): Promise<{ cancelAtPeriodEnd: boolean; endsAt: number | null; liveHasAccess: boolean } | null> => {
  setup();

  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const { data, error } = await listSubscriptions({
    filter: {
      userEmail: email,
      ...(storeId ? { storeId } : {}),
    },
  });

  if (error || !data?.data?.length) return null;

  // Prefer active/trialing first, then cancelled (still in grace period), then any.
  const sub =
    data.data.find((s) =>
      s.attributes.status === "active" || s.attributes.status === "on_trial",
    ) ??
    data.data.find((s) => s.attributes.status === "cancelled") ??
    data.data[0];

  if (!sub) return null;

  const { status, cancelled, ends_at } = sub.attributes;
  const endsAt = ends_at ? Math.floor(new Date(ends_at).getTime() / 1000) : null;

  return {
    // cancelled === true means "cancel at period end" — still active until ends_at
    cancelAtPeriodEnd: cancelled,
    endsAt,
    liveHasAccess: status === "active" || status === "on_trial" || status === "cancelled",
  };
};

export const createLemonSqueezyCustomerPortal = async ({
  customerId,
}: {
  customerId: string;
}): Promise<string | null> => {
  setup();

  const { data, error } = await getCustomer(customerId);
  if (error) throw error;
  return data?.data.attributes.urls.customer_portal ?? null;
};
