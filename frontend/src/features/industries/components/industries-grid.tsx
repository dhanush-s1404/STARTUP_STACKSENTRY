"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { IndustryCard } from "./industry-card";
import {
  HeartPulse,
  GraduationCap,
  Landmark,
  Users,
  Factory,
  Store,
  ShoppingCart,
  Building,
  Home,
  Plane,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Industry = {
  title: string;
  description: string;
  icon: LucideIcon;
  challenges: string[];
  solutions: string[];
  benefits: string[];
  slug: string;
};

const industries: Industry[] = [
  {
    title: "Healthcare",
    description: "Digital health solutions, EHR systems, telemedicine platforms",
    icon: HeartPulse,
    challenges: [
      "Fragmented patient records across departments",
      "Manual billing causing revenue leakage",
      "Compliance with HIPAA and other regulations",
    ],
    solutions: [
      "Unified EHR with FHIR-compliant data exchange",
      "Automated billing and claims processing",
      "Built-in compliance and audit trail features",
    ],
    benefits: [
      "45% faster patient processing",
      "30% reduction in billing errors",
      "Improved patient outcomes through data",
    ],
    slug: "healthcare",
  },
  {
    title: "Education",
    description: "Learning management, student information, EdTech platforms",
    icon: GraduationCap,
    challenges: [
      "Paper-based administration consuming resources",
      "Poor parent-teacher-student communication",
      "Difficulty tracking academic progress at scale",
    ],
    solutions: [
      "Digital student information management system",
      "Integrated LMS with content delivery",
      "Parent portal with real-time notifications",
    ],
    benefits: [
      "60% reduction in admin overhead",
      "Improved student engagement and outcomes",
      "Data-driven academic decision making",
    ],
    slug: "education",
  },
  {
    title: "Finance",
    description: "Banking software, fintech solutions, regulatory compliance",
    icon: Landmark,
    challenges: [
      "Complex regulatory compliance requirements",
      "Legacy systems hindering digital transformation",
      "Real-time fraud detection at scale",
    ],
    solutions: [
      "Automated regulatory reporting and compliance",
      "Modern API-first core banking platform",
      "ML-powered fraud detection and prevention",
    ],
    benefits: [
      "Zero compliance violations",
      "50% faster product launches",
      "60% reduction in fraudulent transactions",
    ],
    slug: "finance",
  },
  {
    title: "Recruitment",
    description: "ATS systems, candidate matching, hiring automation",
    icon: Users,
    challenges: [
      "Manual resume screening at scale",
      "High cost-per-hire and time-to-fill",
      "Poor candidate experience and ghost rates",
    ],
    solutions: [
      "AI-powered resume screening and scoring",
      "Automated interview scheduling pipeline",
      "Candidate experience portal with updates",
    ],
    benefits: [
      "60% reduction in time-to-hire",
      "40% lower cost-per-hire",
      "Higher offer acceptance rates",
    ],
    slug: "recruitment",
  },
  {
    title: "Manufacturing",
    description: "Production management, IoT integration, quality control",
    icon: Factory,
    challenges: [
      "Production bottlenecks and unplanned downtime",
      "Quality defects causing waste and rework",
      "Lack of real-time shop floor visibility",
    ],
    solutions: [
      "AI-driven production scheduling (APS)",
      "Statistical process control with real-time SPC",
      "IoT-powered shop floor monitoring dashboard",
    ],
    benefits: [
      "20% increase in production throughput",
      "50% reduction in quality defects",
      "Predictive maintenance reducing downtime",
    ],
    slug: "manufacturing",
  },
  {
    title: "Retail",
    description: "POS systems, inventory, omnichannel experiences",
    icon: Store,
    challenges: [
      "Inventory mismatch between online and offline",
      "Poor customer experience across channels",
      "Difficulty managing promotions and pricing",
    ],
    solutions: [
      "Unified omnichannel inventory management",
      "Smart POS with real-time sync and analytics",
      "Dynamic pricing and promotion engine",
    ],
    benefits: [
      "30% increase in inventory turnover",
      "25% higher customer lifetime value",
      "Real-time cross-channel visibility",
    ],
    slug: "retail",
  },
  {
    title: "E-Commerce",
    description: "Marketplace platforms, payment processing, logistics",
    icon: ShoppingCart,
    challenges: [
      "High platform fees eating into margins",
      "Complex multi-vendor management",
      "Cart abandonment and checkout friction",
    ],
    solutions: [
      "Custom marketplace with vendor self-service",
      "Multi-payment gateway with wallet support",
      "Optimized checkout with 1-click and saved details",
    ],
    benefits: [
      "3x faster time-to-market",
      "40% lower platform costs",
      "Scalable to millions of transactions",
    ],
    slug: "e-commerce",
  },
  {
    title: "Government",
    description: "E-governance, citizen services, digital transformation",
    icon: Building,
    challenges: [
      "Slow citizen service delivery",
      "Disconnected departmental systems",
      "Data security and transparency requirements",
    ],
    solutions: [
      "Digital citizen services portal with eKYC",
      "Inter-departmental data exchange platform",
      "Blockchain-based audit trail and transparency",
    ],
    benefits: [
      "70% faster citizen service delivery",
      "Improved public trust through transparency",
      "Significant cost savings through digitization",
    ],
    slug: "government",
  },
  {
    title: "Real Estate",
    description: "Property management, CRM, listing platforms",
    icon: Home,
    challenges: [
      "Manual property listing and management",
      "Poor lead tracking and conversion",
      "Complex lease and payment management",
    ],
    solutions: [
      "Digital property listing and virtual tours",
      "Real estate CRM with lead scoring",
      "Automated lease management and rent collection",
    ],
    benefits: [
      "50% faster property listings",
      "35% improvement in lead conversion",
      "Streamlined tenant management",
    ],
    slug: "real-estate",
  },
  {
    title: "Travel",
    description: "Booking systems, itinerary management, travel platforms",
    icon: Plane,
    challenges: [
      "Fragmented booking and inventory systems",
      "Manual itinerary creation and management",
      "Poor customer support during travel",
    ],
    solutions: [
      "Unified booking engine with multi-provider API",
      "AI-powered itinerary builder and optimizer",
      "24/7 chatbot and real-time travel assistance",
    ],
    benefits: [
      "3x faster booking processing",
      "40% reduction in booking errors",
      "Improved traveler satisfaction scores",
    ],
    slug: "travel",
  },
  {
    title: "Logistics",
    description: "Supply chain, fleet management, route optimization",
    icon: Truck,
    challenges: [
      "Inefficient route planning increasing fuel costs",
      "Lack of end-to-end shipment visibility",
      "Complex warehouse management at scale",
    ],
    solutions: [
      "AI-optimized route planning engine",
      "Real-time shipment tracking dashboard",
      "WMS with barcode/RFID and automation",
    ],
    benefits: [
      "25% reduction in fuel costs",
      "95%+ on-time delivery rate",
      "40% faster warehouse operations",
    ],
    slug: "logistics",
  },
  {
    title: "Hospitality",
    description: "Hotel management, booking engines, guest experience",
    icon: UtensilsCrossed,
    challenges: [
      "Manual reservation and check-in processes",
      "Poor guest experience personalization",
      "Revenue management across channels",
    ],
    solutions: [
      "Integrated PMS with online booking engine",
      "Guest profile and preference management",
      "Dynamic pricing and revenue management system",
    ],
    benefits: [
      "40% faster check-in/check-out",
      "25% increase in guest satisfaction",
      "15% revenue uplift through dynamic pricing",
    ],
    slug: "hospitality",
  },
];

export function IndustriesGrid() {
  return (
    <Section padding="lg">
      <Container>
        <Heading
          level="h2"
          description="Specialized solutions tailored for the unique needs of each industry vertical"
          className="mb-16"
        >
          Our Industry Focus
        </Heading>

        <Stagger staggerChildren={0.08}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <StaggerItem key={industry.slug}>
                <IndustryCard
                  title={industry.title}
                  description={industry.description}
                  icon={industry.icon}
                  challenges={industry.challenges}
                  solutions={industry.solutions}
                  benefits={industry.benefits}
                  slug={industry.slug}
                />
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
