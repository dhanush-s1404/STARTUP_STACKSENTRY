import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TestimonialsHero } from "@/features/testimonials/components/testimonials-hero";
import { TestimonialsGrid } from "@/features/testimonials/components/testimonials-grid";
import { TestimonialCarousel } from "@/features/testimonials/components/testimonial-carousel";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import type { TestimonialCardProps } from "@/features/testimonials/components/testimonial-card";

export const metadata: Metadata = {
  title: "Client Testimonials | StackSentry Technologies",
  description:
    "Read real testimonials from enterprise clients across healthcare, finance, education, and more. See why organizations trust StackSentry for their digital transformation.",
};

const featuredTestimonials: TestimonialCardProps[] = [
  {
    clientName: "Sarah Chen",
    clientRole: "VP Engineering",
    clientCompany: "TechCorp Global",
    content:
      "StackSentry transformed our patient management system with their AI-powered platform. What used to take our team hours now happens in real-time.",
    rating: 5,
    industry: "Healthcare",
    isFeatured: true,
  },
  {
    clientName: "Michael Rodriguez",
    clientRole: "CTO",
    clientCompany: "FinanceHub",
    content:
      "The AI-powered compliance platform saved us millions in potential regulatory fines. Their expertise in both finance and technology is unmatched.",
    rating: 5,
    industry: "Finance",
    isFeatured: true,
  },
  {
    clientName: "Amanda Chen",
    clientRole: "CEO",
    clientCompany: "StayWell Hotels",
    content:
      "Revenue increased 15% through dynamic pricing powered by StackSentry's AI. It's like having a revenue manager that never sleeps.",
    rating: 5,
    industry: "Hospitality",
    isFeatured: true,
  },
  {
    clientName: "James Park",
    clientRole: "Head of Recruitment",
    clientCompany: "TalentFlow",
    content:
      "Time-to-hire dropped by 60% with their AI screening solution. Our recruiters now focus on building relationships instead of sifting through resumes.",
    rating: 5,
    industry: "Recruitment",
  },
  {
    clientName: "David Kim",
    clientRole: "CIO",
    clientCompany: "ManufacturingPro",
    content:
      "ERP implementation across 8 factories was flawless. The unified system gave us real-time visibility into production and supply chain.",
    rating: 5,
    industry: "Manufacturing",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Testimonials", url: `${siteConfig.url}/testimonials` },
        ])}
      />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
        className="px-4 sm:px-6 lg:px-8"
      />
      <TestimonialsHero />
      <TestimonialCarousel testimonials={featuredTestimonials} autoPlay />
      <TestimonialsGrid />
      <CTASection />
    </main>
  );
}
