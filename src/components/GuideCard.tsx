import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import { digits, fmt, type Dictionary } from "@/i18n";
import type { Guide } from "@/content/guides";

export function GuideCard({
  guide,
  lang,
  dict,
  index = 0,
}: {
  guide: Guide;
  lang: Locale;
  dict: Dictionary;
  index?: number;
}) {
  const g = guide.content[lang];
  return (
    <Link
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}
      href={localePath(lang, `/guides/${guide.slug}`)}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-forest-900/[0.07] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-35px_rgb(12_36_30/0.45)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={guide.image}
          alt=""
          fill
          sizes="(min-width: 768px) 400px, 100vw"
          className="object-cover transition duration-[1.4s] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-forest-950/60 to-transparent" />
        <span className="absolute bottom-4 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-forest-900 backdrop-blur">
          <Clock className="size-3.5 text-gold-600" />
          {fmt(dict.common.minRead, { n: digits(lang, guide.minutes) })}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-[1.75rem] leading-[1.1] text-forest-900">{g.title}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-forest-600">{g.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-700">
          {dict.common.readGuide}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
