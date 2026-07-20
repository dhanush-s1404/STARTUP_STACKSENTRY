import type { Metadata } from "next";
import { ProjectDiscoveryWizard } from "@/features/consultation/components/project-discovery-wizard";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Project Discovery",
  description:
    "Use our structured multi-step wizard to define your project goals, features, timeline, and budget. Receive intelligent recommendations.",
};

export default function DiscoverPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Consultation", url: `${siteConfig.url}/consultation` },
          { name: "Project Discovery", url: `${siteConfig.url}/consultation/discover` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Consultation", href: "/consultation" },
          { label: "Project Discovery" },
        ]}
      />
      <ProjectDiscoveryWizard />
    </main>
  );
}
