import { getSEOTags } from "@/libs/seo";
import Link from "next/link";
import config from "@/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = getSEOTags({
  title: "Privacy Policy",
  canonicalUrlRelative: "/privacy-policy",
  index: false,
});

const lastUpdated = "May 16, 2026";

export default function PrivacyPage() {
  const websiteUrl = `https://${config.domainName}`;

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
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-base-content/40">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-p:text-base-content/75 prose-li:text-base-content/75 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline max-w-none">
          <p>
            This Privacy Policy explains how {config.appName} collects, uses, and protects
            personal information when you use {websiteUrl} and related services.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>Account information such as name and email address.</li>
            <li>Billing and transaction records required to process purchases.</li>
            <li>Technical and usage data such as device, browser, and interaction logs.</li>
            <li>Support information you provide when contacting us.</li>
          </ul>

          <h2>How We Use Information</h2>
          <ul>
            <li>To provide, secure, and improve the service.</li>
            <li>To authenticate users and manage accounts.</li>
            <li>To process payments and deliver purchase confirmations.</li>
            <li>To respond to support requests and service communications.</li>
            <li>To comply with legal obligations and prevent fraud or abuse.</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            We use trusted vendors to operate core functionality, including Supabase (auth and
            database), Stripe and Lemon Squeezy (payments), and Resend (transactional email).
            These providers process data under their own privacy terms.
          </p>

          <h2>Cookies and Similar Technologies</h2>
          <p>
            We may use cookies and similar technologies for authentication, session continuity,
            security, and analytics. You can control cookies through your browser settings.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain personal data only as long as necessary to provide services, meet legal
            obligations, resolve disputes, and enforce agreements.
          </p>

          <h2>Security</h2>
          <p>
            We apply commercially reasonable technical and organizational safeguards designed to
            protect personal information. No system is fully immune from risk, and we cannot
            guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct, delete, or export
            your personal data, and to object to certain processing. To make a request, contact us
            at <a href={`mailto:${config.mail.supportEmail}`}>{config.mail.supportEmail}</a>.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            The service is not directed to children under 13 (or the minimum age required by local
            law), and we do not knowingly collect personal information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Material changes will be posted on this
            page with a revised &quot;Last updated&quot; date.
          </p>

          <h2>Contact</h2>
          <p>
            If you have privacy questions, contact us at{" "}
            <a href={`mailto:${config.mail.supportEmail}`}>{config.mail.supportEmail}</a>.
          </p>

          <p className="text-sm text-base-content/50">
            This policy is a baseline template and may need legal review for your jurisdiction and
            business model.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
