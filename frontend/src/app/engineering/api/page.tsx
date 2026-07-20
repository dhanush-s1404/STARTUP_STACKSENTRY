import type { Metadata } from "next";
import { ApiExperience } from "@/features/engineering/components/api-experience";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "API & Integration",
  description:
    "StackSentry's API design philosophy — RESTful APIs, versioning, validation, pagination, error handling, authentication, and rate limiting.",
};

export default function ApiPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/engineering` },
          { name: "API & Integration", url: `${siteConfig.url}/engineering/api` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Engineering", href: "/engineering" },
          { label: "API & Integration" },
        ]}
      />
      <ApiExperience />
    </main>
  );
}
