import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProjectInquiryHero } from "@/features/portfolio/components/project-inquiry-hero";
import { ProjectInquiryForm } from "@/features/portfolio/components/project-inquiry-form";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Start a Project | StackSentry Technologies",
  description:
    "Tell us about your project. Get a free consultation and quote within 24 hours.",
  openGraph: {
    title: `Start a Project | ${siteConfig.name}`,
    description:
      "Tell us about your project. Get a free consultation and quote within 24 hours.",
    url: `${siteConfig.url}/portfolio/inquiry`,
  },
};

export default function ProjectInquiryPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Portfolio", url: `${siteConfig.url}/portfolio` },
          { name: "Start a Project", url: `${siteConfig.url}/portfolio/inquiry` },
        ])}
      />
      <Breadcrumb
        className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8"
        items={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Start a Project" },
        ]}
      />
      <ProjectInquiryHero />
      <ProjectInquiryForm />
    </main>
  );
}
