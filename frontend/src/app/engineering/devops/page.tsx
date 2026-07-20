import type { Metadata } from "next";
import { DevopsWorkflow } from "@/features/engineering/components/devops-workflow";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cloud & DevOps",
  description:
    "StackSentry's cloud and DevOps practices — CI/CD, containerization, infrastructure as code, monitoring, and high-availability deployment.",
};

export default function DevOpsPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/engineering` },
          { name: "Cloud & DevOps", url: `${siteConfig.url}/engineering/devops` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Engineering", href: "/engineering" },
          { label: "Cloud & DevOps" },
        ]}
      />
      <DevopsWorkflow />
    </main>
  );
}
