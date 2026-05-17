import type { Metadata } from "next";
import config from "@/config";

// ----------------------------------------------------------------------------
// getSEOTags()
// ----------------------------------------------------------------------------
// Returns a fully-populated Next.js Metadata object so you don't repeat
// boilerplate on every page. Usage:
//
//   export const metadata = getSEOTags({ canonicalUrlRelative: "/blog" });
//
// All fields are optional — defaults come from config.ts.
// Add a 1200×630 PNG at /public/og.png to enable Open Graph image previews.
// ----------------------------------------------------------------------------

type SEOTagsOptions = {
  title?: string;
  description?: string;
  keywords?: string[];
  // Relative path, e.g. "/blog" or "/pricing". Used for the canonical URL.
  canonicalUrlRelative?: string;
  // Override the Open Graph image (absolute URL or relative path under /public).
  openGraphImageRelativePath?: string;
  // "article" for blog posts; defaults to "website".
  ogType?: "website" | "article";
  // ISO 8601 date string for blog posts (e.g. "2025-12-01").
  publishedTime?: string;
  // Set to false to exclude the page from search engine indexes.
  index?: boolean;
  // Additional Metadata fields merged in directly.
  extraTags?: Metadata;
};

export const getSEOTags = ({
  title,
  description,
  keywords,
  canonicalUrlRelative,
  openGraphImageRelativePath = "/og.png",
  ogType = "website",
  publishedTime,
  index = true,
  extraTags = {},
}: SEOTagsOptions = {}): Metadata => {
  const resolvedTitle = title
    ? `${title} | ${config.appName}`
    : config.appName;

  const resolvedDescription = description ?? config.appDescription;

  const canonicalUrl = canonicalUrlRelative
    ? `https://${config.domainName}${canonicalUrlRelative}`
    : `https://${config.domainName}`;

  const ogImageUrl = openGraphImageRelativePath.startsWith("http")
    ? openGraphImageRelativePath
    : `https://${config.domainName}${openGraphImageRelativePath}`;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: keywords ?? [],

    metadataBase: new URL(`https://${config.domainName}`),

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      siteName: config.appName,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      type: ogType,
      locale: "en_US",
      ...(ogType === "article" && publishedTime ? { publishedTime } : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImageUrl],
      creator: config.social?.twitter
        ? `@${config.social.twitter.replace(/.*twitter\.com\//, "").replace(/\/$/, "")}`
        : undefined,
    },

    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },

    ...extraTags,
  };
};

// ----------------------------------------------------------------------------
// renderSchemaTags()
// ----------------------------------------------------------------------------
// Renders a JSON-LD <script> tag with structured data for the home page.
// Helps Google understand your site and can earn you a rich snippet.
// Call it once inside the JSX returned by your root page:
//
//   import { renderSchemaTags } from "@/libs/seo";
//
//   export default function Page() {
//     return (
//       <>
//         {renderSchemaTags()}
//         <main>...</main>
//       </>
//     );
//   }
//
// Customize the schema object below to match your business type.
// Reference: https://schema.org/SoftwareApplication
// ----------------------------------------------------------------------------

export const renderSchemaTags = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.appName,
    description: config.appDescription,
    url: `https://${config.domainName}`,
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
