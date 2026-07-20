"use client";

import {
  BrainCircuit,
  Sparkles,
  Globe,
  Cloud,
  Container,
  Shield,
  Workflow,
  Zap,
  Smartphone,
  Palette,
  BarChart3,
  Brain,
  Lightbulb,
  Wrench,
  Building2,
  ShoppingCart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container as UiContainer } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { ServiceCard } from "./service-card";

type ServiceData = {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  href: string;
};

const services: ServiceData[] = [
  {
    title: "AI Development",
    description: "Custom AI solutions, machine learning models, and intelligent automation",
    icon: BrainCircuit,
    features: ["Custom ML models", "Neural networks", "AI integration"],
    href: "/services/ai-development",
  },
  {
    title: "Generative AI",
    description: "LLM integration, prompt engineering, AI content generation",
    icon: Sparkles,
    features: ["LLM fine-tuning", "RAG systems", "AI agents"],
    href: "/services/generative-ai",
  },
  {
    title: "Web Development",
    description: "Enterprise web apps, SPAs, progressive web apps",
    icon: Globe,
    features: ["React/Next.js", "Micro-frontends", "PWA"],
    href: "/services/web-development",
  },
  {
    title: "Cloud Solutions",
    description: "AWS, Azure, GCP architecture and migration",
    icon: Cloud,
    features: ["Multi-cloud", "Cost optimization", "Auto-scaling"],
    href: "/services/cloud-solutions",
  },
  {
    title: "DevOps",
    description: "CI/CD pipelines, containerization, infrastructure as code",
    icon: Container,
    features: ["Kubernetes", "Terraform", "GitOps"],
    href: "/services/devops",
  },
  {
    title: "Cyber Security",
    description: "Security audits, penetration testing, compliance",
    icon: Shield,
    features: ["Pen testing", "SOC 2 compliance", "Zero trust"],
    href: "/services/cyber-security",
  },
  {
    title: "API Development",
    description: "RESTful, GraphQL, and gRPC API design",
    icon: Workflow,
    features: ["REST & GraphQL", "gRPC", "API gateway"],
    href: "/services/api-development",
  },
  {
    title: "Business Automation",
    description: "Workflow automation, RPA, process optimization",
    icon: Zap,
    features: ["RPA bots", "Workflow engine", "Integrations"],
    href: "/services/business-automation",
  },
  {
    title: "Mobile Apps",
    description: "React Native, Flutter, native iOS/Android",
    icon: Smartphone,
    features: ["Cross-platform", "Offline-first", "Push notifications"],
    href: "/services/mobile-apps",
  },
  {
    title: "UI/UX Design",
    description: "User research, wireframing, prototyping, design systems",
    icon: Palette,
    features: ["Design systems", "Prototyping", "User testing"],
    href: "/services/ui-ux-design",
  },
  {
    title: "Data Analytics",
    description: "Business intelligence, data warehousing, visualization",
    icon: BarChart3,
    features: ["Dashboards", "ETL pipelines", "Real-time analytics"],
    href: "/services/data-analytics",
  },
  {
    title: "Machine Learning",
    description: "Predictive analytics, NLP, computer vision",
    icon: Brain,
    features: ["NLP", "Computer vision", "Time series"],
    href: "/services/machine-learning",
  },
  {
    title: "Consulting",
    description: "Technical strategy, architecture review, digital transformation",
    icon: Lightbulb,
    features: ["Tech audit", "Roadmap", "Architecture review"],
    href: "/services/consulting",
  },
  {
    title: "Maintenance",
    description: "24/7 support, monitoring, updates, optimization",
    icon: Wrench,
    features: ["24/7 support", "Monitoring", "Performance tuning"],
    href: "/services/maintenance",
  },
  {
    title: "ERP Systems",
    description: "Custom enterprise resource planning solutions",
    icon: Building2,
    features: ["Custom modules", "Integration", "Reporting"],
    href: "/services/erp-systems",
  },
  {
    title: "E-Commerce",
    description: "Scalable online stores, marketplace platforms",
    icon: ShoppingCart,
    features: ["Headless commerce", "Payment gateway", "Inventory"],
    href: "/services/e-commerce",
  },
];

export function ServicesGrid() {
  return (
    <Section id="services-grid" padding="lg">
      <UiContainer>
        <Heading
          level="h2"
          description="Comprehensive technology solutions tailored to your business needs"
          className="mb-12"
        >
          Our Services
        </Heading>

        <Stagger staggerChildren={0.05} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
                href={service.href}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </UiContainer>
    </Section>
  );
}
