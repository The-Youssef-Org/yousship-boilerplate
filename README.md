# Next.js SaaS Boilerplate

Production-ready starter for SaaS apps using Next.js (App Router), Supabase, Stripe/Lemon Squeezy, and Resend.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create local environment file:

```bash
cp .env.example .env.local
```

3. Fill in required credentials in `.env.local`:
- Supabase URL and keys
- Stripe keys and webhook secret (if using Stripe)
- Resend API key (if sending emails)

4. Run the app:

```bash
npm run dev
```

Open http://localhost:3000.

## Brand Setup Checklist

Update these fields before launch:
- `src/config.ts`
  - `appName`
  - `domainName`
  - `logoUrl`
  - `social.links`
  - `mail.supportEmail`
  - `mail.fromAdmin`
  - `mail.replyTo`

Also review:
- `src/blog/_assets/content.ts` (author names and copy)
- legal pages in `src/app/privacy-policy/page.tsx` and `src/app/tos/page.tsx`

## Included Stack

- Next.js (App Router)
- Tailwind CSS + daisyUI
- Supabase (auth + database)
- Stripe and Lemon Squeezy integrations
- Resend email integration

## Notes

- `npm run build` also generates sitemap via `next-sitemap`.
- `NEXT_PUBLIC_SITE_URL` must be set for sitemap generation.
- Stripe and Lemon Squeezy plan entries are configured in `src/config.ts`.
