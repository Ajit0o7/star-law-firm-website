import type { MetadataRoute } from "next";
import { absoluteUrl, locales } from "@/i18n/config";
import { serviceMeta } from "@/lib/service-meta";
import { guides } from "@/content/guides";

// Every page exists in English and Nepali; each entry lists both versions as hreflang alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; lastModified?: string }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...serviceMeta.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/guides", priority: 0.7 },
    ...guides.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.6, lastModified: g.date })),
  ];

  return pages.flatMap(({ path, priority, lastModified }) =>
    locales.map((lang) => ({
      url: absoluteUrl(lang, path),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly" as const,
      priority: lang === "en" ? priority : Math.round(priority * 90) / 100,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(l, path)])),
      },
    })),
  );
}
