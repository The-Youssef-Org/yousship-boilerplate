// Central configuration for the SaaS. Tweak this file to rebrand & resell.
// Keep it serializable so it can be imported from both server and client components.

export type PaymentProvider = "stripe" | "lemonsqueezy";

export type PricingPlan = {
  name: string;
  priceId: string;
  mode?: "payment" | "subscription";
};

export type LemonSqueezyPlan = {
  name: string;
  variantId: string;
  mode?: "payment" | "subscription";
};

export type PricingCard = {
  // Must match a plan name in stripe.plans or lemonsqueezy.plans depending on paymentProvider.
  planName: string;
  eyebrow: string;
  description: string;
  displayPrice: string;
  oldPrice?: string;
  ctaLabel: string;
  features: string[];
  featured?: boolean;
  badge?: string;
};

export type SocialProofLogo = {
  src: string;
  // Optional size multiplier for this logo only. Example: 1.15
  scale?: number;
};

export type StatsCounter = {
  value: string;
  label: string;
  note?: string;
};

export type AvatarGroupMember = {
  src: string;
  alt: string;
};

const appName = "Your App";
const domainName = "yourdomain.com";
const supportEmail = `support@${domainName}`;

const config = {
  // ---------------------------------------------------------------------------
  // BRAND
  // ---------------------------------------------------------------------------
  appName,
  appDescription:
    "The production-ready Next.js foundation for your next SaaS: auth, payments, emails, and SEO included.",
  domainName,
  showWordmark: true, // Set false for icon-only navbar/footer.
  logoUrl: "", // Used in transactional emails. Set an absolute URL, or "" to show app name only.

  // ---------------------------------------------------------------------------
  // THEME
  // ---------------------------------------------------------------------------
  // DaisyUI theme name. Full list: https://daisyui.com/docs/themes/
  theme: "light",
  enableThemeToggle: true, // Show light/dark toggle in header.
  lightTheme: "light",
  darkTheme: "dark",

  // ---------------------------------------------------------------------------
  // ANNOUNCEMENT BAR
  // ---------------------------------------------------------------------------
  announcementBar: {
    show: false,
    text: "Launch week offer: save 20% this week.",
    ctaText: "See pricing",
    ctaHref: "/#pricing",
  },

  // ---------------------------------------------------------------------------
  // HERO
  // ---------------------------------------------------------------------------
  hero: {
    showBottomStack: false,
    showcase: {
      kicker: `${appName} — Next.js SaaS Boilerplate`,
      title: "Stop building infrastructure.",
      titleHighlight: "Start shipping product.",
      description:
        "Auth, Stripe, email, and a polished landing page — wired together and ready on day one. Every hour you would have spent on setup is now spent on the thing only you can build.",
      primaryCtaPlanName: "Advanced", // Must match a plan name in stripe.plans.
      imageSrc: "/features/hero.png",
      imageAlt: "Product screenshot preview",
    },
  },

  // ---------------------------------------------------------------------------
  // SOCIAL PROOF
  // ---------------------------------------------------------------------------
  socialProof: {
    showLogoCloud: true,
    logoCloudUseMonochrome: true, // true = grayscale logos, false = original colors.
    logoCloudShouldRoll: true, // true = rolling belt, false = static row.
    // Add logo files in /public. scale is an optional per-logo size multiplier.
    logoCloudItems: [
      { src: "/next.svg" },
      { src: "/supabase.png", scale: 1.15 },
      { src: "/resend.svg" },
      { src: "/stripe.svg", scale: 1.25 },
      { src: "/lemon-squeezy.png" },
    ] as SocialProofLogo[],
    showAvatarGroup: true,
    avatarGroupText: "Joined by 2,000+ developers.",
    avatarGroupMembers: [
      { src: "https://i.pravatar.cc/100?img=11", alt: "Developer avatar 1" },
      { src: "https://i.pravatar.cc/100?img=12", alt: "Developer avatar 2" },
      { src: "https://i.pravatar.cc/100?img=13", alt: "Developer avatar 3" },
      { src: "https://i.pravatar.cc/100?img=14", alt: "Developer avatar 4" },
      { src: "https://i.pravatar.cc/100?img=15", alt: "Developer avatar 5" },
    ] as AvatarGroupMember[],
  },

  // ---------------------------------------------------------------------------
  // STATS
  // ---------------------------------------------------------------------------
  stats: {
    showSection: true,
    heading: "Proof your product can be trusted.",
    subheading:
      "Use real metrics here to reinforce credibility before visitors reach pricing.",
    items: [
      { value: "10k+", label: "Downloads" },
      { value: "99.9%", label: "Uptime" },
      { value: "24/7", label: "Monitoring" },
      { value: "<2m", label: "Avg setup time", note: "for first local run" },
    ] as StatsCounter[],
  },

  // ---------------------------------------------------------------------------
  // BREADCRUMBS
  // ---------------------------------------------------------------------------
  breadcrumbs: {
    enabled: true,
  },

  // ---------------------------------------------------------------------------
  // PAYMENT PROVIDER
  // ---------------------------------------------------------------------------
  paymentProvider: "stripe" as PaymentProvider, // "stripe" or "lemonsqueezy"

  // ---------------------------------------------------------------------------
  // STRIPE
  // ---------------------------------------------------------------------------
  stripe: {
    webhookEmails: true, // Set false to use Stripe's built-in receipt emails instead.
    // Replace priceIds with your own from Stripe Dashboard → Products.
    plans: [
      {
        name: "Starter", // Must match a card in config.pricing.cards.
        priceId: "price_1TdG661Cz9QfLQqqvLVG6jDI",
        mode: "payment",
      },
      {
        name: "Advanced",
        priceId: "price_1TdG6g1Cz9QfLQqqyp88UCEV",
        mode: "subscription",
      },
      {
        name: "Pro",
        priceId: "price_1TdG761Cz9QfLQqqBS4wu7Rc",
        mode: "payment",
      },
    ] as PricingPlan[],
  },

  // ---------------------------------------------------------------------------
  // LEMON SQUEEZY
  // ---------------------------------------------------------------------------
  lemonsqueezy: {
    webhookEmails: true, // Set false to use LemonSqueezy's built-in emails instead.
    plans: [
      {
        name: "Starter",
        variantId: "1711280",
        mode: "subscription" as const,
      },
      {
        name: "Advanced",
        variantId: "1711293",
        mode: "payment" as const,
      },
      {
        name: "Pro",
        variantId: "1711305",
        mode: "payment" as const,
      },
    ] as LemonSqueezyPlan[],
  },

  // ---------------------------------------------------------------------------
  // PRICING (DISPLAY COPY)
  // ---------------------------------------------------------------------------
  // planName must match a name in stripe.plans (or lemonsqueezy.plans).
  // Remove oldPrice to hide the strikethrough price.
  pricing: {
    heading: "Flexible pricing for every stage.",
    subheading:
      "Mix monthly subscriptions and one-time plans based on what your product needs.",
    cards: [
      {
        planName: "Starter",
        eyebrow: "For your first launch",
        description: "Perfect for solo founders shipping their first SaaS.",
        displayPrice: "$99",
        oldPrice: "$149",
        ctaLabel: "Get Starter",
        features: [
          "Next.js boilerplate",
          "Supabase auth & database",
          "Stripe payments",
          "Email integration",
          "SEO & blog",
        ],
      },
      {
        planName: "Advanced",
        eyebrow: "For growing products",
        description: "For teams that want every advantage on day one.",
        displayPrice: "$149",
        oldPrice: "$249",
        ctaLabel: "Get Advanced",
        featured: true,
        badge: "POPULAR",
        features: [
          "Everything in Starter",
          "Discord community access",
          "Lifetime updates",
          "Premium support",
          "Priority feature requests",
        ],
      },
      {
        planName: "Pro",
        eyebrow: "For serious scale",
        description: "For agencies and product studios.",
        displayPrice: "$299",
        oldPrice: "$449",
        ctaLabel: "Get Pro",
        features: [
          "Everything in Advanced",
          "Unlimited projects & licenses",
          "White-label rights",
          "1-on-1 onboarding call",
          "Dedicated Slack channel",
        ],
      },
    ] as PricingCard[],
  },

  // ---------------------------------------------------------------------------
  // AUTH
  // ---------------------------------------------------------------------------
  auth: {
    showInHeader: true, // Set false to hide auth UI in header (storefront-only sites).
    loginUrl: "/signin",
    callbackUrl: "/dashboard", // Where users land after login.
    dashboardUrl: "/dashboard",
    purchaseSuccessUrl: "/purchase-successful",
  },

  // ---------------------------------------------------------------------------
  // SOCIAL
  // ---------------------------------------------------------------------------
  social: {
    links: [
      { label: "X", url: "https://x.com/yourhandle" },
      { label: "GitHub", url: "https://github.com/yourhandle" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/yourcompany" },
    ],
  },

  // ---------------------------------------------------------------------------
  // CONTACT
  // ---------------------------------------------------------------------------
  mail: {
    supportEmail,
    fromAdmin: `${appName} <onboarding@resend.dev>`, // Replace with a verified sender domain before launch.
    replyTo: supportEmail,
  },
} as const;

export default config;