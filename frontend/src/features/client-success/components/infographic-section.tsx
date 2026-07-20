"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { CircularProgress } from "@/components/ui/circular-progress";
import { CountUp } from "@/components/ui/count-up";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks";
import { Globe, Users, Shield, Headphones, UserCheck, HeartHandshake } from "lucide-react";

const roiBars = [
  { label: "Cost Savings", value: "$5M+", percentage: 85, color: "from-emerald-500 to-emerald-400" },
  { label: "Revenue Growth", value: "$25M+", percentage: 100, color: "from-blue-500 to-blue-400" },
  { label: "Time Saved", value: "10,000+ hrs", percentage: 72, color: "from-purple-500 to-purple-400" },
  { label: "Efficiency Gain", value: "3x average", percentage: 90, color: "from-amber-500 to-amber-400" },
];

const industryImpact = [
  { industry: "Healthcare", percentage: 45, label: "Efficiency Gain", color: "emerald" as const },
  { industry: "Finance", percentage: 60, label: "Faster Processes", color: "blue" as const },
  { industry: "Education", percentage: 60, label: "Admin Reduction", color: "purple" as const },
  { industry: "Manufacturing", percentage: 40, label: "Waste Reduction", color: "amber" as const },
  { industry: "Retail", percentage: 30, label: "Inventory Improvement", color: "cyan" as const },
  { industry: "Recruitment", percentage: 60, label: "Time-to-Hire Reduction", color: "rose" as const },
];

const globalStats = [
  { icon: Globe, value: 15, suffix: "+", label: "Countries Served", color: "text-blue-400" },
  { icon: Users, value: 50, suffix: "+", label: "Enterprise Clients", color: "text-emerald-400" },
  { icon: Shield, value: 99.99, suffix: "%", label: "Platform Uptime", color: "text-purple-400", decimals: 2 },
  { icon: Headphones, value: 24, suffix: "/7", label: "Support Coverage", color: "text-cyan-400" },
  { icon: UserCheck, value: 40, suffix: "+", label: "Team Members", color: "text-amber-400" },
  { icon: HeartHandshake, value: 100, suffix: "%", label: "Client Retention", color: "text-rose-400" },
];

export function InfographicSection() {
  return (
    <Section padding="lg">
      <Container>
        {/* ROI Breakdown */}
        <FadeIn>
          <Heading
            level="h2"
            description="A comprehensive view of the impact we deliver across every engagement."
          >
            The Numbers Behind Our Impact
          </Heading>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card glass hover={false} padding="lg" className="mt-12">
            <h3 className="mb-8 text-sm font-semibold uppercase tracking-wider text-white/50">
              ROI Breakdown
            </h3>
            <ROIBars />
          </Card>
        </FadeIn>

        {/* Industry Impact */}
        <FadeIn delay={0.1}>
          <Card glass hover={false} padding="lg" className="mt-8">
            <h3 className="mb-8 text-sm font-semibold uppercase tracking-wider text-white/50">
              Industry Impact
            </h3>
            <IndustryImpactGrid />
          </Card>
        </FadeIn>

        {/* Global Reach */}
        <FadeIn delay={0.1}>
          <Card glass hover={false} padding="lg" className="mt-8">
            <h3 className="mb-8 text-sm font-semibold uppercase tracking-wider text-white/50">
              Global Reach
            </h3>
            <GlobalReachStats />
          </Card>
        </FadeIn>
      </Container>
    </Section>
  );
}

function ROIBars() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <div ref={ref} className="space-y-6">
      {roiBars.map((bar, index) => (
        <div key={bar.label} className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-white/70">{bar.label}</span>
            <span className="text-sm font-bold text-white">{bar.value}</span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.05]">
            <MotionDiv
              initial={{ width: 0 }}
              animate={isInView ? { width: `${bar.percentage}%` } : { width: 0 }}
              transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn("absolute inset-y-0 left-0 rounded-full bg-gradient-to-r", bar.color)}
            />
            {/* Shimmer effect */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 + 1 }}
              className="absolute inset-y-0 rounded-full"
              style={{
                left: 0,
                width: `${bar.percentage}%`,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function IndustryImpactGrid() {
  return (
    <Stagger delay={0.1} staggerChildren={0.08}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {industryImpact.map((item) => (
          <StaggerItem key={item.industry}>
            <div className="flex flex-col items-center text-center">
              <CircularProgress
                value={item.percentage}
                size={100}
                strokeWidth={6}
                color={item.color}
                showLabel
              />
              <p className="mt-4 text-sm font-semibold text-white">{item.industry}</p>
              <p className="text-xs text-white/50">{item.label}</p>
            </div>
          </StaggerItem>
        ))}
      </div>
    </Stagger>
  );
}

function GlobalReachStats() {
  return (
    <Stagger delay={0.1} staggerChildren={0.08}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {globalStats.map((stat) => (
          <StaggerItem key={stat.label}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05]">
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div className="text-2xl font-bold text-white sm:text-3xl">
                <CountUp
                  to={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <p className="mt-1 text-xs text-white/50">{stat.label}</p>
            </div>
          </StaggerItem>
        ))}
      </div>
    </Stagger>
  );
}
