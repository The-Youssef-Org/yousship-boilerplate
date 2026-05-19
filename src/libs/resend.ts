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
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY is missing in production");
    }

    console.warn("[email] RESEND_API_KEY is missing. Email not sent.", {
      to,
      subject,
      from: sender,
      replyTo: replyTo ?? config.mail.replyTo,
      html,
      text: fallbackText,
    });
    return { id: "dev-noop" };
  }

  if (process.env.NODE_ENV === "production" && sender.includes("onboarding@resend.dev")) {
    throw new Error(
      "config.mail.fromAdmin uses onboarding@resend.dev in production. Use a verified sender domain.",
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
