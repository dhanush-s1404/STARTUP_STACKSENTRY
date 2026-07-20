import type { Metadata } from "next";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { JobsHero, JobListings } from "@/features/careers/components";

export const metadata: Metadata = {
  title: "Open Positions | StackSentry Technologies",
  description:
    "Browse all open positions at StackSentry Technologies. Find your next role in engineering, design, product, and more.",
  openGraph: {
    title: "Open Positions | StackSentry Technologies",
    description:
      "Browse all open positions at StackSentry Technologies. Find your next role in engineering, design, product, and more.",
    url: `${siteConfig.url}/careers/jobs`,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Positions | StackSentry Technologies",
    description:
      "Browse all open positions at StackSentry Technologies. Find your next role in engineering, design, product, and more.",
    images: [siteConfig.ogImage],
  },
};

export default function JobListingsPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          { name: "Open Positions", url: `${siteConfig.url}/careers/jobs` },
        ])}
      />
      <JobsHero />
      <JobListings />
    </main>
  );
}
