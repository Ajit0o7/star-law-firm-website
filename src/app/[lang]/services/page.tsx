import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheck } from "lucide-react";
import { alternatesFor, hasLocale, localePath } from "@/i18n/config";
import { digits, getDictionary } from "@/i18n";
import { getServices } from "@/lib/services";
import { CtaBand, FaqList, PageHero, SectionHeading } from "@/components/ui";
import { Rich } from "@/components/Rich";
import { breadcrumbJsonLd, faqJsonLd, JsonLd } from "@/components/JsonLd";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = getDictionary(lang).servicesPage;
  return { title: p.metaTitle, description: p.metaDescription, alternates: alternatesFor(lang, "/services") };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const p = dict.servicesPage;
  const services = getServices(lang);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { path: "/", name: dict.common.home },
          { path: "/services", name: p.metaTitle },
        ])}
      />
      <JsonLd data={faqJsonLd(dict.faq)} />
      <PageHero
        eyebrow={p.eyebrow}
        title={<Rich text={p.title} lang={lang} accent="text-gold-gradient" />}
        lead={p.lead}
        image="/images/law-books.jpg"
        crumbs={[{ href: localePath(lang, "/"), label: dict.common.home }, { label: p.metaTitle }]}
      />

      <nav className="sticky top-20 z-30 border-b border-forest-900/10 bg-ivory/95 backdrop-blur" aria-label={p.jump}>
        <div className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-forest-900/10 bg-white px-4 py-2 text-sm font-semibold text-forest-800 transition hover:border-gold-400 hover:text-gold-700"
            >
              <s.icon className="size-4 text-gold-600" />
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="container-x space-y-24 py-24 sm:space-y-32 sm:py-28">
        {services.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            className={`grid scroll-mt-40 items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
              i % 2 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div data-reveal className="relative">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className={`object-cover ${s.image.includes("office-sign") ? "object-[center_35%]" : ""}`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-forest-950/60 to-transparent" />
              </div>
              <span className="absolute -bottom-6 left-8 grid size-20 place-items-center rounded-2xl bg-forest-900 text-gold-300 shadow-xl">
                <s.icon className="size-8" />
              </span>
            </div>
            <div>
              <p className="font-display text-7xl italic !leading-none text-gold-400">
                {digits(lang, String(i + 1).padStart(2, "0"))}
              </p>
              <SectionHeading eyebrow={s.alt} title={s.title} />
              <p data-reveal className="mt-5 text-[1.05rem] leading-relaxed text-forest-600">
                <Rich text={s.intro} lang={lang} />
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.95rem] text-forest-800">
                    <CircleCheck className="mt-0.5 size-4.5 shrink-0 text-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={localePath(lang, `/services/${s.slug}`)}
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-forest-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-700"
              >
                {p.details}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-parchment py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow={dict.home.faq.eyebrow} title={p.faqTitle} />
          <FaqList items={dict.faq} />
        </div>
      </section>

      <CtaBand lang={lang} dict={dict} />
    </>
  );
}
