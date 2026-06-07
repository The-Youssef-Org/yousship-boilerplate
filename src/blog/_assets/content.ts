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
    slug: "how-to-build-workflows-that-actually-stick",
    title: "How to Build Workflows That Actually Stick",
    description:
      "Most processes fall apart within weeks. Here is how to design workflows your team will follow without being reminded.",
    date: "2026-05-20",
    cover: "/blog/workflows.png",
    author: { name: "Your Name", role: "Founder" },
    tags: ["productivity", "workflow", "teams"],
    content: `<p>Most teams do not struggle because they lack processes. They struggle because the processes they have are too complicated, too manual, or too easy to skip. A workflow that sticks is not the most thorough one — it is the one with the least friction.</p>

<h2>Start with what people already do</h2>
<p>The fastest way to get adoption is to build on existing habits rather than replacing them. Map what your team actually does today — not what the process document says — and look for the natural checkpoints where a new step would fit without disrupting flow.</p>

<h2>Remove every optional step</h2>
<p>If a step is optional, it will eventually be skipped. Make your core workflow contain only the steps that are genuinely required. Move everything else out of the critical path and into a separate reference or checklist that people can use when needed.</p>

<h2>Make the right action the easiest action</h2>
<p>Workflows break down when the correct path is harder than the shortcut. If logging a decision takes three clicks, people will stop logging decisions. Design your process so the default, no-effort action is also the correct one.</p>

<h2>Review it after 30 days</h2>
<p>No workflow survives first contact with reality unchanged. Build in a 30-day review from the start. Ask the people doing the work — not just the managers overseeing it — where the friction is. Then remove it.</p>

<h2>Automate the reminders, not the thinking</h2>
<p>Automation works best on the mechanical parts: notifications, status updates, handoffs. The judgment calls — prioritisation, communication, escalation — should stay with people. Automating the wrong things creates the illusion of a working process while the real work falls through the cracks.</p>

<p>The best workflow is one your team runs without being asked. That only happens when it makes their job easier, not harder.</p>`,
  },
  {
    slug: "making-better-decisions-with-the-data-you-already-have",
    title: "Making Better Decisions With the Data You Already Have",
    description:
      "You probably have more useful information than you think. The problem is usually how it is being used.",
    date: "2026-04-08",
    cover: "/blog/data-decisions.png",
    author: { name: "Your Name", role: "Founder" },
    tags: ["data", "decision-making", "productivity"],
    content: `<p>Teams rarely fail because they lack data. They fail because the data they have is scattered, inconsistently tracked, or never actually consulted when decisions get made. Before investing in more data collection, it is worth asking: are you using what you already have?</p>

<h2>Identify the three numbers that matter most</h2>
<p>Every business has dozens of metrics but only a handful that actually predict outcomes. Identify the three numbers that, if they moved in the right direction, would tell you the business is healthy. Make those visible to everyone and review them consistently.</p>

<h2>Separate lagging from leading indicators</h2>
<p>Revenue is a lagging indicator — it tells you what already happened. Leading indicators tell you what is about to happen. The goal is to track both, but act on the leading ones early enough to change the outcome.</p>

<h2>Make data part of the conversation, not a separate report</h2>
<p>If the data lives in a report that gets sent on Friday and ignored by Monday, it is not influencing decisions. Bring the relevant numbers into the actual conversations where decisions get made — stand-ups, reviews, planning sessions.</p>

<h2>Question the trend, not just the number</h2>
<p>A metric that looks good in isolation can be misleading. Always ask: is this improving, declining, or flat? Over what period? Compared to what? A number without context creates false confidence.</p>

<h2>Act on what you find</h2>
<p>The biggest waste of data is collecting it, reviewing it, and then doing nothing. Every insight should lead to a decision or be explicitly deferred. If you are regularly reviewing data without it changing anything, either the data is wrong or the review process is broken.</p>

<p>Better decisions come from clearer questions, not more dashboards. Start with the question you are trying to answer, then find the data that answers it.</p>`,
  },
  {
    slug: "the-real-cost-of-context-switching",
    title: "The Real Cost of Context Switching",
    description:
      "Every time your team switches tasks, something gets lost. Here is how to reduce the damage without slowing everything down.",
    date: "2026-03-15",
    cover: "/blog/context-switching.png",
    author: { name: "Your Name", role: "Founder" },
    tags: ["productivity", "focus", "teams"],
    content: `<p>Context switching does not just feel disruptive — it has a measurable cost. Research consistently shows that switching between tasks takes more cognitive energy than the tasks themselves. For teams doing knowledge work, this adds up fast.</p>

<h2>The hidden cost is in the recovery time</h2>
<p>It is not the moment of switching that costs you — it is the time it takes to get back into deep focus after the switch. That recovery period averages 15 to 20 minutes. If your team is switching context four times a day, you are losing an hour or more of productive time per person, every day.</p>

<h2>Interruptions are the main driver</h2>
<p>Most context switching is not planned — it is triggered by a message, a meeting, or a question that could have waited. The fix is not to eliminate communication, but to batch it. Designated response windows, asynchronous-first culture, and clear signals for "I am in focus mode" make a significant difference.</p>

<h2>Meetings are the highest-cost switch</h2>
<p>A 30-minute meeting mid-morning does not cost 30 minutes — it costs the focus block before it (people stop going deep knowing the interruption is coming) and the recovery time after it. Cluster meetings at the edges of the day and protect the middle for deep work.</p>

<h2>Reduce the number of active projects per person</h2>
<p>The more workstreams someone is juggling simultaneously, the more context they are managing in parallel. Reducing work in progress — even by one project — often increases throughput because people can go deeper on fewer things.</p>

<h2>Make the next step obvious</h2>
<p>A lot of context switching happens because people finish one task and then spend time figuring out what to do next. If the next action is always clear and immediately actionable, the friction between tasks drops and the tendency to drift toward distractions decreases.</p>

<p>You cannot eliminate context switching entirely, but reducing it by even 20% has a compounding effect on output quality, speed, and team morale.</p>`,
  },
];
