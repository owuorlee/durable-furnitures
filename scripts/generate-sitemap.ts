// ============================================================================
// XML SITEMAP GENERATOR
// ============================================================================
// Writes public/sitemap.xml covering every indexable route: the homepage,
// static pages, all category pages and every product detail page.
//
// Run manually:      npm run sitemap
// Runs automatically: via the "prebuild" npm hook before every `npm run build`,
// so the deployed sitemap always matches the live catalog. Executed with
// vite-node so it imports the real src/data/products.ts (aliases and image
// imports resolve exactly like the app — no duplicated slug logic).
// ============================================================================

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { categories, products } from "../src/data/products";

const SITE_URL = "https://www.durablefurnitures.co.ke";
const today = new Date().toISOString().slice(0, 10);

type Entry = { path: string; priority: string; changefreq: string };

const entries: Entry[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/track-order", priority: "0.4", changefreq: "monthly" },
  ...categories.map((c) => ({
    path: `/category/${c.slug}`,
    priority: "0.9",
    changefreq: "weekly",
  })),
  ...products.map((p) => ({
    path: `/product/${p.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${e.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const out = resolve(dirname(fileURLToPath(import.meta.url)), "../public/sitemap.xml");
writeFileSync(out, xml, "utf8");
console.log(
  `sitemap.xml written: ${entries.length} URLs (${categories.length} categories, ${products.length} products)`,
);
