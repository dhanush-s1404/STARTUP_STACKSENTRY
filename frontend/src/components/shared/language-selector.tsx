"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { LANGUAGES } from "@/constants";
import { Check, ChevronDown, Globe } from "lucide-react";
import type { Language } from "@/types";

type LanguageSelectorProps = {
  className?: string;
  align?: "left" | "right";
};

export function LanguageSelector({ className, align = "right" }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Language>(LANGUAGES[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Language: ${selected.name}`}
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{selected.code.toUpperCase()}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-1 w-40 rounded-xl border border-white/[0.06] bg-[hsl(222,40%,11%)]/95 p-1 shadow-2xl backdrop-blur-xl",
            align === "right" ? "right-0" : "left-0",
          )}
          role="listbox"
          aria-label="Select language"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelected(lang);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={selected.code === lang.code}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                selected.code === lang.code
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white",
              )}
            >
              <span className="flex-1">
                <span className="font-medium">{lang.nativeName}</span>
                <span className="ml-1.5 text-xs text-white/30">{lang.name}</span>
              </span>
              {selected.code === lang.code && <Check className="h-3.5 w-3.5 text-blue-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
