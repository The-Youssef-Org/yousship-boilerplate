import { createElement } from "react";
import { render } from "react-email";
import config from "@/config";
import { WelcomeEmail } from "@/emails/WelcomeEmail";
import { OrderConfirmationEmail } from "@/emails/OrderConfirmationEmail";
import { SubscriptionCancelledEmail } from "@/emails/SubscriptionCancelledEmail";
import { SubscriptionCancellationScheduledEmail } from "@/emails/SubscriptionCancellationScheduledEmail";
import { LeadMagnetEmail } from "@/emails/LeadMagnetEmail";

// ---------------------------------------------------------------------------
// React Email wrappers
// Each function renders its React Email component to an HTML string.
// To preview emails run: npm run email:dev
// ---------------------------------------------------------------------------

export const welcomeEmail = ({ name }: { name: string }): Promise<string> =>
  render(createElement(WelcomeEmail, { name }));

export const orderConfirmationEmail = ({
  customerName,
  productName,
  amountTotal,
  accessUrl,
}: {
  customerName: string;
  productName: string;
  amountTotal?: string;
  accessUrl?: string;
}): Promise<string> =>
  render(
    createElement(OrderConfirmationEmail, {
      customerName,
      productName,
      amountTotal,
      accessUrl,
    }),
  );

export const subscriptionCancelledEmail = ({
  customerName,
  productName,
  endDate,
}: {
  customerName: string;
  productName?: string;
  endDate?: string;
}): Promise<string> =>
  render(
    createElement(SubscriptionCancelledEmail, {
      customerName,
      productName,
      endDate,
    }),
  );

export const subscriptionCancellationScheduledEmail = ({
  customerName,
  productName,
  endDate,
}: {
  customerName: string;
  productName?: string;
  endDate?: string;
}): Promise<string> =>
  render(
    createElement(SubscriptionCancellationScheduledEmail, {
      customerName,
      productName,
      endDate,
    }),
  );

export const leadMagnetEmail = ({
  heading,
  subheading,
  bulletPoints,
}: {
  heading: string;
  subheading: string;
  bulletPoints: string[];
}): Promise<string> =>
  render(createElement(LeadMagnetEmail, { heading, subheading, bulletPoints }));

// ---------------------------------------------------------------------------
// Magic link / OTP email  (plain HTML - kept for Supabase template editor)
// Paste the OUTPUT of getMagicLinkEmailTemplate() into:
//   Supabase Dashboard > Authentication > Email Templates > Magic Link
//
// Supabase replaces these variables automatically at send time:
//   {{ .ConfirmationURL }} - the full magic link URL
//   {{ .Email }}           - the recipient's email address
//
// To get the HTML string to paste, temporarily add this to any server route:
//   import { getMagicLinkEmailTemplate } from "@/libs/emailTemplates";
//   console.log(getMagicLinkEmailTemplate());
// ---------------------------------------------------------------------------
const wrap = (body: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f1f5f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">

          <!-- Brand header -->
          <tr>
            <td style="background:#0f172a;padding:32px 48px;border-radius:12px 12px 0 0;text-align:center;">
              <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                ${config.appName}
              </span>
            </td>
          </tr>

          <!-- Card body -->
          <tr>
            <td style="background:#ffffff;padding:48px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:24px 48px;text-align:center;">
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;color:#94a3b8;line-height:1.6;">
                ${config.appName} &middot;
                <a href="https://${config.domainName}" style="color:#94a3b8;text-decoration:none;">${config.domainName}</a>
              </p>
              <p style="margin:6px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;color:#94a3b8;line-height:1.6;">
                Questions? <a href="mailto:${config.mail.supportEmail}" style="color:#64748b;">${config.mail.supportEmail}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const getMagicLinkEmailTemplate = (): string =>
  wrap(`
    <div style="text-align:center;margin-bottom:20px;font-size:40px;line-height:1;">
      &#128274;
    </div>

    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#0f172a;text-align:center;letter-spacing:-0.5px;line-height:1.2;">
      Sign in to ${config.appName}
    </h1>
    <p style="margin:0 0 36px;font-size:15px;color:#64748b;text-align:center;line-height:1.6;">
      Click the button below to sign in. This link expires in
      <strong style="color:#0f172a;">1 hour</strong> and can only be used once.
    </p>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:40px;">
      <a href="{{ .ConfirmationURL }}"
        style="display:inline-block;background:#111827;color:#ffffff;font-size:15px;font-weight:600;padding:15px 36px;border-radius:8px;text-decoration:none;letter-spacing:-0.1px;">
        Sign in to ${config.appName} &rarr;
      </a>
    </div>

    <!-- Security note -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:8px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">
            <strong style="color:#0f172a;">This link was sent to</strong> {{ .Email }}<br />
            If you didn&rsquo;t request this, you can safely ignore this email &mdash;
            your account will not be affected.
          </p>
        </td>
      </tr>
    </table>
  `);
