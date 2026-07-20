"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import {
  Code2,
  Brain,
  Lightbulb,
  Palette,
  Cloud,
  Shield,
  BarChart3,
  Megaphone,
  Users,
  ArrowRight,
} from "lucide-react";
import type { DepartmentData } from "@/data/careers";

type DepartmentCardProps = {
  department: DepartmentData;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Brain,
  Lightbulb,
  Palette,
  Cloud,
  Shield,
  BarChart3,
  Megaphone,
};

const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    glow: "group-hover:shadow-blue-500/10",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    glow: "group-hover:shadow-purple-500/10",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "group-hover:shadow-amber-500/10",
  },
  rose: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    glow: "group-hover:shadow-rose-500/10",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "group-hover:shadow-cyan-500/10",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "group-hover:shadow-emerald-500/10",
  },
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    glow: "group-hover:shadow-indigo-500/10",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    glow: "group-hover:shadow-orange-500/10",
  },
};

export function DepartmentCard({ department }: DepartmentCardProps) {
  const Icon = iconMap[department.icon] ?? Code2;
  const colors = colorMap[department.color] ?? colorMap.blue;

  return (
    <Link href={`/careers?department=${department.slug}`} className="block h-full">
      <Card
        padding="none"
        hover
        className={cn(
          "group relative flex h-full flex-col overflow-hidden",
          colors.glow,
        )}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-white/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10 flex flex-1 flex-col p-6">
          <div
            className={cn(
              "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300",
              colors.bg,
              "group-hover:scale-110",
            )}
          >
            <Icon className={cn("h-6 w-6", colors.text)} />
          </div>

          <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-blue-300">
            {department.name}
          </h3>

          <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">
            {department.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
              <Users className="h-3.5 w-3.5" />
              {department.headCount} team members
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 transition-all duration-200 group-hover:gap-2">
              View Roles
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
