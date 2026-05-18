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
    {/* New direction: route/compass monomark for guidance + shipping. */}
    <circle cx="16" cy="16" r="11.5" fill="#2A558F" />
    <path d="M 10.2 20.8 C 12.8 17.9 15.6 15.7 20.8 11.6" stroke="#9FC0EA" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M 18.6 10.9 L 23.6 9.6 L 22.3 14.6 Z" fill="#EAF2FF" />
    <circle cx="10.2" cy="20.8" r="1.8" fill="#4A7FCC" />
    <circle cx="20.8" cy="11.6" r="1.4" fill="#7FA2D9" />
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
