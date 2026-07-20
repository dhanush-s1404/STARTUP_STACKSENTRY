"use client";

import { useState } from "react";
import {
  Code2,
  TestTube,
  Box,
  Shield,
  GitBranch,
  Gauge,
  BookOpen,
  Eye,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { Drawer } from "@/components/ui/drawer";
import { cn } from "@/lib/cn";
import {
  ENGINEERING_PRINCIPLES,
  PRINCIPLE_CATEGORIES,
  type EngineeringPrinciple,
} from "@/data/engineering-principles";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  TestTube,
  Box,
  Shield,
  GitBranch,
  Gauge,
  BookOpen,
  Eye,
  TrendingUp,
};

const CATEGORY_BADGE: Record<string, "blue" | "purple" | "cyan" | "green" | "amber"> = {
  "Code Quality": "blue",
  Architecture: "purple",
  Security: "green",
  DevOps: "amber",
  Performance: "cyan",
};

export function EngineeringPrinciplesGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedPrinciple, setSelectedPrinciple] = useState<EngineeringPrinciple | null>(null);

  const filteredPrinciples = activeCategory
    ? ENGINEERING_PRINCIPLES.filter((p) => p.category === activeCategory)
    : ENGINEERING_PRINCIPLES;

  return (
    <Section id="principles" padding="lg" background="gradient">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            gradient
            description="The engineering values and practices that guide every project we deliver."
            className="mb-8"
          >
            Engineering Principles
          </Heading>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                !activeCategory
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-white/50 hover:bg-white/5 hover:text-white/70",
              )}
            >
              All
            </button>
            {PRINCIPLE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-white/50 hover:bg-white/5 hover:text-white/70",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrinciples.map((principle) => (
            <StaggerItem key={principle.id}>
              <PrincipleCard
                principle={principle}
                onClick={() => setSelectedPrinciple(principle)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <Drawer
        isOpen={!!selectedPrinciple}
        onClose={() => setSelectedPrinciple(null)}
        title={selectedPrinciple?.title}
        description={selectedPrinciple?.description}
        side="right"
        size="lg"
      >
        {selectedPrinciple && (
          <div className="space-y-6 overflow-y-auto pr-2">
            <div>
              <Badge variant={CATEGORY_BADGE[selectedPrinciple.category] || "default"} size="md">
                {selectedPrinciple.category}
              </Badge>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Business Value</h4>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                {selectedPrinciple.businessValue}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Use Cases</h4>
              <ul className="mt-2 space-y-2">
                {selectedPrinciple.useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                    {uc}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Related Practices</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedPrinciple.relatedPractices.map((rp) => (
                  <Badge key={rp} variant="cyan" size="sm">
                    {rp}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedPrinciple(null)}
            >
              Close
            </Button>
          </div>
        )}
      </Drawer>
    </Section>
  );
}

function PrincipleCard({
  principle,
  onClick,
}: {
  principle: EngineeringPrinciple;
  onClick: () => void;
}) {
  const Icon = ICON_MAP[principle.icon] || Code2;

  return (
    <Card glass hover glow="blue" padding="md" className="group h-full" onClick={onClick}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white">{principle.title}</h3>
          </div>
          <Badge variant={CATEGORY_BADGE[principle.category] || "default"} size="sm" className="mt-1">
            {principle.category}
          </Badge>
        </div>
      </div>

      <p className="mt-3 text-sm text-white/50 leading-relaxed">{principle.description}</p>

      <p className="mt-3 text-xs text-white/40 leading-relaxed">{principle.businessValue}</p>
    </Card>
  );
}
