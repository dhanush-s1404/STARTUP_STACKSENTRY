"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { DEPARTMENTS } from "@/data/careers";
import type { InternshipData } from "@/data/careers";

type InternshipCardProps = {
  internship: InternshipData;
  onLearnMore?: () => void;
};

const departmentColorMap: Record<string, "blue" | "purple" | "cyan" | "green" | "amber"> = {
  engineering: "blue",
  "ai-ml": "purple",
  devops: "cyan",
  "cyber-security": "green",
  data: "blue",
  design: "amber",
  product: "amber",
  marketing: "green",
};

export function InternshipCard({ internship, onLearnMore }: InternshipCardProps) {
  const department = DEPARTMENTS.find((d) => d.slug === internship.departmentSlug);
  const badgeVariant = departmentColorMap[internship.departmentSlug] ?? "blue";

  return (
    <Card
      padding="none"
      hover
      className="group relative flex h-full flex-col overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          {department && (
            <Badge variant={badgeVariant} size="sm">
              {department.name}
            </Badge>
          )}
          <div className="flex items-center gap-2">
            {internship.certificateProvided && (
              <span
                className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400"
              >
                <Award className="h-3 w-3" />
                Certificate
              </span>
            )}
          </div>
        </div>

        <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-blue-300">
          {internship.title}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-white/50">
          {internship.description}
        </p>

        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
            <Clock className="h-3.5 w-3.5" />
            {internship.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
            <Users className="h-3.5 w-3.5" />
            Mentorship
          </span>
        </div>

        <div className="mb-6 flex-1">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
            Requirements
          </p>
          <ul className="space-y-1.5">
            {internship.requirements.slice(0, 3).map((req) => (
              <li
                key={req}
                className="flex items-start gap-2 text-sm text-white/60"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/70" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-xs font-medium text-white/70">Mentorship</p>
          <p className="mt-1 text-xs leading-relaxed text-white/40 line-clamp-2">
            {internship.mentorshipDetails}
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          icon={<ArrowRight className="h-4 w-4" />}
          iconPosition="right"
          onClick={onLearnMore}
        >
          Learn More
        </Button>
      </div>
    </Card>
  );
}
