import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CinematicHero } from "@/components/sections/cinematic-hero";
import { TrustBarEnhanced } from "@/components/sections/trust-bar-enhanced";
import { StatsSection } from "@/components/sections/stats-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { TechShowcase } from "@/components/sections/tech-showcase";
import { WhyStackSentryEnhanced } from "@/components/sections/why-stacksentry-enhanced";
import { ProcessVisualizer } from "@/components/sections/process-visualizer";
import { ClientImpact } from "@/components/sections/client-impact";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTACinematic } from "@/components/sections/cta-cinematic";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ScrollStorySection, StoryDivider } from "@/components/sections/scroll-story";
import { StructuredData } from "@/components/shared/structured-data";
import { ClientAnimatedBackground } from "@/components/shared/client-animated-background";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "StackSentry Technologies — Building Intelligent Software for Tomorrow",
  },
  description:
    "StackSentry Technologies delivers world-class AI-powered enterprise software solutions. Trusted by organizations worldwide.",
};

export default function Home() {
  return (
    <>
      <StructuredData data={generateOrganizationSchema()} />
      <StructuredData data={generateWebsiteSchema()} />
      <ClientAnimatedBackground />
      <Navbar />
      <main className="flex-1">
        <ScrollStorySection id="hero">
          <CinematicHero />
        </ScrollStorySection>

        <StoryDivider text="Trusted by industry leaders" />

        <ScrollStorySection id="trust">
          <TrustBarEnhanced />
        </ScrollStorySection>

        <ScrollStorySection id="stats">
          <StatsSection />
        </ScrollStorySection>

        <StoryDivider text="What we do" />

        <ScrollStorySection id="services">
          <ServicesSection />
        </ScrollStorySection>

        <ScrollStorySection id="solutions">
          <SolutionsSection />
        </ScrollStorySection>

        <StoryDivider text="Our technology" />

        <ScrollStorySection id="technology" sectionNumber={1} sectionTitle="Technology">
          <TechShowcase />
        </ScrollStorySection>

        <ScrollStorySection id="why-us" sectionNumber={2} sectionTitle="Why Us">
          <WhyStackSentryEnhanced />
        </ScrollStorySection>

        <StoryDivider text="How we deliver" />

        <ScrollStorySection id="process" sectionNumber={3} sectionTitle="Process">
          <ProcessVisualizer />
        </ScrollStorySection>

        <ScrollStorySection id="portfolio" sectionNumber={4} sectionTitle="Portfolio">
          <PortfolioSection />
        </ScrollStorySection>

        <ScrollStorySection id="impact" sectionNumber={5} sectionTitle="Results">
          <ClientImpact />
        </ScrollStorySection>

        <ScrollStorySection id="testimonials">
          <TestimonialsSection />
        </ScrollStorySection>

        <CTACinematic />

        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
