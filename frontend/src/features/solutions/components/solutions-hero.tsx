"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { ArrowRight, Play } from "lucide-react";

const stats = [
  { value: "12+", label: "Solutions" },
  { value: "500+", label: "Deployments" },
  { value: "30+", label: "Industries" },
];

export function SolutionsHero() {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <div className="flex flex-col items-center text-center">
          <FadeIn direction="up">
            <Badge variant="blue" size="md" className="mb-6">
              Enterprise Solutions
            </Badge>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <Heading level="h1" gradient className="mb-6">
              Enterprise Business Solutions
            </Heading>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg text-white/50 leading-relaxed">
              Pre-built, customizable enterprise platforms designed to solve complex business
              challenges across industries.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
              >
                Explore Solutions
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={<Play className="h-4 w-4" />}
              >
                Request Demo
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {stats.map((stat) => (
                <MotionDiv
                  key={stat.label}
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-3xl font-bold text-white sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-sm text-white/40">{stat.label}</span>
                </MotionDiv>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
