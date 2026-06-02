// -------------------------------------------------------------------------
// HOW TO ADD A BLOG POST
// -------------------------------------------------------------------------
// 1. Add a new entry to the `articles` array below.
// 2. The `content` field renders as HTML — use <p>, <h2>, <ul>, <li>,
//    <strong>, <a>, <code>, <pre>, <blockquote>, etc.
//    @tailwindcss/typography handles all the styling automatically.
// 3. `author` is inline — no need to reference a separate array.
// 4. `tags` are simple strings shown as labels on the card.
// 5. Place cover images in /public/blog/ and reference as "/blog/file.png".
// -------------------------------------------------------------------------

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601, e.g. "2026-05-17"
  cover?: string; // e.g. "/blog/my-cover.png"
  author: {
    name: string;
    role?: string;
    avatar?: string; // URL — omit to show a generated initial
  };
  tags: string[]; // Simple labels, e.g. ["launch", "saas"]
  content: string; // HTML
};

export const articles: BlogArticle[] = [
  {
    slug: "how-to-launch-a-saas-in-a-weekend",
    title: "SaaS Boilerplate: How to Launch a Product in a Weekend",
    description:
      "A practical launch playbook using a SaaS boilerplate to go from idea to first payment in 48 hours.",
    date: "2025-12-01",
    cover: "/blog/launch-weekend.png",
    author: { name: "Your Name", role: "Founder" },
    tags: ["launch", "saas boilerplate", "nextjs boilerplate"],
    content: `<p>If you want to ship fast, a <strong>SaaS boilerplate</strong> is often the highest-leverage decision you can make. Instead of spending your first week wiring auth, billing, email, and SEO, you can focus on your offer and customer problem.</p>

<p>This guide shows a realistic 48-hour plan to launch with a <strong>Next.js boilerplate</strong> and reach your first payment quickly.</p>

<h2>Friday evening: define one painful problem</h2>
<p>Write one sentence that finishes: <em>"This product helps [specific user] do [specific outcome] without [specific pain]."</em> Keep it narrow. Broad ideas kill launch speed.</p>

<h2>Saturday morning: ship one complete flow</h2>
<p>Build only one path: landing page → sign-in → core action → checkout. Skip dashboards, settings, and edge-case polish until after launch feedback.</p>
<ul>
  <li>Use your boilerplate's auth exactly as provided</li>
  <li>Connect one Stripe price and test checkout end-to-end</li>
  <li>Send one transactional email for confidence and trust</li>
</ul>

<h2>Saturday afternoon: publish conversion-first copy</h2>
<p>Your homepage should answer: who this is for, what result they get, and why this is faster than alternatives. Keep design clean, but prioritize clarity over decoration.</p>

<h2>Sunday: launch where your users already are</h2>
<p>Post your product where your target audience lives. Share a clear before/after outcome, one screenshot, and a direct CTA. You are not trying to go viral; you are trying to get qualified clicks.</p>

<h2>Why this works</h2>
<p>A good SaaS boilerplate removes implementation drag from non-differentiating work. You still need distribution, positioning, and proof, but your first launch loop gets dramatically shorter.</p>

<p>If your goal is speed-to-revenue, this is usually the fastest path: <strong>validate first, expand second</strong>.</p>`,
  },
  {
    slug: "stripe-checkout-in-nextjs",
    title: "Next.js Boilerplate + Stripe: Production-Ready Payments Guide",
    description:
      "How to implement Stripe Checkout in a Next.js boilerplate with webhooks, portal access, and secure provisioning.",
    date: "2025-11-12",
    cover: "/blog/stripe-nextjs.png",
    author: { name: "Your Name", role: "Founder" },
    tags: ["payments", "nextjs boilerplate", "stripe"],
    content: `<p>Most teams searching for a <strong>Next.js boilerplate</strong> care about one thing: shipping revenue quickly and safely. Payments are where fast projects often break in production. This guide covers the minimum robust setup.</p>

<h2>1. Keep checkout creation server-side</h2>
<p>Create Stripe Checkout sessions in your backend route handler only. Never trust a client-defined amount or product payload.</p>

<h2>2. Map plans to Stripe Price IDs</h2>
<p>Store display copy in config, but use Stripe Price IDs as billing truth. This gives you flexible pricing pages while keeping charge amounts authoritative.</p>

<h2>3. Verify webhook signatures</h2>
<p>Always verify the <code>stripe-signature</code> header before processing events. Signature verification is non-negotiable for production security.</p>

<h2>4. Provision access on webhook events</h2>
<p>Grant product access on <code>checkout.session.completed</code> (and subscription lifecycle events), not on the client redirect. Redirects can be interrupted; webhooks are the reliable source.</p>

<h2>5. Reuse customer records</h2>
<p>Attach checkout to an existing Stripe customer when available. This prevents duplicate customer records and improves billing management.</p>

<h2>6. Offer self-serve billing portal</h2>
<p>Use Stripe Customer Portal so users can update payment methods, cancel, or switch plans without manual support overhead.</p>

<p>If your goal is a production-ready stack, this is where a strong SaaS boilerplate helps most: fewer billing bugs, faster launch, and cleaner upgrade paths.</p>`,
  },
  {
    slug: "supabase-auth-cheatsheet",
    title: "Best Next.js Boilerplate Stack: Supabase Auth Implementation Guide",
    description:
      "A practical Supabase auth guide for modern SaaS apps: OAuth, magic links, server sessions, and route protection.",
    date: "2025-10-20",
    cover: "/blog/supabase-auth.png",
    author: { name: "Your Name", role: "Founder" },
    tags: ["auth", "supabase", "saas boilerplate", "nextjs boilerplate"],
    content: `<p>When people evaluate the <strong>best Next.js boilerplate</strong>, auth quality is usually the deciding factor. A polished sign-in flow improves trust, conversion, and retention from day one.</p>

<h2>Use the right client in the right place</h2>
<p>Use the browser client in client components and the server client in route handlers, server actions, and server components. Mixing these causes subtle session bugs.</p>

<h2>Refresh sessions consistently</h2>
<p>Supabase tokens rotate. Middleware should keep sessions fresh so protected pages stay reliable for authenticated users.</p>

<h2>Protect at the layout level</h2>
<p>Guard entire private route groups in a layout instead of repeating checks in every page. This improves maintainability and avoids access gaps.</p>

<h2>Prefer getUser for trusted checks</h2>
<p><code>getUser()</code> validates token state with Supabase; <code>getSession()</code> is not sufficient for security-sensitive access decisions.</p>

<h2>Configure redirect URLs early</h2>
<p>Add every auth callback URL in your Supabase project settings before launch. Most OAuth and magic-link production issues come from missing allowlist entries.</p>

<p>For SaaS teams, auth is not just a technical checkbox. It is part of your conversion funnel. A solid boilerplate implementation helps you ship faster without compromising security.</p>`,
  },
];
