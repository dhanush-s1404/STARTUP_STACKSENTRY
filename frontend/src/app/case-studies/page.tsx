import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CaseStudiesHero } from "@/features/case-studies/components/case-studies-hero";
import { CaseStudiesGrid } from "@/features/case-studies/components/case-studies-grid";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore how StackSentry Technologies has helped organizations across industries achieve measurable results through innovative software solutions.",
};

export default function CaseStudiesPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Case Studies", url: `${siteConfig.url}/case-studies` },
        ])}
      />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
        className="px-4 sm:px-6 lg:px-8"
      />
      <CaseStudiesHero />
      <CaseStudiesGrid />
      <CTASection />
    </main>
  );
}
