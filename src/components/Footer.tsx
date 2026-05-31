import Link from "next/link";
import config from "@/config";
import Logo from "./Logo";

const Footer = () => {
  const socialLinks = (config.social?.links ?? []).filter(
    (item) => item.url && item.url.trim().length > 0,
  );

  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Logo size={32} className="-m-1.5 p-1.5 text-lg font-semibold" />
            <p className="mt-3 max-w-sm text-sm text-base-content/70">
              {config.appDescription}
            </p>
            <p className="mt-6 text-xs text-base-content/60">
              © {new Date().getFullYear()} {config.appName}. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-base-content">Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-base-content/70">
              <li>
                <a
                  href={`mailto:${config.mail.supportEmail}`}
                  className="hover:text-base-content"
                >
                  Support
                </a>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-base-content">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-base-content">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-base-content">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-base-content">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-base-content/70">
              <li>
                <Link href="/tos" className="hover:text-base-content">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-base-content">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-base-content">Connect</h4>
            <ul className="mt-3 space-y-2 text-sm text-base-content/70">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    className="hover:text-base-content"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
