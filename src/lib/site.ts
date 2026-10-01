// Language-neutral facts about the firm. Translatable text lives in src/i18n/dictionaries.
// Everything here was taken from the firm's Google Business Profile and its office signboard.
// Items marked "CONFIRM" are sensible defaults the firm should verify before launch.

export const site = {
  name: "Star Access to Justice",
  legalName: "Star Access to Justice Law Firm",
  nepaliName: "स्टार एक्सेस टु जस्टिस ल फर्म",
  url: "https://staraccesstojustice.com", // CONFIRM: replace with the real domain once purchased

  advocate: { name: "Adv. Ishwor Prasad Pudasaini", nameNe: "अधिवक्ता ईश्वर प्रसाद पुडासैनी" },

  phone: {
    display: "+977 985-1003107",
    tel: "+9779851003107",
    whatsapp: "9779851003107", // CONFIRM: number is on WhatsApp / Viber
  },

  address: {
    street: "Nahar Marg, Narephat",
    locality: "Kathmandu",
    region: "Bagmati Province",
    postalCode: "44600",
    plusCode: "M8CW+7J4",
    lat: 27.6704643,
    lng: 85.3464642,
    mapsUrl: "https://maps.google.com/?cid=10398705606789327573",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.6704643,85.3464642",
    embedUrl:
      "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s27.6704643,85.3464642!6i17!3m1!1sen!5m1!1sen",
  },

  registrations: { nbc: "703", kmc: "3403", pan: "601499933" },

  rating: {
    score: "5.0",
    count: 10,
    reviewsUrl: "https://www.google.com/search?kgmid=/g/11y9j22rcg#lrd=0x39eb190072c56e89:0x904f9fa7988a6ad5,1",
  },

  social: {
    linkedin: "https://www.linkedin.com/in/star-access-to-justice-nepal/",
    pinterest: "https://www.pinterest.com/staraccesstojustice12/_created/",
  },
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.phone.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export type Review = { name: string; localGuide?: boolean; text: string };

// Verbatim (lightly trimmed) Google reviews, all 5 stars. Kept in the client's original English.
export const reviews: Review[] = [
  {
    name: "Bibek Timalsina",
    text: "I had a wonderful experience with this law firm. The lawyer was professional, approachable and genuinely cared about resolving my issue. Every question I had was answered promptly and I always knew what the next step was.",
  },
  {
    name: "Ujjwal Tam-Ang",
    text: "Advocate Sir was very helpful and explained everything clearly, which made the whole process much easier for me. I also appreciated the assistance with document translation and verification, as everything was handled carefully and professionally.",
  },
  {
    name: "Riya Bajracharya",
    text: "I was looking for a genuine lawyer nearby Kathmandu area after facing a difficult legal problem. The situation was stressful but I am glad I found this firm. From the first day of meeting, they gave clear and helpful legal support.",
  },
  {
    name: "Aishwarya Bhat",
    text: "Highly recommended! Very helpful service and made the process smooth and easy.",
  },
  {
    name: "Kalyan Adhikari",
    localGuide: true,
    text: "Quick and detailed service. Would recommend others to take an appointment beforehand.",
  },
  {
    name: "Rabi Rijal",
    text: "Very friendly and kind person to talk and work with. The best Law Firm in Town.",
  },
];
