"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { SolutionCard } from "./solution-card";
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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Solution = {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  slug: string;
};

const solutions: Solution[] = [
  {
    title: "Recruitment Platform",
    description: "End-to-end hiring automation with AI-powered candidate matching",
    icon: Users,
    features: ["AI Candidate Matching", "Automated Screening", "Interview Scheduling", "Analytics Dashboard"],
    slug: "recruitment-platform",
  },
  {
    title: "HRMS",
    description: "Complete human resource management with payroll, attendance, and performance",
    icon: UserCog,
    features: ["Payroll Management", "Attendance Tracking", "Performance Reviews", "Employee Self-Service"],
    slug: "hrms",
  },
  {
    title: "CRM",
    description: "Customer relationship management with sales pipeline and analytics",
    icon: Contact,
    features: ["Sales Pipeline", "Contact Management", "Email Integration", "Revenue Analytics"],
    slug: "crm",
  },
  {
    title: "ERP",
    description: "Enterprise resource planning for finance, operations, and supply chain",
    icon: Building2,
    features: ["Financial Management", "Supply Chain", "Inventory Control", "Business Intelligence"],
    slug: "erp",
  },
  {
    title: "Healthcare System",
    description: "Hospital management with patient records, scheduling, and billing",
    icon: HeartPulse,
    features: ["EHR Management", "Patient Scheduling", "Medical Billing", "Telehealth Integration"],
    slug: "healthcare-system",
  },
  {
    title: "Inventory Management",
    description: "Real-time inventory tracking, forecasting, and optimization",
    icon: Package,
    features: ["Real-Time Tracking", "Demand Forecasting", "Multi-Warehouse", "Barcode/RFID"],
    slug: "inventory-management",
  },
  {
    title: "Accounting System",
    description: "Financial management, invoicing, and reporting",
    icon: Calculator,
    features: ["Invoicing", "Tax Management", "Financial Reports", "Bank Reconciliation"],
    slug: "accounting-system",
  },
  {
    title: "Hospital Management",
    description: "Complete hospital operations management platform",
    icon: Hospital,
    features: ["Bed Management", "OPD/IPD Management", "Lab Integration", "Pharmacy Management"],
    slug: "hospital-management",
  },
  {
    title: "School ERP",
    description: "Education management with student info, academics, and communication",
    icon: GraduationCap,
    features: ["Student Information", "Academic Planning", "Parent Portal", "Fee Management"],
    slug: "school-erp",
  },
  {
    title: "E-Commerce Platform",
    description: "Scalable online stores with multi-vendor support",
    icon: ShoppingCart,
    features: ["Multi-Vendor Support", "Payment Gateway", "Order Management", "Analytics"],
    slug: "e-commerce-platform",
  },
  {
    title: "Fleet Management",
    description: "Vehicle tracking, route optimization, and maintenance scheduling",
    icon: Truck,
    features: ["GPS Tracking", "Route Optimization", "Fuel Management", "Driver Analytics"],
    slug: "fleet-management",
  },
  {
    title: "Manufacturing System",
    description: "Production planning, quality control, and shop floor management",
    icon: Factory,
    features: ["Production Planning", "Quality Control", "Shop Floor Management", "IoT Integration"],
    slug: "manufacturing-system",
  },
];

export function SolutionsGrid() {
  return (
    <Section padding="lg">
      <Container>
        <Heading
          level="h2"
          description="Comprehensive platforms engineered to streamline your operations and accelerate growth"
          className="mb-16"
        >
          All Solutions
        </Heading>

        <Stagger staggerChildren={0.08}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <StaggerItem key={solution.slug}>
                <SolutionCard
                  title={solution.title}
                  description={solution.description}
                  icon={solution.icon}
                  features={solution.features}
                  slug={solution.slug}
                />
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
