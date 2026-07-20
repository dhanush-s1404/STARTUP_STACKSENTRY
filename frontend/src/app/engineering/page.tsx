import type { Metadata } from "next";
import { EngineeringHero } from "@/features/engineering/components/engineering-hero";
import { TrustIndicators } from "@/features/engineering/components/trust-indicators";
import { DeliveryLifecycle } from "@/features/engineering/components/delivery-lifecycle";
import { CTASection } from "@/components/sections/cta-section-new";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Engineering Excellence",
  description:
    "Discover how StackSentry designs, builds, deploys, secures, monitors, and supports enterprise software with engineering excellence.",
};

export default function EngineeringPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/engineering` },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Engineering" }]} />
      <EngineeringHero />
      <TrustIndicators />
      <DeliveryLifecycle />
      <CTASection />
    </main>
  );
}
