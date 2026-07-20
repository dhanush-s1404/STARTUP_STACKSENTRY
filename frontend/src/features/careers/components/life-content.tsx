"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { cn } from "@/lib/cn";
import { LIFE_AT_STACKSENTRY } from "@/data/careers";
import {
  Target,
  Eye,
  Gem,
  Lightbulb,
  Users,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const sectionIconMap: Record<string, LucideIcon> = {
  mission: Target,
  vision: Eye,
  values: Gem,
  culture: Users,
  innovation: Lightbulb,
  community: Users,
};

const sectionGradientMap: Record<string, string> = {
  mission: "from-blue-500/20 to-cyan-500/20",
  vision: "from-purple-500/20 to-pink-500/20",
  values: "from-amber-500/20 to-orange-500/20",
  culture: "from-emerald-500/20 to-teal-500/20",
  innovation: "from-cyan-500/20 to-blue-500/20",
  community: "from-rose-500/20 to-purple-500/20",
};

const sectionIconGradientMap: Record<string, string> = {
  mission: "from-blue-500 to-cyan-500",
  vision: "from-purple-500 to-pink-500",
  values: "from-amber-500 to-orange-500",
  culture: "from-emerald-500 to-teal-500",
  innovation: "from-cyan-500 to-blue-500",
  community: "from-rose-500 to-purple-500",
};

export function LifeContent() {
  return (
    <Section padding="lg">
      <Container>
        <FadeIn>
          <Heading
            level="h2"
            description="The principles, culture, and values that define who we are and how we work"
            className="mb-16"
          >
            What Drives Us
          </Heading>
        </FadeIn>

        <div className="space-y-24">
          {LIFE_AT_STACKSENTRY.map((item, index) => {
            const Icon = sectionIconMap[item.section] || Lightbulb;
            const isReversed = index % 2 !== 0;

            return (
              <FadeIn key={item.id} delay={0.1}>
                <div
                  className={cn(
                    "grid gap-8 lg:grid-cols-2 lg:gap-16",
                    isReversed && "lg:[direction:rtl]",
                  )}
                >
                  {/* Image placeholder */}
                  <div className="lg:[direction:ltr]">
                    <div
                      className={cn(
                        "relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.06]",
                        "bg-gradient-to-br",
                        sectionGradientMap[item.section] || "from-white/5 to-white/5",
                      )}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="h-20 w-20 text-white/10" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
                          <Icon className="h-3 w-3" />
                          {item.section.charAt(0).toUpperCase() + item.section.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center lg:[direction:ltr]">
                    <Stagger staggerChildren={0.05}>
                      <StaggerItem>
                        <div className="mb-4 flex items-center gap-3">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br",
                              sectionIconGradientMap[item.section] || "from-white/20 to-white/10",
                            )}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                        </div>
                      </StaggerItem>

                      <StaggerItem>
                        <p className="mb-6 text-white/50 leading-relaxed">
                          {item.description}
                        </p>
                      </StaggerItem>

                      <StaggerItem>
                        <ul className="space-y-3">
                          {item.items.map((listItem, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                                <Check className="h-3 w-3 text-emerald-400" />
                              </div>
                              <span className="text-sm text-white/60 leading-relaxed">
                                {listItem}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </StaggerItem>
                    </Stagger>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
