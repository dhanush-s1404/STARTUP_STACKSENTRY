import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { TechHero } from "@/features/technology/components/tech-hero";
import { TechStackShowcase } from "@/features/technology/components/tech-stack-showcase";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Technology Stack | StackSentry Technologies",
  description:
    "Explore our arsenal of modern technologies — React, Next.js, Python, FastAPI, AWS, Kubernetes, OpenAI, and more — powering enterprise solutions.",
};

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Technology Stack", url: `${siteConfig.url}/technology` },
        ])}
      />
      <main className="flex-1">
        <Container className="pt-8">
          <Breadcrumb items={[{ label: "Technology Stack" }]} />
        </Container>
        <TechHero />
        <TechStackShowcase />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
