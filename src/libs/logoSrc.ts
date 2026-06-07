import config from "@/config";

/**
 * Returns an absolute URL for the logo, suitable for use in emails.
 * Accepts both relative paths ("/logo.png") and absolute URLs ("https://...").
 * Returns an empty string if no logoUrl is configured.
 */
export function getAbsoluteLogoSrc(): string {
  const src = config.logoUrl as string;
  if (!src) return "";
  return src.startsWith("http") ? src : `https://${config.domainName}${src}`;
}
