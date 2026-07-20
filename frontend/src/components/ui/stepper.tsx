"use client";

import { cn } from "@/lib/cn";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

type StepStatus = "completed" | "current" | "upcoming";

type StepperStep = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

type StepperProps = {
  steps: StepperStep[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

function getStepStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return "completed";
  if (index === currentStep) return "current";
  return "upcoming";
}

const statusStyles: Record<StepStatus, string> = {
  completed: "bg-blue-600 text-white",
  current: "bg-blue-600/20 text-blue-400 ring-2 ring-blue-500",
  upcoming: "bg-white/5 text-[hsl(var(--color-text-muted))]",
};

const lineStyles: Record<StepStatus, string> = {
  completed: "bg-blue-600",
  current: "bg-blue-600/30",
  upcoming: "bg-white/10",
};

export function Stepper({ steps, currentStep, orientation = "horizontal", className }: StepperProps) {
  return (
    <div
      className={cn(
        orientation === "horizontal" ? "flex items-start" : "flex flex-col",
        className,
      )}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(index, currentStep);
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            className={cn(
              orientation === "horizontal"
                ? "flex flex-1 flex-col items-center"
                : "flex items-start gap-4",
            )}
          >
            {/* Step indicator + line */}
            <div
              className={cn(
                orientation === "horizontal"
                  ? "flex flex-col items-center"
                  : "flex items-center gap-4",
              )}
            >
              {/* Circle */}
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
                  statusStyles[status],
                )}
              >
                {status === "completed" ? (
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                ) : step.icon || (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Line */}
              {!isLast && (
                <div
                  className={cn(
                    orientation === "horizontal"
                      ? "h-0.5 w-full"
                      : "h-12 w-0.5",
                    lineStyles[status],
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div
              className={cn(
                orientation === "horizontal" ? "mt-3 text-center" : "pt-2",
                isLast && orientation === "horizontal" && "pr-0",
              )}
            >
              <p
                className={cn(
                  "text-sm font-medium",
                  status === "completed"
                    ? "text-white"
                    : status === "current"
                      ? "text-blue-400"
                      : "text-[hsl(var(--color-text-muted))]",
                )}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="mt-1 text-xs text-[hsl(var(--color-text-muted))]">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
