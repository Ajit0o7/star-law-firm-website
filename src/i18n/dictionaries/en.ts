// English copy. Rich strings support *accent*, **bold** and [link text](/path) (paths are locale-free).
// Placeholders like {advocate} are filled with fmt().

export const en = {
  meta: {
    title: "Star Access to Justice | Law Firm, Notary Public & Authorized Translation in Kathmandu",
    titleTemplate: "%s | Star Access to Justice",
    description:
      "Kathmandu law firm and notary public office: litigation, legal consultation, legal drafting, notarization, certified Nepali–English translation and company registration. Adv. Ishwor Prasad Pudasaini, Nahar Marg, KMC-32.",
    keywords: [
      "law firm Kathmandu",
      "lawyer in Kathmandu",
      "notary public Kathmandu",
      "authorized translation Nepal",
      "document translation for visa Nepal",
      "company registration Nepal",
      "advocate Nepal",
    ],
  },

  common: {
    skip: "Skip to content",
    home: "Home",
    call: "Call",
    whatsapp: "WhatsApp",
    directions: "Directions",
    bookConsultation: "Book a consultation",
    learnMore: "Learn more",
    readGuide: "Read guide",
    minRead: "{n} min read",
    switchLabel: "नेपालीमा हेर्नुहोस्",
    switchShort: "नेपाली",
    googleReview: "Google review",
    localGuide: "Local Guide",
    reviewsLanguageNote: "",
  },

  firm: {
    advocateName: "Adv. Ishwor Prasad Pudasaini",
    advocateTitle: "Advocate & Notary Public",
    founder: "Founder",
    addressLine1: "Nahar Marg, Narephat",
    addressLine2: "KMC Ward 32, Kathmandu",
    region: "Bagmati Province 44600, Nepal",
    plusCode: "Plus code",
    // CONFIRM: Google lists no opening hours. Clients recommend booking ahead.
    hours: [
      { days: "Sunday – Friday", time: "10:00 AM – 5:00 PM" },
      { days: "Saturday", time: "By appointment" },
    ],
    regs: { nbc: "Nepal Bar Council Reg. No.", kmc: "KMC Reg. No.", pan: "PAN" },
  },

  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Practice Areas" },
    { href: "/guides", label: "Legal Guides" },
    { href: "/#reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ],

  header: { practiceAreas: "Practice areas", openMenu: "Open menu", closeMenu: "Close menu" },

  topbar: {
    nbc: "Nepal Bar Council Reg. No. 703",
    rating: "{score} on Google · {count} reviews",
    extra: "नोटरी पब्लिकको कार्यालय",
  },

  footer: {
    statement: "Justice, made *accessible.*",
    blurb:
      "Legal advice, court representation, notary services, authorized translation and documentation, under one roof in Kathmandu.",
    explore: "Explore",
    practiceAreas: "Practice areas",
    visit: "Visit us",
    rights: "All rights reserved.",
    disclaimer:
      "The information on this website is general and is not legal advice. Contacting us does not create an advocate–client relationship until we confirm engagement.",
  },

  mobileBar: { call: "Call", whatsapp: "WhatsApp", directions: "Directions" },

  fab: {
    label: "Chat with us",
    message: "Namaste, I would like to book a consultation with Star Access to Justice.",
  },

  cta: {
    eyebrow: "Speak to an advocate",
    title: "Not sure where to start? *Call us today.*",
    text: "Tell us what happened or which document you need. We will explain the process, the papers to bring and the next step, with no confusing jargon.",
    whatsapp: "Message on WhatsApp",
    waMessage: "Namaste, I need legal help regarding: ",
  },

  reviews: {
    eyebrow: "Client reviews",
    title: "Trusted by the people *we serve*",
    lead: "Every review on our Google profile is five stars. Here is what clients say, in their own words.",
    count: "{count} Google reviews",
  },

  faq: [
    {
      q: "Do I need an appointment?",
      a: "Walk-ins are welcome, but we recommend calling or messaging on WhatsApp first so the advocate is available and we can tell you exactly which documents to bring.",
    },
    {
      q: "What should I bring for notarization or attestation?",
      a: "Bring the original document, a photocopy, and your citizenship certificate or passport. If you are signing on behalf of someone else, bring the authority letter or power of attorney as well.",
    },
    {
      q: "Are your translations accepted by embassies and universities?",
      a: "We provide authorized Nepali–English translations with a signed and stamped translator certificate, the format commonly requested for visa files, embassies, universities and foreign employers. Always check your receiving institution's specific requirements; we are happy to help you read them.",
    },
    {
      q: "How long does a translation take?",
      a: "Short personal documents such as citizenship, birth or marriage certificates are usually quick. Longer files like transcripts, bank statements or court papers depend on page count. Send us a photo on WhatsApp for an exact timeline and fee.",
    },
    {
      q: "Can you represent me in court?",
      a: "Yes. We handle litigation on civil, criminal, family and property matters, from drafting the first application through hearings and follow-up.",
    },
    {
      q: "Do you help businesses and foreign clients?",
      a: "Yes. We work with individuals, families, businesses and international clients on company registration, contracts, compliance documents, and translated or notarized papers for use abroad.",
    },
  ],

  marquee: [
    "Litigation",
    "Legal Consultation",
    "Legal Drafting",
    "Notary Public",
    "Authorized Translation",
    "Company Services",
    "Document Attestation",
  ],

  home: {
    pill: "Law Firm · Notary Public · Authorized Translation",
    title: "Legal support that is *accessible, clear* & reliable.",
    lead: "Facing a dispute, signing an agreement, registering a company or preparing papers for a visa? **{advocate}** gives you honest advice and handles the legal work properly: consultation, court representation, notarization and certified translation, all from one office in Kathmandu.",
    ratingLine: "{score} · {count} Google reviews",
    location: "KMC-32, Kathmandu",
    badge: "{title} · NBC Reg. No. 703",
    heroAlt: "Bronze statue of Lady Justice holding the scales",
    stats: [
      { value: "5.0", suffix: "★", label: "Average rating across all 10 Google reviews" },
      { value: "703", label: "Advocate registered with the Nepal Bar Council" },
      { value: "6", label: "Legal services handled from a single office" },
      { value: "2", label: "Working languages for advice and translation: Nepali & English" },
    ],
    about: {
      eyebrow: "About the firm",
      title: "One trusted office for advice, documents *& representation*",
      text: "Star Access to Justice is a law firm and registered notary public office at KMC-32, Kathmandu. We work with individuals, families, businesses and international clients who need a legal problem solved, or an important document prepared correctly the first time.",
      reasons: [
        {
          title: "Advice you can understand",
          text: "Your rights, options and risks explained in plain Nepali or English, before you sign or decide anything.",
        },
        {
          title: "Everything in one visit",
          text: "Legal advice, drafting, notarization and authorized translation under one roof, with no running between offices.",
        },
        {
          title: "Clear on time and cost",
          text: "You know which documents to bring, what the work involves and when it will be ready, from the first conversation.",
        },
      ],
      more: "More about us",
      ratingBadge: "Google rating",
      signAlt: "Office signboard of the notary public office and Star Access to Justice law firm, KMC-32 Kathmandu",
      cardAlt: "Star Access to Justice Law Firm card: Adv. Ishwor Prasad Pudasaini, Kathmandu, Nepal",
    },
    services: {
      eyebrow: "Practice areas",
      title: "Six services, *one trusted office*",
      lead: "From a single certified copy to a full court case, every matter gets the same careful attention, clear explanation and honest timeline.",
      viewAll: "View all practice areas",
    },
    process: {
      eyebrow: "How it works",
      title: "A simple process, *explained up front*",
      lead: "No guesswork about what to bring or what happens next.",
      steps: [
        {
          title: "Tell us what you need",
          text: "Call, WhatsApp or visit. A quick message with a photo of your document is often enough for us to tell you what is required.",
        },
        {
          title: "Get clear advice",
          text: "We review your papers, explain your options in plain language and agree on the work, the fee and the timeline.",
        },
        {
          title: "We handle the work",
          text: "Drafting, translation, notarization, filing or court representation, done carefully and checked before it reaches you.",
        },
        {
          title: "Move forward with confidence",
          text: "Collect your certified documents or a clear next step, and we stay available for any follow-up questions.",
        },
      ],
    },
    situations: {
      eyebrow: "How we help",
      title: "Real situations, *practical solutions*",
      lead: "Most people come to us with a specific problem, not a legal term. Find yours below and see how we can help.",
      banner: "Rooted in Kathmandu, *serving clients* at home and abroad.",
      bannerAlt: "View over the Kathmandu valley",
      items: [
        {
          key: "abroad",
          slug: "authorized-translation",
          q: "Going abroad for study or work?",
          a: "Certified Nepali–English translation and notarization of citizenship, birth, marriage, academic and bank documents for visa files and universities.",
          service: "Authorized translation",
        },
        {
          key: "property",
          slug: "legal-documentation",
          q: "Buying, selling or renting property?",
          a: "Sale and lease agreements, deeds and power of attorney drafted or reviewed so the terms protect you before you sign.",
          service: "Legal drafting",
        },
        {
          key: "dispute",
          slug: "litigation",
          q: "Received a court notice or facing a dispute?",
          a: "Advice on where you stand, then representation in civil, criminal, property or cheque-bounce matters from filing to hearing.",
          service: "Litigation",
        },
        {
          key: "family",
          slug: "legal-consultation",
          q: "Dealing with a family matter?",
          a: "Inheritance and partition, divorce and maintenance, wills and family settlement deeds, handled with discretion and care.",
          service: "Legal consultation",
        },
        {
          key: "business",
          slug: "company-services",
          q: "Starting or running a business?",
          a: "Company registration with the Office of Company Registrar, share structure, commercial contracts and annual compliance.",
          service: "Company services",
        },
        {
          key: "certify",
          slug: "notary-public",
          q: "Need a document certified?",
          a: "True-copy certification, affidavits and signature attestation by a notary public, with the right stamp on every page.",
          service: "Notary public",
        },
      ],
    },
    guides: {
      eyebrow: "Legal guides",
      title: "Know your options *before you visit*",
      lead: "Plain-language guides to the questions clients ask us most.",
      viewAll: "All guides",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions we *often hear*",
      lead: "Can't find your answer? Send a photo of your document on WhatsApp and we will tell you exactly what is needed.",
      ask: "Ask a question",
      waMessage: "Namaste, I have a question: ",
    },
    visit: {
      eyebrow: "Visit the office",
      title: "Find us at Nahar Marg, *Kathmandu*",
      getDirections: "Get directions",
      sendMessage: "Send a message",
    },
  },

  about: {
    metaTitle: "About the Firm",
    metaDescription:
      "Star Access to Justice is a Kathmandu law firm and notary public office led by Adv. Ishwor Prasad Pudasaini.",
    eyebrow: "About us",
    title: "Making the law *easier to navigate*",
    lead: "A law firm, notary public office and authorized translation desk in Kathmandu, built on one belief: legal support should be accessible, clear and reliable.",
    storyEyebrow: "Our story",
    storyTitle: "Practical legal support, *delivered with care*",
    story: [
      "Star Access to Justice works with individuals, families, businesses and international clients who need trusted legal solutions delivered with professionalism and care.",
      "Our office brings together services people usually have to find in different places: legal advice and [court representation](/services/litigation), [drafting of legal documents](/services/legal-documentation), [company work](/services/company-services), [notarization](/services/notary-public) and [authorized Nepali–English translation](/services/authorized-translation). One visit, one team, one point of contact.",
      "Our vision is simple: practical legal support, transparent communication and timely service, so you can move forward with confidence.",
    ],
    quote:
      "Advocate Sir was very helpful and explained everything clearly, which made the whole process much easier for me.",
    quoteBy: "Ujjwal Tam-Ang, Google review",
    signCaption: "Our office signboard at KMC-32, Kathmandu",
    advocateEyebrow: "Meet the advocate",
    advocateRole: "Advocate & Notary Public · Founder, Star Access to Justice",
    advocateBio:
      "Adv. Pudasaini leads the firm's litigation, consultation, documentation and notary work. Clients describe him as professional, approachable and genuinely invested in resolving their issue, and value that every question gets a prompt, honest answer.",
    valuesEyebrow: "What we stand for",
    valuesTitle: "The principles behind *every file*",
    values: [
      {
        title: "Accessible",
        text: "Legal help should not feel out of reach. We keep our office easy to visit, our fees clear and our door open to every client.",
      },
      {
        title: "Clear",
        text: "We explain the law in plain Nepali or English, so you understand your options before you decide anything.",
      },
      {
        title: "Reliable",
        text: "Documents checked twice, deadlines respected, and your information handled in confidence.",
      },
      {
        title: "Timely",
        text: "Prompt answers and realistic timelines, so you always know what the next step is and when it will happen.",
      },
    ],
    facts: [
      {
        title: "Registered office",
        text: "Registered with Kathmandu Metropolitan City and the Inland Revenue Department.",
      },
      { title: "Bar Council member", text: "Advocate registered with the Nepal Bar Council, Reg. No. 703." },
      { title: "Nepali & English", text: "Consultations, drafting and translation in both languages." },
    ],
  },

  servicesPage: {
    metaTitle: "Practice Areas",
    metaDescription:
      "Litigation, legal consultation, legal drafting, notary public, authorized translation and company services in Kathmandu.",
    eyebrow: "Practice areas",
    title: "Legal services, *under one roof*",
    lead: "Advice, representation, documentation, notarization and translation: one office in Kathmandu for all of it, so you don't run between offices.",
    jump: "Jump to service",
    details: "Details & what to bring",
    faqTitle: "Before you visit",
  },

  service: {
    metaTitle: "{service} in Kathmandu",
    whatWeHelp: "What we help with",
    bring: "What to bring",
    idealFor: "Ideal for",
    idealNote:
      "Not sure if this is the right service? Message us a short description and we will point you to the right one.",
    talk: "Talk to the advocate",
    whatsappUs: "WhatsApp us",
    waMessage: "Namaste, I need help with {service}.",
    otherAreas: "Other practice areas",
    related: "Related services",
    relatedGuides: "Related guides",
  },

  services: {
    litigation: {
      title: "Litigation & Court Representation",
      alt: "मुद्दामामिला",
      summary:
        "Representation in civil, criminal, family and property matters, from the first application to the final hearing.",
      intro:
        "When a dispute reaches court, you need an advocate who explains every step and prepares thoroughly. We draft your pleadings, gather and organise evidence, and represent you at hearings, keeping you informed so you always know what comes next. Not sure yet whether to go to court? Start with a [legal consultation](/services/legal-consultation).",
      includes: [
        "Civil and property disputes",
        "Criminal defence and complaints",
        "Family matters: divorce, partition, maintenance",
        "Writs, appeals and petitions",
        "Recovery, cheque bounce and contract disputes",
        "Out-of-court settlement and mediation",
      ],
      bring: [
        "Citizenship certificate or passport",
        "Any notices, orders or summons received",
        "Contracts, receipts and related papers",
        "A short written timeline of events",
      ],
      idealFor: ["Individuals", "Families", "Businesses"],
    },
    "legal-consultation": {
      title: "Legal Consultation",
      alt: "कानुनी परामर्श",
      summary:
        "Clear, practical advice on your rights and options, in plain language and before you commit to anything.",
      intro:
        "Many legal problems are easier, cheaper and faster to solve when you get advice early. In a consultation we listen to your situation, review your documents and explain your options in plain Nepali or English, with a practical recommendation on the next step, whether that is a [carefully drafted agreement](/services/legal-documentation) or [representation in court](/services/litigation).",
      includes: [
        "One-to-one consultation with the advocate",
        "Review of notices, agreements and documents",
        "Property, land and inheritance questions",
        "Employment, tenancy and consumer issues",
        "Guidance for NRNs and foreign nationals",
        "Written legal opinion on request",
      ],
      bring: [
        "Any documents related to your question",
        "Identity document",
        "A list of questions you want answered",
      ],
      idealFor: ["Individuals", "Families", "International clients"],
    },
    "legal-documentation": {
      title: "Legal Drafting & Documentation",
      alt: "कानुनी लिखत",
      summary:
        "Contracts, deeds, affidavits and powers of attorney, drafted carefully and reviewed before you sign.",
      intro:
        "A well-drafted document prevents disputes before they start. We prepare and review the agreements and deeds you rely on, check every clause against current Nepali law, and make sure the final version says exactly what you intend. Once signed, documents can be [notarized](/services/notary-public) in the same visit.",
      includes: [
        "Power of attorney (अख्तियारनामा)",
        "Affidavits and self-declarations",
        "Lease, rental and sale agreements",
        "Partnership and service contracts",
        "Wills and family settlement deeds",
        "Contract review and redlining",
      ],
      bring: [
        "Identity documents of every party",
        "Details of the property, amount or terms involved",
        "Any earlier draft or existing agreement",
      ],
      idealFor: ["Individuals", "Families", "Businesses"],
    },
    "notary-public": {
      title: "Notary Public & Document Attestation",
      alt: "लिखत प्रमाणीकरण",
      summary: "Notarization, true-copy certification and signature attestation by a registered notary public.",
      intro:
        "Whether it is for a visa file, a bank, a university or an office abroad, many documents must be certified by a notary public. We verify your originals, certify copies, attest signatures and affidavits, and stamp every page correctly the first time. Documents in Nepali can be [translated into English](/services/authorized-translation) and notarized together.",
      includes: [
        "True-copy certification of originals",
        "Signature and affidavit attestation",
        "Notarization of translated documents",
        "Documents for visas, embassies and banks",
        "Academic and employment certificates",
        "Declarations for use abroad",
      ],
      bring: [
        "Original document(s)",
        "Clear photocopies",
        "Citizenship certificate or passport",
        "Authority letter if acting for someone else",
      ],
      idealFor: ["Students", "Visa applicants", "International clients"],
    },
    "authorized-translation": {
      title: "Authorized Translation",
      alt: "आधिकारिक अनुवाद",
      summary: "Certified Nepali–English translation of personal, academic, financial and legal documents.",
      intro:
        "Embassies, universities and foreign employers need translations they can trust. Our authorized translations keep the original layout, names and stamps accurate, and come with a signed translator certificate, notarized on request by our [notary public](/services/notary-public).",
      includes: [
        "Citizenship, birth and marriage certificates",
        "Relationship and residence verification letters",
        "Academic transcripts and character certificates",
        "Bank statements, tax and income documents",
        "Court orders, deeds and legal papers",
        "Company documents for overseas use",
      ],
      bring: [
        "The original document or a clear scan",
        "Correct spelling of names as in your passport",
        "Receiving institution's requirements, if any",
      ],
      idealFor: ["Students", "Visa applicants", "Businesses"],
    },
    "company-services": {
      title: "Company & Corporate Services",
      alt: "कम्पनी सम्बन्धी कार्यहरू",
      summary:
        "Company registration, amendments, share transfers and ongoing compliance with the Office of Company Registrar.",
      intro:
        "Starting or running a business in Nepal involves a lot of paperwork. We handle company and firm registration, prepare your constitutional documents, and keep your filings up to date. After registration we can also prepare your [commercial contracts](/services/legal-documentation), so you can focus on growing the business.",
      includes: [
        "Private company and firm registration",
        "Memorandum and Articles of Association",
        "Share transfer and capital changes",
        "Name, address and objective amendments",
        "Annual returns and AGM documentation",
        "Commercial contracts and legal compliance",
      ],
      bring: [
        "Citizenship / passport of promoters",
        "Proposed company names (2–3 options)",
        "Registered address details",
        "Objectives and share structure",
      ],
      idealFor: ["Start-ups", "SMEs", "Foreign investors"],
    },
  },

  contact: {
    metaTitle: "Contact & Appointments",
    metaDescription:
      "Book a consultation with Adv. Ishwor Prasad Pudasaini. Call +977 985-1003107 or visit us at Nahar Marg, KMC-32, Kathmandu.",
    eyebrow: "Contact",
    title: "Let's talk about *your matter*",
    lead: "Call, message or visit. Booking ahead is recommended, so the advocate is available and we can tell you exactly what to bring.",
    formEyebrow: "Book a consultation",
    formTitle: "Send us your enquiry",
    formLead: "Prefer to talk it through? Call us directly on {phone}.",
    callLabel: "Call the office",
    whatsappLabel: "WhatsApp",
    whatsappValue: "Send documents & questions",
    viberLabel: "Viber",
    office: "Office",
    hours: "Office hours",
    getDirections: "Get directions",
  },

  form: {
    name: "Full name",
    namePh: "Your name",
    phone: "Phone",
    phonePh: "98XXXXXXXX",
    email: "Email",
    emailPh: "Optional",
    date: "Preferred date",
    service: "What do you need help with?",
    choose: "Choose a service",
    other: "Other / not sure",
    message: "Message",
    messagePh:
      "Briefly describe your matter or the document you need. Please don't include sensitive personal details here.",
    hint: "Your enquiry is sent to our office, and WhatsApp opens so you can message us directly too.",
    submit: "Send enquiry",
    sending: "Sending…",
    sent: "Thank you! Your enquiry has reached our office. WhatsApp has also opened in a new tab if you'd like to message us directly.",
    waOnly:
      "Thank you! WhatsApp has opened in a new tab with your message ready to send. If it didn't open, please call us on {phone}.",
    error: "Please fill in your name, phone, service and message.",
    waIntro: "Namaste, I would like to book a consultation.",
    waName: "Name",
    waPhone: "Phone",
    waEmail: "Email",
    waService: "Service",
    waDate: "Preferred date",
  },

  guidesPage: {
    metaTitle: "Legal Guides",
    metaDescription:
      "Plain-language guides on document translation for visas, power of attorney and company registration in Nepal, from Star Access to Justice, Kathmandu.",
    eyebrow: "Resources",
    title: "Legal guides, *in plain language*",
    lead: "Short, practical explanations of the questions clients ask us most. Read before you visit, so you arrive with the right documents.",
    by: "By Star Access to Justice",
    published: "Published",
    onThisPage: "In this guide",
    related: "Services for this",
    helpTitle: "Need help with this?",
    helpText: "Send us a message with your situation and we'll tell you exactly what you need.",
    disclaimer:
      "This guide is general information, not legal advice. Laws and office procedures change; contact us to confirm the current requirements for your case.",
    more: "More guides",
  },

  notFound: {
    eyebrow: "Error 404",
    title: "This page could not be found",
    text: "The page may have moved. Let us take you back to solid ground.",
    back: "Back to home",
  },
};

export type Dictionary = typeof en;
