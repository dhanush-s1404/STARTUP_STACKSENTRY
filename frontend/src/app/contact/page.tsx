import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ContactHero } from "@/features/contact/components/contact-hero";
import { SmartContactForm } from "@/features/contact/components/smart-contact-form";
import { CompanyInfoSection } from "@/features/contact/components/company-info-section";
import { SocialMediaSection } from "@/features/contact/components/social-media-section";
import { ContactCTABanner } from "@/features/contact/components/contact-cta-banner";
import { ContactFAQ } from "@/features/contact/components/contact-faq";

export const metadata: Metadata = {
  title: "Contact Us | StackSentry Technologies",
  description:
    "Get in touch with StackSentry Technologies. Start a project, book a consultation, or send us a message. We'd love to hear from you.",
  openGraph: {
    title: "Contact Us | StackSentry Technologies",
    description: "Start a conversation with StackSentry about your next software project.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Container className="pt-8">
          <Breadcrumb items={[{ label: "Contact" }]} />
        </Container>
        <ContactHero />

        <Section id="company-info" padding="lg">
          <Container>
            <Heading
              level="h2"
              gradient
              description="Get in touch with our team. We'd love to hear about your project."
            >
              How to Reach Us
            </Heading>
            <div className="mt-12">
              <CompanyInfoSection />
            </div>
          </Container>
        </Section>

        <Section id="contact-form-section" padding="lg" background="subtle">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <Heading
                  level="h2"
                  gradient
                  description="Fill out the form and we'll get back to you within 24 hours."
                  className="text-left"
                >
                  Send Us a Message
                </Heading>
                <div className="mt-8">
                  <SmartContactForm />
                </div>
              </div>
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <Heading
                    level="h3"
                    gradient
                    description="Common questions about working with StackSentry"
                    className="text-left"
                  >
                    Frequently Asked Questions
                  </Heading>
                </div>
                <ContactFAQ />
              </div>
            </div>
          </Container>
        </Section>

        <Section id="social" padding="lg">
          <Container>
            <Heading
              level="h2"
              gradient
              description="Follow us for the latest updates, insights, and company news"
            >
              Connect With Us
            </Heading>
            <div className="mt-12">
              <SocialMediaSection />
            </div>
          </Container>
        </Section>

        <ContactCTABanner />
      </main>
      <Footer />
    </>
  );
}
