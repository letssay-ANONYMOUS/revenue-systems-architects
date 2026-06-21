export const SITE_URL = "https://www.sterk.systems";
export const OG_IMAGE_URL = `${SITE_URL}/og-cover.png`;
export const SITE_NAME = "STERK.systems";

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

export const ROUTE_SEO: RouteSeo[] = [
  {
    path: "/",
    title: "AI Automation Agency in UAE & GCC — AI Calling Agents & Chatbots | STERK.systems",
    description:
      "STERK.systems is an AI automation agency serving the UAE and GCC. We build AI calling agents, chatbots, lead-capture websites and business automation systems for companies in Dubai, Abu Dhabi, Riyadh, Doha, Kuwait and across the Gulf.",
  },
  {
    path: "/about",
    title: "About STERK.systems — AI Automation Agency | UAE & GCC",
    description:
      "STERK.systems is an AI automation agency based in Al Ain, UAE, serving businesses across the GCC. We build AI calling agents, chatbots, automated booking systems and high-converting websites.",
  },
  {
    path: "/book-a-call",
    title: "Book a Free AI Automation Strategy Call | STERK.systems",
    description:
      "Book a free strategy call with STERK.systems, an AI automation agency in the UAE & GCC. Discover how AI calling agents, chatbots and workflow automation can grow your business.",
  },
];

const NOT_FOUND_SEO: RouteSeo = {
  path: "/404",
  title: "Page Not Found | STERK.systems",
  description:
    "This page doesn't exist. Head back to STERK.systems — AI calling agents, chatbots and automation for UAE businesses.",
  noindex: true,
};

export const resolveRouteSeo = (pathname: string): RouteSeo => {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return ROUTE_SEO.find((route) => route.path === normalized) ?? NOT_FOUND_SEO;
};

export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "STERK Systems",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon-512.png`,
      description:
        "STERK.systems is an AI automation agency based in Al Ain, UAE, serving businesses across the GCC. We build AI calling agents, chatbots, lead-capture websites and business automation systems.",
      foundingLocation: {
        "@type": "Place",
        name: "Al Ain, Abu Dhabi, UAE",
      },
      knowsAbout: [
        "AI automation",
        "AI calling agents",
        "AI chatbots",
        "Business process automation",
        "Lead generation",
        "Appointment booking automation",
        "Web development",
        "Conversational AI",
      ],
      sameAs: ["https://x.com/STERKsystems"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      image: OG_IMAGE_URL,
      description:
        "AI automation agency offering AI calling agents, chatbots, automated booking systems and high-converting websites for businesses across the UAE and GCC.",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      areaServed: [
        { "@type": "City", name: "Al Ain" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "City", name: "Dubai" },
        { "@type": "Country", name: "AE" },
        { "@type": "City", name: "Riyadh" },
        { "@type": "City", name: "Jeddah" },
        { "@type": "Country", name: "SA" },
        { "@type": "Country", name: "QA" },
        { "@type": "Country", name: "KW" },
        { "@type": "Country", name: "BH" },
        { "@type": "Country", name: "OM" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Al Ain",
        addressRegion: "Abu Dhabi",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 24.1917,
        longitude: 55.7606,
      },
      serviceType: [
        "AI Automation Agency",
        "AI Calling Agents",
        "AI Chatbot Development",
        "Business Process Automation",
        "Lead Generation Automation",
        "Appointment Booking Systems",
        "Web Design and Development",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Automation Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Calling Agents",
              description:
                "Inbound and outbound AI voice agents that answer calls, qualify leads and book appointments 24/7.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Chatbots",
              description:
                "Conversational AI chatbots for websites and messaging platforms that capture leads and answer customer questions.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Business Automation Systems",
              description:
                "End-to-end workflow automation connecting CRMs, calendars, payments and communication channels.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "High-Converting Websites",
              description:
                "Lead-capture websites and web applications designed to convert visitors into booked appointments.",
            },
          },
        ],
      },
      priceRange: "$$",
    },
  ],
} as const;

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
};

const removeMeta = (attribute: "name" | "property", key: string) => {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
};

export const applyRouteSeo = (pathname: string) => {
  const seo = resolveRouteSeo(pathname);
  const canonicalPath = seo === NOT_FOUND_SEO ? pathname : seo.path;
  const canonicalUrl = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;

  document.title = seo.title;
  upsertMeta("name", "description", seo.description);
  upsertLink("canonical", canonicalUrl);

  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:title", seo.title);
  upsertMeta("property", "og:description", seo.description);
  upsertMeta("property", "og:url", canonicalUrl);
  upsertMeta("property", "og:image", OG_IMAGE_URL);
  upsertMeta("property", "og:image:width", "1200");
  upsertMeta("property", "og:image:height", "630");
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:site", "@STERKsystems");
  upsertMeta("name", "twitter:title", seo.title);
  upsertMeta("name", "twitter:description", seo.description);
  upsertMeta("name", "twitter:image", OG_IMAGE_URL);

  if (seo.noindex) {
    upsertMeta("name", "robots", "noindex, nofollow");
  } else {
    removeMeta("name", "robots");
  }

  let jsonLd = document.head.querySelector<HTMLScriptElement>("#sterk-structured-data");
  if (!jsonLd) {
    jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.id = "sterk-structured-data";
    jsonLd.textContent = JSON.stringify(STRUCTURED_DATA);
    document.head.appendChild(jsonLd);
  }
};
