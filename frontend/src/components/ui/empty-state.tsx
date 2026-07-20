import { cn } from "@/lib/cn";
import { Inbox, FileText, Search, Folder } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateVariant = "default" | "search" | "data" | "upload";

type EmptyStateProps = {
  variant?: EmptyStateVariant;
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

const defaultIcons: Record<EmptyStateVariant, ReactNode> = {
  default: <Inbox className="h-12 w-12" />,
  search: <Search className="h-12 w-12" />,
  data: <FileText className="h-12 w-12" />,
  upload: <Folder className="h-12 w-12" />,
};

export function EmptyState({
  variant = "default",
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className,
      )}
    >
      <div className="mb-6 rounded-2xl bg-white/[0.03] p-6 text-[hsl(var(--color-text-muted))]">
        {icon || defaultIcons[variant]}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm text-[hsl(var(--color-text-muted))]">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
