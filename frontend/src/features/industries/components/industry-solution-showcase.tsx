"use client";

import Link from "next/link";
import {
  Users,
  UserCog,
  Contact,
  Building2,
  HeartPulse,
  Package,
  Calculator,
  Hospital,
  GraduationCap,
  ShoppingCart,
  Truck,
  Factory,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";

const slugToIcon: Record<string, LucideIcon> = {
  "recruitment-platform": Users,
  hrms: UserCog,
  crm: Contact,
  erp: Building2,
  "healthcare-system": HeartPulse,
  "inventory-management": Package,
  "accounting-system": Calculator,
  "hospital-management": Hospital,
  "school-erp": GraduationCap,
  "e-commerce-platform": ShoppingCart,
  "fleet-management": Truck,
  "manufacturing-system": Factory,
};

const slugToFeatures: Record<string, string[]> = {
  "recruitment-platform": ["AI Matching", "Screening", "Analytics"],
  hrms: ["Payroll", "Attendance", "Performance"],
  crm: ["Pipeline", "Lead Scoring", "Automation"],
  erp: ["Finance", "Supply Chain", "BI"],
  "healthcare-system": ["EHR", "Billing", "Telehealth"],
  "inventory-management": ["Tracking", "Forecasting", "RFID"],
  "accounting-system": ["Invoicing", "Tax", "Reports"],
  "hospital-management": ["OPD/IPD", "Lab", "Pharmacy"],
  "school-erp": ["Student Info", "Parent Portal", "Fees"],
  "e-commerce-platform": ["Multi-Vendor", "Payments", "Orders"],
  "fleet-management": ["GPS", "Route", "Fuel"],
  "manufacturing-system": ["Planning", "Quality", "IoT"],
};

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type IndustrySolutionShowcaseProps = {
  industrySlug: string;
  industryTitle: string;
  solutionSlugs: string[];
};

export function IndustrySolutionShowcase({
  industryTitle,
  solutionSlugs,
}: IndustrySolutionShowcaseProps) {
  if (solutionSlugs.length === 0) return null;

  return (
    <Section padding="lg" background="gradient">
      <Container>
        <FadeIn>
          <div className="mb-16">
            <Heading
              level="h2"
              description={`Recommended software solutions for ${industryTitle.toLowerCase()} organizations`}
            >
              Recommended Solutions
            </Heading>
          </div>
        </FadeIn>

        <Stagger
          staggerChildren={0.08}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {solutionSlugs.map((slug) => {
            const Icon = slugToIcon[slug] ?? Package;
            const features = slugToFeatures[slug] ?? ["Custom", "Modular", "Scalable"];

            return (
              <StaggerItem key={slug}>
                <Link href={`/solutions/${slug}`}>
                  <Card glass hover glow="blue" className="group flex h-full flex-col">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500/20">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-300">
                      {formatSlug(slug)}
                    </h3>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {features.map((feature) => (
                        <Badge key={feature} variant="blue" size="sm">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <span className="text-sm text-white/30">{industryTitle}</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
                        Explore
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
