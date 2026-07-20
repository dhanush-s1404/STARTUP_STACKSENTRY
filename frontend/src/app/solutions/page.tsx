import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  SolutionsHero,
  SolutionsGrid,
  SolutionComparison,
  SolutionArchitectureShowcase,
  SolutionMetrics,
  SolutionChallenges,
} from "@/features/solutions/components";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore StackSentry's enterprise business solutions — pre-built, customizable platforms designed to solve complex business challenges across industries.",
};

export default function SolutionsPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Solutions", url: `${siteConfig.url}/solutions` },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Solutions" }]} />
      <SolutionsHero />
      <SolutionsGrid />
      <SolutionComparison />
      <SolutionArchitectureShowcase />
      <SolutionMetrics />
      <SolutionChallenges />
      <CTASection />
    </main>
  );
}
