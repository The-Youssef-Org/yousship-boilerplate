// Central configuration for the SaaS. Tweak this file to rebrand & resell.
// Keep it serializable so it can be imported from both server and client components.

export type PricingPlan = {
  name: string;
  priceId: string;
};

const config = {
  // ---------------------------------------------------------------------------
  // BRAND
  // ---------------------------------------------------------------------------
  appName: "Yousship",
  appDescription:
    "The production-ready Next.js foundation for your next SaaS — auth, payments, emails and SEO included.",
  domainName: "yousship.com",
  // Set to false to show only the icon in the navbar and footer.
  showWordmark: true,

  // ---------------------------------------------------------------------------
  // THEME
  // ---------------------------------------------------------------------------
  // Active DaisyUI theme. Change this string to instantly re-skin the whole
  // app. Must match a theme enabled in `globals.css` (`@plugin "daisyui"`).
  // Common picks: "light", "dark", "corporate", "synthwave", "dracula",
  // "luxury", "night", "nord", "sunset", "emerald", "cyberpunk".
  // Full list: https://daisyui.com/docs/themes/
  theme: "dark",

  // ---------------------------------------------------------------------------
  // STRIPE
  // ---------------------------------------------------------------------------
  stripe: {
    // Replace these priceIds with your own from Stripe Dashboard → Products.
    // Use Test Mode price IDs locally, Live Mode IDs in production.
    plans: [
      {
        name: "Starter",
        priceId: "price_1TX39Y0fD9L39mCqR6S3ELWH",
      },
      {
        name: "Advanced",
        priceId: "price_1TXkPR0fD9L39mCqTM1Yttit",
      },
      {
        name: "Pro",
        priceId: "price_1TXkQC0fD9L39mCqRty3eEMI",
      },
    ] as PricingPlan[],
  },

  // ---------------------------------------------------------------------------
  // AUTH
  // ---------------------------------------------------------------------------
  auth: {
    // Where unauthenticated users get sent.
    loginUrl: "/signin",
    // Where authenticated users land after login / from "Get Started" buttons.
    callbackUrl: "/",
    // The main private area. Used in emails and Stripe success URLs.
    dashboardUrl: "/dashboard",
  },

  // ---------------------------------------------------------------------------
  // SOCIAL
  // ---------------------------------------------------------------------------
  social: {
    // Your public social links. Used in the footer. Remove or leave empty if not applicable.
    twitter: "https://twitter.com/yousship",
    github: "https://github.com/yousship",
  },

  // ---------------------------------------------------------------------------
  // CONTACT
  // ---------------------------------------------------------------------------
  mail: {
    supportEmail: "support@yousship.com",
    // Must match a verified sender domain in Resend (e.g. "Acme <hello@mail.yourdomain.com>").
    // Do NOT use onboarding@resend.dev in production — emails will be rejected.
    fromAdmin: "Yousship <onboarding@resend.dev>",
    // Replies to your emails will go here. Can be the same as supportEmail.
    replyTo: "support@yousship.com",
  },
} as const;

export default config;