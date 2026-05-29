import Stripe from "stripe";

// Fall back to a placeholder so the module loads even without a Stripe key.
// All API calls are wrapped in try/catch in their callers, so a missing key
// results in a graceful fallback (e.g. "Custom (Paid)") rather than a page crash.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_not_configured", {
  apiVersion: "2025-04-30.basil",
  typescript: true,
});

export default stripe;
