"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { Globe } from "lucide-react";

export function IndustriesHero() {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <div className="flex flex-col items-center text-center">
          <FadeIn direction="up">
            <Badge variant="purple" size="md" className="mb-6">
              Industry Expertise
            </Badge>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <Heading level="h1" gradient className="mb-6">
              Industries We Serve
            </Heading>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg text-white/50 leading-relaxed">
              Deep domain expertise across 12+ industries, delivering specialized software
              solutions that address unique business challenges and drive measurable outcomes.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <MotionDiv
              whileHover={{ scale: 1.05 }}
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3"
            >
              <Globe className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-medium text-white/70">
                Trusted across 12+ industry verticals worldwide
              </span>
            </MotionDiv>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
