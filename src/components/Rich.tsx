import Link from "next/link";
import { Fragment } from "react";
import { localePath, type Locale } from "@/i18n/config";

/**
 * Tiny inline markup renderer for dictionary copy:
 *   *accent*          -> <em> in the accent colour
 *   **bold**          -> <strong>
 *   [text](/path)     -> locale-aware internal link
 */
export function Rich({
  text,
  lang,
  accent = "text-gold-600",
  strong = "font-semibold text-forest-900",
  link = "font-medium text-forest-900 underline decoration-gold-400 decoration-2 underline-offset-4 transition-colors hover:text-gold-700",
}: {
  text: string;
  lang: Locale;
  accent?: string;
  strong?: string;
  link?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className={strong}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={i} className={accent}>
              {part.slice(1, -1)}
            </em>
          );
        }
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m) {
          const href = m[2].startsWith("/") ? localePath(lang, m[2]) : m[2];
          return (
            <Link key={i} href={href} className={link}>
              {m[1]}
            </Link>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
