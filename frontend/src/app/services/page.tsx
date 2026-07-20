import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ServicesHero } from "@/features/services/components/services-hero";
import { ServicesGrid } from "@/features/services/components/services-grid";
import { ServiceProcess } from "@/features/services/components/service-process";
import { ServiceFAQEnhanced } from "@/features/services/components/service-faq-enhanced";
import { ServiceComparison } from "@/features/services/components/service-comparison";
import { ServiceTechShowcase } from "@/features/services/components/service-tech-showcase";
import { ServiceConsultationCTA } from "@/features/services/components/service-consultation-cta";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore StackSentry's full range of enterprise software development services — from AI and machine learning to cloud infrastructure, DevOps, cybersecurity, and custom web applications.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} className="px-4 sm:px-6 lg:px-8" />
      <ServicesHero />
      <ServicesGrid />
      <ServiceComparison />
      <ServiceTechShowcase />
      <ServiceProcess />
      <ServiceFAQEnhanced />
      <ServiceConsultationCTA />
    </main>
  );
}
