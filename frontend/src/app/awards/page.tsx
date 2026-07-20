import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AwardsHero } from "@/features/awards/components/awards-hero";
import { AwardsGrid } from "@/features/awards/components/awards-grid";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Awards & Recognition | StackSentry Technologies",
  description:
    "Discover the awards, certifications, and recognition StackSentry Technologies has earned for excellence in software development, AI innovation, and industry leadership.",
  openGraph: {
    title: "Awards & Recognition | StackSentry Technologies",
    description:
      "Discover the awards, certifications, and recognition StackSentry Technologies has earned for excellence in software development, AI innovation, and industry leadership.",
    url: `${siteConfig.url}/awards`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function AwardsPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Awards & Recognition", url: `${siteConfig.url}/awards` },
        ])}
      />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Awards & Recognition" }]}
        className="px-4 sm:px-6 lg:px-8"
      />
      <AwardsHero />
      <AwardsGrid />
      <CTASection />
    </main>
  );
}
