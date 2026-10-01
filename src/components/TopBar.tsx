import { BadgeCheck, MapPin, Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { digits, fmt, type Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { LanguageSwitch } from "./LanguageSwitch";

export function TopBar({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <div className="bg-forest-950 text-[0.78rem] text-forest-100">
      <div className="container-x flex h-10 items-center justify-between gap-4">
        <p className="flex min-w-0 items-center gap-2">
          <MapPin className="size-3.5 shrink-0 text-gold-400" />
          <span className="truncate">
            {dict.firm.addressLine1}, {dict.firm.addressLine2}
          </span>
        </p>
        <div className="flex shrink-0 items-center gap-6">
          <span className="hidden items-center gap-1.5 lg:flex">
            <BadgeCheck className="size-3.5 text-gold-400" />
            {dict.topbar.nbc}
          </span>
          <a
            href={site.rating.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 transition-colors hover:text-gold-300 md:flex"
          >
            <Star className="size-3.5 fill-gold-400 text-gold-400" />
            {fmt(dict.topbar.rating, { score: digits(lang, site.rating.score), count: digits(lang, site.rating.count) })}
          </a>
          <LanguageSwitch
            lang={lang}
            label={dict.common.switchLabel}
            short={dict.common.switchShort}
            className="rounded-full border border-gold-400/30 px-3 py-1 text-gold-200 hover:border-gold-300 hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
