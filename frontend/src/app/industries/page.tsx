import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { IndustriesHero } from "@/features/industries/components/industries-hero";
import { IndustriesGrid } from "@/features/industries/components/industries-grid";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "StackSentry serves 12+ industries with specialized software solutions — healthcare, education, finance, manufacturing, retail, and more.",
};

export default function IndustriesPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Industries", url: `${siteConfig.url}/industries` },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
      <IndustriesHero />
      <IndustriesGrid />
      <CTASection />
    </main>
  );
}
