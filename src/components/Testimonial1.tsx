const Testimonial1 = () => {
  return (
    <section className="mx-auto max-w-4xl px-8 py-16">
      <figure className="rounded-[2rem] border border-base-content/10 bg-base-content/[0.03] p-8 sm:p-10">
        <div className="flex items-center gap-0.5 text-amber-400" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.951.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
            </svg>
          ))}
        </div>
        <blockquote className="mt-5 text-2xl font-semibold leading-snug text-base-content sm:text-3xl">
          "The whole thing felt ready the moment we opened it. We could focus on customers straight away."
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.pravatar.cc/120?img=12" alt="Alex Martin" className="h-12 w-12 rounded-full object-cover ring-1 ring-base-content/10" />
          <div>
            <div className="font-semibold text-base-content">Alex Martin</div>
            <div className="text-sm text-base-content/60">Built 3 profitable SaaS products</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
};

export default Testimonial1;
