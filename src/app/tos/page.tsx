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
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-base-content/40">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-p:text-base-content/75 prose-li:text-base-content/75 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline max-w-none">
          <p>
            These Terms of Service govern your use of {config.appName}, available at {websiteUrl}.
            By using the service, you agree to these terms.
          </p>

          <h2>Use of Service</h2>
          <p>
            You may use the service only in compliance with applicable laws and these terms. You
            are responsible for all activity under your account.
          </p>

          <h2>Accounts</h2>
          <ul>
            <li>You must provide accurate information when creating an account.</li>
            <li>You are responsible for maintaining account security and credentials.</li>
            <li>You must notify us promptly of any unauthorized account access.</li>
          </ul>

          <h2>Payments and Billing</h2>
          <p>
            Paid features may be offered as one-time purchases or recurring subscriptions. Billing
            is handled by third-party payment providers, including Stripe and Lemon Squeezy.
          </p>
          <ul>
            <li>Fees are due according to the pricing shown at checkout.</li>
            <li>Subscriptions renew automatically unless canceled before renewal.</li>
            <li>Refunds, if provided, are subject to your published refund policy.</li>
          </ul>

          <h2>Acceptable Use</h2>
          <p>You agree not to misuse the service, including by:</p>
          <ul>
            <li>violating laws or third-party rights,</li>
            <li>attempting unauthorized access or security testing without permission,</li>
            <li>disrupting service operation or distributing malware,</li>
            <li>using the service for fraudulent, abusive, or deceptive activity.</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            The service, including software, content, and branding, is owned by {config.appName}
            or its licensors and protected by applicable intellectual property laws.
          </p>

          <h2>Termination</h2>
          <p>
            We may suspend or terminate access if these terms are violated or if required for
            security, legal, or operational reasons.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of
            any kind, to the extent permitted by law.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, {config.appName} is not liable for indirect,
            incidental, special, consequential, or punitive damages, or for loss of profits,
            revenue, data, or goodwill.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Updates become effective when posted on
            this page with a revised &quot;Last updated&quot; date.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${config.mail.supportEmail}`}>{config.mail.supportEmail}</a>.
          </p>

          <p className="text-sm text-base-content/50">
            This is a baseline template and may require legal review for your jurisdiction and
            business model.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
