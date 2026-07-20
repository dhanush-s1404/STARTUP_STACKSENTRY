"use client";

import {
  Activity,
  Accessibility,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/ui/count-up";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { PERFORMANCE_TOPICS } from "@/data/performance-topics";

const SCORE_TARGETS = [
  { label: "Performance", target: 95, suffix: "+", icon: Activity, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { label: "Accessibility", target: 100, suffix: "", icon: Accessibility, color: "text-green-400", bgColor: "bg-green-500/10" },
  { label: "SEO", target: 100, suffix: "", icon: Search, color: "text-purple-400", bgColor: "bg-purple-500/10" },
  { label: "Best Practices", target: 100, suffix: "", icon: ShieldCheck, color: "text-amber-400", bgColor: "bg-amber-500/10" },
];

export function QualityDashboard() {
  return (
    <Section id="quality" padding="lg">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            gradient
            description="Our quality targets and the performance practices that make them achievable."
            className="mb-12"
          >
            Performance &amp; Quality
          </Heading>
        </FadeIn>

        <Stagger staggerChildren={0.1} className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {SCORE_TARGETS.map((target) => (
            <StaggerItem key={target.label}>
              <Card glass hover padding="lg" className="text-center">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${target.bgColor}`}>
                  <target.icon className={`h-7 w-7 ${target.color}`} />
                </div>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${target.color}`}>
                    <CountUp to={target.target} suffix={target.suffix} duration={2} />
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/50">{target.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn direction="up" delay={0.2}>
          <Heading level="h3" className="mb-8">
            Performance Practices
          </Heading>
        </FadeIn>

        <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PERFORMANCE_TOPICS.map((topic) => (
            <StaggerItem key={topic.slug}>
              <Card glass hover glow="cyan" padding="md" className="h-full">
                <h3 className="font-semibold text-white">{topic.title}</h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{topic.description}</p>

                <div className="mt-4 space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Best Practices</span>
                    <ul className="mt-1.5 space-y-1">
                      {topic.bestPractices.map((bp) => (
                        <li key={bp} className="flex items-start gap-1.5 text-xs text-white/50">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                          {bp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.tools.map((tool) => (
                      <Badge key={tool} variant="cyan" size="sm">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
