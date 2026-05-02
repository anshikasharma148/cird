import type { Metadata } from "next";

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type ItemListEntry = {
  name: string;
  path?: string;
  description?: string;
};

export const siteConfig = {
  name: "CIRD",
  fullName: "Centre for Industrial Research and Development",
  description:
    "Centre for Industrial Research and Development (CIRD) at JUET, Guna. Driving industry-academia research, technology transfer, patents, and innovation.",
  domain: (process.env.NEXT_PUBLIC_SITE_URL || "https://cird.co.in").replace(/\/$/, ""),
  ogImage: "/assets/hero/techimage.png",
  locale: "en_IN",
  contactEmail: "support@cird.co.in",
  linkedin: "https://www.linkedin.com/in/center-of-industrial-research-and-development/",
};

export const defaultKeywords = [
  "CIRD",
  "Centre for Industrial Research and Development",
  "JUET Guna",
  "industry academia collaboration",
  "research and development",
  "technology transfer",
  "patents",
  "innovation",
];

export function absoluteUrl(path: string = "/") {
  return new URL(path, `${siteConfig.domain}/`).toString();
}

function resolveUrl(pathOrUrl: string) {
  return /^https?:\/\//i.test(pathOrUrl) ? pathOrUrl : absoluteUrl(pathOrUrl);
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: BuildPageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const mergedKeywords = [...defaultKeywords, ...keywords];

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.fullName,
      locale: siteConfig.locale,
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: siteConfig.fullName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: resolveUrl(item.path),
    })),
  };
}

export function buildFaqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildItemListSchema(name: string, items: ItemListEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Thing",
        name: item.name,
        ...(item.path ? { url: resolveUrl(item.path) } : {}),
        ...(item.description ? { description: item.description } : {}),
      },
    })),
  };
}
