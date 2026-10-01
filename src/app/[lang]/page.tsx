import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Clock,
  FilePen,
  Gavel,
  HeartHandshake,
  Landmark,
  MapPin,
  MessagesSquare,
  Navigation,
  Phone,
  Plane,
  Stamp,
  Star,
  type LucideIcon,
} from "lucide-react";
import { alternatesFor, hasLocale, localePath } from "@/i18n/config";
import { digits, fmt, getDictionary } from "@/i18n";
import { getServices } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";
import { guides } from "@/content/guides";
import {
  Eyebrow,
  FaqList,
  MapEmbed,
  Marquee,
  ReviewsSection,
  SectionHeading,
  ServiceCard,
  Sparkle,
  Stars,
} from "@/components/ui";
import { Rich } from "@/components/Rich";
import { GuideCard } from "@/components/GuideCard";
import { WhatsAppIcon } from "@/components/icons";
import { faqJsonLd, JsonLd } from "@/components/JsonLd";

const reasonIcons: LucideIcon[] = [MessagesSquare, Landmark, Clock];
const situationIcons: Record<string, LucideIcon> = {
  abroad: Plane,
  property: FilePen,
  dispute: Gavel,
  family: HeartHandshake,
  business: Briefcase,
  certify: Stamp,
};

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { alternates: alternatesFor(lang, "/") };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const h = dict.home;
  const services = getServices(lang);
  const to = (path: string) => localePath(lang, path);
  const advocate = dict.firm.advocateName;

  return (
    <>
      <JsonLd data={faqJsonLd(dict.faq)} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-forest-950">
        <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[70%]">
          <Image
            src="/images/justice-dark.jpg"
            alt={h.heroAlt}
            fill
            priority
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover object-[72%_center]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-forest-950 via-forest-950/55 to-transparent max-lg:via-forest-950/85 max-lg:to-forest-950/60" />
          <div className="absolute inset-0 bg-forest-900/25 mix-blend-color" />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-forest-950 via-forest-950/10 to-transparent" />
        <div className="bg-grain absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
        <div
          className="absolute -left-32 top-1/3 -z-10 size-[30rem] rounded-full bg-gold-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-x relative pb-24 pt-20 sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28">
          <div className="max-w-[46rem] animate-fade-up">
            <p className="inline-flex items-center gap-3 rounded-full border border-gold-300/25 bg-white/[0.04] px-4 py-2 font-caps text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold-200 backdrop-blur">
              <Sparkle className="size-3 text-gold-400" />
              {h.pill}
            </p>
            <h1
              className={`mt-8 font-display tracking-[-0.015em] text-white ${
                lang === "ne"
                  ? "text-[2.9rem] sm:text-[4rem] lg:text-[4.9rem]"
                  : "text-[3.5rem] leading-[0.96] sm:text-[5rem] lg:text-[6.4rem]"
              }`}
            >
              <Rich text={h.title} lang={lang} accent="text-gold-gradient" />
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-forest-100/85">
              <Rich text={fmt(h.lead, { advocate })} lang={lang} strong="font-semibold text-white" />
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={to("/contact")}
                className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold"
              >
                {dict.common.bookConsultation}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${site.phone.tel}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-4 font-semibold text-white backdrop-blur transition hover:border-gold-300 hover:text-gold-200"
              >
                <Phone className="size-4" /> {site.phone.display}
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-forest-200">
              <a
                href={site.rating.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white"
              >
                <Stars />
                <span>
                  {fmt(h.ratingLine, { score: digits(lang, site.rating.score), count: digits(lang, site.rating.count) })}
                </span>
              </a>
              <span className="hidden h-5 w-px bg-white/20 sm:block" />
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-gold-400" /> {h.location}
              </span>
            </div>
          </div>

          <div className="absolute bottom-24 right-8 hidden animate-fade-up items-center gap-4 rounded-2xl border border-white/10 bg-forest-950/50 p-4 pr-6 backdrop-blur-xl [animation-delay:300ms] xl:flex">
            <span className="grid size-12 place-items-center rounded-full bg-linear-to-br from-gold-200 to-gold-500 text-forest-950">
              <BadgeCheck className="size-6" />
            </span>
            <span>
              <span className="block font-display text-xl leading-tight text-white">{advocate}</span>
              <span className="block text-xs text-forest-200">{fmt(h.badge, { title: dict.firm.advocateTitle })}</span>
            </span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-x border-b border-forest-900/10 py-16 sm:py-20">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {h.stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className={`px-2 text-center ${i > 0 ? "lg:border-l lg:border-forest-900/10" : ""} ${
                i % 2 ? "max-lg:border-l max-lg:border-forest-900/10" : ""
              }`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="font-display text-[3.6rem] leading-none text-forest-900 sm:text-[4.4rem]">
                  {s.value}
                  {"suffix" in s && s.suffix && (
                    <span className="ml-1 align-top text-[0.45em] text-gold-500">{s.suffix}</span>
                  )}
                </span>
                <span className="mx-auto mt-3 block max-w-[14rem] text-sm leading-snug text-forest-500">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ABOUT */}
      <section className="container-x grid items-center gap-16 py-24 sm:py-32 lg:grid-cols-2">
        <div data-reveal className="relative mx-auto w-full max-w-xl pb-24 sm:pb-28">
          <div className="absolute -left-6 -top-6 hidden size-40 rounded-full border border-gold-300/70 sm:block" aria-hidden="true" />
          <div className="relative w-[78%] overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-40px_rgb(12_36_30/0.55)]">
            <Image
              src="/images/office-sign.jpg"
              alt={h.about.signAlt}
              width={1200}
              height={1600}
              sizes="(min-width: 1024px) 440px, 78vw"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[72%] overflow-hidden rounded-2xl border-[6px] border-white bg-white shadow-2xl">
            <Image
              src="/images/office-2.jpg"
              alt={h.about.cardAlt}
              width={1600}
              height={800}
              sizes="(min-width: 1024px) 420px, 72vw"
              className="h-auto w-full"
            />
          </div>
          <a
            href={site.rating.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 top-10 rounded-2xl bg-forest-900 px-5 py-4 text-white shadow-xl transition hover:-translate-y-0.5 sm:right-4"
          >
            <p className="flex items-baseline gap-2">
              <span className="font-display text-5xl !leading-none text-gold-300">{digits(lang, site.rating.score)}</span>
              <Star className="size-4 fill-gold-400 text-gold-400" />
            </p>
            <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest-200">
              {h.about.ratingBadge}
            </p>
          </a>
        </div>

        <div>
          <SectionHeading eyebrow={h.about.eyebrow} title={<Rich text={h.about.title} lang={lang} />} />
          <div data-reveal>
            <p className="mt-7 text-[1.06rem] leading-relaxed text-forest-600">{h.about.text}</p>
            <ul className="mt-9 space-y-5">
              {h.about.reasons.map((r, i) => {
                const Icon = reasonIcons[i] ?? Sparkle;
                return (
                  <li key={r.title} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold-300 text-gold-600">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-display text-[1.45rem] leading-tight text-forest-900">{r.title}</span>
                      <span className="mt-1 block text-[0.95rem] leading-relaxed text-forest-600">{r.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-forest-900/10 pt-8">
              <div>
                <p className="font-display text-[1.9rem] italic leading-none text-forest-900">{advocate}</p>
                <p className="mt-2 text-sm text-forest-500">
                  {dict.firm.advocateTitle} · {dict.firm.founder}
                </p>
              </div>
              <Link
                href={to("/about")}
                className="group ml-auto inline-flex items-center gap-2 rounded-full border border-forest-900 px-6 py-3 text-sm font-semibold text-forest-900 transition hover:bg-forest-900 hover:text-white"
              >
                {h.about.more} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={dict.marquee} label={dict.footer.practiceAreas} />

      {/* SERVICES */}
      <section className="bg-parchment py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={h.services.eyebrow}
              title={<Rich text={h.services.title} lang={lang} />}
              lead={h.services.lead}
            />
            <Link
              href={to("/services")}
              className="group inline-flex shrink-0 items-center gap-3 font-semibold text-forest-900 hover:text-gold-700"
            >
              {h.services.viewAll}
              <span className="grid size-10 place-items-center rounded-full border border-forest-900/20 transition group-hover:border-gold-400 group-hover:bg-gold-400">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </div>
          <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} lang={lang} learnMore={dict.common.learnMore} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS (pattern from notarykathmandu.com "How it works") */}
      <section id="process" className="container-x py-24 sm:py-32">
        <SectionHeading
          center
          eyebrow={h.process.eyebrow}
          title={<Rich text={h.process.title} lang={lang} />}
          lead={h.process.lead}
        />
        <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {h.process.steps.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className="group relative rounded-[1.75rem] border border-forest-900/[0.08] bg-white p-8 transition duration-500 hover:-translate-y-1 hover:border-gold-300"
            >
              <span className="font-display text-[4.5rem] italic !leading-none text-gold-400">
                {digits(lang, String(i + 1).padStart(2, "0"))}
              </span>
              <span className="mt-6 block h-px w-12 bg-gold-400 transition-all duration-500 group-hover:w-24" />
              <h3 className="mt-6 font-display text-[1.85rem] leading-tight text-forest-900">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-forest-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* SITUATIONS */}
      <section className="container-x pb-24 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={h.situations.eyebrow}
              title={<Rich text={h.situations.title} lang={lang} />}
              lead={h.situations.lead}
            />
            <div data-reveal className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[1.75rem] lg:block">
              <Image src="/images/kathmandu.jpg" alt={h.situations.bannerAlt} fill sizes="520px" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-7 font-display text-[1.9rem] leading-[1.08] text-white">
                <Rich text={h.situations.banner} lang={lang} accent="text-gold-gradient" />
              </p>
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {h.situations.items.map((x, i) => {
              const Icon = situationIcons[x.key] ?? Gavel;
              return (
                <li key={x.key} data-reveal style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}>
                  <Link
                    href={to(`/services/${x.slug}`)}
                    className="group flex h-full flex-col rounded-[1.5rem] border border-forest-900/[0.08] bg-white p-7 transition duration-500 hover:-translate-y-1 hover:border-gold-300 hover:shadow-[0_30px_60px_-35px_rgb(12_36_30/0.45)]"
                  >
                    <span className="grid size-12 place-items-center rounded-xl bg-forest-900 text-gold-300 transition-colors duration-500 group-hover:bg-gold-400 group-hover:text-forest-950">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-6 font-display text-[1.7rem] leading-[1.1] text-forest-900">{x.q}</h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-forest-600">{x.a}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-700">
                      {x.service}
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ReviewsSection lang={lang} dict={dict} />

      {/* GUIDES */}
      <section className="container-x py-24 sm:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={h.guides.eyebrow}
            title={<Rich text={h.guides.title} lang={lang} />}
            lead={h.guides.lead}
          />
          <Link
            href={to("/guides")}
            className="group inline-flex shrink-0 items-center gap-3 font-semibold text-forest-900 hover:text-gold-700"
          >
            {h.guides.viewAll}
            <span className="grid size-10 place-items-center rounded-full border border-forest-900/20 transition group-hover:border-gold-400 group-hover:bg-gold-400">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {guides.map((g, i) => (
            <GuideCard key={g.slug} guide={g} lang={lang} dict={dict} index={i} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-parchment">
        <div className="container-x grid gap-14 py-24 sm:py-32 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow={h.faq.eyebrow} title={<Rich text={h.faq.title} lang={lang} />} lead={h.faq.lead} />
            <a
              data-reveal
              href={whatsappLink(h.faq.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-700"
            >
              <WhatsAppIcon className="size-4 text-[#25D366]" /> {h.faq.ask}
            </a>
          </div>
          <FaqList items={dict.faq} />
        </div>
      </section>

      {/* VISIT */}
      <section className="py-24 sm:py-28">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div
            data-reveal
            className="relative isolate flex flex-col overflow-hidden rounded-[1.75rem] bg-forest-900 p-8 text-white sm:p-10"
          >
            <div className="bg-grain absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
            <Eyebrow light>{h.visit.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-[2.6rem] leading-[1.05]">
              <Rich text={h.visit.title} lang={lang} accent="text-gold-gradient" />
            </h2>
            <ul className="mt-8 space-y-6 text-forest-100">
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-gold-400" />
                <span>
                  {dict.firm.addressLine1}, {dict.firm.addressLine2}
                  <br />
                  <span className="text-sm text-forest-300">
                    {dict.firm.region} · {dict.firm.plusCode} {site.address.plusCode}
                  </span>
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-gold-400" />
                <a href={`tel:${site.phone.tel}`} className="hover:text-gold-300">
                  {site.phone.display}
                </a>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 size-5 shrink-0 text-gold-400" />
                <span>
                  {dict.firm.hours.map((hr) => (
                    <span key={hr.days} className="block">
                      <span className="text-forest-300">{hr.days}:</span> {hr.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
            <div className="mt-auto flex flex-wrap gap-3 pt-10">
              <a
                href={site.address.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                <Navigation className="size-4" /> {h.visit.getDirections}
              </a>
              <Link
                href={to("/contact")}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold transition hover:border-gold-300 hover:text-gold-200"
              >
                {h.visit.sendMessage}
              </Link>
            </div>
          </div>
          <MapEmbed className="min-h-[26rem]" title={`${site.name}, ${dict.firm.addressLine1}`} />
        </div>
      </section>
    </>
  );
}
