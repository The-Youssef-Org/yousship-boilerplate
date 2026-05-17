import { getSEOTags } from "@/libs/seo";
import Link from "next/link";
import config from "@/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = getSEOTags({
  title: "Terms of Service",
  canonicalUrlRelative: "/tos",
  index: false,
});

const lastUpdated = "May 16, 2026";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-1.5 text-sm text-base-content/50 transition hover:text-base-content"
        >
          ← Back to home
        </Link>

        <div className="mb-12 border-b border-base-300 pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-base-content/40">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-p:text-base-content/75 prose-li:text-base-content/75 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline max-w-none">
          {/*
            TODO: Generate your Terms of Service with ChatGPT using the prompt below,
            then replace this comment block with the generated content.

            PROMPT:
            Please write a Terms of Service for my SaaS app with these details:
            - App name: [Your App Name]
            - Description: [What your app does]
            - Website: [Your website URL]
            - Contact email: [Your support email]
            - Business model: [one-time payment / subscription]
            - Country/Jurisdiction: [Your country]

            Include sections for: acceptance of terms, description of service,
            user accounts, payments and refunds, acceptable use, intellectual
            property, limitation of liability, disclaimer of warranties,
            termination, governing law, changes to terms, and contact.
          */}
          <p className="text-base-content/50 italic">
            Terms of Service coming soon. Replace this placeholder with your generated content.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
