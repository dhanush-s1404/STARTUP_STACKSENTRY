import Link from "next/link";
import { cn } from "@/lib/cn";
import { ChevronRight, Home } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
};

export function Breadcrumb({ items, className, showHome = true }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-sm", className)}>
      {showHome && (
        <>
          <Link
            href="/"
            className="flex items-center text-[hsl(var(--color-text-muted))] transition-colors hover:text-[hsl(var(--color-text-secondary))]"
          >
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[hsl(var(--color-text-muted))]" />
        </>
      )}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <>
                <Link
                  href={item.href}
                  className="text-[hsl(var(--color-text-muted))] transition-colors hover:text-[hsl(var(--color-text-secondary))]"
                >
                  {item.label}
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-[hsl(var(--color-text-muted))]" />
              </>
            ) : (
              <span
                className={cn(
                  isLast
                    ? "font-medium text-[hsl(var(--color-text-primary))]"
                    : "text-[hsl(var(--color-text-muted))]",
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
