# Star Access to Justice: Law Firm Website

Website for **Star Access to Justice Law Firm** (Notary Public Office & Authorized Translation),
Nahar Marg, KMC-32, Kathmandu. Run by Adv. Ishwor Prasad Pudasaini.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** and TypeScript.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are static)
npm start
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, "How can we help" paths, credentials, about, practice areas, process, reviews, FAQ, map |
| `/about` | Firm story, the advocate, values, registrations |
| `/services` | All six practice areas |
| `/services/[slug]` | One page per service, with what to bring and a contact sidebar |
| `/contact` | Enquiry form (opens WhatsApp with the message pre-filled), call/Viber, map |

## Editing content

All business details live in two files:

- `src/lib/site.ts`: name, phone, address, map links, hours, registrations, social links, reviews, FAQs
- `src/lib/services.ts`: the six services (titles, Nepali names, descriptions, lists)

### Please confirm before launch (marked `CONFIRM` in `site.ts`)

1. **Domain**: `site.url` is a placeholder (`staraccesstojustice.com`).
2. **Office hours**: Google lists no hours, so *Sun–Fri 10–5, Sat by appointment* is a placeholder.
3. **WhatsApp / Viber**: the form and buttons assume +977 985-1003107 is on WhatsApp and Viber.
4. **Google listing**: the Google Business Profile currently shows **"Temporarily closed"**.
   Update it in Google Business Profile, or visitors who search the firm will see it as closed.
5. Add an email address if the firm wants one shown (none is public on the listing).

## Where the content came from

- Firm description, phone, address, coordinates, rating and reviews: the firm's Google Business Profile.
- Services, registration numbers (NBC 703, KMC 3403, PAN 601499933) and "KMC-32": the office signboard photo.
- `public/images/office-sign.jpg` and `office-2.jpg`: the firm's own photos from its Google profile.
- Layout patterns referenced: notarykathmandu.com ("how it works", Google-rating trust signal),
  globallawexperts.com (guided "how can we help" entry, practice-area cards), bestlawfirms.com (clean, credible tone).

## Stock photo credits (Unsplash License, free for commercial use)

- `justice-dark.jpg`, `gavel-blue.jpg`: Sasun Bughdaryan
- `justice-statue.jpg`: Tingey Injury Law Firm
- `notary-writing.jpg`: Scott Graham
- `signing.jpg`: Gabrielle Henderson
- `law-books.jpg`: Giammarco Boscaro
- `kathmandu.jpg`: Michael Starkie

## Deploy

The site is fully static, so it deploys as-is to Vercel (`vercel`), Netlify, or any Node host.
