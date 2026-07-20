import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import {
  LifeHero,
  LifeContent,
  CoreValues,
  CultureSection,
} from "@/features/careers/components";
import { CTASection } from "@/components/sections/cta-section-new";

export const metadata: Metadata = {
  title: "Life at StackSentry",
  description:
    "Discover our culture, values, and what makes StackSentry a great place to work.",
  openGraph: {
    title: "Life at StackSentry | StackSentry Technologies",
    description:
      "Discover our culture, values, and what makes StackSentry a great place to work.",
    url: `${siteConfig.url}/careers/life`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Life at StackSentry | StackSentry Technologies",
    description:
      "Discover our culture, values, and what makes StackSentry a great place to work.",
    images: [siteConfig.ogImage],
  },
};

export default function LifePage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          { name: "Life at StackSentry", url: `${siteConfig.url}/careers/life` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: "Life at StackSentry" },
        ]}
        className="px-4 sm:px-6 lg:px-8"
      />
      <LifeHero />
      <LifeContent />
      <CoreValues />
      <CultureSection />
      <CTASection />
    </main>
  );
}
