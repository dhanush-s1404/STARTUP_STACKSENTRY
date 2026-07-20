"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import type { GraduateProgramData } from "@/data/careers";

type GraduateProgramCardProps = {
  program: GraduateProgramData;
  onExplore?: () => void;
};

export function GraduateProgramCard({ program, onExplore }: GraduateProgramCardProps) {
  return (
    <Card
      padding="none"
      hover
      className="group relative flex h-full flex-col overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <Badge variant="blue" size="sm">
            Graduate Program
          </Badge>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
            <Clock className="h-3.5 w-3.5" />
            {program.duration}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-blue-300">
          {program.title}
        </h3>

        <p className="mb-6 text-sm leading-relaxed text-white/50">
          {program.description}
        </p>

        <div className="mb-6 flex-1">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
            Requirements
          </p>
          <ul className="space-y-1.5">
            {program.requirements.slice(0, 3).map((req) => (
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
          <div className="flex flex-wrap gap-1.5">
            {program.benefits.slice(0, 4).map((benefit) => (
              <span
                key={benefit}
                className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400"
              >
                {benefit}
              </span>
            ))}
            {program.benefits.length > 4 && (
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-white/40">
                +{program.benefits.length - 4} more
              </span>
            )}
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          icon={<ArrowRight className="h-4 w-4" />}
          iconPosition="right"
          onClick={onExplore}
        >
          Explore Program
        </Button>
      </div>
    </Card>
  );
}
