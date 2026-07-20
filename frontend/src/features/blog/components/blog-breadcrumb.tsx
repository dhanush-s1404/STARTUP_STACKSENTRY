"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = {
  label: string;
  href?: string;
};

type BlogBreadcrumbProps = {
  items: Crumb[];
};

export function BlogBreadcrumb({ items }: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/40">
      <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight className="h-3.5 w-3.5" />
          {item.href ? (
            <Link href={item.href} className="hover:text-white/60 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/60">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
