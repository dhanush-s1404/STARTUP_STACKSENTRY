import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { DiversityHero, DiversityContent } from "@/features/careers/components";
import { CTASection } from "@/components/sections/cta-section-new";

export const metadata: Metadata = {
  title: "Diversity, Equity & Inclusion",
  description:
    "Our commitment to building a diverse, equitable, and inclusive workplace.",
  openGraph: {
    title: "Diversity, Equity & Inclusion | StackSentry Technologies",
    description:
      "Our commitment to building a diverse, equitable, and inclusive workplace.",
    url: `${siteConfig.url}/careers/diversity`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diversity, Equity & Inclusion | StackSentry Technologies",
    description:
      "Our commitment to building a diverse, equitable, and inclusive workplace.",
    images: [siteConfig.ogImage],
  },
};

export default function DiversityPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          { name: "Diversity, Equity & Inclusion", url: `${siteConfig.url}/careers/diversity` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: "Diversity, Equity & Inclusion" },
        ]}
        className="px-4 sm:px-6 lg:px-8"
      />
      <DiversityHero />
      <DiversityContent />
      <CTASection />
    </main>
  );
}
