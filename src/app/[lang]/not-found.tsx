import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { en } from "@/i18n/dictionaries/en";
import { ne } from "@/i18n/dictionaries/ne";

// not-found.tsx receives no params, so the 404 speaks both languages.
export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <LogoMark className="size-20" />
      <p className="mt-8 font-caps text-sm font-semibold uppercase tracking-[0.3em] text-gold-600">{en.notFound.eyebrow}</p>
      <h1 className="mt-4 font-display text-5xl text-forest-900">{en.notFound.title}</h1>
      <p lang="ne" className="mt-3 font-deva text-xl text-forest-700">
        {ne.notFound.title}
      </p>
      <p className="mt-4 max-w-md text-forest-600">{en.notFound.text}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-forest-900 px-7 py-4 font-semibold text-white transition hover:bg-forest-700">
          {en.notFound.back}
        </Link>
        <Link
          href="/ne"
          lang="ne"
          className="rounded-full border border-forest-900/20 px-7 py-4 font-deva font-semibold text-forest-900 transition hover:border-gold-400"
        >
          {ne.notFound.back}
        </Link>
      </div>
    </section>
  );
}
