// Five-tile mosaic that feels more like an editorial collage than a wall.
type T = { quote: string; name: string; role: string; avatar: string; span?: string; tone?: string };

const items: T[] = Array.from({ length: 11 }).map((_, i) => ({
  quote: [
    "Exactly what we needed. Nothing more, nothing less.",
    "From sign-up to first result faster than any tool we've tried.",
    "We replaced three tools with this and the team is happier.",
    "The simplest onboarding we've ever shipped.",
    "Looks polished out of the box. Clients noticed immediately.",
    "Our team actually uses it, which says everything.",
    "Saved us weeks of back-and-forth. Just works.",
    "Set it up on a Friday, showed the team Monday. Done.",
    "The support alone made it worth it.",
    "Clean, fast, and does exactly what it promises.",
    "We actually finish things now.",
  ][i],
  name: [
    "Chris H.",
    "Isabel F.",
    "Lucas B.",
    "Aisha K.",
    "Ben C.",
    "Lina O.",
    "Daniel K.",
    "Mia P.",
    "Jonas R.",
    "Eva L.",
    "Omar T.",
  ][i],
  role: [
    "Founder",
    "Product manager",
    "Solo founder",
    "Design lead",
    "Engineering lead",
    "Head of growth",
    "CTO",
    "Operations lead",
    "Co-founder",
    "Product lead",
    "Solo founder",
  ][i],
  avatar: `https://i.pravatar.cc/100?img=${[15, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27][i]}`,
  span: [
    "md:col-span-2",
    "",
    "",
    "",
    "md:col-span-2",
    "",
    "",
    "",
    "",
    "",
    "",
  ][i],
  tone: [
    "from-base-200 to-base-100",
    "from-primary/15 to-base-100",
    "from-secondary/15 to-base-100",
    "from-accent/15 to-base-100",
    "from-info/15 to-base-100",
    "from-base-200 to-base-100",
    "from-primary/15 to-base-100",
    "from-secondary/15 to-base-100",
    "from-accent/15 to-base-100",
    "from-info/15 to-base-100",
    "from-base-200 to-base-100",
  ][i],
}));

const Testimonial11 = () => {
  return (
    <section className="bg-base-200">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
            Eleven tiny reasons people stick with the product.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((t) => (
            <figure
              key={t.name}
              className={`break-inside-avoid rounded-[1.75rem] border border-base-content/10 bg-gradient-to-b ${t.tone} p-5 ${t.span ?? ""}`}
            >
              <div className="mb-4 flex gap-0.5 text-amber-400" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.951.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-base-content">“{t.quote}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-base-content/10 pt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-2xl object-cover" />
                <div>
                  <div className="text-xs font-semibold text-base-content">
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

export default Testimonial11;
