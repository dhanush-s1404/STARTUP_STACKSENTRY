import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ClientSuccessHero } from "@/features/client-success/components/client-success-hero";
import { SuccessMetrics } from "@/features/client-success/components/success-metrics";
import { ClientSuccessChart } from "@/features/client-success/components/client-success-chart";
import { SuccessStories } from "@/features/client-success/components/success-stories";
import { InfographicSection } from "@/features/client-success/components/infographic-section";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Client Success",
  description:
    "See the measurable results StackSentry Technologies delivers. Real metrics, real impact, real client success stories.",
};

export default function ClientSuccessPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Client Success", url: `${siteConfig.url}/client-success` },
        ])}
      />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Client Success" }]}
        className="px-4 sm:px-6 lg:px-8"
      />
      <ClientSuccessHero />
      <SuccessMetrics />
      <ClientSuccessChart />
      <SuccessStories />
      <InfographicSection />
      <CTASection />
    </main>
  );
}
