// Rollercoaster-style testimonial section with staggered cards.
const entries = [
  {
    quote: "I finally stopped patching together starter files and just launched.",
    name: "Sara Chen",
    role: "Founder, LaunchKit",
    avatar: "https://i.pravatar.cc/100?img=32",
    tone: "from-base-200 to-base-100",
  },
  {
    quote: "The product felt lighter immediately. Less setup, more momentum.",
    name: "Tom Wilson",
    role: "Solo founder",
    avatar: "https://i.pravatar.cc/100?img=22",
    tone: "from-primary/15 to-base-100",
  },
  {
    quote: "Our first paid users came faster because the launch page was already there.",
    name: "Priya Shah",
    role: "Indie hacker",
    avatar: "https://i.pravatar.cc/100?img=47",
    tone: "from-secondary/15 to-base-100",
  },
];

const TestimonialRollercoaster = () => {
  return (
    <section className="relative overflow-hidden bg-base-100">
      <div className="absolute inset-x-0 top-8 h-px bg-gradient-to-r from-transparent via-base-content/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
            Momentum becomes obvious once the first launch lands.
          </h2>
        </div>

        <div className="relative">
          <svg
            viewBox="0 0 1200 260"
            className="absolute inset-x-0 top-0 hidden h-[260px] w-full lg:block"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M40 178C170 58 290 58 410 128C520 190 640 198 760 106C875 20 995 30 1160 154"
              stroke="url(#track-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="track-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#6366F1" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid gap-5 lg:grid-cols-3 lg:items-start">
            {entries.map((entry, index) => (
              <figure
                key={entry.name}
                className={`relative overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-sm ${
                  index === 1 ? "lg:mt-16" : index === 2 ? "lg:mt-6" : "lg:mt-0"
                }`}
              >
                <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-b ${entry.tone}`} />
                <div className="relative z-10 mb-5 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={entry.avatar} alt={entry.name} className="h-12 w-12 rounded-2xl object-cover" />
                  <div>
                    <div className="font-semibold text-base-content">{entry.name}</div>
                    <div className="text-sm text-base-content/60">{entry.role}</div>
                  </div>
                </div>
                <blockquote className="relative z-10 text-lg font-medium leading-snug text-base-content">
                  “{entry.quote}”
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialRollercoaster;