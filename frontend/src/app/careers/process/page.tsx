import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { RecruitmentProcess, RecruitmentContact } from "@/features/careers/components";
import { CTASection } from "@/components/sections/cta-section-new";

export const metadata: Metadata = {
  title: "Recruitment Process",
  description:
    "Learn about our transparent recruitment process. From application to onboarding, we guide you every step.",
  openGraph: {
    title: "Recruitment Process | StackSentry Technologies",
    description:
      "Learn about our transparent recruitment process. From application to onboarding, we guide you every step.",
    url: `${siteConfig.url}/careers/process`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruitment Process | StackSentry Technologies",
    description:
      "Learn about our transparent recruitment process. From application to onboarding, we guide you every step.",
    images: [siteConfig.ogImage],
  },
};

export default function RecruitmentProcessPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          { name: "Recruitment Process", url: `${siteConfig.url}/careers/process` },
        ])}
      />
      <Section padding="lg" background="gradient">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Careers", href: "/careers" },
              { label: "Recruitment Process" },
            ]}
            className="mb-8"
          />
          <Heading
            level="h1"
            description="A transparent, supportive hiring experience designed to find the best talent."
          >
            Our Recruitment Process
          </Heading>
        </Container>
      </Section>
      <RecruitmentProcess />
      <RecruitmentContact />
      <CTASection />
    </main>
  );
}
