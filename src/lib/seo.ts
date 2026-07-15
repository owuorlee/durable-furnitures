// ============================================================================
// SEO CONSTANTS & JSON-LD SCHEMA BUILDERS
// ============================================================================
// Single source of truth for the site's public identity (NAP — Name, Address,
// Phone) and for every piece of structured data emitted by the app. Keep the
// NAP values here in sync with SEO_ACTION_PLAN.md and the Google Business
// Profile — consistency across the web is a local-SEO ranking factor.
// ============================================================================

import { Product, Category } from "@/data/products";

export const SITE_URL = "https://www.durablefurnitures.co.ke";
export const SITE_NAME = "Durable Furniture House";
export const PHONE_DISPLAY = "+254 741 530 539";
export const PHONE_E164 = "+254741530539";
export const PHONE_WA = "254741530539";

export const DEFAULT_TITLE =
  "Durable Furniture House | Premium Furniture in Nairobi & Kiambu";
export const DEFAULT_DESCRIPTION =
  "Shop premium sofas, beds, dining sets, TV stands and more at Durable Furniture House. Free delivery within Nairobi & Kiambu. Payment on delivery available.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const absoluteUrl = (pathOrUrl: string) =>
  pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;

// --- Sitewide business identity -------------------------------------------

export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-192x192.png`,
  image: DEFAULT_OG_IMAGE,
  telephone: PHONE_E164,
  priceRange: "KSh 15,000 – KSh 155,000",
  currenciesAccepted: "KES",
  paymentAccepted: "Cash, M-Pesa, Payment on Delivery",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ruiru Bypass, behind Mark Hotel",
    addressLocality: "Ruiru",
    addressRegion: "Kiambu County",
    addressCountry: "KE",
  },
  hasMap: "https://maps.app.goo.gl/C2M2mPkqpSLiV5gc7",
  areaServed: [
    { "@type": "City", name: "Nairobi" },
    { "@type": "City", name: "Kiambu" },
    { "@type": "Country", name: "Kenya" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: [] as string[], // add Facebook/Instagram/TikTok profile URLs when live
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#business` },
  inLanguage: "en-KE",
});

// --- Page-level schemas -----------------------------------------------------

export type CrumbInput = { label: string; to?: string };

export const breadcrumbSchema = (crumbs: CrumbInput[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.label,
    ...(c.to ? { item: absoluteUrl(c.to) } : {}),
  })),
});

export const productSchema = (product: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  image: absoluteUrl(product.image),
  description: product.description,
  sku: product.id.toUpperCase(),
  brand: { "@type": "Brand", name: SITE_NAME },
  category: product.categoryName,
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/product/${product.slug}`,
    priceCurrency: "KES",
    price: product.sale,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": `${SITE_URL}/#business` },
  },
});

export const categoryItemListSchema = (category: Category, products: Product[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${category.name} – ${SITE_NAME}`,
  numberOfItems: products.length,
  itemListElement: products.slice(0, 12).map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/product/${p.slug}`,
  })),
});
