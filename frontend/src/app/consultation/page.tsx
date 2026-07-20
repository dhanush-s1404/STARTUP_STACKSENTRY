import type { Metadata } from "next";
import { ConsultationHero } from "@/features/consultation/components/consultation-hero";
import { ContactOptions } from "@/features/consultation/components/contact-options";
import { FAQSection } from "@/features/consultation/components/faq-section";
import { CTASection } from "@/components/sections/cta-section-new";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Project Consultation",
  description:
    "Plan your next software project with StackSentry's structured consultation process. Get guidance on architecture, technology, and implementation.",
};

export default function ConsultationPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Consultation", url: `${siteConfig.url}/consultation` },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Consultation" }]} />
      <ConsultationHero />
      <ContactOptions />
      <FAQSection />
      <CTASection />
    </main>
  );
}
