import type { LucideIcon } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { serviceMeta, type ServiceSlug } from "./service-meta";

export type Service = {
  slug: ServiceSlug;
  icon: LucideIcon;
  image: string;
  title: string;
  /** The service name in the other language, shown as a subtitle. */
  alt: string;
  summary: string;
  intro: string;
  includes: string[];
  bring: string[];
  idealFor: string[];
};

export function getServices(lang: Locale): Service[] {
  const text = getDictionary(lang).services;
  return serviceMeta.map((m) => ({ ...m, ...text[m.slug] }));
}

export const getService = (lang: Locale, slug: string) => getServices(lang).find((s) => s.slug === slug);
