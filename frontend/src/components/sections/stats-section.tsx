"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { COMPANY_STATS } from "@/constants";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function StatsSection() {
  return (
    <Section background="subtle" padding="lg">
      <Container>
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {COMPANY_STATS.map((stat) => (
              <AnimatedCounter
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
