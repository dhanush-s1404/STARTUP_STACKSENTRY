"use client";

import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";

type ExperienceLevel = "beginner" | "intermediate" | "advanced" | "expert";

type TechItem = {
  name: string;
  description: string;
  experience: ExperienceLevel;
  useCases: string[];
};

type TechCategoryProps = {
  title: string;
  icon: LucideIcon;
  technologies: TechItem[];
};

const experienceConfig: Record<ExperienceLevel, { value: number; color: "emerald" | "blue" | "cyan" | "purple"; label: string }> = {
  beginner: { value: 25, color: "cyan", label: "Beginner" },
  intermediate: { value: 50, color: "blue", label: "Intermediate" },
  advanced: { value: 75, color: "purple", label: "Advanced" },
  expert: { value: 100, color: "emerald", label: "Expert" },
};

const badgeVariant: Record<ExperienceLevel, "cyan" | "blue" | "purple" | "green"> = {
  beginner: "cyan",
  intermediate: "blue",
  advanced: "purple",
  expert: "green",
};

export function TechCategory({ title, icon: Icon, technologies }: TechCategoryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      <Stagger staggerChildren={0.06} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech) => {
          const config = experienceConfig[tech.experience];
          return (
            <StaggerItem key={tech.name}>
              <MotionDiv
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card glass hover glow="blue" className="h-full">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h4 className="text-lg font-semibold text-white">{tech.name}</h4>
                      <Badge variant={badgeVariant[tech.experience]} size="sm">
                        {config.label}
                      </Badge>
                    </div>

                    <p className="text-sm text-white/50 leading-relaxed">{tech.description}</p>

                    <ProgressBar
                      value={config.value}
                      color={config.color}
                      label="Proficiency"
                      size="sm"
                    />

                    <div className="flex flex-wrap gap-2">
                      {tech.useCases.map((useCase) => (
                        <span
                          key={useCase}
                          className="rounded-md bg-white/[0.03] px-2.5 py-1 text-xs text-white/40 border border-white/[0.06]"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </MotionDiv>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
