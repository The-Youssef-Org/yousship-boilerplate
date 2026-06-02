import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY. Set it in your environment before using Stripe routes.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});

export default stripe;
