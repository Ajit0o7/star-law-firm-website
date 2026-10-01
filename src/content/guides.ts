import type { Locale } from "@/i18n/config";

// Plain-language legal guides (EN + NE). Rich text supports *accent*, **bold** and [link](/path).
// Keep facts general and verifiable; no fees or fixed timelines.

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type GuideText = { title: string; description: string; blocks: Block[] };

export type Guide = {
  slug: string;
  date: string; // ISO
  minutes: number;
  image: string;
  services: string[];
  content: Record<Locale, GuideText>;
};

const h2 = (text: string): Block => ({ type: "h2", text });
const p = (text: string): Block => ({ type: "p", text });
const ul = (items: string[]): Block => ({ type: "ul", items });
const ol = (items: string[]): Block => ({ type: "ol", items });

export const guides: Guide[] = [
  {
    slug: "translate-documents-for-visa-nepal",
    date: "2026-10-01",
    minutes: 4,
    image: "/images/signing.jpg",
    services: ["authorized-translation", "notary-public"],
    content: {
      en: {
        title: "Translating and notarizing Nepali documents for a visa",
        description:
          "Which documents usually need translation, how certified translation and notarization work in Kathmandu, and the mistakes that delay visa files.",
        blocks: [
          h2("Why embassies ask for certified translations"),
          p(
            "Most Nepali civil documents (citizenship certificates, birth and marriage registrations, relationship and residence verifications) are issued in Nepali. Embassies, universities and foreign employers need an English version they can rely on, so they usually ask for a translation that is certified by the translator and, in many cases, notarized.",
          ),
          h2("Documents that usually need translating"),
          ul([
            "Citizenship certificate (नागरिकता)",
            "Birth, marriage and relationship verification certificates",
            "Residence and address verification letters from the ward office",
            "Academic documents that are not already issued in English",
            "Bank statements, tax clearance and income source documents",
            "Property valuation, land ownership certificates (लालपुर्जा) and court documents",
          ]),
          h2("How the process works with us"),
          ol([
            "Send a clear photo or scan of each page on WhatsApp so we can confirm the page count, fee and timeline.",
            "Confirm the exact spelling of every name and place as it appears in your passport.",
            "We translate the full document, including seals, stamps and handwritten notes, keeping the original layout.",
            "Each translation comes with a signed and stamped translator certificate, and can be [notarized](/services/notary-public) in the same visit.",
            "Collect the originals and certified translations, or ask us which extra steps your destination requires.",
          ]),
          h2("Mistakes that delay visa files"),
          ul([
            '**Inconsistent name spellings** across documents, such as "Shrestha" on one page and "Shresta" on another.',
            "**Partial translations** that leave out stamps, seals or the back of a page.",
            "**Missing attestation.** Some countries also require documents to be attested by the Department of Consular Services, Ministry of Foreign Affairs, after notarization. Check your embassy's checklist early.",
          ]),
          p(
            "Need a translation? See our [authorized translation service](/services/authorized-translation) or send us a photo of your document.",
          ),
        ],
      },
      ne: {
        title: "भिसाका लागि नेपाली कागजातको अनुवाद र नोटरी",
        description:
          "कुन कागजात प्रायः अनुवाद गर्नुपर्छ, काठमाडौंमा आधिकारिक अनुवाद र नोटरी कसरी हुन्छ, र भिसा फाइल ढिलो हुने सामान्य गल्तीहरू।",
        blocks: [
          h2("दूतावासले प्रमाणित अनुवाद किन माग्छ?"),
          p(
            "नागरिकता, जन्म दर्ता, विवाह दर्ता, नाता प्रमाणित र बसोबास प्रमाणित जस्ता धेरैजसो नेपाली कागजात नेपालीमै जारी हुन्छन्। दूतावास, विश्वविद्यालय र विदेशी रोजगारदातालाई भर पर्न सकिने अंग्रेजी संस्करण चाहिन्छ, त्यसैले उनीहरू प्रायः अनुवादकले प्रमाणित गरेको र धेरै अवस्थामा नोटरी गरिएको अनुवाद माग्छन्।",
          ),
          h2("प्रायः अनुवाद गर्नुपर्ने कागजात"),
          ul([
            "नागरिकताको प्रमाणपत्र",
            "जन्म दर्ता, विवाह दर्ता र नाता प्रमाणित प्रमाणपत्र",
            "वडा कार्यालयबाट जारी बसोबास तथा ठेगाना प्रमाणित पत्र",
            "अंग्रेजीमा जारी नभएका शैक्षिक कागजात",
            "बैंक स्टेटमेन्ट, कर चुक्ता र आय स्रोतका कागजात",
            "सम्पत्ति मूल्याङ्कन, जग्गाधनी प्रमाणपुर्जा (लालपुर्जा) र अदालतका कागजात",
          ]),
          h2("हामीसँग प्रक्रिया कसरी हुन्छ"),
          ol([
            "पानाको संख्या, शुल्क र समय पुष्टि गर्न हरेक पानाको सफा फोटो वा स्क्यान WhatsApp मा पठाउनुहोस्।",
            "राहदानीमा भएअनुसार हरेक नाम र ठाउँको ठ्याक्कै हिज्जे पुष्टि गर्नुहोस्।",
            "हामी छाप, मोहर र हस्तलिखित टिप्पणीसहित पूरै कागजात मूल ढाँचामै अनुवाद गर्छौं।",
            "हरेक अनुवादसँग अनुवादकको सही र छापसहितको प्रमाणपत्र हुन्छ, र उही भ्रमणमा [नोटरी](/services/notary-public) गर्न सकिन्छ।",
            "सक्कल र प्रमाणित अनुवाद लिएर जानुहोस्, वा तपाईं जाने देशले थप के माग्छ भनेर हामीलाई सोध्नुहोस्।",
          ]),
          h2("भिसा फाइल ढिलो हुने गल्तीहरू"),
          ul([
            '**नामको हिज्जे नमिल्नु**, जस्तै एउटा कागजमा "Shrestha" र अर्कोमा "Shresta"।',
            "**अधुरो अनुवाद**, जसमा छाप, मोहर वा पानाको पछाडिको भाग छुटेको हुन्छ।",
            "**प्रमाणीकरण नहुनु।** केही देशले नोटरीपछि परराष्ट्र मन्त्रालयको कन्सुलर सेवा विभागबाट पनि प्रमाणीकरण माग्छन्। आफ्नो दूतावासको सूची चाँडै हेर्नुहोस्।",
          ]),
          p(
            "अनुवाद चाहियो? हाम्रो [आधिकारिक अनुवाद सेवा](/services/authorized-translation) हेर्नुहोस् वा कागजातको फोटो पठाउनुहोस्।",
          ),
        ],
      },
    },
  },
  {
    slug: "power-of-attorney-nepal",
    date: "2026-10-01",
    minutes: 5,
    image: "/images/notary-writing.jpg",
    services: ["legal-documentation", "legal-consultation"],
    content: {
      en: {
        title: "Power of attorney (अख्तियारनामा) in Nepal: when you need one",
        description:
          "What a power of attorney is, when Nepalis at home and abroad use one, and how to keep the authority limited and safe.",
        blocks: [
          h2("What is a power of attorney?"),
          p(
            "A power of attorney (अख्तियारनामा) is a written document in which you, the principal, authorise another person, the agent, to act on your behalf. The agent can only do what the document allows, so the way it is written matters.",
          ),
          h2("When people use one"),
          ul([
            "Selling, buying or mortgaging land and houses while living abroad",
            "Handling bank, insurance or government office work when you cannot be present",
            "Following up a court case or collecting documents on your behalf",
            "Managing company or business matters during a long absence",
          ]),
          h2("General or specific authority?"),
          p(
            "A general power of attorney gives broad authority over many matters. A specific (limited) one covers a single task, such as selling one named plot of land. For most people a specific power of attorney is safer: it should clearly name the property or matter, what the agent may and may not do, and how long the authority lasts.",
          ),
          h2("If you are abroad"),
          p(
            "Nepalis living abroad can usually execute a power of attorney through a Nepali embassy or consulate, or have it notarized locally and then authenticated. The exact requirements depend on the office in Nepal where it will be used, such as a Land Revenue Office (मालपोत कार्यालय) or a bank, so confirm them before you sign. We can [draft the document](/services/legal-documentation) and tell you which steps apply.",
          ),
          h2("Keeping it safe"),
          ul([
            "Choose an agent you trust completely, and give them only the authority the task needs.",
            "Describe the property precisely: plot number, area and location, as shown on the land ownership certificate.",
            "Set an end date or end condition, and revoke the authority in writing once the work is done.",
            "Keep certified copies, and ask your agent for updates and receipts.",
          ]),
          p("Want one drafted or reviewed? Start with a [legal consultation](/services/legal-consultation)."),
        ],
      },
      ne: {
        title: "नेपालमा अख्तियारनामा: कहिले चाहिन्छ?",
        description:
          "अख्तियारनामा के हो, स्वदेश र विदेशमा रहेका नेपालीले कहिले प्रयोग गर्छन्, र अख्तियारी सीमित र सुरक्षित कसरी राख्ने।",
        blocks: [
          h2("अख्तियारनामा के हो?"),
          p(
            "अख्तियारनामा एउटा लिखित कागजात हो, जसमार्फत तपाईं (अख्तियार दिने व्यक्ति) अर्को व्यक्ति (अख्तियार पाउने) लाई आफ्नो तर्फबाट काम गर्ने अधिकार दिनुहुन्छ। अख्तियार पाउनेले कागजातमा लेखिएको काम मात्र गर्न सक्छ, त्यसैले यो कसरी लेखिन्छ भन्ने कुरा महत्त्वपूर्ण हुन्छ।",
          ),
          h2("कहिले प्रयोग गरिन्छ?"),
          ul([
            "विदेशमा बस्दा घरजग्गा बेच्न, किन्न वा धितो राख्न",
            "आफू उपस्थित हुन नसक्दा बैंक, बीमा वा सरकारी कार्यालयको काम गर्न",
            "मुद्दाको पैरवी गर्न वा तपाईंको तर्फबाट कागजात बुझ्न",
            "लामो समय अनुपस्थित हुँदा कम्पनी वा व्यवसायको काम हेर्न",
          ]),
          h2("साधारण कि विशेष अख्तियारी?"),
          p(
            "साधारण अख्तियारनामाले धेरै विषयमा व्यापक अधिकार दिन्छ। विशेष (सीमित) अख्तियारनामा एउटा मात्र कामका लागि हुन्छ, जस्तै तोकिएको एउटा कित्ता जग्गा बेच्न। धेरैजसो अवस्थामा विशेष अख्तियारनामा सुरक्षित हुन्छ: यसमा सम्पत्ति वा विषय स्पष्ट उल्लेख हुनुपर्छ, अख्तियार पाउनेले के गर्न सक्छ र के सक्दैन, र अख्तियारी कहिलेसम्म रहन्छ भन्ने लेखिनुपर्छ।",
          ),
          h2("तपाईं विदेशमा हुनुहुन्छ भने"),
          p(
            "विदेशमा रहेका नेपालीले सामान्यतया नेपाली दूतावास वा वाणिज्य दूतावासमार्फत, वा त्यहीँ नोटरी गराएर प्रमाणीकरण गरी अख्तियारनामा तयार गर्न सक्छन्। ठ्याक्कै के चाहिन्छ भन्ने कुरा त्यो कागजात प्रयोग हुने नेपालको कार्यालय, जस्तै मालपोत कार्यालय वा बैंकमा भर पर्छ, त्यसैले सही गर्नुअघि पुष्टि गर्नुहोस्। हामी [कागजात तयार](/services/legal-documentation) गरिदिन्छौं र कुन चरण लागू हुन्छ बताउँछौं।",
          ),
          h2("सुरक्षित राख्ने उपाय"),
          ul([
            "पूर्ण विश्वास भएको व्यक्ति छान्नुहोस्, र कामका लागि चाहिने जति मात्र अधिकार दिनुहोस्।",
            "जग्गाधनी प्रमाणपुर्जामा भएअनुसार कित्ता नम्बर, क्षेत्रफल र ठेगानासहित सम्पत्ति ठ्याक्कै उल्लेख गर्नुहोस्।",
            "अन्तिम मिति वा शर्त राख्नुहोस्, र काम सकिएपछि लिखित रूपमा अख्तियारी फिर्ता लिनुहोस्।",
            "प्रमाणित प्रतिलिपि राख्नुहोस्, र अख्तियार पाउनेसँग नियमित जानकारी र रसिद माग्नुहोस्।",
          ]),
          p("अख्तियारनामा तयार वा जाँच गराउनु छ? [कानुनी परामर्शबाट](/services/legal-consultation) सुरु गर्नुहोस्।"),
        ],
      },
    },
  },
  {
    slug: "company-registration-nepal",
    date: "2026-10-01",
    minutes: 5,
    image: "/images/law-books.jpg",
    services: ["company-services", "legal-documentation"],
    content: {
      en: {
        title: "Registering a private company in Nepal: an overview",
        description:
          "The main steps, documents and post-registration requirements for setting up a private limited company in Nepal.",
        blocks: [
          h2("Who registers companies in Nepal?"),
          p(
            "Private and public companies are registered with the Office of Company Registrar (OCR) under the Companies Act, 2063 (2006). Applications are made through the OCR's online system, and the registration fee depends on the company's authorised capital.",
          ),
          h2("The main steps"),
          ol([
            "**Choose a name.** Prepare two or three options; the OCR checks that the name is not already taken or too similar to an existing company.",
            "**Prepare the constitutional documents.** The Memorandum of Association sets out the objectives and capital; the Articles of Association set out how the company is run.",
            "**Apply online.** Submit the application with the promoters' documents and pay the registration fee.",
            "**Receive the registration certificate** once the OCR approves the application.",
          ]),
          h2("Documents you'll typically need"),
          ul([
            "Citizenship certificates (or passports) and photos of all promoters",
            "Proposed company names and business objectives",
            "Registered office address",
            "Share structure: authorised, issued and paid-up capital, and each promoter's shares",
          ]),
          h2("After registration"),
          p(
            "Registration is only the start. Most companies then register for PAN (and VAT where applicable) with the Inland Revenue Office, complete local ward registration and open a bank account, then keep up with annual requirements such as holding the annual general meeting and filing annual returns with the OCR.",
          ),
          h2("Foreign investors"),
          p(
            "Companies with foreign investment need prior approval under the Foreign Investment and Technology Transfer Act, 2075 (2019) before registration, which adds steps and documents. Talk to us early so the structure is right from the start.",
          ),
          p(
            "Ready to start? See our [company services](/services/company-services), or ask us to [draft your shareholder and commercial contracts](/services/legal-documentation).",
          ),
        ],
      },
      ne: {
        title: "नेपालमा प्राइभेट कम्पनी दर्ता: एक झलक",
        description: "नेपालमा प्राइभेट लिमिटेड कम्पनी खोल्दा पर्ने मुख्य चरण, कागजात र दर्तापछिका आवश्यकता।",
        blocks: [
          h2("नेपालमा कम्पनी कहाँ दर्ता हुन्छ?"),
          p(
            "प्राइभेट तथा पब्लिक कम्पनीहरू कम्पनी ऐन, २०६३ अन्तर्गत कम्पनी रजिस्ट्रारको कार्यालयमा दर्ता हुन्छन्। आवेदन कार्यालयको अनलाइन प्रणालीमार्फत दिइन्छ, र दर्ता शुल्क कम्पनीको अधिकृत पुँजीमा भर पर्छ।",
          ),
          h2("मुख्य चरणहरू"),
          ol([
            "**नाम छान्नुहोस्।** दुई–तीन विकल्प तयार राख्नुहोस्; नाम पहिले नै लिइएको वा अर्को कम्पनीसँग धेरै मिल्दोजुल्दो छ कि छैन कार्यालयले जाँच्छ।",
            "**प्रबन्धपत्र र नियमावली तयार गर्नुहोस्।** प्रबन्धपत्रमा उद्देश्य र पुँजी हुन्छ; नियमावलीमा कम्पनी कसरी सञ्चालन हुन्छ भन्ने हुन्छ।",
            "**अनलाइन आवेदन दिनुहोस्।** संस्थापकहरूका कागजातसहित आवेदन बुझाएर दर्ता शुल्क तिर्नुहोस्।",
            "**दर्ता प्रमाणपत्र लिनुहोस्**, कार्यालयले आवेदन स्वीकृत गरेपछि।",
          ]),
          h2("सामान्यतया चाहिने कागजात"),
          ul([
            "सबै संस्थापकको नागरिकता (वा राहदानी) र फोटो",
            "प्रस्तावित कम्पनीका नाम र व्यावसायिक उद्देश्य",
            "रजिस्टर्ड कार्यालयको ठेगाना",
            "सेयर संरचना: अधिकृत, जारी र चुक्ता पुँजी, र हरेक संस्थापकको सेयर",
          ]),
          h2("दर्तापछि"),
          p(
            "दर्ता त सुरुवात मात्र हो। धेरैजसो कम्पनीले त्यसपछि आन्तरिक राजस्व कार्यालयमा स्थायी लेखा नम्बर (र लागू हुने भए मूल्य अभिवृद्धि कर) दर्ता, वडामा व्यवसाय दर्ता र बैंक खाता खोल्ने काम गर्छन्, अनि वार्षिक साधारण सभा तथा कम्पनी रजिस्ट्रारको कार्यालयमा वार्षिक विवरण बुझाउने जस्ता दायित्व पूरा गर्छन्।",
          ),
          h2("विदेशी लगानीकर्ता"),
          p(
            "विदेशी लगानी भएका कम्पनीलाई दर्ताअघि विदेशी लगानी तथा प्रविधि हस्तान्तरण ऐन, २०७५ अन्तर्गत पूर्वस्वीकृति चाहिन्छ, जसले थप चरण र कागजात थप्छ। सुरुदेखि नै संरचना सही होस् भनेर चाँडै हामीसँग कुरा गर्नुहोस्।",
          ),
          p(
            "सुरु गर्न तयार हुनुहुन्छ? हाम्रो [कम्पनी सेवा](/services/company-services) हेर्नुहोस्, वा [सेयरधनी तथा व्यावसायिक सम्झौता](/services/legal-documentation) तयार गर्न भन्नुहोस्।",
          ),
        ],
      },
    },
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
