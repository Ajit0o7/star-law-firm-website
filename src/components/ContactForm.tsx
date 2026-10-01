"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { whatsappLink } from "@/lib/site";

const field =
  "w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3.5 text-forest-900 placeholder:text-forest-300 transition focus:border-gold-400 focus:outline-none focus:ring-4 focus:ring-gold-200/60";

type Status = "idle" | "sending" | "sent" | "waOnly" | "invalid";

/**
 * Each enquiry is (1) emailed to the office through /api/enquiry so nothing gets lost, and
 * (2) opened in WhatsApp so the visitor can message the office directly.
 */
export function ContactForm({
  lang,
  t,
  phone,
  services,
}: {
  lang: Locale;
  t: Dictionary["form"];
  phone: string;
  services: string[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  // Until hydration the browser would fall back to a native GET submit and put the
  // visitor's details in the URL, so the button stays disabled until JS is ready.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const { name = "", phone: tel = "", email = "", service = "", date = "", message = "", company = "" } = data;
    if (!name.trim() || !tel.trim() || !service || !message.trim()) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    // Fire the email request first (keepalive lets it finish even if the tab loses focus)...
    const emailed = fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone: tel, email, service, date, message, company, lang }),
      keepalive: true,
    })
      .then((r) => r.ok)
      .catch(() => false);

    // ...then open WhatsApp synchronously inside the click so popup blockers allow it.
    const lines = [
      t.waIntro,
      "",
      `${t.waName}: ${name}`,
      `${t.waPhone}: ${tel}`,
      email ? `${t.waEmail}: ${email}` : null,
      `${t.waService}: ${service}`,
      date ? `${t.waDate}: ${date}` : null,
      "",
      message,
    ].filter((l) => l !== null);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");

    const ok = await emailed;
    setStatus(ok ? "sent" : "waOnly");
    if (ok) form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-forest-800">{t.name} *</span>
        <input name="name" required maxLength={120} autoComplete="name" className={field} placeholder={t.namePh} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-forest-800">{t.phone} *</span>
        <input
          name="phone"
          required
          type="tel"
          maxLength={30}
          autoComplete="tel"
          className={field}
          placeholder={t.phonePh}
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-forest-800">{t.email}</span>
        <input name="email" type="email" maxLength={160} autoComplete="email" className={field} placeholder={t.emailPh} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-forest-800">{t.date}</span>
        <input name="date" type="date" className={field} />
      </label>
      <label className="grid gap-2 sm:col-span-2">
        <span className="text-sm font-semibold text-forest-800">{t.service} *</span>
        <select name="service" required defaultValue="" className={field}>
          <option value="" disabled>
            {t.choose}
          </option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
          <option value={t.other}>{t.other}</option>
        </select>
      </label>
      <label className="grid gap-2 sm:col-span-2">
        <span className="text-sm font-semibold text-forest-800">{t.message} *</span>
        <textarea name="message" required rows={5} maxLength={3000} className={field} placeholder={t.messagePh} />
      </label>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-forest-500">{t.hint}</p>
        <button
          type="submit"
          disabled={!ready || status === "sending"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-forest-900 px-8 py-4 font-semibold text-white transition hover:bg-forest-700 disabled:cursor-wait disabled:opacity-60"
        >
          <Send className="size-4 text-gold-300" /> {status === "sending" ? t.sending : t.submit}
        </button>
      </div>
      {(status === "sent" || status === "waOnly" || status === "invalid") && (
        <p
          role="status"
          lang={lang}
          className={`rounded-xl px-4 py-3 text-sm sm:col-span-2 ${
            status === "invalid" ? "bg-red-50 text-red-800" : "bg-gold-50 text-forest-800"
          }`}
        >
          {status === "sent" ? t.sent : status === "waOnly" ? t.waOnly.replace("{phone}", phone) : t.error}
        </p>
      )}
    </form>
  );
}
