"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { cn } from "@/lib/cn";
import {
  Database,
  Server,
  Cloud,
  Globe,
  Shield,
  Cpu,
  Layers,
  Terminal,
  Code2,
  Workflow,
  BarChart3,
  Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Technology = {
  name: string;
  description: string;
};

type ServiceDetailTechProps = {
  technologies: Technology[];
};

const iconMap: LucideIcon[] = [
  Database,
  Server,
  Cloud,
  Globe,
  Shield,
  Cpu,
  Layers,
  Terminal,
  Code2,
  Workflow,
  BarChart3,
  Lock,
];

const experienceLevels = ["Expert", "Advanced", "Proficient"];

export function ServiceDetailTech({ technologies }: ServiceDetailTechProps) {
  return (
    <Section padding="lg">
      <Container>
        <Heading
          level="h2"
          description="Technologies and tools we use to deliver excellence"
          className="mb-12"
        >
          Technology Stack
        </Heading>

        <Stagger staggerChildren={0.05} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => {
            const Icon = iconMap[index % iconMap.length];
            const level = experienceLevels[index % experienceLevels.length];

            return (
              <StaggerItem key={tech.name}>
                <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-lg sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white">
                        {tech.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/40 line-clamp-2">
                        {tech.description}
                      </p>
                      {/* Experience indicator */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((bar) => (
                            <div
                              key={bar}
                              className={cn(
                                "h-1 w-4 rounded-full",
                                level === "Expert" ||
                                  (level === "Advanced" && bar <= 2)
                                  ? "bg-blue-400"
                                  : "bg-white/10"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-white/30">{level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
