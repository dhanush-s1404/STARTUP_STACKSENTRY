"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { GRADUATE_PROGRAMS } from "@/data/careers";
import { GraduateProgramCard } from "./graduate-program-card";

type GraduateProgramsGridProps = {
  onSelectProgram?: (slug: string) => void;
};

export function GraduateProgramsGrid({ onSelectProgram }: GraduateProgramsGridProps) {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <Heading
          level="h2"
          description="Choose from our structured graduate programs designed to accelerate your growth into a world-class technologist."
        >
          Available Programs
        </Heading>

        <Stagger
          delay={0.2}
          staggerChildren={0.1}
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {GRADUATE_PROGRAMS.map((program) => (
            <StaggerItem key={program.id}>
              <GraduateProgramCard
                program={program}
                onExplore={() => onSelectProgram?.(program.slug)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
