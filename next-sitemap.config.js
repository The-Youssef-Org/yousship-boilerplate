/** @type {import('next-sitemap').IConfig} */
const config = require("./src/config").default;
const siteUrl = `https://${config.domainName}`;

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  // Exclude pages that should not be indexed.
  exclude: ["/dashboard", "/dashboard/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/dashboard", "/api"] },
    ],
  },
};
