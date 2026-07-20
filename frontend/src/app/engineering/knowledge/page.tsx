import type { Metadata } from "next";
import { KnowledgeCenter } from "@/features/engineering/components/knowledge-center";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Knowledge Center",
  description:
    "StackSentry's knowledge center — architecture guides, technology insights, security tips, performance optimization articles, and engineering best practices.",
};

export default function KnowledgePage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/engineering` },
          { name: "Knowledge Center", url: `${siteConfig.url}/engineering/knowledge` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Engineering", href: "/engineering" },
          { label: "Knowledge Center" },
        ]}
      />
      <KnowledgeCenter />
    </main>
  );
}
