"use client";

import { ServiceDetailHero } from "./service-detail-hero";
import { ServiceDetailOverview } from "./service-detail-overview";
import { ServiceProcess } from "./service-process";
import { ServiceDetailTech } from "./service-detail-tech";
import { ServiceDetailPricing } from "./service-detail-pricing";
import { ServiceDetailRelated } from "./service-detail-related";
import { ServiceFAQ } from "./service-faq";
import { CTASection } from "@/components/sections/cta-section-new";

export type ServicePageData = {
  title: string;
  description: string;
  iconName: string;
  features: string[];
  problemsSolved: string[];
  keyFeatures: string[];
  technologies: { name: string; description: string }[];
  pricingTiers: { name: string; price: string; features: string[]; highlighted?: boolean }[];
  relatedServices: { title: string; description: string; href: string; icon: string }[];
};

export function ServicePageContent({ data }: { data: ServicePageData }) {
  return (
    <main className="flex-1 pt-16">
      <ServiceDetailHero
        title={data.title}
        description={data.description}
        icon={data.iconName}
        features={data.features}
      />
      <ServiceDetailOverview
        title={data.title}
        description={data.description}
        problemsSolved={data.problemsSolved}
        keyFeatures={data.keyFeatures}
      />
      <ServiceProcess />
      <ServiceDetailTech technologies={data.technologies} />
      <ServiceDetailPricing tiers={data.pricingTiers} />
      <ServiceFAQ />
      <ServiceDetailRelated services={data.relatedServices} />
      <CTASection />
    </main>
  );
}
