// Large editorial testimonial with a distinct accent rail.
const TestimonialSingle = ({
  quote = "We stopped arguing about setup, shipped the first version, and sold the product before the week was over.",
  name = "Alex Martin",
  role = "Founder, MotionBoard",
  avatar = "https://i.pravatar.cc/120?img=12",
}: {
  quote?: string;
  name?: string;
  role?: string;
  avatar?: string;
}) => {
  return (
    <section className="mx-auto max-w-5xl px-8 py-16">
      <figure className="grid gap-8 overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-sm lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-center border-b border-base-300 bg-gradient-to-br from-base-100 to-base-200/60 p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div className="mb-4 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Founder note
          </div>
          <blockquote className="text-2xl font-semibold leading-snug text-base-content sm:text-3xl">
            “{quote}”
          </blockquote>
        </div>
        <div className="flex flex-col justify-between gap-6 p-8 lg:p-10">
          <div className="space-y-3">
            <div className="flex items-center gap-0.5 text-amber-400" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.951.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
                </svg>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-base-content/70">
              The stack feels clear from day one, so teams can stop debating structure and start iterating with real users.
            </p>
          </div>
          <figcaption className="flex items-center gap-4 rounded-2xl bg-base-200/60 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} alt={name} className="h-14 w-14 rounded-2xl object-cover ring-1 ring-base-300" />
            <div>
              <div className="font-semibold text-base-content">{name}</div>
              <div className="text-sm text-base-content/60">{role}</div>
            </div>
          </figcaption>
        </div>
      </figure>
    </section>
  );
};

export default TestimonialSingle;
