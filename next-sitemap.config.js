/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is required for sitemap generation. Example: https://yourdomain.com",
  );
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  // Exclude pages that should not be indexed.
  exclude: ["/dashboard", "/dashboard/*", "/profile", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/dashboard", "/profile", "/api"] },
    ],
  },
};
