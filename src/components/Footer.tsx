import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { LogoMark } from "./Logo";
import { LinkedInIcon, PinterestIcon, WhatsAppIcon } from "./icons";
import { Rich } from "./Rich";
import { localePath, type Locale } from "@/i18n/config";
import { digits, type Dictionary } from "@/i18n";
import { site, whatsappLink } from "@/lib/site";
import type { Service } from "@/lib/services";

export function Footer({ lang, dict, services }: { lang: Locale; dict: Dictionary; services: Service[] }) {
  const f = dict.footer;
  const regs = [
    { label: dict.firm.regs.nbc, value: site.registrations.nbc },
    { label: dict.firm.regs.kmc, value: site.registrations.kmc },
    { label: dict.firm.regs.pan, value: site.registrations.pan },
  ];
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-forest-100">
      <div className="bg-grain absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 border-b border-white/10 py-16 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-3xl font-display text-[3rem] leading-[1.02] text-white sm:text-[4.6rem]">
            <Rich text={f.statement} lang={lang} accent="text-gold-gradient" />
          </p>
          <Link
            href={localePath(lang, "/contact")}
            className="btn-gold inline-flex shrink-0 items-center gap-2 self-start rounded-full px-8 py-4 font-semibold lg:self-auto"
          >
            {dict.common.bookConsultation}
          </Link>
        </div>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="size-14" />
              <div className="leading-none">
                <p className="keep-tracking font-display text-[1.9rem] tracking-[0.16em] text-white">STAR</p>
                <p className="keep-tracking mt-1.5 font-caps text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold-400">
                  Access to Justice · Law Firm
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-forest-200">{f.blurb}</p>
            <p className="mt-3 font-deva text-sm text-gold-300">{site.nepaliName}</p>
            <div className="mt-6 flex gap-3">
              {[
                { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
                { href: site.social.pinterest, label: "Pinterest", Icon: PinterestIcon },
                { href: whatsappLink(), label: "WhatsApp", Icon: WhatsAppIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-forest-100 transition hover:border-gold-400 hover:text-gold-300"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-caps text-sm font-semibold uppercase tracking-[0.18em] text-gold-400">{f.explore}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {dict.nav.map((n) => (
                <li key={n.href}>
                  <Link href={localePath(lang, n.href)} className="transition-colors hover:text-gold-300">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-caps text-sm font-semibold uppercase tracking-[0.18em] text-gold-400">
              {f.practiceAreas}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={localePath(lang, `/services/${s.slug}`)} className="transition-colors hover:text-gold-300">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-caps text-sm font-semibold uppercase tracking-[0.18em] text-gold-400">{f.visit}</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">
                  {dict.firm.addressLine1}
                  <br />
                  {dict.firm.addressLine2}
                  <br />
                  {dict.firm.region}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <a href={`tel:${site.phone.tel}`} className="hover:text-gold-300">
                  {site.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <span>
                  {dict.firm.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-rule opacity-40" />

        <div className="flex flex-col gap-4 py-7 text-xs text-forest-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {digits(lang, new Date().getFullYear())} {lang === "ne" ? site.nepaliName : site.legalName}. {f.rights}
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            {regs.map((r) => (
              <span key={r.label}>
                {r.label} <span className="text-gold-300">{digits(lang, r.value)}</span>
              </span>
            ))}
          </p>
        </div>
        <p className="pb-8 text-[0.7rem] leading-relaxed text-forest-400">{f.disclaimer}</p>
      </div>
    </footer>
  );
}
