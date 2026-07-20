import type { Metadata } from "next";
import { SecurityCenterShowcase } from "@/features/engineering/components/security-center-showcase";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Security Center",
  description:
    "StackSentry's security-first approach — authentication, authorization, encryption, secure development practices, and compliance readiness for enterprise software.",
};

export default function SecurityPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/engineering` },
          { name: "Security", url: `${siteConfig.url}/engineering/security` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Engineering", href: "/engineering" },
          { label: "Security" },
        ]}
      />
      <SecurityCenterShowcase />
    </main>
  );
}
