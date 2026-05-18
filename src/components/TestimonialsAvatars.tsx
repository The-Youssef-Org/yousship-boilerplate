// Compact social proof bar for the hero.
const avatars = [
  "https://i.pravatar.cc/100?img=1",
  "https://i.pravatar.cc/100?img=2",
  "https://i.pravatar.cc/100?img=3",
  "https://i.pravatar.cc/100?img=4",
  "https://i.pravatar.cc/100?img=5",
];

const TestimonialsAvatars = ({
  priority = false,
}: {
  priority?: boolean;
}) => {
  return (
    <div className="mx-auto inline-flex w-fit max-w-full flex-col gap-3 rounded-2xl border border-base-content/10 bg-base-content/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="relative flex">
        {avatars.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt={`Customer ${i + 1}`}
            loading={priority ? "eager" : "lazy"}
            className={`h-10 w-10 rounded-full ring-2 ring-base-100 ${i === 0 ? "" : "-ml-3"}`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-base-content">4.9/5</span>
          <div className="flex gap-0.5 text-amber-400" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.951.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-sm text-base-content/70">
          Trusted by <span className="font-semibold text-base-content">2,400+</span> founders and early teams
        </p>
      </div>
    </div>
  );
};

export default TestimonialsAvatars;
