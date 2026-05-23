import config from "@/config";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
};

const RESEND_API_URL = "https://api.resend.com/emails";

// Use for product emails (abandoned cart, receipts, etc.).
// Auth emails (magic link, confirm, reset) should be sent by Supabase via SMTP.
export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  replyTo,
  from,
}: SendEmailParams) => {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = from ?? config.mail.fromAdmin;
  const fallbackText = text ?? html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — email skipped.", { to, subject });
    return { id: "noop-no-key" };
  }

  if (sender.includes("onboarding@resend.dev")) {
    console.warn(
      "[email] config.mail.fromAdmin uses onboarding@resend.dev. Update to a verified sender domain before going live.",
    );
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [to],
      subject,
      html,
      text: fallbackText,
      reply_to: replyTo ?? config.mail.replyTo,
    }),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as {
      message?: string;
      error?: string;
    };
    throw new Error(body.message ?? body.error ?? "Failed to send email");
  }

  return (await response.json().catch(() => ({}))) as { id?: string };
};

// ---------------------------------------------------------------------------
// Resend Audience
// Adds a contact to a Resend Audience for broadcast emails / sequences.
// Requires RESEND_API_KEY + RESEND_AUDIENCE_ID env vars.
// ---------------------------------------------------------------------------
export const addToResendAudience = async (email: string): Promise<void> => {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.warn(
      "[email] addToResendAudience: RESEND_API_KEY or RESEND_AUDIENCE_ID not set — skipping.",
    );
    return;
  }

  const response = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    },
  );

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as {
      message?: string;
      error?: string;
    };
    throw new Error(
      body.message ?? body.error ?? "Failed to add contact to Resend audience",
    );
  }
};
