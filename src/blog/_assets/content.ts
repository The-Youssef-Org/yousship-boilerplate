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
    title: "How to launch a SaaS in a weekend",
    description:
      "A step-by-step playbook from idea to first paying customer in 48 hours.",
    date: "2025-12-01",
    cover: "/blog/launch-weekend.svg",
    author: { name: "Youssef Benarab", role: "Founder" },
    tags: ["launch"],
    content: `<p>Shipping a SaaS in a weekend sounds insane — until you strip the project down to the three things that actually matter: a sharp problem statement, a single happy path, and a payment link.</p>

<p>This post walks through the exact 48-hour schedule we use to go from a Notion doc on Friday night to a real Stripe charge on Sunday evening.</p>

<h2>Friday night: scope ruthlessly</h2>
<p>Write one sentence that finishes: <em>"A tool that lets [person] do [thing] without [pain]."</em> If you can't write it, you're not ready to build. Sleep on it.</p>

<h2>Saturday: the single happy path</h2>
<p>Build only the journey from sign-up → core action → success state. Cut everything else. No settings page, no onboarding flow, no admin panel.</p>
<ul>
  <li>Pick a stack you already know — this is not the weekend to learn something new</li>
  <li>Hard-code the first version — real users will tell you what to parameterize</li>
  <li>Add Stripe Checkout before you go to sleep — <strong>this is the most important step</strong></li>
</ul>

<h2>Sunday: launch and charge</h2>
<p>Post to the communities where your users already hang out. Frame the launch as a story, not a feature list. People share stories.</p>

<p>By the end of Sunday you should have at least one Stripe payment notification in your inbox. If you don't, you've learned something invaluable about the problem or the audience — and it only cost you a weekend.</p>`,
  },
  {
    slug: "stripe-checkout-in-nextjs",
    title: "Stripe Checkout in Next.js, the right way",
    description:
      "Webhooks, idempotency, customer portal — everything you need.",
    date: "2025-11-12",
    cover: "/blog/stripe-nextjs.svg",
    author: { name: "Youssef Benarab", role: "Founder" },
    tags: ["payments"],
    content: `<p>Stripe Checkout is the fastest way to start collecting money, but most tutorials stop after showing you how to create a session. Here's everything they skip.</p>

<h2>1. Create the Checkout Session</h2>
<p>Call Stripe server-side from a Route Handler. Never expose your secret key to the client.</p>
<pre><code>const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: priceId, quantity: 1 }],
  success_url: \`\${process.env.NEXT_PUBLIC_SITE_URL}/dashboard\`,
  cancel_url: \`\${process.env.NEXT_PUBLIC_SITE_URL}/#pricing\`,
  customer_creation: "always",
  metadata: { userId },
});</code></pre>

<h2>2. Verify webhooks — always</h2>
<p>Your webhook endpoint must verify the <code>stripe-signature</code> header. Without this, anyone can fake a successful payment.</p>
<pre><code>const event = stripe.webhooks.constructEvent(
  body,
  sig,
  process.env.STRIPE_WEBHOOK_SECRET
);</code></pre>

<h2>3. Handle <code>checkout.session.completed</code></h2>
<p>When the event fires, grant access in your database. This is the only place you should unlock features — not on redirect from the success URL.</p>

<h2>4. Customer portal for self-serve billing</h2>
<p>Create a Billing Portal session so users can upgrade, downgrade, or cancel without contacting you. One endpoint, zero support tickets.</p>`,
  },
  {
    slug: "supabase-auth-cheatsheet",
    title: "The Supabase auth cheatsheet",
    description:
      "Magic links, OAuth, server sessions and protected routes in one page.",
    date: "2025-10-20",
    cover: "/blog/supabase-auth.svg",
    author: { name: "Youssef Benarab", role: "Founder" },
    tags: ["auth", "supabase"],
    content: `<p>Supabase auth gives you magic links, OAuth, and password flows out of the box. Here's the implementation detail that trips people up every time.</p>

<h2>Browser vs server clients</h2>
<p>Use <code>createBrowserClient</code> in Client Components and <code>createServerClient</code> in Server Components, Route Handlers, and Server Actions. Never use the browser client on the server — it won't have the user's session.</p>

<h2>Cookie/session refresh</h2>
<p>Supabase uses short-lived JWTs. The middleware must refresh them on every request, otherwise server components will see a stale (or missing) session even though the user is logged in.</p>

<h2>Route protection</h2>
<p>Protect entire route groups with a layout — not individual pages. One <code>layout.tsx</code> that calls <code>supabase.auth.getUser()</code> and redirects if there's no session is enough.</p>

<blockquote>
  <strong>Always use <code>getUser()</code>, not <code>getSession()</code></strong> — <code>getUser()</code> re-validates the token with Supabase on every call. <code>getSession()</code> reads from the cookie only and can be spoofed.
</blockquote>

<h2>Redirect URL gotcha</h2>
<p>Add your <code>callbackUrl</code> (e.g. <code>https://yourapp.com/api/auth/callback</code>) to the <em>Redirect URLs</em> allowlist in the Supabase dashboard. Without this, OAuth and magic link flows will fail in production with a cryptic error.</p>`,
  },
];
