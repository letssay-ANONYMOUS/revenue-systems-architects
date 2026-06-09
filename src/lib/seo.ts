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
    title: "AI Automation Agency in UAE | STERK.systems",
    description:
      "STERK.systems builds AI calling agents, chatbots, automation systems and websites that win UAE businesses more leads and bookings.",
  },
  {
    path: "/about",
    title: "About STERK.systems — AI Automation Studio in UAE",
    description:
      "Meet STERK.systems, the Al Ain–based studio building AI calling agents, chatbots and automation systems for businesses across the UAE.",
  },
  {
    path: "/book-a-call",
    title: "Book a Free AI Strategy Call | STERK.systems",
    description:
      "Book a free strategy call with STERK.systems. Map where AI calling agents, chatbots and automation can save time and win more customers.",
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
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon-512.png`,
      sameAs: ["https://x.com/STERKsystems"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      image: OG_IMAGE_URL,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "AE" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Al Ain",
        addressRegion: "Abu Dhabi",
        addressCountry: "AE",
      },
      serviceType: [
        "AI calling agents",
        "AI chatbots",
        "Business process automation",
        "Web development",
      ],
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
