"use client";

import {
  Bug,
  Sparkles,
  Crown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { cn } from "@/lib/cn";

const SUPPORT_TIERS = [
  {
    icon: Bug,
    title: "Standard",
    price: "Included",
    description: "Essential maintenance to keep your application secure and up-to-date.",
    features: [
      "Bug fixes and patches",
      "Security updates",
      "Dependency management",
      "Monthly status reports",
      "Email support (48h response)",
    ],
    color: "blue" as const,
  },
  {
    icon: Sparkles,
    title: "Advanced",
    price: "Custom",
    description: "Proactive optimization and feature development for growing products.",
    features: [
      "Everything in Standard",
      "Performance optimization",
      "New feature development",
      "A/B testing support",
      "Priority support (12h response)",
      "Quarterly architecture reviews",
    ],
    color: "purple" as const,
    popular: true,
  },
  {
    icon: Crown,
    title: "Enterprise",
    price: "Dedicated",
    description: "A dedicated engineering team embedded in your organization.",
    features: [
      "Everything in Advanced",
      "Dedicated engineering team",
      "24/7 on-call support",
      "SLA guarantees (99.9% uptime)",
      "Strategic technical consulting",
      "Custom SLAs and reporting",
      "Architecture governance",
    ],
    color: "cyan" as const,
  },
];

const PROCESS_STEPS = [
  { icon: Bug, label: "Report", description: "Submit issue via portal" },
  { icon: CheckCircle2, label: "Triage", description: "Priority assessment" },
  { icon: CheckCircle2, label: "Fix", description: "Develop solution" },
  { icon: CheckCircle2, label: "Test", description: "Validate changes" },
  { icon: CheckCircle2, label: "Deploy", description: "Ship to production" },
  { icon: CheckCircle2, label: "Verify", description: "Confirm resolution" },
];

const TIER_COLORS: Record<string, string> = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  cyan: "text-cyan-400",
};

export function SupportMaintenance() {
  return (
    <Section id="support" padding="lg">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            gradient
            description="Post-launch support tiers to keep your application running at peak performance."
            className="mb-12"
          >
            Support &amp; Maintenance
          </Heading>
        </FadeIn>

        <Stagger staggerChildren={0.1} className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SUPPORT_TIERS.map((tier) => (
            <StaggerItem key={tier.title}>
              <Card
                glass
                hover
                glow={tier.color}
                padding="lg"
                className={cn("relative h-full", tier.popular && "border-purple-500/30")}
              >
                {tier.popular && (
                  <Badge variant="purple" size="sm" className="absolute -top-3 left-6">
                    Most Popular
                  </Badge>
                )}
                <tier.icon className={cn("h-8 w-8", TIER_COLORS[tier.color])} />
                <h3 className="mt-4 text-xl font-bold text-white">{tier.title}</h3>
                <p className="mt-1 text-sm text-white/40">{tier.price}</p>
                <p className="mt-3 text-sm text-white/50 leading-relaxed">{tier.description}</p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-white/60">
                      <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", TIER_COLORS[tier.color])} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn direction="up" delay={0.2}>
          <Heading level="h3" className="mb-8">
            Support Process
          </Heading>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <div className="mx-auto max-w-4xl overflow-x-auto pb-4">
            <div className="flex items-center gap-2 min-w-max">
              {PROCESS_STEPS.map((step, index) => (
                <div key={step.label} className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} className="shrink-0">
                    <Card glass hover padding="sm" className="w-24 text-center">
                      <step.icon className="mx-auto h-5 w-5 text-blue-400" />
                      <h4 className="mt-2 text-xs font-semibold text-white">{step.label}</h4>
                      <p className="mt-1 text-[10px] text-white/40 leading-tight">{step.description}</p>
                    </Card>
                  </motion.div>
                  {index < PROCESS_STEPS.length - 1 && (
                    <ArrowRight className="h-3 w-3 shrink-0 text-white/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
