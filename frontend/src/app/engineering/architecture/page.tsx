import type { Metadata } from "next";
import { ArchitectureShowcase } from "@/features/engineering/components/architecture-showcase";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Software Architecture",
  description:
    "Explore StackSentry's layered software architecture approach — from client applications through CDN, load balancing, APIs, business logic, databases, and monitoring.",
};

export default function ArchitecturePage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/engineering` },
          { name: "Architecture", url: `${siteConfig.url}/engineering/architecture` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Engineering", href: "/engineering" },
          { label: "Architecture" },
        ]}
      />
      <ArchitectureShowcase />
    </main>
  );
}
