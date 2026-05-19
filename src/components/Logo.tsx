import Link from "next/link";
import type { SVGProps } from "react";
import config from "@/config";

// Icon mark — swap the SVG path below with your own brand icon.
export const LogoMark = ({
  size = 32,
  ...props
}: Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Regular tech stack icon: three separate non-overlapping isometric layers. */}
    <path d="M 16 20 L 26 24 L 16 28 L 6 24 Z" fill="#4A93C8" />
    <path d="M 26 24 L 26 25.6 L 16 29.6 L 16 28 Z" fill="#2F73A8" />

    <path d="M 16 12.5 L 26 16.5 L 16 20.5 L 6 16.5 Z" fill="#9ED1F5" />
    <path d="M 26 16.5 L 26 18.1 L 16 22.1 L 16 20.5 Z" fill="#6FAFDF" />

    <path d="M 16 5 L 26 9 L 16 13 L 6 9 Z" fill="#DDF2FF" />
    <path d="M 26 9 L 26 10.6 L 16 14.6 L 16 13 Z" fill="#B9DEF8" />
  </svg>
);

// Full logo: icon + app name from config. Set showWordmark={false} for icon-only usage.
// appName is read from config.ts — change it there to update the label everywhere.
const Logo = ({
  size = 28,
  className = "",
  showWordmark = config.showWordmark,
}: {
  size?: number;
  className?: string;
  showWordmark?: boolean;
}) => (
  <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
    <LogoMark size={size} />
    {showWordmark && <span className="text-lg font-bold tracking-tight">{config.appName}</span>}
  </Link>
);

export default Logo;
