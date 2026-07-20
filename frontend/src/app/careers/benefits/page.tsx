import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { BenefitsHero, BenefitsGrid } from "@/features/careers/components";
import { CTASection } from "@/components/sections/cta-section-new";

export const metadata: Metadata = {
  title: "Employee Benefits",
  description:
    "Comprehensive benefits including health, financial wellness, learning budgets, and more.",
  openGraph: {
    title: "Employee Benefits | StackSentry Technologies",
    description:
      "Comprehensive benefits including health, financial wellness, learning budgets, and more.",
    url: `${siteConfig.url}/careers/benefits`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Employee Benefits | StackSentry Technologies",
    description:
      "Comprehensive benefits including health, financial wellness, learning budgets, and more.",
    images: [siteConfig.ogImage],
  },
};

export default function BenefitsPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          { name: "Employee Benefits", url: `${siteConfig.url}/careers/benefits` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: "Employee Benefits" },
        ]}
        className="px-4 sm:px-6 lg:px-8"
      />
      <BenefitsHero />
      <BenefitsGrid />
      <CTASection />
    </main>
  );
}
