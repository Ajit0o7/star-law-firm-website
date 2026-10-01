// Emails each website enquiry to the office via Resend (https://resend.com).
// Configure in .env.local / Vercel project settings:
//   RESEND_API_KEY      — API key from resend.com
//   ENQUIRY_TO_EMAIL    — inbox that receives enquiries (comma-separate several)
//   ENQUIRY_FROM_EMAIL  — optional; a sender on a domain verified in Resend.
//                         Defaults to Resend's test sender, which only delivers to your own Resend account email.
// Without RESEND_API_KEY / ENQUIRY_TO_EMAIL the route answers 503 and the form falls back to WhatsApp only.

const LIMITS = { name: 120, phone: 30, email: 160, service: 160, date: 20, message: 3000 } as const;
type Field = keyof typeof LIMITS;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots don't retry.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const f = Object.fromEntries(
    (Object.keys(LIMITS) as Field[]).map((k) => [k, clean(body[k], LIMITS[k])]),
  ) as Record<Field, string>;
  const lang = body.lang === "ne" ? "ne" : "en";

  if (!f.name || !f.phone || !f.service || !f.message) {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  const emailOk = !f.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);
  if (!emailOk) return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const text = [
    `New enquiry from the website (${lang === "ne" ? "Nepali" : "English"} page)`,
    "",
    `Name:     ${f.name}`,
    `Phone:    ${f.phone}`,
    `Email:    ${f.email || "-"}`,
    `Service:  ${f.service}`,
    `Preferred date: ${f.date || "-"}`,
    "",
    "Message:",
    f.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL || "Star Access to Justice <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      subject: `Website enquiry: ${f.service} (${f.name})`,
      text,
      ...(f.email ? { reply_to: f.email } : {}),
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
