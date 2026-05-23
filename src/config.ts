// Central configuration for the SaaS. Tweak this file to rebrand & resell.
// Keep it serializable so it can be imported from both server and client components.

export type PricingPlan = {
  name: string;
  priceId: string;
  mode?: "payment" | "subscription";
};

export type PricingCard = {
  // Must match one of stripe.plans[].name to connect card -> checkout priceId.
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
  theme: "light",

  // Show a light / dark toggle button in the header.
  // When false: the site always uses `theme` above — no toggle appears.
  // When true:  a sun/moon button appears in the header and visitors can
  //             switch between `lightTheme` and `darkTheme`. Their choice
  //             is saved in localStorage so it survives page refreshes.
  enableThemeToggle: true,
  lightTheme: "light",
  darkTheme: "dark",

  // ---------------------------------------------------------------------------
  // ANNOUNCEMENT BAR
  // ---------------------------------------------------------------------------
  announcementBar: {
    show: false,
    text: "Early bird discount is live: save 20% this week.",
    ctaText: "See pricing",
    ctaHref: "/#pricing",
  },

  // ---------------------------------------------------------------------------
  // HERO
  // ---------------------------------------------------------------------------
  hero: {
    // Set false if you want to remove the "Everything pre-wired" stack cards.
    showBottomStack: false,
    // Main showcase panel below CTA: image is optional and can be your SaaS screenshot.
    showcase: {
      kicker: "Yousship — Next.js SaaS Boilerplate",
      title: "Stop building infrastructure.",
      titleHighlight: "Start shipping product.",
      description:
        "Auth, Stripe, email, and a polished landing page — wired together and ready on day one. Every hour you would have spent on setup is now spent on the thing only you can build.",
      // Primary hero button. `primaryCtaPlanName` must match a plan in `stripe.plans`.
      primaryCtaPlanName: "Advanced",
      // Example: "/features/hero.png". Recommended format: PNG.
      imageSrc: "/features/hero.png",
      imageAlt: "Product screenshot preview",
    },
  },

  // ---------------------------------------------------------------------------
  // SOCIAL PROOF
  // ---------------------------------------------------------------------------
  socialProof: {
    showLogoCloud: true,
    // Set true to force all logos to a professional light-gray style.
    // Set false to keep original logo colors.
    logoCloudUseMonochrome: true,
    // Set true for a continuously rolling logo belt. Set false for static aligned logos.
    logoCloudShouldRoll: true,
    // Add your logo files in /public and reference them below.
    // Best format: SVG. PNG also works.
    // For static logo cloud, there is a limit of up to 5 logos for optimal spacing.
    // Each item needs:
    // - src: path to the logo file in /public (e.g. "/logos/vercel.svg")
    // - scale (optional): per-logo size multiplier if one mark looks too small
    logoCloudItems: [
      { src: "/next.svg" },
      { src: "/supabase.png", scale: 1.15 },
      { src: "/resend.svg" },
      { src: "/stripe.svg", scale: 1.25 },
      { src: "/lemon-squeezy.png", },
    ] as SocialProofLogo[],

    // Compact avatar cluster shown under the hero CTA.
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
  // LEAD MAGNET
  // ---------------------------------------------------------------------------
  // A dedicated section at the bottom of the landing page that captures emails
  // in exchange for a free resource (guide, checklist, template, etc.).
  // The form POSTs to /api/lead — see src/app/api/lead/route.ts to activate it.
  leadMagnet: {
    show: true,
    // Short label shown as a pill above the heading.
    badge: "Stay in the loop",
    heading: "Get the inside track.",
    subheading:
      "Join and be the first to know what we're working on. No spam — just honest updates from the team.",
    // Bullet points shown next to the form. Keep to 3–5 for readability.
    bulletPoints: [],
    // Label on the submit button.
    ctaLabel: "Count me in",
    // Small line shown below the form input.
    formNote: "No spam. Unsubscribe anytime.",
  },

  // ---------------------------------------------------------------------------
  // BREADCRUMBS
  // ---------------------------------------------------------------------------
  // Breadcrumbs improve navigation UX and are strongly recommended for SEO.
  // Search engines use them to understand site structure and generate rich
  // results in SERPs (structured BreadcrumbList data is injected automatically).
  // Only disable if your site is a true single-page experience with no hierarchy.
  breadcrumbs: {
    enabled: true,
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
  // PRICING (DISPLAY COPY)
  // ---------------------------------------------------------------------------
  // Pricing card content is configured here for fast setup and simple maintenance.
  // Stripe remains the billing source of truth through `stripe.plans[].priceId`.
  //
  // Setup workflow:
  // 1) Update plan copy and display values below.
  // 2) Ensure each `planName` matches a plan in `stripe.plans`.
  // 3) Replace `stripe.plans[].priceId` with your Stripe Price IDs.
  //
  // Optional: remove `oldPrice` to hide the strikethrough price.
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
    // Public social links used in the footer.
    // Add/remove any platform by editing this list.
    links: [
      { label: "X", url: "https://x.com/yousship" },
      { label: "GitHub", url: "https://github.com/yousship" },
      { label: "Facebook", url: "https://facebook.com/yousship" },
      { label: "Instagram", url: "https://instagram.com/yousship" },
      { label: "TikTok", url: "https://www.tiktok.com/@yousship" },
    ],
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