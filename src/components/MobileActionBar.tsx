import { Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { site, whatsappLink } from "@/lib/site";

// Sticky Call / WhatsApp / Directions bar for phones (hidden from lg up).
export function MobileActionBar({
  labels,
  message,
}: {
  labels: { call: string; whatsapp: string; directions: string };
  message: string;
}) {
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.72rem] font-semibold transition active:scale-95";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-forest-950/95 pb-[env(safe-area-inset-bottom)] text-white shadow-[0_-12px_30px_-12px_rgb(6_22_19/0.6)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-lg items-stretch px-2">
        <a href={`tel:${site.phone.tel}`} className={`${item} text-gold-200`}>
          <Phone className="size-5" />
          {labels.call}
        </a>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} my-1.5 rounded-2xl bg-[#25D366] text-white`}
        >
          <WhatsAppIcon className="size-5" />
          {labels.whatsapp}
        </a>
        <a href={site.address.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${item} text-gold-200`}>
          <Navigation className="size-5" />
          {labels.directions}
        </a>
      </div>
    </nav>
  );
}
