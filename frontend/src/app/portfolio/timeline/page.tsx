import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PortfolioTimelineHero } from "@/features/portfolio/components/portfolio-timeline-hero";
import { PortfolioTimeline } from "@/features/portfolio/components/portfolio-timeline";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Project Timelines | StackSentry Technologies",
  description:
    "Explore our project delivery timelines and see how we bring enterprise software to life.",
};

export default function PortfolioTimelinePage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Portfolio", url: `${siteConfig.url}/portfolio` },
          { name: "Timelines", url: `${siteConfig.url}/portfolio/timeline` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Timelines" },
        ]}
      />
      <PortfolioTimelineHero />
      <PortfolioTimeline />
      <CTASection />
    </main>
  );
}
