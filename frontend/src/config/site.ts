import type { Metadata } from "next";

export const siteConfig = {
  name: "StackSentry Technologies",
  tagline: "Building Intelligent Software for Tomorrow",
  description:
    "StackSentry Technologies delivers world-class AI-powered enterprise software solutions. Trusted by organizations worldwide.",
  url: "https://stacksentry.com",
  ogImage: "https://stacksentry.com/og.png",
  version: "1.0.0",
  contact: {
    email: "hello@stacksentry.com",
    phone: "+1 (555) 012-3456",
    supportEmail: "support@stacksentry.com",
  },
  links: {
    twitter: "https://twitter.com/stacksentry",
    github: "https://github.com/stacksentry",
    linkedin: "https://linkedin.com/company/stacksentry",
    youtube: "https://youtube.com/@stacksentry",
    facebook: "https://facebook.com/stacksentry",
    instagram: "https://instagram.com/stacksentry",
  },
  social: [
    { name: "Twitter", url: "https://twitter.com/stacksentry", icon: "Twitter" },
    { name: "GitHub", url: "https://github.com/stacksentry", icon: "Github" },
    { name: "LinkedIn", url: "https://linkedin.com/company/stacksentry", icon: "Linkedin" },
    { name: "YouTube", url: "https://youtube.com/@stacksentry", icon: "Youtube" },
  ] as const,
  company: {
    founded: 2024,
    mission: "Deliver world-class AI-powered enterprise software.",
    vision: "Become one of the world's most trusted software companies.",
    address: {
      street: "123 Innovation Drive",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
    },
  },
} as const;

export const siteMetadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "enterprise software",
    "AI solutions",
    "intelligent automation",
    "software development",
    "cloud infrastructure",
    "machine learning",
    "data analytics",
    "SaaS platform",
    "digital transformation",
    "enterprise AI",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
};
