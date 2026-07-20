"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { useScrollPosition } from "@/hooks";
import { ArrowUp, FileText, Phone } from "lucide-react";

type FloatingActionsProps = {
  className?: string;
};

const actions = [
  { id: "proposal", label: "Request Proposal", href: "/company/contact", icon: FileText, variant: "primary" },
  { id: "consultation", label: "Book Consultation", href: "/company/contact", icon: Phone, variant: "secondary" },
];

export function FloatingActions({ className }: FloatingActionsProps) {
  const { scrollY } = useScrollPosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showBackToTop = scrollY > 500;

  if (!mounted) return null;

  return (
    <div className={cn("fixed bottom-6 right-6 z-40 flex flex-col gap-3", className)}>
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.id}
            href={action.href}
            className={cn(
              "group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-105",
              action.variant === "primary"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40"
                : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white",
            )}
            aria-label={action.label}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden md:inline">{action.label}</span>
          </Link>
        );
      })}

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:text-white",
          showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}
