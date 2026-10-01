import type { Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { ne } from "./dictionaries/ne";

const dictionaries: Record<Locale, Dictionary> = { en, ne };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];

/** Fill {placeholders} in a template string. */
export const fmt = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));

const devanagariDigits = "०१२३४५६७८९";

/** Render digits in Devanagari for Nepali pages (phone numbers are left alone by callers). */
export const digits = (lang: Locale, value: string | number) =>
  lang === "ne" ? String(value).replace(/[0-9]/g, (d) => devanagariDigits[Number(d)]) : String(value);

export type { Dictionary };
