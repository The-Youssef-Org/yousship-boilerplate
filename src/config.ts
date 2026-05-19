// Central configuration for the SaaS. Tweak this file to rebrand & resell.
// Keep it serializable so it can be imported from both server and client components.

export type PricingPlan = {
  name: string;
  priceId: string;
  mode?: "payment" | "subscription";
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
  // HERO
  // ---------------------------------------------------------------------------
  hero: {
    // Set false if you want to remove the "Everything pre-wired" stack cards.
    showBottomStack: false,
    // Main showcase panel below CTA: image is optional and can be your SaaS screenshot.
    showcase: {
      kicker: "Product Preview",
      title: "",
      description: "",
      // Example: "/features/your-product-shot.png". Leave empty string to show built-in placeholder mockup.
      imageSrc: "",
      imageAlt: "Product screenshot preview",
      badges: ["Stripe", "Next.js", "Supabase", "Resend", "Tailwind"],
    },
  },

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
        mode: "payment", // "payment" or "subscription"
      },
      {
        name: "Advanced",
        priceId: "price_1TXkPR0fD9L39mCqTM1Yttit",
        mode: "subscription", // "payment" or "subscription"
      },
      {
        name: "Pro",
        priceId: "price_1TXkQC0fD9L39mCqRty3eEMI",
        mode: "payment", // "payment" or "subscription"
      },
    ] as PricingPlan[],
  },

  // ---------------------------------------------------------------------------
  // AUTH
  // ---------------------------------------------------------------------------
  auth: {
    // Set false for pure storefront deployments that should hide auth UI in header.
    showInHeader: true,
    // Where unauthenticated users get sent.
    loginUrl: "/signin",
    // Where authenticated users land after login / from "Get Started" buttons.
    callbackUrl: "/dashboard",
    // The main private area. Used in emails and Stripe success URLs.
    dashboardUrl: "/dashboard",
    // Where guest checkout returns after a successful payment.
    purchaseSuccessUrl: "/purchase-successful",
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