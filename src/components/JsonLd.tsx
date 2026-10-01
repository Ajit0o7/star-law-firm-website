import { absoluteUrl, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";

// Escape "<" so content can never close the script tag early.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const faqJsonLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbJsonLd = (lang: Locale, crumbs: { path: string; name: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(lang, c.path),
  })),
});

export const articleJsonLd = (
  lang: Locale,
  a: { path: string; title: string; description: string; image: string; date: string },
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  inLanguage: lang,
  image: `${site.url}${a.image}`,
  datePublished: a.date,
  dateModified: a.date,
  mainEntityOfPage: absoluteUrl(lang, a.path),
  author: { "@type": "Organization", name: site.legalName, url: site.url },
  publisher: {
    "@type": "Organization",
    name: site.legalName,
    logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
  },
});
