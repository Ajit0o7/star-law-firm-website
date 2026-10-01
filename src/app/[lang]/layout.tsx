import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Instrument_Sans, Instrument_Serif, Mukta, Noto_Serif_Devanagari } from "next/font/google";
import "../globals.css";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { MobileActionBar } from "@/components/MobileActionBar";
import { RevealObserver } from "@/components/RevealObserver";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, alternatesFor, hasLocale, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";
import { getServices } from "@/lib/services";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans", display: "swap" });
// Devanagari faces only download when Nepali glyphs appear on the page.
const mukta = Mukta({
  subsets: ["devanagari"],
  weight: ["400", "500"],
  variable: "--font-mukta",
  display: "swap",
  preload: false,
});
const devaSerif = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["500"],
  variable: "--font-deva-serif",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang).meta;
  return {
    metadataBase: new URL(site.url),
    title: { default: d.title, template: d.titleTemplate },
    description: d.description,
    keywords: d.keywords,
    alternates: alternatesFor(lang, "/"),
    openGraph: {
      type: "website",
      siteName: lang === "ne" ? site.nepaliName : site.name,
      title: d.title,
      description: d.description,
      url: absoluteUrl(lang, "/"),
      images: [{ url: "/images/office-2.jpg", width: 1600, height: 800, alt: site.legalName }],
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    icons: { icon: "/icon.svg" },
  };
}

export const viewport: Viewport = { themeColor: "#0c241e" };

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const services = getServices(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${site.url}/#firm`,
    name: lang === "ne" ? site.nepaliName : site.legalName,
    alternateName: lang === "ne" ? site.legalName : site.nepaliName,
    description: dict.meta.description,
    url: absoluteUrl(lang, "/"),
    telephone: site.phone.tel,
    image: `${site.url}/images/office-2.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "NP",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng },
    areaServed: { "@type": "City", name: "Kathmandu" },
    availableLanguage: ["en", "ne"],
    aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating.score, reviewCount: site.rating.count },
    founder: { "@type": "Person", name: site.advocate.name, jobTitle: dict.firm.advocateTitle },
    sameAs: [site.social.linkedin, site.social.pinterest],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.servicesPage.metaTitle,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(lang, `/services/${s.slug}`) },
      })),
    },
  };

  return (
    <html
      lang={lang}
      className={`${serif.variable} ${sans.variable} ${mukta.variable} ${devaSerif.variable}`}
    >
      <body className="min-h-screen pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest-900 focus:px-5 focus:py-3 focus:text-white"
        >
          {dict.common.skip}
        </a>
        <TopBar lang={lang} dict={dict} />
        <Header
          lang={lang}
          nav={dict.nav}
          services={services.map((s) => ({ slug: s.slug, title: s.title, alt: s.alt }))}
          labels={{
            ...dict.header,
            call: dict.common.call,
            switchLabel: dict.common.switchLabel,
            switchShort: dict.common.switchShort,
          }}
        />
        <main id="main">{children}</main>
        <Footer lang={lang} dict={dict} services={services} />
        <WhatsAppFab label={dict.fab.label} message={dict.fab.message} />
        <MobileActionBar labels={dict.mobileBar} message={dict.fab.message} />
        <RevealObserver />
        <JsonLd data={jsonLd} />
      </body>
    </html>
  );
}
