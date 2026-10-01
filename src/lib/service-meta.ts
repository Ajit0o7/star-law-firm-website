import { Briefcase, Gavel, Languages, MessagesSquare, ScrollText, Stamp, type LucideIcon } from "lucide-react";

// Language-neutral service data (safe to import in client components).
// The six services painted on the firm's signboard:
// मुद्दामामिला, कानुनी लिखत, कानुनी परामर्श, कम्पनी सम्बन्धी कार्यहरू, आधिकारिक अनुवाद, लिखत प्रमाणीकरण
export const serviceMeta = [
  { slug: "litigation", icon: Gavel, image: "/images/gavel-blue.jpg" },
  { slug: "legal-consultation", icon: MessagesSquare, image: "/images/justice-statue.jpg" },
  { slug: "legal-documentation", icon: ScrollText, image: "/images/notary-writing.jpg" },
  { slug: "notary-public", icon: Stamp, image: "/images/signing.jpg" },
  { slug: "authorized-translation", icon: Languages, image: "/images/office-sign.jpg" },
  { slug: "company-services", icon: Briefcase, image: "/images/law-books.jpg" },
] as const satisfies readonly { slug: string; icon: LucideIcon; image: string }[];

export type ServiceSlug = (typeof serviceMeta)[number]["slug"];

export const iconFor = (slug: string): LucideIcon =>
  serviceMeta.find((s) => s.slug === slug)?.icon ?? Gavel;
