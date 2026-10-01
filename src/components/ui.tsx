import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone, Plus, Star } from "lucide-react";
import { reviews, site, whatsappLink } from "@/lib/site";
import type { Service } from "@/lib/services";
import { localePath, type Locale } from "@/i18n/config";
import { digits, fmt, type Dictionary } from "@/i18n";
import { WhatsAppIcon } from "./icons";
import { Rich } from "./Rich";

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  // Letter-spacing breaks Devanagari conjuncts, so Nepali eyebrows get their own font and no tracking.
  const deva = typeof children === "string" && /[ऀ-ॿ]/.test(children);
  return (
    <p
      className={`flex items-center gap-3 font-semibold ${
        deva ? "font-deva text-base" : "keep-tracking font-caps text-[0.72rem] uppercase tracking-[0.26em]"
      } ${light ? "text-gold-300" : "text-gold-600"}`}
    >
      {children}
    </p>
  );
}

/** Four-point star used as an ornament, echoing the star in the firm's emblem. */
export function Sparkle({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div data-reveal className={center ? "mx-auto max-w-3xl text-center [&>p:first-child]:justify-center" : "max-w-2xl"}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-5 font-display text-[2.7rem] leading-[1.02] tracking-[-0.01em] sm:text-[3.6rem] ${
          light ? "text-white" : "text-forest-900"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-6 text-[1.06rem] leading-relaxed ${center ? "mx-auto max-w-2xl" : ""} ${
            light ? "text-forest-200" : "text-forest-600"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

export function Stars({ className = "size-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} fill-gold-400 text-gold-400`} />
      ))}
    </span>
  );
}

export function ServiceCard({
  service,
  index,
  lang,
  learnMore,
}: {
  service: Service;
  index: number;
  lang: Locale;
  learnMore: string;
}) {
  const Icon = service.icon;
  return (
    <Link
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}
      href={localePath(lang, `/services/${service.slug}`)}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-forest-900/[0.07] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-35px_rgb(12_36_30/0.45)]"
    >
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            className={`object-cover transition duration-[1.4s] ease-out group-hover:scale-[1.06] ${
              service.image.includes("office-sign") ? "object-[center_38%]" : ""
            }`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-forest-950/75 via-transparent to-forest-950/45" />
          <span className="absolute left-6 top-5 font-display text-3xl italic text-white">
            {digits(lang, String(index + 1).padStart(2, "0"))}
          </span>
        </div>
        <span className="absolute bottom-0 right-6 grid size-14 translate-y-1/2 place-items-center rounded-2xl bg-forest-900 text-gold-300 ring-[5px] ring-white transition-colors duration-500 group-hover:bg-gold-400 group-hover:text-forest-950">
          <Icon className="size-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7 pt-8">
        <p className={`text-sm text-gold-600 ${lang === "en" ? "font-deva" : ""}`}>{service.alt}</p>
        <h3 className="mt-1.5 font-display text-[1.95rem] leading-[1.06] text-forest-900">{service.title}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-forest-600">{service.summary}</p>
        <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-forest-900">
          <span className="grid size-9 place-items-center rounded-full border border-forest-900/15 transition duration-300 group-hover:border-gold-400 group-hover:bg-gold-400">
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
          {learnMore}
        </span>
      </div>
    </Link>
  );
}

export function Marquee({ items, label }: { items: string[]; label: string }) {
  return (
    <div
      className="relative overflow-hidden bg-forest-950 py-6"
      aria-label={label}
    >
      <div className="bg-grain absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((k) => (
          <ul key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">
            {items.map((t) => (
              <li key={t} className="flex items-center gap-10 pr-10">
                <span className="whitespace-nowrap font-display text-[2rem] italic text-gold-200 sm:text-[2.4rem]">
                  {t}
                </span>
                <Sparkle className="size-4 text-gold-500" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      </div>
    </div>
  );
}

export function ReviewsSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const r = dict.reviews;
  return (
    <section id="reviews" className="relative isolate overflow-hidden bg-forest-900 py-24 sm:py-32">
      <div className="bg-grain absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div className="absolute -left-40 top-0 -z-10 size-[34rem] rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-40 bottom-0 -z-10 size-[28rem] rounded-full bg-forest-400/15 blur-3xl" aria-hidden="true" />
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            light
            eyebrow={r.eyebrow}
            title={<Rich text={r.title} lang={lang} accent="text-gold-gradient" />}
            lead={r.lead}
          />
          <a
            data-reveal
            href={site.rating.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur transition hover:border-gold-400/50"
          >
            <span className="font-display text-7xl leading-none text-white">{digits(lang, site.rating.score)}</span>
            <span>
              <Stars className="size-5" />
              <span className="mt-2 flex items-center gap-1 text-sm text-forest-200">
                {fmt(r.count, { count: digits(lang, site.rating.count) })} <ArrowUpRight className="size-3.5" />
              </span>
            </span>
          </a>
        </div>

        <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3">
          {reviews.map((rv, i) => (
            <figure
              key={rv.name}
              lang="en"
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
              className="mb-6 break-inside-avoid rounded-[1.75rem] border border-white/[0.08] bg-linear-to-b from-white/[0.06] to-white/[0.02] p-8"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-7xl leading-[0.6] text-gold-400/70" aria-hidden="true">
                  “
                </span>
                <Stars className="size-3.5" />
              </div>
              <blockquote className="mt-5 font-display text-[1.4rem] leading-[1.35] text-forest-50">{rv.text}</blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="grid size-10 place-items-center rounded-full bg-linear-to-br from-gold-300 to-gold-500 font-display text-lg text-forest-950">
                  {rv.name.charAt(0).toUpperCase()}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{rv.name}</span>
                  <span className="block text-xs text-forest-300" lang={lang}>
                    {rv.localGuide ? `${dict.common.localGuide} · ` : ""}
                    {dict.common.googleReview}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        {dict.common.reviewsLanguageNote && (
          <p className="mt-4 text-sm text-forest-300">{dict.common.reviewsLanguageNote}</p>
        )}
      </div>
    </section>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div data-reveal className="divide-y divide-forest-900/10 border-y border-forest-900/10">
      {items.map((f, i) => (
        <details key={f.q} className="group py-2" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[1.6rem] leading-tight text-forest-900 transition-colors group-hover:text-gold-700 sm:text-[1.85rem]">
              {f.q}
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-forest-900/15 text-forest-900 transition-all duration-300 group-open:rotate-45 group-open:border-gold-400 group-open:bg-gold-400">
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-14 leading-relaxed text-forest-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const c = dict.cta;
  return (
    <section className="container-x py-24">
      <div data-reveal className="relative isolate overflow-hidden rounded-[2rem] bg-forest-900 px-8 py-16 sm:px-14 lg:py-24">
        <Image
          src="/images/justice-statue.jpg"
          alt=""
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="-z-10 object-cover object-right opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950 via-forest-900/95 to-forest-900/30" />
        <div className="bg-grain absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <div className="max-w-2xl">
          <Eyebrow light>{c.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[2.7rem] leading-[1.02] text-white sm:text-[3.8rem]">
            <Rich text={c.title} lang={lang} accent="text-gold-gradient" />
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-forest-200">
            {c.text}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`tel:${site.phone.tel}`}
              className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold"
            >
              <Phone className="size-4" /> {site.phone.display}
            </a>
            <a
              href={whatsappLink(c.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 font-semibold text-white transition hover:border-gold-300 hover:text-gold-200"
            >
              <WhatsAppIcon className="size-4" /> {c.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  image: string;
  crumbs: { href?: string; label: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950 via-forest-950/85 to-forest-950/25" />
      <div className="bg-grain absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div className="container-x py-20 sm:py-28">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-forest-300">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {i > 0 && <Sparkle className="size-2 text-gold-500" />}
              {c.href ? (
                <Link href={c.href} className="hover:text-gold-300">
                  {c.label}
                </Link>
              ) : (
                <span className="text-gold-300">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="max-w-3xl animate-fade-up">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-display text-[3.3rem] leading-[1] tracking-[-0.01em] text-white sm:text-7xl lg:text-[5.6rem]">
            {title}
          </h1>
          {lead && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-forest-200">{lead}</p>}
        </div>
      </div>
    </section>
  );
}

export function MapEmbed({ className = "", title }: { className?: string; title: string }) {
  return (
    <div data-reveal className={`overflow-hidden rounded-[1.75rem] border border-forest-900/10 bg-parchment ${className}`}>
      <iframe
        title={title}
        src={site.address.embedUrl}
        className="h-full min-h-80 w-full grayscale-[0.4]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
