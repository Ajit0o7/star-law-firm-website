import { site } from "@/lib/site";

export const locales = ["en", "ne"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** English lives at the root ("/about"), Nepali under "/ne" ("/ne/about"). */
export function localePath(lang: Locale, path = "/"): string {
  if (lang === defaultLocale) return path;
  if (path === "/") return "/ne";
  if (path.startsWith("/#")) return `/ne${path.slice(1)}`;
  return `/ne${path}`;
}

/** Strip the locale prefix from a browser pathname: "/ne/about" -> "/about". */
export function stripLocale(pathname: string): string {
  if (pathname === "/ne") return "/";
  if (pathname.startsWith("/ne/")) return pathname.slice(3);
  return pathname;
}

export const absoluteUrl = (lang: Locale, path = "/") => `${site.url}${localePath(lang, path)}`;

/** Canonical + hreflang alternates for a page that exists in both languages. */
export function alternatesFor(lang: Locale, path = "/") {
  return {
    canonical: localePath(lang, path),
    languages: {
      en: localePath("en", path),
      ne: localePath("ne", path),
      "x-default": localePath("en", path),
    },
  };
}

export const ogLocale: Record<Locale, string> = { en: "en_NP", ne: "ne_NP" };
