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
    {/* Shadow face — bottom-left of the hexagonal prism */}
    <path d="M3 11 L16 19 L16 27 L3 19 Z" fill="currentColor" fillOpacity="0.38" />
    {/* Lit face — top + right of the hexagonal prism */}
    <path d="M16 3 L29 11 L29 19 L16 27 L16 19 L3 11 Z" fill="currentColor" />
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
