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
    "Your App gives teams one place to manage everything that matters — without the complexity that slows you down.",
  domainName,
  showWordmark: true, // Set false for icon-only navbar/footer.
  logoUrl: "", // Path to your logo. Relative ("/logo.png") or absolute ("https://...") — both work for the website and emails.

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

    showcase: {
      kicker: `${appName} — Built for the way you work`,
      title: "The last tool",
      titleHighlight: "you'll ever need.",
      description:
        "Stop stitching together workarounds. Your App handles the hard parts so you can focus on what actually moves your business forward.",
      primaryCtaPlanName: "Advanced", // Must match a plan name in stripe.plans.
      imageSrc: "/features/hero.png",
      imageAlt: "Product screenshot preview",
    },
  },

  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // LOGO CLOUD
  // ---------------------------------------------------------------------------
  logoCloud: {
    show: true,
    useMonochrome: true, // true = grayscale logos, false = original colors.
    shouldRoll: true, // true = rolling belt, false = static row.
    // Add logo files in /public or use external URLs. scale is an optional per-logo size multiplier.
    items: [
      { src: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/spotify.svg", scale: 1.2 },
      { src: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/microsoft.svg" },
      { src: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/supabase.svg", scale: 1.1 },
      { src: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/stripe.svg" },
      { src: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/linkedin.svg" },
    ] as SocialProofLogo[],
  },

  // ---------------------------------------------------------------------------
  // AVATAR GROUP
  // ---------------------------------------------------------------------------
  avatarGroup: {
    show: true,
    text: "Loved by 2,000+ teams worldwide.",
    members: [
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
    heading: "Numbers that speak for themselves.",
    subheading:
      "Real results from real customers. Add your own metrics here.",
    items: [
      { value: "10k+", label: "Active users" },
      { value: "99.9%", label: "Uptime" },
      { value: "4.9★", label: "Avg. rating" },
      { value: "< 2h", label: "Support response" },
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
        variantId: "",
        mode: "subscription" as const,
      },
      {
        name: "Advanced",
        variantId: "",
        mode: "payment" as const,
      },
      {
        name: "Pro",
        variantId: "",
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
    heading: "Simple, honest pricing.",
    subheading:
      "No surprises. Choose the plan that fits your team today and upgrade as you grow.",
    cards: [
      {
        planName: "Starter",
        eyebrow: "For individuals",
        description: "Everything you need to get started and start seeing value fast.",
        displayPrice: "$99",
        oldPrice: "$149",
        ctaLabel: "Get Starter",
        features: [
          "Core product features",
          "Up to 3 projects",
          "Basic analytics",
          "Email support",
          "1 user seat",
        ],
      },
      {
        planName: "Advanced",
        eyebrow: "For growing teams",
        description: "More power and flexibility as your product and team scale up.",
        displayPrice: "$149",
        oldPrice: "$249",
        ctaLabel: "Get Advanced",
        featured: true,
        badge: "POPULAR",
        features: [
          "Everything in Starter",
          "Unlimited projects",
          "Advanced analytics",
          "Priority support",
          "5 user seats",
        ],
      },
      {
        planName: "Pro",
        eyebrow: "For organisations",
        description: "Full control, unlimited scale, and dedicated support for larger operations.",
        displayPrice: "$299",
        oldPrice: "$449",
        ctaLabel: "Get Pro",
        features: [
          "Everything in Advanced",
          "Unlimited user seats",
          "Custom integrations",
          "1-on-1 onboarding",
          "Dedicated support channel",
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