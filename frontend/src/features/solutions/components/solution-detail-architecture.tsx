"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { Server, Cloud, Link2 } from "lucide-react";

type ArchitectureLayer = {
  layer: string;
  description: string;
  technologies: string[];
};

type SolutionDetailArchitectureProps = {
  architecture: ArchitectureLayer[];
  deploymentModels: string[];
  integrationSupport: string[];
};

export function SolutionDetailArchitecture({
  architecture,
  deploymentModels,
  integrationSupport,
}: SolutionDetailArchitectureProps) {
  return (
    <Section padding="lg" background="subtle">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            description="Built on a modern, scalable architecture"
            className="mb-16"
          >
            Architecture
          </Heading>
        </FadeIn>

        <Stagger staggerChildren={0.1}>
          <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {architecture.map((layer, index) => (
              <StaggerItem key={layer.layer}>
                <Card padding="lg" hover glow="blue" className="relative h-full">
                  <div className="absolute left-4 top-4 text-xs font-bold text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <MotionDiv whileHover={{ scale: 1.02 }} className="mt-4">
                    <h4 className="mb-2 text-base font-semibold text-white">
                      {layer.layer}
                    </h4>
                    <p className="mb-4 text-sm text-white/50">{layer.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.technologies.map((tech) => (
                        <Badge key={tech} variant="default" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </MotionDiv>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FadeIn direction="left">
            <Card padding="lg" glow="blue">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Cloud className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Deployment Models
              </h3>
              <div className="flex flex-wrap gap-2">
                {deploymentModels.map((model) => (
                  <Badge key={model} variant="blue" size="md">
                    {model}
                  </Badge>
                ))}
              </div>
            </Card>
          </FadeIn>

          <FadeIn direction="right">
            <Card padding="lg" glow="blue">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Link2 className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Integration Support
              </h3>
              <ul className="space-y-2">
                {integrationSupport.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <Server className="h-3.5 w-3.5 shrink-0 text-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
