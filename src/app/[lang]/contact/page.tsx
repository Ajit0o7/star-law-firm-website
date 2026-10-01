import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { alternatesFor, hasLocale, localePath } from "@/i18n/config";
import { fmt, getDictionary } from "@/i18n";
import { getServices } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow, MapEmbed, PageHero } from "@/components/ui";
import { Rich } from "@/components/Rich";
import { ViberIcon, WhatsAppIcon } from "@/components/icons";
import { breadcrumbJsonLd, JsonLd } from "@/components/JsonLd";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = getDictionary(lang).contact;
  return { title: c.metaTitle, description: c.metaDescription, alternates: alternatesFor(lang, "/contact") };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const c = dict.contact;
  const services = getServices(lang);

  const channels = [
    { icon: Phone, label: c.callLabel, value: site.phone.display, href: `tel:${site.phone.tel}`, external: false },
    { icon: WhatsAppIcon, label: c.whatsappLabel, value: c.whatsappValue, href: whatsappLink(dict.fab.message), external: true },
    {
      icon: ViberIcon,
      label: c.viberLabel,
      value: site.phone.display,
      href: `viber://chat?number=%2B${site.phone.whatsapp}`,
      external: false,
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { path: "/", name: dict.common.home },
          { path: "/contact", name: c.metaTitle },
        ])}
      />
      <PageHero
        eyebrow={c.eyebrow}
        title={<Rich text={c.title} lang={lang} accent="text-gold-gradient" />}
        lead={c.lead}
        image="/images/kathmandu.jpg"
        crumbs={[{ href: localePath(lang, "/"), label: dict.common.home }, { label: c.metaTitle }]}
      />

      <section className="container-x grid gap-10 py-20 sm:py-24 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[1.75rem] border border-forest-900/10 bg-white p-7 shadow-[0_40px_80px_-60px_rgb(12_36_30/0.5)] sm:p-10">
          <Eyebrow>{c.formEyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[2.8rem] leading-tight text-forest-900">{c.formTitle}</h2>
          <p className="mt-3 text-forest-600">{fmt(c.formLead, { phone: site.phone.display })}</p>
          <div className="mt-8">
            <ContactForm
              lang={lang}
              t={dict.form}
              phone={site.phone.display}
              services={services.map((s) => s.title)}
            />
          </div>
        </div>

        <div className="space-y-5">
          {channels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-5 rounded-3xl border border-forest-900/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-gold-300"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-forest-900 text-gold-300 transition group-hover:bg-gold-400 group-hover:text-forest-950">
                <ch.icon className="size-6" />
              </span>
              <span>
                <span className="block text-sm text-forest-500">{ch.label}</span>
                <span className="block font-display text-[1.75rem] leading-tight text-forest-900">{ch.value}</span>
              </span>
            </a>
          ))}

          <div className="relative isolate overflow-hidden rounded-3xl bg-forest-900 p-7 text-white">
            <div className="bg-grain absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
            <div className="flex gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-gold-400" />
              <div>
                <p className="font-semibold">{c.office}</p>
                <p className="mt-1 text-sm leading-relaxed text-forest-200">
                  {dict.firm.addressLine1}, {dict.firm.addressLine2}
                  <br />
                  {dict.firm.region}
                  <br />
                  {dict.firm.plusCode} {site.address.plusCode}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <Clock className="mt-1 size-5 shrink-0 text-gold-400" />
              <div>
                <p className="font-semibold">{c.hours}</p>
                {dict.firm.hours.map((h) => (
                  <p key={h.days} className="mt-1 text-sm text-forest-200">
                    {h.days}: {h.time}
                  </p>
                ))}
              </div>
            </div>
            <a
              href={site.address.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-7 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold"
            >
              <Navigation className="size-4" /> {c.getDirections}
            </a>
          </div>
        </div>
      </section>

      <section className="container-x pb-24">
        <MapEmbed className="h-[28rem]" title={`${site.name}, ${dict.firm.addressLine1}`} />
      </section>
    </>
  );
}
