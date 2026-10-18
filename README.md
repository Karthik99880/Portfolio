# Karthik Bachu — Portfolio

Personal site for Sai Venkata Karthik Bachu: software engineer at Vydhyo Healthcare, full-stack + applied AI.

Built with Next.js (App Router), React 19, TypeScript and Tailwind CSS v4. No UI kit, no animation library — the motion is a few hundred lines of CSS and `requestAnimationFrame`.

## Run it

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run lint`, `npm run typecheck`, `npm test` (Vitest).

## Content

Every word on the page lives in `lib/content/`. Edit those files — not the components — to change copy, projects, skills, achievements or links. `lib/content/siteConfig.ts` holds the name, email, location, and the `links` array the nav renders (add GitHub / LinkedIn there).

## Contact form

The form posts to a Server Action that emails through [Resend](https://resend.com)'s REST API. Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key. Without it the form reports a failure and nothing is sent. |
| `CONTACT_TO_EMAIL` | Inbox that receives messages. Defaults to the email in `siteConfig`. |
| `CONTACT_FROM_EMAIL` | Sender address on a verified Resend domain. Defaults to Resend's onboarding sender, which only delivers to your own account email. |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata, Open Graph and the sitemap. |

A hidden honeypot field drops bot submissions silently; real validation happens on the server.

## Design

`design/mockup-round7.html` is the approved static mockup the site is built from. When the code and the mockup disagree, the mockup wins.
