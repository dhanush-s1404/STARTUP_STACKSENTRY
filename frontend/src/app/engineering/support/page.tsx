import type { Metadata } from "next";
import { SupportMaintenance } from "@/features/engineering/components/support-maintenance";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Support & Maintenance",
  description:
    "StackSentry's support and maintenance services — bug fixes, performance improvements, security updates, infrastructure monitoring, and long-term partnership.",
};

export default function SupportPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/engineering` },
          { name: "Support & Maintenance", url: `${siteConfig.url}/engineering/support` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Engineering", href: "/engineering" },
          { label: "Support & Maintenance" },
        ]}
      />
      <SupportMaintenance />
    </main>
  );
}
