"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";

export function TechHero() {
  return (
    <Section id="tech-hero" padding="lg" background="gradient">
      <Container>
        <div className="relative py-8 md:py-12">
          <MotionDiv
            className="absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <MotionDiv
            className="absolute top-0 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[100px]"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <FadeIn direction="up" className="relative z-10 text-center">
            <Heading
              level="h1"
              gradient
              description="Our arsenal of modern technologies powering enterprise solutions"
            >
              Technology Stack
            </Heading>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
