import { Metadata } from "next";

export const siteConfig = {
  name: "Query Stack",
  description:
    "A community-driven platform where developers connect, ask questions, share knowledge, and grow together. Join thousands of developers worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://query-stack-eight.vercel.app/",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/RamRaj110/QueryStack",
    twitter: "https://twitter.com/querystack",
  },
  keywords: [
    "programming",
    "coding",
    "developers",
    "Q&A",
    "stack overflow",
    "community",
    "learning",
    "technology",
    "software development",
    "ask questions",
    "get answers",
  ],
};

export function createMetadata({
  title,
  description,
  image = siteConfig.ogImage,
  url,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}): Metadata {
  const metadata: Metadata = {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: url || siteConfig.url,
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [image],
      creator: "@querystack",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
