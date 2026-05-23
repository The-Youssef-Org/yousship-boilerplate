import Link from "next/link";
import config from "@/config";

const AnnouncementBar = () => {
  const bar = config.announcementBar;

  if (!bar.show) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 border-b border-base-content/10 bg-base-300/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center">
        <span className="text-xs font-medium text-base-content/80 sm:text-sm">{bar.text}</span>
        <Link
          href={bar.ctaHref}
          className="text-xs font-semibold text-base-content underline-offset-4 transition hover:underline sm:text-sm"
        >
          {bar.ctaText}
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementBar;
