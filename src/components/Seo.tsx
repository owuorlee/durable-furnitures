import { useEffect } from "react";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
} from "@/lib/seo";

// ============================================================================
// <Seo /> — client-side head manager.
// Renders nothing; on mount/update it upserts the document head: title, meta
// description, canonical, robots, Open Graph + Twitter Card tags, and any
// JSON-LD structured-data blocks passed in. Each page renders exactly one
// <Seo /> so every route gets unique, self-consistent head metadata.
//
// NOTE: this runs client-side. Googlebot renders JavaScript and sees all of
// it. Social-network scrapers (WhatsApp/Facebook/X) do NOT run JS and fall
// back to the static tags in index.html — see SEO_ACTION_PLAN.md for the
// prerendering roadmap that would lift that limitation.
// ============================================================================

type SeoProps = {
  title: string;
  description: string;
  /** Canonical path for this page, e.g. "/category/chester-beds" */
  path: string;
  /** Absolute or site-relative image for social cards */
  image?: string;
  type?: "website" | "product";
  noindex?: boolean;
  jsonLd?: object[];
};

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const Seo = ({ title, description, path, image, type = "website", noindex = false, jsonLd = [] }: SeoProps) => {
  useEffect(() => {
    const url = absoluteUrl(path);
    const img = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", url);

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type === "product" ? "product" : "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);
    upsertMeta("property", "og:locale", "en_KE");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);

    // Replace this page's structured data wholesale on every route change.
    document.head
      .querySelectorAll('script[data-seo-jsonld="page"]')
      .forEach((s) => s.remove());
    jsonLd.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoJsonld = "page";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.head
        .querySelectorAll('script[data-seo-jsonld="page"]')
        .forEach((s) => s.remove());
    };
    // JSON.stringify keeps the effect stable across re-renders with equal data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, noindex, JSON.stringify(jsonLd)]);

  return null;
};

export default Seo;
