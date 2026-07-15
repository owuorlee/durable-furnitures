# SEO Action Plan — Durable Furniture House

Live site: **https://www.durablefurnitures.co.ke**
Last updated: 15 July 2026

This document covers (1) what is already implemented in the code, (2) the manual
steps only a human with account access can do, in priority order, and (3) the
ongoing maintenance routine. Keep the NAP (Name, Address, Phone) identical
everywhere it appears on the internet:

> **Durable Furniture House** · Nairobi, Kenya · **+254 741 530 539**

---

## 1. Already implemented in the codebase

- Unique, keyword-rich meta title + description + self-referencing canonical on
  every route (home, 8 categories, 196 products, About, Track Order).
- Open Graph + Twitter Card tags on every route, with a 1200×630 `og-image.jpg`.
- `noindex` on utility pages (`/wishlist`, `/compare`, 404) so crawl budget goes
  to money pages.
- JSON-LD structured data:
  - `FurnitureStore` (LocalBusiness) — statically in `index.html` (crawlable
    without JavaScript) and on `/` and `/about`, with NAP, opening hours
    (Mon–Sun 08:00–18:00), price range and service area (Nairobi, Kiambu, Kenya).
  - `WebSite` on the homepage.
  - `Product` schema on all 196 product pages (name, image, description, SKU,
    brand, price in KES, InStock availability).
  - `BreadcrumbList` on category, product, About and Track Order pages.
  - `ItemList` on category pages.
- `sitemap.xml` (207 URLs) — regenerated automatically on every build
  (`npm run sitemap` / `prebuild` hook) so it always matches the catalog.
- `robots.txt` referencing the sitemap and blocking `/wishlist` + `/compare`.
- One `H1` per page containing the page's primary keyword (logo demoted from H1).
- Keyword-rich intro paragraphs on all 8 category pages targeting Kenyan search
  phrases ("L-shaped sofas Nairobi", "sofa set designs in Kenya", "chester beds
  4x6 5x6 6x6", "dining table sets Kenya", …).
- Descriptive alt text on all images; lazy loading below the fold;
  `fetchpriority=high` on the hero (LCP) image.
- Product images recompressed and capped at 1200px (see
  `scripts/compress-images.mjs` — re-run it whenever new photos are added).
- Dead "Book a Free Consultation" button now opens a WhatsApp chat (conversion
  win + engagement signal).

### Known limitation to plan for (important)

The site is a client-rendered React SPA. **Googlebot renders JavaScript and will
index all of the above.** But social scrapers (WhatsApp, Facebook, X) do not run
JS — when someone shares a *product* link, the preview card falls back to the
homepage og-image/title from `index.html` instead of that product's photo.

**Roadmap fix:** migrate to prerendered/static HTML per route (e.g.
`vite-plugin-ssr`/prerendering at build, or a framework like Astro/Next). Worth
doing when WhatsApp sharing of product links becomes a marketing channel.
Until then this costs you nothing on Google rankings.

---

## 2. Manual steps — do these in order

### A. Google Search Console (do this first — 15 minutes)

1. Go to https://search.google.com/search-console and sign in with the business
   Google account.
2. Add property → **Domain** → `durablefurnitures.co.ke`.
3. It asks for a DNS TXT record. Since DNS is on Vercel: Vercel dashboard →
   your project → Settings → Domains → `durablefurnitures.co.ke` → DNS Records
   → add the TXT record Google shows (name `@`, value `google-site-verification=…`).
4. Back in Search Console click Verify (may take a few minutes).
5. Sitemaps (left menu) → enter `sitemap.xml` → Submit.
6. URL Inspection → paste `https://www.durablefurnitures.co.ke/` → Request
   Indexing. Repeat for 2–3 category pages to kick-start crawling.

**Expectation:** pages start appearing in Google within days; meaningful
impressions data within 2–4 weeks.

### B. Google Business Profile (biggest local-SEO lever — 30 minutes)

For "furniture shop near me" and Google Maps results, nothing beats this.

1. Go to https://business.google.com → Add business →
   name: **Durable Furniture House**.
2. Category: **Furniture store** (add "Furniture maker" as secondary).
3. If customers visit a showroom/workshop: enter the street address and verify
   (Google posts a card or offers video verification in Kenya). If delivery
   only: choose "service area business" and set Nairobi + Kiambu as the areas.
4. Phone: +254 741 530 539 · Website: https://www.durablefurnitures.co.ke
   · Hours: Mon–Sun 08:00–18:00 (must match the site).
5. Upload 15–20 real product/workshop photos (the same client photos on the
   site). Add products with prices to the profile's product section.
6. **Reviews are the ranking fuel:** after every delivery, WhatsApp the
   customer the review link Google gives you ("Share review form"). Aim for
   2–4 reviews per month, and reply to every one.

### C. Bing Webmaster Tools (5 minutes)

https://www.bing.com/webmasters → "Import from Google Search Console" — one
click after step A. Bing powers ChatGPT/Copilot answers too.

### D. Kenyan directory & marketplace citations (NAP consistency)

Create/claim listings with the exact NAP above, linking to the site:

- PigiaMe (pigiame.co.ke) — business listing + classifieds for hero products
- Jiji Kenya (jiji.co.ke) — seller profile; list 10–15 best sellers with links
  back to the site
- BusinessList Kenya (businesslist.co.ke)
- Kenya Yellow Pages (yellowpageskenya.com)
- Facebook Page + Instagram Business + TikTok Business (furniture content
  performs exceptionally well with Kenyan audiences on TikTok — short videos
  of workshop craftsmanship and before/after room setups)
- WhatsApp Business: set up the **Catalog** feature with your top products —
  customers already transact there via your checkout flow.

When social profiles exist, add their URLs to the `sameAs` array in
`src/lib/seo.ts` (currently empty) and in the static JSON-LD in `index.html`.

### E. Competitor landscape & positioning

Main organic competitors for furniture keywords in Kenya: Moko Home + Living,
Furniture Palace, Odds & Ends, Victoria Courts, plus thousands of Jiji/PigiaMe
classifieds. Gaps you can exploit:

- Most local carpentry workshops have no product schema, no sitemaps and weak
  page titles — you now out-rank them technically from day one.
- The big retailers don't target neighbourhood-level phrases. Consider future
  landing content for "furniture delivery Kiambu", "sofas Ruaka/Runda/Karen".
- None of them communicate **payment on delivery** prominently in titles —
  yours do, which lifts click-through rate even at equal position.

### F. Content flywheel (start month 2)

A simple blog (e.g. `/guides/...`) targeting long-tail questions Kenyans
actually search:

- "How much does a 6-seater sofa cost in Kenya?" (price-guide post per category)
- "5x6 vs 6x6 bed: which size fits your bedroom?"
- "How to care for a velvet sofa in Nairobi dust"
- "L-shaped sofa measurements guide for Kenyan apartments"

Each post internally links to the matching category page. Two posts a month is
enough to compound.

---

## 3. Ongoing maintenance

| When | What |
|---|---|
| Every new product added | `npm run build` regenerates the sitemap automatically; run `node scripts/compress-images.mjs` on new photos before committing |
| Weekly (5 min) | Search Console → Performance: check impressions/clicks trend; Pages report for indexing errors |
| After every delivery | Ask for a Google review via WhatsApp |
| Monthly | Post photos/offers on the Google Business Profile; publish 1–2 guide posts |
| Quarterly | Run PageSpeed Insights (pagespeed.web.dev) on home + one category + one product page; keep LCP < 2.5s |
| When real reviews accumulate on-site | Add `AggregateRating`/`Review` schema to product pages (deliberately not added now — the seeded demo reviews would violate Google's guidelines and risk a manual action) |

## 4. Quick wins checklist (first 7 days)

- [ ] Verify domain in Google Search Console + submit sitemap (Step A)
- [ ] Create Google Business Profile + first 5 photos (Step B)
- [ ] Import to Bing Webmaster (Step C)
- [ ] Facebook + Instagram + TikTok business accounts created, linked to site
- [ ] WhatsApp Business catalog with top 10 products
- [ ] First 3 Google reviews requested from happy past customers
- [ ] PigiaMe + Jiji listings live with links to durablefurnitures.co.ke
