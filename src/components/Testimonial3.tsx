// Three editorial testimonial cards with different emphasis.
const items = [
  {
    quote: "The project started feeling real the moment I stopped scaffolding and started shipping.",
    name: "Tom Wilson",
    role: "Solo founder",
    avatar: "https://i.pravatar.cc/100?img=11",
    tone: "from-base-200 to-base-100",
  },
  {
    quote: "Payments, auth, and the blog were already in place. That changed the pace completely.",
    name: "Priya Shah",
    role: "Indie hacker",
    avatar: "https://i.pravatar.cc/100?img=22",
    tone: "from-primary/15 to-base-100",
  },
  {
    quote: "The whole thing reads like a finished product, not a pile of starter files.",
    name: "Marc Johansson",
    role: "Designer turned dev",
    avatar: "https://i.pravatar.cc/100?img=33",
    tone: "from-secondary/15 to-base-100",
  },
];

const Testimonial3 = () => {
  return (
    <section className="bg-base-100 px-8 py-24">
      <div className="mx-auto max-w-7xl">
      <div className="mb-10 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
          Different founders, same result: they shipped sooner.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.name}
            className={`rounded-[1.75rem] border border-base-content/10 bg-gradient-to-b ${t.tone} p-6`}
          >
            <div className="mb-5 flex gap-0.5 text-amber-400" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.951.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-base leading-relaxed text-base-content">“{t.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-base-content/10 pt-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-2xl object-cover" />
              <div>
                <div className="text-sm font-semibold text-base-content">
                  {t.name}
                </div>
                <div className="text-xs text-base-content/60">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Testimonial3;
