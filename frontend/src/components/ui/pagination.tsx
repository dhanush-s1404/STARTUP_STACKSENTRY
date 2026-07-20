"use client";

import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
  showPrevNext?: boolean;
  showFirstLast?: boolean;
};

function generatePages(current: number, total: number, siblingCount: number): (number | "ellipsis")[] {
  const totalVisible = siblingCount * 2 + 5; // siblings + current + first + last + 2 ellipses

  if (total <= totalVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis", total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + 2 * siblingCount;
    const rightRange = Array.from({ length: rightCount }, (_, i) => total - rightCount + i + 1);
    return [1, "ellipsis", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i,
  );
  return [1, "ellipsis", ...middleRange, "ellipsis", total];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  showPrevNext = true,
  showFirstLast = false,
}: PaginationProps) {
  const pages = generatePages(currentPage, totalPages, siblingCount);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
    >
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-all duration-200",
            "text-[hsl(var(--color-text-muted))] hover:bg-white/[0.05] hover:text-white",
            "disabled:pointer-events-none disabled:opacity-30",
          )}
          aria-label="First page"
        >
          <ChevronLeft className="h-4 w-4" />
          <ChevronLeft className="h-4 w-4 -ml-2" />
        </button>
      )}

      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-all duration-200",
            "text-[hsl(var(--color-text-muted))] hover:bg-white/[0.05] hover:text-white",
            "disabled:pointer-events-none disabled:opacity-30",
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-[hsl(var(--color-text-muted))]"
            >
              <MoreHorizontal className="h-4 w-4" />
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                : "text-[hsl(var(--color-text-muted))] hover:bg-white/[0.05] hover:text-white",
            )}
          >
            {page}
          </button>
        );
      })}

      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-all duration-200",
            "text-[hsl(var(--color-text-muted))] hover:bg-white/[0.05] hover:text-white",
            "disabled:pointer-events-none disabled:opacity-30",
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-all duration-200",
            "text-[hsl(var(--color-text-muted))] hover:bg-white/[0.05] hover:text-white",
            "disabled:pointer-events-none disabled:opacity-30",
          )}
          aria-label="Last page"
        >
          <ChevronRight className="h-4 w-4" />
          <ChevronRight className="h-4 w-4 -ml-2" />
        </button>
      )}
    </nav>
  );
}
