import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { LearningHero, LearningContent } from "@/features/careers/components";
import { CTASection } from "@/components/sections/cta-section-new";

export const metadata: Metadata = {
  title: "Learning & Growth",
  description:
    "Invest in your growth with learning budgets, certifications, mentorship, and more.",
  openGraph: {
    title: "Learning & Growth | StackSentry Technologies",
    description:
      "Invest in your growth with learning budgets, certifications, mentorship, and more.",
    url: `${siteConfig.url}/careers/learning`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning & Growth | StackSentry Technologies",
    description:
      "Invest in your growth with learning budgets, certifications, mentorship, and more.",
    images: [siteConfig.ogImage],
  },
};

export default function LearningPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          { name: "Learning & Growth", url: `${siteConfig.url}/careers/learning` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: "Learning & Growth" },
        ]}
        className="px-4 sm:px-6 lg:px-8"
      />
      <LearningHero />
      <LearningContent />
      <CTASection />
    </main>
  );
}
