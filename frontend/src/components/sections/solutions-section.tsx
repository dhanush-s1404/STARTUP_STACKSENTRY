"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import {
  BrainCircuit,
  LayoutDashboard,
  Workflow,
  BarChart3,
  Building2,
  ShoppingCart,
  ChevronRight,
  Check,
} from "lucide-react";

const solutions = [
  {
    icon: BrainCircuit,
    title: "AI Recruitment Platform",
    category: "HR Tech",
    description: "Intelligent hiring pipeline with candidate matching, resume parsing, and automated screening powered by machine learning.",
    benefits: ["85% faster hiring", "AI candidate matching", "Automated screening", "Bias reduction"],
    color: "blue" as const,
  },
  {
    icon: LayoutDashboard,
    title: "Enterprise Dashboard",
    category: "Analytics",
    description: "Real-time business intelligence with customizable widgets, data visualization, and AI-powered insights.",
    benefits: ["Real-time data", "Custom dashboards", "AI insights", "Mobile responsive"],
    color: "purple" as const,
  },
  {
    icon: Workflow,
    title: "Business Automation",
    category: "Automation",
    description: "End-to-end workflow automation with intelligent decision engines, API integrations, and monitoring.",
    benefits: ["60% time savings", "Smart workflows", "API integrations", "Audit trails"],
    color: "cyan" as const,
  },
  {
    icon: BarChart3,
    title: "Analytics Platform",
    category: "Data",
    description: "Advanced analytics with predictive modeling, cohort analysis, and custom reporting for data-driven decisions.",
    benefits: ["Predictive analytics", "Custom reports", "Data pipelines", "ML models"],
    color: "blue" as const,
  },
  {
    icon: Building2,
    title: "Enterprise CRM",
    category: "Enterprise",
    description: "Full-lifecycle customer relationship management with sales automation and customer 360 views.",
    benefits: ["360° customer view", "Sales automation", "Pipeline tracking", "AI forecasting"],
    color: "purple" as const,
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Platform",
    category: "Commerce",
    description: "Scalable e-commerce solution with inventory management, payment processing, and analytics.",
    benefits: ["Payment processing", "Inventory sync", "Multi-vendor", "Global shipping"],
    color: "cyan" as const,
  },
];

const colorAccents = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  cyan: "from-cyan-500 to-cyan-600",
};

const badgeColors = {
  blue: "blue" as const,
  purple: "purple" as const,
  cyan: "cyan" as const,
};

export function SolutionsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <Section id="solutions" padding="lg" background="subtle">
      <Container>
        <ScrollReveal>
          <Heading
            level="h2"
            gradient
            description="Flagship platforms engineered to transform how enterprises operate, hire, and grow."
          >
            Featured Solutions
          </Heading>
        </ScrollReveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <ScrollReveal key={solution.title} delay={index * 0.05}>
                <MotionDiv
                  layout
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className={`group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isExpanded
                      ? "border-white/[0.12] bg-white/[0.04] sm:col-span-2 lg:col-span-2"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.10] hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorAccents[solution.color]}`}>
                        <solution.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant={badgeColors[solution.color]} size="sm">
                        {solution.category}
                      </Badge>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-white">{solution.title}</h3>
                    <p className="text-sm leading-relaxed text-[hsl(var(--color-text-tertiary))]">
                      {solution.description}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <MotionDiv
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            {solution.benefits.map((benefit) => (
                              <div key={benefit} className="flex items-center gap-2 rounded-lg bg-white/[0.03] p-2.5">
                                <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                                <span className="text-xs font-medium text-[hsl(var(--color-text-secondary))]">
                                  {benefit}
                                </span>
                              </div>
                            ))}
                          </div>
                        </MotionDiv>
                      )}
                    </AnimatePresence>

                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-400">
                      {isExpanded ? "Show less" : "Explore solution"}
                      <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                  </div>
                </MotionDiv>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
