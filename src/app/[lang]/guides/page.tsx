import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor, hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { guides } from "@/content/guides";
import { CtaBand, PageHero } from "@/components/ui";
import { Rich } from "@/components/Rich";
import { GuideCard } from "@/components/GuideCard";
import { breadcrumbJsonLd, JsonLd } from "@/components/JsonLd";

export async function generateMetadata({ params }: PageProps<"/[lang]/guides">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const g = getDictionary(lang).guidesPage;
  return { title: g.metaTitle, description: g.metaDescription, alternates: alternatesFor(lang, "/guides") };
}

export default async function GuidesPage({ params }: PageProps<"/[lang]/guides">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const g = dict.guidesPage;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { path: "/", name: dict.common.home },
          { path: "/guides", name: g.metaTitle },
        ])}
      />
      <PageHero
        eyebrow={g.eyebrow}
        title={<Rich text={g.title} lang={lang} accent="text-gold-gradient" />}
        lead={g.lead}
        image="/images/notary-writing.jpg"
        crumbs={[{ href: localePath(lang, "/"), label: dict.common.home }, { label: g.metaTitle }]}
      />
      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, i) => (
            <GuideCard key={guide.slug} guide={guide} lang={lang} dict={dict} index={i} />
          ))}
        </div>
        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-forest-500">{g.disclaimer}</p>
      </section>
      <CtaBand lang={lang} dict={dict} />
    </>
  );
}
