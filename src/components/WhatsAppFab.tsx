import { WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/site";

// Desktop only: on phones the MobileActionBar carries the WhatsApp button.
export function WhatsAppFab({ label, message }: { label: string; message: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group fixed bottom-7 right-7 z-40 hidden items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-xl shadow-black/20 transition-all hover:pr-5 lg:flex"
    >
      <WhatsAppIcon className="size-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40">
        {label}
      </span>
    </a>
  );
}
