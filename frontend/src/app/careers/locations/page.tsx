import type { Metadata } from "next";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { LocationsGrid } from "@/features/careers/components";

export const metadata: Metadata = {
  title: "Locations | StackSentry Technologies",
  description:
    "Discover StackSentry Technologies office locations worldwide. Find opportunities near you or explore remote roles.",
  openGraph: {
    title: "Locations | StackSentry Technologies",
    description:
      "Discover StackSentry Technologies office locations worldwide. Find opportunities near you or explore remote roles.",
    url: `${siteConfig.url}/careers/locations`,
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
    title: "Locations | StackSentry Technologies",
    description:
      "Discover StackSentry Technologies office locations worldwide. Find opportunities near you or explore remote roles.",
    images: [siteConfig.ogImage],
  },
};

export default function LocationsPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          {
            name: "Locations",
            url: `${siteConfig.url}/careers/locations`,
          },
        ])}
      />
      <LocationsGrid />
    </main>
  );
}
