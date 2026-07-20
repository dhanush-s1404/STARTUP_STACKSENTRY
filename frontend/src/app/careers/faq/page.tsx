import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { CareersFaq } from "@/features/careers/components";
import { CTASection } from "@/components/sections/cta-section-new";

export const metadata: Metadata = {
  title: "FAQ - Careers",
  description:
    "Frequently asked questions about careers, applications, interviews, and working at StackSentry.",
  openGraph: {
    title: "FAQ - Careers | StackSentry Technologies",
    description:
      "Frequently asked questions about careers, applications, interviews, and working at StackSentry.",
    url: `${siteConfig.url}/careers/faq`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Careers | StackSentry Technologies",
    description:
      "Frequently asked questions about careers, applications, interviews, and working at StackSentry.",
    images: [siteConfig.ogImage],
  },
};

export default function CareersFaqPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          { name: "FAQ", url: `${siteConfig.url}/careers/faq` },
        ])}
      />
      <Section padding="lg" background="gradient">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Careers", href: "/careers" },
              { label: "FAQ" },
            ]}
            className="mb-8"
          />
          <Heading
            level="h1"
            description="Everything you need to know about working at StackSentry."
          >
            Frequently Asked Questions
          </Heading>
        </Container>
      </Section>
      <CareersFaq />
      <CTASection />
    </main>
  );
}
