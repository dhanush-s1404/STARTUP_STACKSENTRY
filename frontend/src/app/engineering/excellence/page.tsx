import type { Metadata } from "next";
import { EngineeringPrinciplesGrid } from "@/features/engineering/components/engineering-principles-grid";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Engineering Principles",
  description:
    "StackSentry's engineering principles — Clean Architecture, SOLID, modular design, API-first development, and testing strategies for enterprise software.",
};

export default function ExcellencePage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/engineering` },
          { name: "Engineering Excellence", url: `${siteConfig.url}/engineering/excellence` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Engineering", href: "/engineering" },
          { label: "Engineering Excellence" },
        ]}
      />
      <EngineeringPrinciplesGrid />
    </main>
  );
}
