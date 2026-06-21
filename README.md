# Rout — Smart Public Transit

Pre-launch landing page for **Rout**, a smart public transit app built by [Spice Solutions GD](https://spicesolutionsgd.com). Rout gives commuters real-time bus tracking, night-shift safety features, and access to a charter marketplace — all in one app.

**Live site:** [https://routgd.web.app](https://routgd.web.app)

---

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router, static export)
- TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger — cinematic pinned hero
- Framer Motion — section entrance animations
- Firebase Firestore — waitlist collection (`join_list`)
- Firebase Hosting — deployment target (`routgd`)

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout, WaitlistProvider wrapper
    page.tsx            # Page assembly
  components/ui/
    cinematic-landing-hero.tsx   # GSAP scroll hero (3 feature reveals)
    feature-sections.tsx         # NightPlus, Charter, Team, CTA, Footer
    site-nav.tsx                 # Fixed nav + mobile full-screen menu
    waitlist-modal.tsx           # Waitlist context, modal, JoinListButton
  lib/
    firebase.ts         # Firebase client init (env vars)
public/
  logo.png
  henry.jpg
  franchesa.jpg
  spice-logo.svg
  nightshift1.png
  Chartermarketplace.png
  eta.png  eta1.png  notification.png
```

## Local Development

Copy the environment variables:

```bash
cp .env.example .env.local   # fill in your Firebase config values
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` with your Firebase project credentials:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

## Deploy

```bash
npm run deploy
```

Builds the static export (`out/`) and releases to Firebase Hosting (`routgd` site).

## Waitlist

Signups are written to Firestore collection `join_list` with fields:

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Full name |
| `email` | string | Unique — duplicates are rejected |
| `role` | string | `commuter` / `bus_operator` / `investor` |
| `source` | string | `"web"` |
| `createdAt` | timestamp | Server timestamp |

---

Built by **Henry Sylvester** and **Franchesa James** · Spice Solutions GD
