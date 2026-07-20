import type { Metadata } from "next";
import { FAQSection } from "@/features/consultation/components/faq-section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about StackSentry's development process, pricing, timeline, and technology choices.",
};

export default function FAQPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "FAQ", url: `${siteConfig.url}/consultation/faq` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
      />
      <FAQSection />
    </main>
  );
}
