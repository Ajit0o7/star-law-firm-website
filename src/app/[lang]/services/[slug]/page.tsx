import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheck, Clock, FileText, MapPin, Phone, Users } from "lucide-react";
import { absoluteUrl, alternatesFor, hasLocale, localePath, locales } from "@/i18n/config";
import { fmt, getDictionary } from "@/i18n";
import { getService, getServices } from "@/lib/services";
import { serviceMeta } from "@/lib/service-meta";
import { site, whatsappLink } from "@/lib/site";
import { guides } from "@/content/guides";
import { CtaBand, Eyebrow, PageHero, ServiceCard } from "@/components/ui";
import { Rich } from "@/components/Rich";
import { GuideCard } from "@/components/GuideCard";
import { WhatsAppIcon } from "@/components/icons";
import { breadcrumbJsonLd, JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.flatMap((lang) => serviceMeta.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const service = getService(lang, slug);
  if (!service) return {};
  return {
    title: fmt(getDictionary(lang).service.metaTitle, { service: service.title }),
    description: service.summary,
    alternates: alternatesFor(lang, `/services/${slug}`),
  };
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const service = getService(lang, slug);
  if (!service) notFound();

  const dict = getDictionary(lang);
  const t = dict.service;
  const services = getServices(lang);
  const Icon = service.icon;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const relatedGuides = guides.filter((g) => g.services.includes(service.slug));
  const path = `/services/${service.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { path: "/", name: dict.common.home },
          { path: "/services", name: dict.servicesPage.metaTitle },
          { path, name: service.title },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: absoluteUrl(lang, path),
          areaServed: { "@type": "City", name: "Kathmandu" },
          provider: { "@id": `${site.url}/#firm` },
        }}
      />
      <PageHero
        eyebrow={service.alt}
        title={service.title}
        lead={service.summary}
        image={service.image}
        crumbs={[
          { href: localePath(lang, "/"), label: dict.common.home },
          { href: localePath(lang, "/services"), label: dict.servicesPage.metaTitle },
          { label: service.title },
        ]}
      />

      <div className="container-x grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.6fr_1fr]">
        <article>
          <span className="grid size-16 place-items-center rounded-2xl bg-forest-900 text-gold-300">
            <Icon className="size-7" />
          </span>
          <p className="mt-8 font-display text-[1.75rem] leading-snug text-forest-800 sm:text-[2.1rem]">
            <Rich text={service.intro} lang={lang} />
          </p>

          <div className="gold-rule my-12" />

          <Eyebrow>{t.whatWeHelp}</Eyebrow>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-forest-900/10 bg-white p-5">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-gold-500" />
                <span className="font-medium text-forest-800">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-parchment p-7">
              <div className="flex items-center gap-3">
                <FileText className="size-5 text-gold-600" />
                <h2 className="font-display text-[1.8rem] text-forest-900">{t.bring}</h2>
              </div>
              <ul className="mt-5 space-y-3">
                {service.bring.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[0.95rem] text-forest-700">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-500" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-parchment p-7">
              <div className="flex items-center gap-3">
                <Users className="size-5 text-gold-600" />
                <h2 className="font-display text-[1.8rem] text-forest-900">{t.idealFor}</h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.idealFor.map((p) => (
                  <span key={p} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest-800">
                    {p}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-forest-600">{t.idealNote}</p>
            </div>
          </div>

          {relatedGuides.length > 0 && (
            <div className="mt-14">
              <Eyebrow>{t.relatedGuides}</Eyebrow>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {relatedGuides.map((g, i) => (
                  <GuideCard key={g.slug} guide={g} lang={lang} dict={dict} index={i} />
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="lg:pt-2">
          <div className="sticky top-28 space-y-6">
            <div className="overflow-hidden rounded-3xl bg-forest-900 text-white">
              <div className="relative h-40">
                <Image src="/images/office-2.jpg" alt="" fill sizes="400px" className="object-cover object-left" />
              </div>
              <div className="p-7">
                <p className="font-caps text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">{t.talk}</p>
                <p className="mt-3 font-display text-[1.9rem] leading-tight">{dict.firm.advocateName}</p>
                <p className="text-sm text-forest-300">{dict.firm.advocateTitle}</p>
                <div className="mt-6 grid gap-3">
                  <a
                    href={`tel:${site.phone.tel}`}
                    className="btn-gold flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold"
                  >
                    <Phone className="size-4" /> {site.phone.display}
                  </a>
                  <a
                    href={whatsappLink(fmt(t.waMessage, { service: service.title }))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-white/20 py-3.5 text-sm font-semibold transition hover:border-gold-300"
                  >
                    <WhatsAppIcon className="size-4 text-[#25D366]" /> {t.whatsappUs}
                  </a>
                </div>
                <ul className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm text-forest-200">
                  <li className="flex gap-3">
                    <MapPin className="size-4 shrink-0 text-gold-400" />
                    {dict.firm.addressLine1}, {dict.firm.addressLine2}
                  </li>
                  <li className="flex gap-3">
                    <Clock className="size-4 shrink-0 text-gold-400" />
                    {dict.firm.hours[0].days}: {dict.firm.hours[0].time}
                  </li>
                </ul>
              </div>
            </div>

            <nav className="rounded-3xl border border-forest-900/10 bg-white p-4" aria-label={t.otherAreas}>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={localePath(lang, `/services/${s.slug}`)}
                  aria-current={s.slug === service.slug ? "page" : undefined}
                  className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    s.slug === service.slug ? "bg-forest-900 text-white" : "text-forest-800 hover:bg-parchment"
                  }`}
                >
                  {s.title}
                  <ArrowRight className="size-4 shrink-0 opacity-60" />
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      <section className="bg-parchment py-20">
        <div className="container-x">
          <Eyebrow>{t.related}</Eyebrow>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((s) => (
              <ServiceCard
                key={s.slug}
                service={s}
                index={services.indexOf(s)}
                lang={lang}
                learnMore={dict.common.learnMore}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} dict={dict} />
    </>
  );
}
