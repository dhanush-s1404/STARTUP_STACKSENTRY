"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { INTERNSHIPS } from "@/data/careers";
import { InternshipCard } from "./internship-card";

type InternshipsGridProps = {
  onSelectInternship?: (slug: string) => void;
};

export function InternshipsGrid({ onSelectInternship }: InternshipsGridProps) {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <Heading
          level="h2"
          description="Explore our structured internship programs designed to give you real-world experience and launch your career in tech."
        >
          Our Internship Programs
        </Heading>

        <Stagger
          delay={0.2}
          staggerChildren={0.1}
          className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {INTERNSHIPS.map((internship) => (
            <StaggerItem key={internship.id}>
              <InternshipCard
                internship={internship}
                onLearnMore={() => onSelectInternship?.(internship.slug)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
