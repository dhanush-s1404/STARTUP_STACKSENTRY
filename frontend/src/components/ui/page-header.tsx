"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumb?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({ title, description, breadcrumb, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {breadcrumb}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-h1 text-white">{title}</h1>
          {description && (
            <p className="text-body-lg text-[hsl(var(--color-text-tertiary))] max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
