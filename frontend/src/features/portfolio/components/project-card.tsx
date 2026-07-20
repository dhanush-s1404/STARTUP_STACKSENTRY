"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/ui/tilt-card";
import { ArrowRight, Clock, Star } from "lucide-react";

type ProjectCardProps = {
  slug: string;
  title: string;
  shortDescription: string;
  thumbnailUrl?: string;
  technologies: string[];
  industry: string;
  clientType: string;
  status: string;
  projectDuration: string;
  isFeatured: boolean;
  viewMode: "grid" | "list";
};

const statusVariant: Record<string, "green" | "blue" | "amber" | "default"> = {
  completed: "green",
  in_progress: "blue",
  maintenance: "amber",
};

const statusLabel: Record<string, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  maintenance: "Maintenance",
};

const techColor: Array<"blue" | "purple" | "cyan" | "green" | "amber"> = [
  "blue",
  "purple",
  "cyan",
  "green",
  "amber",
];

export function ProjectCard({
  slug,
  title,
  shortDescription,
  technologies,
  industry,
  status,
  projectDuration,
  isFeatured,
  viewMode,
}: ProjectCardProps) {
  if (viewMode === "list") {
    return (
      <TiltCard maxTilt={3} glare={false}>
        <Card glass hover glow="blue" className="group">
          <Link href={`/portfolio/${slug}`} className="flex flex-col gap-6 md:flex-row">
            <div className="relative flex h-48 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/20 md:h-auto md:w-64">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <span className="relative z-10 text-2xl font-bold text-white/10">
                {title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
              </span>
              {isFeatured && (
                <div className="absolute right-2 top-2 z-10">
                  <Badge variant="amber" size="sm">
                    <Star className="mr-1 h-3 w-3" /> Featured
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col p-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="default" size="sm">{industry}</Badge>
                <Badge variant={statusVariant[status] || "default"} size="sm">
                  {statusLabel[status] || status}
                </Badge>
              </div>

              <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-blue-300">
                {title}
              </h3>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-white/40">
                {shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {technologies.slice(0, 4).map((tech, i) => (
                  <Badge key={tech} variant={techColor[i % techColor.length]} size="sm">
                    {tech}
                  </Badge>
                ))}
                {technologies.length > 4 && (
                  <Badge variant="default" size="sm">+{technologies.length - 4}</Badge>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-white/30">
                  <Clock className="h-3.5 w-3.5" />
                  {projectDuration}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
                  View Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </Card>
      </TiltCard>
    );
  }

  return (
    <TiltCard maxTilt={8} glare>
      <Card glass hover glow="blue" className="group flex h-full flex-col">
        <Link href={`/portfolio/${slug}`} className="flex flex-1 flex-col">
          <div className="relative mb-4 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
            <span className="relative z-10 text-3xl font-bold text-white/10">
              {title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
            </span>
            {isFeatured && (
              <div className="absolute right-2 top-2 z-10">
                <Badge variant="amber" size="sm">
                  <Star className="mr-1 h-3 w-3" /> Featured
                </Badge>
              </div>
            )}
          </div>

          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="default" size="sm">{industry}</Badge>
            <Badge variant={statusVariant[status] || "default"} size="sm">
              {statusLabel[status] || status}
            </Badge>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-white leading-snug transition-colors group-hover:text-blue-300">
            {title}
          </h3>

          <p className="mb-4 flex-1 text-sm leading-relaxed text-white/40 line-clamp-2">
            {shortDescription}
          </p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {technologies.slice(0, 4).map((tech, i) => (
              <Badge key={tech} variant={techColor[i % techColor.length]} size="sm">
                {tech}
              </Badge>
            ))}
            {technologies.length > 4 && (
              <Badge variant="default" size="sm">+{technologies.length - 4}</Badge>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
            <span className="flex items-center gap-1.5 text-xs text-white/30">
              <Clock className="h-3.5 w-3.5" />
              {projectDuration}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
              View Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </Card>
    </TiltCard>
  );
}
