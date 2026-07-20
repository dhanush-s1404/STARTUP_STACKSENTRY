"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { DEPARTMENTS } from "@/data/careers";
import { DepartmentCard } from "./department-card";

export function DepartmentsGrid() {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <Heading
          level="h2"
          description="Explore the teams building the future of enterprise software at StackSentry."
        >
          Our Departments
        </Heading>

        <Stagger
          delay={0.2}
          staggerChildren={0.08}
          className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {DEPARTMENTS.map((department) => (
            <StaggerItem key={department.id}>
              <DepartmentCard department={department} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
