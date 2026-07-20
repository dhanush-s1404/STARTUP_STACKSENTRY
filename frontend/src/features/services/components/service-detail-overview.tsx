"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { Check } from "lucide-react";

type ServiceDetailOverviewProps = {
  title: string;
  description: string;
  problemsSolved: string[];
  keyFeatures: string[];
};

export function ServiceDetailOverview({
  title,
  description,
  problemsSolved,
  keyFeatures,
}: ServiceDetailOverviewProps) {
  return (
    <Section id="overview" padding="lg" background="gradient">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Description */}
          <FadeIn direction="left">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/50">
                {description}
              </p>

              {/* Problems We Solve */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white">
                  Problems We Solve
                </h3>
                <ul className="mt-4 space-y-3">
                  {problemsSolved.map((problem) => (
                    <li key={problem} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                        <Check className="h-3 w-3 text-emerald-400" />
                      </div>
                      <span className="text-sm text-white/60">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Right: Key Features */}
          <FadeIn direction="right">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8">
              <h3 className="text-lg font-semibold text-white">Key Features</h3>
              <ul className="mt-4 space-y-3">
                {keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm text-white/60">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
