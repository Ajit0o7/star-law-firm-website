import Link from "next/link";

// Vector redraw of the firm's emblem: scales of justice with a star at the fulcrum.
export function LogoMark({ className = "size-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill="#0c231d" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="#d1aa52" strokeWidth="1.1" />
      <path
        d="M15 44.5c3.5 5.6 9.8 9.3 17 9.3s13.5-3.7 17-9.3"
        fill="none"
        stroke="#d1aa52"
        strokeWidth="1"
        strokeDasharray="2.2 1.6"
      />
      <path d="M32 14v31" stroke="#d1aa52" strokeWidth="2" />
      <circle cx="32" cy="12.6" r="1.9" fill="#d1aa52" />
      <path d="M17 20.5Q32 16.5 47 20.5" fill="none" stroke="#d1aa52" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M17 20.5 12.6 31M17 20.5 21.4 31M47 20.5 42.6 31M47 20.5 51.4 31"
        stroke="#d1aa52"
        strokeWidth="0.85"
      />
      <path d="M11 31h12a6 3.4 0 0 1-12 0Z" fill="#d1aa52" />
      <path d="M41 31h12a6 3.4 0 0 1-12 0Z" fill="#d1aa52" />
      <path
        d="M32 21.5 33.76 26.57 39.13 26.68 34.85 29.93 36.41 35.07 32 32 27.59 35.07 29.15 29.93 24.87 26.68 30.24 26.57Z"
        fill="#f1dc9f"
        stroke="#0c231d"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path d="M26 45h12l2.2 3.6H23.8Z" fill="#d1aa52" />
    </svg>
  );
}

export function Logo({ tone = "dark", href = "/" }: { tone?: "dark" | "light"; href?: string }) {
  const main = tone === "dark" ? "text-forest-900" : "text-white";
  return (
    <Link href={href} className="group flex items-center gap-3" aria-label="Star Access to Justice, home">
      <LogoMark className="size-11 shrink-0 transition-transform duration-500 group-hover:rotate-[8deg]" />
      <span className="flex flex-col leading-none">
        <span className={`keep-tracking font-display text-[1.75rem] !leading-none tracking-[0.16em] ${main}`}>STAR</span>
        <span className="keep-tracking mt-1 font-caps text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-gold-600">
          Access to Justice
        </span>
      </span>
    </Link>
  );
}
