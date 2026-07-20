import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { GraduateHero, GraduateProgramsGrid } from "@/features/careers/components";
import { CTASection } from "@/components/sections/cta-section-new";

export const metadata: Metadata = {
  title: "Graduate Programs",
  description:
    "Start your career journey with StackSentry's Graduate Programs. Training, mentorship, and full-time opportunities.",
  openGraph: {
    title: "Graduate Programs | StackSentry Technologies",
    description:
      "Start your career journey with StackSentry's Graduate Programs. Training, mentorship, and full-time opportunities.",
    url: `${siteConfig.url}/careers/graduates`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Graduate Programs | StackSentry Technologies",
    description:
      "Start your career journey with StackSentry's Graduate Programs. Training, mentorship, and full-time opportunities.",
    images: [siteConfig.ogImage],
  },
};

export default function GraduatesPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          { name: "Graduate Programs", url: `${siteConfig.url}/careers/graduates` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: "Graduate Programs" },
        ]}
        className="px-4 sm:px-6 lg:px-8"
      />
      <GraduateHero />
      <GraduateProgramsGrid />
      <CTASection />
    </main>
  );
}
