import type { Metadata } from "next";
import { TechStackExplorer } from "@/features/engineering/components/tech-stack-explorer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Technology Stack",
  description:
    "Explore StackSentry's technology stack — modern frontend, backend, database, cloud, AI, and DevOps tools we use to build enterprise software.",
};

export default function TechStackPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/engineering` },
          { name: "Technology Stack", url: `${siteConfig.url}/engineering/tech-stack` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Engineering", href: "/engineering" },
          { label: "Technology Stack" },
        ]}
      />
      <TechStackExplorer />
    </main>
  );
}
