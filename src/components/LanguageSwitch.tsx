"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { localePath, stripLocale, type Locale } from "@/i18n/config";

/** Links to the same page in the other language. */
export function LanguageSwitch({
  lang,
  label,
  short,
  className = "",
}: {
  lang: Locale;
  label: string;
  short: string;
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const other: Locale = lang === "en" ? "ne" : "en";
  const href = localePath(other, stripLocale(pathname));
  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      aria-label={label}
      title={label}
      prefetch={false}
      className={`inline-flex items-center gap-1.5 font-semibold transition-colors ${other === "ne" ? "font-deva" : ""} ${className}`}
    >
      <Globe className="size-3.5" />
      {short}
    </Link>
  );
}
