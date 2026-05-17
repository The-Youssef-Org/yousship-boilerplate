import config from "@/config";

// ---------------------------------------------------------------------------
// Shared branded wrapper
// All emails share the same header/footer. Only the body changes.
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

// ---------------------------------------------------------------------------
// Order confirmation
// Called from src/app/api/webhook/stripe/route.ts after checkout.session.completed.
// ---------------------------------------------------------------------------
export const orderConfirmationEmail = ({
  customerName,
  productName,
}: {
  customerName: string;
  productName: string;
  amountTotal?: string;
}): string => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:40px 24px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr><td style="max-width:560px;margin:0 auto;display:block;">

      <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#0f172a;">Hey ${customerName},</p>

      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#0f172a;">
        Thanks for picking up the <strong>${productName}</strong> plan! Your account has been upgraded and you&rsquo;re ready to go.
      </p>

      <p style="margin:0 0 32px;font-size:16px;line-height:1.7;color:#0f172a;">
        You can access your account and get started here:
      </p>

      <a href="https://${config.domainName}${config.auth.dashboardUrl}"
         style="display:inline-block;background:#2563eb;color:#ffffff;font-size:15px;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none;">
        Go to Dashboard
      </a>

      <p style="margin:40px 0 8px;font-size:15px;line-height:1.7;color:#0f172a;">
        We&rsquo;re excited to see you on board.<br /><br />
        Best,<br />
        The ${config.appName} Team
      </p>

      <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;line-height:1.6;">
        A receipt from Stripe will arrive in a separate email.
      </p>

    </td></tr>
  </table>
</body>
</html>`;

// ---------------------------------------------------------------------------
// Welcome email
// Called from src/app/api/auth/callback/route.ts after a new user signs up.
// ---------------------------------------------------------------------------
export const welcomeEmail = ({ name }: { name: string }): string => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:40px 24px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr><td style="max-width:560px;margin:0 auto;display:block;">

      <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#0f172a;">Hi ${name},</p>

      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#0f172a;">
        Thanks for signing up for <strong>${config.appName}</strong> &mdash; we&rsquo;re glad to have you!
      </p>

      <p style="margin:0 0 32px;font-size:16px;line-height:1.7;color:#0f172a;">
        Your account is ready. Head to your dashboard to get started.
      </p>

      <a href="https://${config.domainName}${config.auth.dashboardUrl}"
         style="display:inline-block;background:#2563eb;color:#ffffff;font-size:15px;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none;">
        Go to Dashboard
      </a>

      <p style="margin:40px 0 0;font-size:15px;line-height:1.7;color:#0f172a;">
        Best,<br />
        The ${config.appName} Team
      </p>

    </td></tr>
  </table>
</body>
</html>`;

// ---------------------------------------------------------------------------
// Magic link / OTP email
// Paste the OUTPUT of getMagicLinkEmailTemplate() into:
//   Supabase Dashboard → Authentication → Email Templates → Magic Link
//
// Supabase replaces these variables automatically at send time:
//   {{ .ConfirmationURL }} — the full magic link URL
//   {{ .Email }}           — the recipient's email address
//
// To get the HTML string to paste, temporarily add this to any server route:
//   import { getMagicLinkEmailTemplate } from "@/libs/emailTemplates";
//   console.log(getMagicLinkEmailTemplate());
// ---------------------------------------------------------------------------
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
         style="display:inline-block;background:#2563eb;color:#ffffff;font-size:15px;font-weight:600;padding:15px 36px;border-radius:8px;text-decoration:none;letter-spacing:-0.1px;">
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
