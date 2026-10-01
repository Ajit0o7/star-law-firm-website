"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitch } from "./LanguageSwitch";
import { localePath, stripLocale, type Locale } from "@/i18n/config";
import { iconFor } from "@/lib/service-meta";
import { site } from "@/lib/site";

type NavItem = { href: string; label: string };
type ServiceLink = { slug: string; title: string; alt: string };

export function Header({
  lang,
  nav,
  services,
  labels,
}: {
  lang: Locale;
  nav: NavItem[];
  services: ServiceLink[];
  labels: { practiceAreas: string; openMenu: string; closeMenu: string; call: string; switchLabel: string; switchShort: string };
}) {
  const pathname = usePathname() ?? "/";
  const path = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? path === "/" : !href.includes("#") && path.startsWith(href));
  const to = (href: string) => localePath(lang, href);
  const deva = lang === "ne" ? "font-deva" : "";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-forest-900/10 bg-white/90 shadow-[0_8px_30px_-12px_rgb(12_35_29/0.25)] backdrop-blur-md"
          : "border-transparent bg-ivory"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo href={to("/")} />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {nav.map((item) =>
            item.href === "/services" ? (
              <div key={item.href} className="group relative">
                <Link
                  href={to(item.href)}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] font-semibold transition-colors ${deva} ${
                    isActive(item.href) ? "text-gold-600" : "text-forest-800 hover:text-gold-600"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-[36rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-forest-900/10 bg-white p-3 shadow-2xl shadow-forest-900/15">
                    {services.map((s) => {
                      const Icon = iconFor(s.slug);
                      return (
                        <Link
                          key={s.slug}
                          href={to(`/services/${s.slug}`)}
                          className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-parchment"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-forest-900 text-gold-300">
                            <Icon className="size-4.5" />
                          </span>
                          <span>
                            <span className={`block text-sm font-semibold text-forest-900 ${deva}`}>{s.title}</span>
                            <span className={`text-xs text-forest-400 ${lang === "en" ? "font-deva" : ""}`}>{s.alt}</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={to(item.href)}
                className={`rounded-full px-3.5 py-2 text-[0.92rem] font-semibold transition-colors ${deva} ${
                  isActive(item.href) ? "text-gold-600" : "text-forest-800 hover:text-gold-600"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone.tel}`}
            className="hidden items-center gap-2 rounded-full bg-forest-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-700 sm:flex"
          >
            <Phone className="size-4 text-gold-300" />
            {site.phone.display}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-forest-900/15 text-forest-900 lg:hidden"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-ivory transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="container-x flex flex-col py-6" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={to(item.href)}
              onClick={() => setOpen(false)}
              className={`border-b border-forest-900/10 py-4 font-display text-[2rem] text-forest-900 ${deva}`}
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitch
            lang={lang}
            label={labels.switchLabel}
            short={labels.switchShort}
            className="mt-6 self-start rounded-full border border-forest-900/15 px-4 py-2 text-sm text-forest-900"
          />
          <p className={`mt-8 text-xs font-bold uppercase tracking-[0.2em] text-gold-600 ${deva}`}>
            {labels.practiceAreas}
          </p>
          <div className="mt-3 grid gap-2">
            {services.map((s) => {
              const Icon = iconFor(s.slug);
              return (
                <Link
                  key={s.slug}
                  href={to(`/services/${s.slug}`)}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl bg-white p-3"
                >
                  <Icon className="size-5 text-gold-600" />
                  <span className={`text-sm font-semibold text-forest-900 ${deva}`}>{s.title}</span>
                </Link>
              );
            })}
          </div>
          <a
            href={`tel:${site.phone.tel}`}
            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-forest-900 py-4 font-semibold text-white"
          >
            <Phone className="size-4 text-gold-300" /> {labels.call} {site.phone.display}
          </a>
        </nav>
      </div>
    </header>
  );
}
