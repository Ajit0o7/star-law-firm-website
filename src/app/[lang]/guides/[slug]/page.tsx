import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, Phone } from "lucide-react";
import { absoluteUrl, alternatesFor, hasLocale, localePath, locales, ogLocale } from "@/i18n/config";
import { digits, fmt, getDictionary } from "@/i18n";
import { getGuide, guides, type Block } from "@/content/guides";
import { getServices } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";
import { Eyebrow, Sparkle } from "@/components/ui";
import { Rich } from "@/components/Rich";
import { GuideCard } from "@/components/GuideCard";
import { WhatsAppIcon } from "@/components/icons";
import { articleJsonLd, breadcrumbJsonLd, JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.flatMap((lang) => guides.map((g) => ({ lang, slug: g.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/guides/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const guide = getGuide(slug);
  if (!guide) return {};
  const g = guide.content[lang];
  return {
    title: g.title,
    description: g.description,
    alternates: alternatesFor(lang, `/guides/${slug}`),
    openGraph: {
      type: "article",
      title: g.title,
      description: g.description,
      url: absoluteUrl(lang, `/guides/${slug}`),
      images: [{ url: guide.image }],
      locale: ogLocale[lang],
      publishedTime: guide.date,
    },
  };
}

const sectionId = (i: number) => `section-${i + 1}`;

function Blocks({ blocks, lang }: { blocks: Block[]; lang: "en" | "ne" }) {
  let h2Index = -1;
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            h2Index += 1;
            return (
              <h2
                key={i}
                id={sectionId(h2Index)}
                className="mt-14 scroll-mt-28 font-display text-[2.1rem] leading-tight text-forest-900 first:mt-0 sm:text-[2.4rem]"
              >
                {b.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="mt-5 text-[1.075rem] leading-[1.8] text-forest-700">
                <Rich text={b.text} lang={lang} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-6 space-y-3">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[1.05rem] leading-relaxed text-forest-700">
                    <Sparkle className="mt-2 size-2.5 shrink-0 text-gold-500" />
                    <span>
                      <Rich text={it} lang={lang} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-6 space-y-4">
                {b.items.map((it, n) => (
                  <li key={it} className="flex gap-4 text-[1.05rem] leading-relaxed text-forest-700">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-forest-900 font-display text-lg text-gold-300">
                      {digits(lang, n + 1)}
                    </span>
                    <span className="pt-0.5">
                      <Rich text={it} lang={lang} />
                    </span>
                  </li>
                ))}
              </ol>
            );
        }
      })}
    </>
  );
}

export default async function GuidePage({ params }: PageProps<"/[lang]/guides/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const guide = getGuide(slug);
  if (!guide) notFound();

  const dict = getDictionary(lang);
  const gp = dict.guidesPage;
  const g = guide.content[lang];
  const path = `/guides/${guide.slug}`;
  const headings = g.blocks.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const relatedServices = getServices(lang).filter((s) => guide.services.includes(s.slug));
  const others = guides.filter((x) => x.slug !== guide.slug);
  const date = new Date(guide.date).toLocaleDateString(lang === "ne" ? "ne-NP" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd
        data={articleJsonLd(lang, { path, title: g.title, description: g.description, image: guide.image, date: guide.date })}
      />
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { path: "/", name: dict.common.home },
          { path: "/guides", name: gp.metaTitle },
          { path, name: g.title },
        ])}
      />

      <section className="relative isolate overflow-hidden bg-forest-950">
        <Image src={guide.image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950 via-forest-950/90 to-forest-950/50" />
        <div className="bg-grain absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="container-x py-20 sm:py-24">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-forest-300">
            <Link href={localePath(lang, "/")} className="hover:text-gold-300">
              {dict.common.home}
            </Link>
            <Sparkle className="size-2 text-gold-500" />
            <Link href={localePath(lang, "/guides")} className="hover:text-gold-300">
              {gp.metaTitle}
            </Link>
          </nav>
          <div className="max-w-3xl animate-fade-up">
            <Eyebrow light>{gp.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-display text-[2.8rem] leading-[1.04] text-white sm:text-[3.8rem] lg:text-[4.4rem]">
              {g.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-forest-200">{g.description}</p>
            <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-forest-300">
              <span>{gp.by}</span>
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4 text-gold-400" />
                {gp.published} <time dateTime={guide.date}>{date}</time>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="size-4 text-gold-400" />
                {fmt(dict.common.minRead, { n: digits(lang, guide.minutes) })}
              </span>
            </p>
          </div>
        </div>
      </section>

      <div className="container-x grid gap-14 py-20 sm:py-24 lg:grid-cols-[1fr_20rem]">
        <article className="max-w-3xl">
          <Blocks blocks={g.blocks} lang={lang} />
          <p className="mt-14 rounded-2xl border border-forest-900/10 bg-parchment p-6 text-sm leading-relaxed text-forest-600">
            {gp.disclaimer}
          </p>
        </article>

        <aside>
          <div className="sticky top-28 space-y-6">
            <nav className="rounded-3xl border border-forest-900/10 bg-white p-6" aria-label={gp.onThisPage}>
              <p className="font-caps text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{gp.onThisPage}</p>
              <ol className="mt-4 space-y-2.5 text-sm">
                {headings.map((h, i) => (
                  <li key={h.text}>
                    <a href={`#${sectionId(i)}`} className="text-forest-700 transition-colors hover:text-gold-700">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {relatedServices.length > 0 && (
              <div className="rounded-3xl border border-forest-900/10 bg-white p-6">
                <p className="font-caps text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{gp.related}</p>
                <ul className="mt-4 space-y-2">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={localePath(lang, `/services/${s.slug}`)}
                        className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-forest-800 transition hover:bg-parchment"
                      >
                        <span className="flex items-center gap-2.5">
                          <s.icon className="size-4 text-gold-600" />
                          {s.title}
                        </span>
                        <ArrowRight className="size-4 shrink-0 opacity-60" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="relative isolate overflow-hidden rounded-3xl bg-forest-900 p-6 text-white">
              <div className="bg-grain absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
              <p className="font-display text-[1.7rem] leading-tight">{gp.helpTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-forest-200">{gp.helpText}</p>
              <div className="mt-5 grid gap-2.5">
                <a
                  href={whatsappLink(fmt(dict.service.waMessage, { service: g.title }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-semibold transition hover:border-gold-300"
                >
                  <Phone className="size-4" /> {site.phone.display}
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="bg-parchment py-20">
          <div className="container-x">
            <Eyebrow>{gp.more}</Eyebrow>
            <div className="mt-8 grid gap-7 md:grid-cols-2">
              {others.map((o, i) => (
                <GuideCard key={o.slug} guide={o} lang={lang} dict={dict} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
