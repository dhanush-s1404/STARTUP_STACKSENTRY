import type { Metadata } from "next";
import { PortfolioHero } from "@/features/portfolio/components/portfolio-hero";
import { ProjectsGrid } from "@/features/portfolio/components/projects-grid";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Portfolio | StackSentry Technologies",
  description:
    "Explore StackSentry's portfolio of enterprise-grade software solutions. From AI platforms to healthcare systems, discover how we've transformed businesses across industries.",
  openGraph: {
    title: `Portfolio | ${siteConfig.name}`,
    description:
      "Explore StackSentry's portfolio of enterprise-grade software solutions that have transformed businesses across industries.",
    url: `${siteConfig.url}/portfolio`,
  },
};

export default function PortfolioPage() {
  return (
    <main className="flex-1">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Portfolio", url: `${siteConfig.url}/portfolio` },
        ])}
      />
      <PortfolioHero />
      <ProjectsGrid />
      <CTASection />
    </main>
  );
}
