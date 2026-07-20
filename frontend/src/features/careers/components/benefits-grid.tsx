"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Tabs } from "@/components/ui/tabs";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { BENEFITS } from "@/data/careers";
import { BenefitCard } from "./benefit-card";
import {
  Heart,
  TrendingUp,
  Wallet,
  Coffee,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "health", label: "Health", icon: Heart },
  { id: "financial", label: "Financial", icon: Wallet },
  { id: "lifestyle", label: "Lifestyle", icon: Coffee },
  { id: "learning", label: "Learning", icon: GraduationCap },
  { id: "perks", label: "Perks", icon: TrendingUp },
];

export function BenefitsGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return BENEFITS;
    return BENEFITS.filter((b) => b.category === activeCategory);
  }, [activeCategory]);

  const tabItems = categories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    icon: <cat.icon className="h-4 w-4" />,
  }));

  return (
    <Section padding="lg">
      <Container>
        <FadeIn>
          <Heading
            level="h2"
            description="Comprehensive benefits designed to support every aspect of your life"
            className="mb-8"
          >
            Why You&apos;ll Love Working Here
          </Heading>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mb-10 flex justify-center">
            <Tabs
              items={tabItems}
              variant="pills"
              activeTab={activeCategory}
              onTabChange={setActiveCategory}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mb-6 flex items-center gap-2 text-sm text-white/40">
            <span>
              Showing{" "}
              <span className="text-white/70">{filtered.length}</span> of{" "}
              <span className="text-white/70">{BENEFITS.length}</span> benefits
            </span>
          </div>
        </FadeIn>

        <Stagger staggerChildren={0.06}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((benefit) => (
              <StaggerItem key={benefit.id}>
                <BenefitCard benefit={benefit} />
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        {filtered.length === 0 && (
          <FadeIn>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] py-16 text-center">
              <Sparkles className="mx-auto h-12 w-12 text-white/10" />
              <p className="mt-4 text-white/40">
                No benefits found in this category.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-4 text-sm text-blue-400 transition-colors hover:text-blue-300"
              >
                View all benefits
              </button>
            </div>
          </FadeIn>
        )}
      </Container>
    </Section>
  );
}
