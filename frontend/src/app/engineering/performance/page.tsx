import type { Metadata } from "next";
import { QualityDashboard } from "@/features/engineering/components/quality-dashboard";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Performance & Quality",
  description:
    "StackSentry's performance and quality standards — performance optimization, accessibility, SEO, responsive design, and Core Web Vitals targets.",
};

export default function PerformancePage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/engineering` },
          { name: "Performance & Quality", url: `${siteConfig.url}/engineering/performance` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Engineering", href: "/engineering" },
          { label: "Performance & Quality" },
        ]}
      />
      <QualityDashboard />
    </main>
  );
}
