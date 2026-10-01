import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Clock, Eye, Landmark, MessagesSquare, Scale, ShieldCheck } from "lucide-react";
import { alternatesFor, hasLocale, localePath } from "@/i18n/config";
import { digits, getDictionary } from "@/i18n";
import { site } from "@/lib/site";
import { CtaBand, Eyebrow, PageHero, ReviewsSection, SectionHeading } from "@/components/ui";
import { Rich } from "@/components/Rich";
import { breadcrumbJsonLd, JsonLd } from "@/components/JsonLd";

const valueIcons = [Scale, Eye, ShieldCheck, Clock];
const factIcons = [Landmark, BadgeCheck, MessagesSquare];

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const a = getDictionary(lang).about;
  return { title: a.metaTitle, description: a.metaDescription, alternates: alternatesFor(lang, "/about") };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const a = dict.about;
  const regs = [
    { label: dict.firm.regs.nbc, value: site.registrations.nbc },
    { label: dict.firm.regs.kmc, value: site.registrations.kmc },
    { label: dict.firm.regs.pan, value: site.registrations.pan },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { path: "/", name: dict.common.home },
          { path: "/about", name: a.metaTitle },
        ])}
      />
      <PageHero
        eyebrow={a.eyebrow}
        title={<Rich text={a.title} lang={lang} accent="text-gold-gradient" />}
        lead={a.lead}
        image="/images/justice-statue.jpg"
        crumbs={[{ href: localePath(lang, "/"), label: dict.common.home }, { label: a.metaTitle }]}
      />

      {/* Story */}
      <section className="container-x grid items-center gap-16 py-24 sm:py-32 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading eyebrow={a.storyEyebrow} title={<Rich text={a.storyTitle} lang={lang} />} />
          <div data-reveal className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-forest-600">
            {a.story.map((para) => (
              <p key={para.slice(0, 24)}>
                <Rich text={para} lang={lang} />
              </p>
            ))}
          </div>
          <blockquote
            data-reveal
            className="mt-10 border-l-2 border-gold-400 pl-6 font-display text-[1.9rem] leading-snug text-forest-800"
          >
            <span lang="en" className="italic">
              “{a.quote}”
            </span>
            <footer className="mt-3 font-sans text-sm not-italic text-forest-500">{a.quoteBy}</footer>
          </blockquote>
        </div>
        <div data-reveal className="relative">
          <div className="absolute -inset-2 -z-10 rotate-2 rounded-[2rem] bg-gold-100 sm:-inset-4" aria-hidden="true" />
          <div className="overflow-hidden rounded-[1.75rem]">
            <Image
              src="/images/office-sign.jpg"
              alt={dict.home.about.signAlt}
              width={1200}
              height={1600}
              sizes="(min-width: 1024px) 520px, 100vw"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </div>
          <p className="mt-4 text-center text-sm text-forest-500">{a.signCaption}</p>
        </div>
      </section>

      {/* Advocate */}
      <section className="relative isolate overflow-hidden bg-forest-900 py-24 sm:py-28">
        <div className="bg-grain absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal className="overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl">
            <Image
              src="/images/office-2.jpg"
              alt={dict.home.about.cardAlt}
              width={1600}
              height={800}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div data-reveal>
            <Eyebrow light>{a.advocateEyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-[3.6rem] leading-[1] text-white">{dict.firm.advocateName}</h2>
            <p className="mt-2 text-gold-300">{a.advocateRole}</p>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-forest-200">{a.advocateBio}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {regs.map((r) => (
                <div key={r.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-forest-300">{r.label}</p>
                  <p className="mt-1 font-display text-[2rem] text-gold-300">{digits(lang, r.value)}</p>
                </div>
              ))}
            </div>
            <Link
              href={localePath(lang, "/contact")}
              className="btn-gold group mt-9 inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold"
            >
              {dict.common.bookConsultation}{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-24 sm:py-32">
        <SectionHeading center eyebrow={a.valuesEyebrow} title={<Rich text={a.valuesTitle} lang={lang} />} />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {a.values.map((v, i) => {
            const Icon = valueIcons[i] ?? Scale;
            return (
              <div
                key={v.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="rounded-3xl border border-forest-900/10 bg-white p-8 transition hover:-translate-y-1 hover:border-gold-300"
              >
                <span className="grid size-14 place-items-center rounded-full bg-parchment text-gold-600">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-[1.9rem] text-forest-900">{v.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-forest-600">{v.text}</p>
              </div>
            );
          })}
        </div>

        <div data-reveal className="mt-16 grid gap-6 rounded-[1.75rem] bg-parchment p-8 sm:p-10 md:grid-cols-3">
          {a.facts.map((f, i) => {
            const Icon = factIcons[i] ?? Landmark;
            return (
              <div key={f.title} className="flex gap-4">
                <Icon className="mt-1 size-6 shrink-0 text-gold-600" />
                <div>
                  <p className="font-semibold text-forest-900">{f.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-forest-600">{f.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ReviewsSection lang={lang} dict={dict} />
      <CtaBand lang={lang} dict={dict} />
    </>
  );
}
