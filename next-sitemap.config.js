/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // TODO: Replace with your production domain before launching.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
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
