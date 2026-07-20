import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { InternshipsHero, InternshipsGrid } from "@/features/careers/components";
import { CTASection } from "@/components/sections/cta-section-new";

export const metadata: Metadata = {
  title: "Internship Programs",
  description:
    "Launch your career with StackSentry. Explore our internship programs in Software Development, AI, Cloud, and more.",
  openGraph: {
    title: "Internship Programs | StackSentry Technologies",
    description:
      "Launch your career with StackSentry. Explore our internship programs in Software Development, AI, Cloud, and more.",
    url: `${siteConfig.url}/careers/internships`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Internship Programs | StackSentry Technologies",
    description:
      "Launch your career with StackSentry. Explore our internship programs in Software Development, AI, Cloud, and more.",
    images: [siteConfig.ogImage],
  },
};

export default function InternshipsPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          { name: "Internships", url: `${siteConfig.url}/careers/internships` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: "Internship Programs" },
        ]}
        className="px-4 sm:px-6 lg:px-8"
      />
      <InternshipsHero />
      <InternshipsGrid />
      <CTASection />
    </main>
  );
}
