"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { ProjectCard } from "./project-card";

type RelatedProject = {
  slug: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  industry: string;
};

type ProjectDetailRelatedProps = {
  projects: RelatedProject[];
};

export function ProjectDetailRelated({
  projects,
}: ProjectDetailRelatedProps) {
  if (projects.length === 0) return null;

  return (
    <Section padding="lg" background="gradient">
      <Container>
        <Heading level="h2" className="mb-8">
          Related Projects
        </Heading>

        <Stagger staggerChildren={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard
                slug={project.slug}
                title={project.title}
                shortDescription={project.shortDescription}
                technologies={project.technologies}
                industry={project.industry}
                clientType="Enterprise"
                status="completed"
                projectDuration=""
                isFeatured={false}
                viewMode="grid"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
