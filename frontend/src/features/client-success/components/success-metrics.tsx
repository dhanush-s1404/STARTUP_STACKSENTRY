"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";
import {
  TrendingUp,
  DollarSign,
  Clock,
  Cpu,
  Gauge,
  Maximize,
  Shield,
  PiggyBank,
} from "lucide-react";

const metrics = [
  {
    icon: DollarSign,
    label: "ROI Delivered",
    value: "340",
    suffix: "%",
    category: "roi",
    color: "text-emerald-400",
    bg: "from-emerald-500/10 to-emerald-600/5",
    description: "Average return on investment for client projects",
  },
  {
    icon: TrendingUp,
    label: "Revenue Growth",
    value: "2.5",
    suffix: "x",
    category: "growth",
    color: "text-blue-400",
    bg: "from-blue-500/10 to-blue-600/5",
    description: "Average revenue increase for our clients",
  },
  {
    icon: Clock,
    label: "Time Saved",
    value: "60",
    suffix: "%",
    category: "efficiency",
    color: "text-purple-400",
    bg: "from-purple-500/10 to-purple-600/5",
    description: "Reduction in process completion time",
  },
  {
    icon: Cpu,
    label: "Process Automation",
    value: "85",
    suffix: "%",
    category: "automation",
    color: "text-cyan-400",
    bg: "from-cyan-500/10 to-cyan-600/5",
    description: "Of manual tasks automated through our solutions",
  },
  {
    icon: Gauge,
    label: "System Efficiency",
    value: "3",
    suffix: "x",
    category: "performance",
    color: "text-amber-400",
    bg: "from-amber-500/10 to-amber-600/5",
    description: "Improvement in system performance metrics",
  },
  {
    icon: Maximize,
    label: "Scalability",
    value: "10",
    suffix: "x",
    category: "scalability",
    color: "text-rose-400",
    bg: "from-rose-500/10 to-rose-600/5",
    description: "Capacity increase through our architecture",
  },
  {
    icon: Shield,
    label: "Platform Uptime",
    value: "99.99",
    suffix: "%",
    category: "performance",
    color: "text-emerald-400",
    bg: "from-emerald-500/10 to-emerald-600/5",
    description: "Guaranteed uptime across all deployments",
  },
  {
    icon: PiggyBank,
    label: "Cost Savings",
    value: "5",
    prefix: "$",
    suffix: "M+",
    category: "roi",
    color: "text-blue-400",
    bg: "from-blue-500/10 to-blue-600/5",
    description: "Total client cost savings delivered annually",
  },
];

export function SuccessMetrics() {
  return (
    <Section padding="lg" background="subtle">
      <Container>
        <FadeIn>
          <Heading
            level="h2"
            description="The numbers behind our impact across industries and projects."
          >
            Proven Results
          </Heading>
        </FadeIn>

        <Stagger delay={0.1} staggerChildren={0.08} className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <StaggerItem key={metric.label}>
                <MotionDiv
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  {/* Gradient border on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(168,85,247,0.05))",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      padding: "1px",
                    }}
                  />

                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${metric.bg}`}
                  >
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>

                  <div className={`text-4xl font-bold tracking-tight ${metric.color}`}>
                    {metric.prefix || ""}
                    <CountUpText value={metric.value} />
                    {metric.suffix}
                  </div>

                  <p className="mt-2 text-sm font-medium text-white/70">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    {metric.description}
                  </p>
                </MotionDiv>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}

function CountUpText({ value }: { value: string }) {
  const { ref, isInView } = useInViewHook();
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const target = parseFloat(value);
    const isDecimal = value.includes(".");
    const duration = 2000;
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setDisplayed(isDecimal ? current.toFixed(1) : Math.round(current).toString());
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref}>{displayed}</span>;
}

import { useInView as useInViewHook } from "@/hooks";
import { useState, useEffect } from "react";
