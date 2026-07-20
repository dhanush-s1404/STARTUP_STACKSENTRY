"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { ArrowRight, BarChart3 } from "lucide-react";
import { getIcon } from "@/lib/icon-registry";

type SolutionDetailHeroProps = {
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export function SolutionDetailHero({
  title,
  description,
  icon,
  features,
}: SolutionDetailHeroProps) {
  const Icon = getIcon(icon);
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-12">
          <FadeIn direction="left" className="flex-1">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Badge variant="blue" size="md" className="mb-6">
                Enterprise Solution
              </Badge>

              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <Icon className="h-8 w-8" />
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {title}
              </h1>

              <p className="mb-8 max-w-xl text-lg text-white/50 leading-relaxed">
                {description}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                  iconPosition="right"
                >
                  Request Demo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon={<BarChart3 className="h-4 w-4" />}
                >
                  View Case Studies
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2} className="mt-10 lg:mt-0 lg:flex-1">
            <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
              {features.map((feature, index) => (
                <MotionDiv
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Badge variant="default" size="md">
                    {feature}
                  </Badge>
                </MotionDiv>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
