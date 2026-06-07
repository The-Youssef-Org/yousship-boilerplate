import Link from "next/link";
import config from "@/config";

// Full logo: renders the image set in config.logoUrl, or falls back to the app name text.
// To add your logo, set logoUrl in config.ts to a path like "/logo.png" or an absolute URL.
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
    {config.logoUrl ? (
      <img src={config.logoUrl} alt={config.appName} height={size} width={size} style={{ display: "block" }} />
    ) : null}
    {(showWordmark || !config.logoUrl) && <span className="text-lg font-bold tracking-tight">{config.appName}</span>}
  </Link>
);

export default Logo;
