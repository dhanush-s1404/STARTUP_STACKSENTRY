"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Card } from "@/components/ui/card";
import { Check, Quote } from "lucide-react";

type ProjectDetailOverviewProps = {
  businessProblem: string;
  solutionOverview: string;
  keyFeatures: string[];
  clientTestimonial: string;
};

export function ProjectDetailOverview({
  businessProblem,
  solutionOverview,
  keyFeatures,
  clientTestimonial,
}: ProjectDetailOverviewProps) {
  return (
    <Section padding="lg">
      <Container>
        <FadeIn direction="up">
          <Heading level="h2" className="mb-12">
            Project Overview
          </Heading>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn direction="left">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Business Problem</h3>
              <p className="leading-relaxed text-white/50">{businessProblem}</p>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Our Solution</h3>
              <p className="leading-relaxed text-white/50">{solutionOverview}</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.2}>
          <div className="mt-12">
            <h3 className="mb-6 text-xl font-semibold text-white">Key Features</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {keyFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {clientTestimonial && (
          <FadeIn direction="up" delay={0.3}>
            <Card glass padding="lg" className="mt-12 bg-gradient-to-br from-blue-600/10 to-purple-600/10">
              <Quote className="mb-4 h-8 w-8 text-blue-400/40" />
              <blockquote className="text-lg leading-relaxed text-white/60 italic">
                &ldquo;{clientTestimonial}&rdquo;
              </blockquote>
            </Card>
          </FadeIn>
        )}
      </Container>
    </Section>
  );
}
