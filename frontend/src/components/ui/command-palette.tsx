"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Search, ArrowUp, ArrowDown, CornerDownLeft } from "lucide-react";

type CommandItem = {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string;
  group?: string;
  disabled?: boolean;
};

type CommandPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
  onSelect?: (id: string) => void;
  placeholder?: string;
  className?: string;
};

export function CommandPalette({
  isOpen,
  onClose,
  items,
  onSelect,
  placeholder = "Search commands...",
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter((item) => {
    const searchStr = `${item.label} ${item.description || ""} ${item.group || ""}`.toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });

  const groups = filteredItems.reduce(
    (acc, item) => {
      const group = item.group || "Commands";
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    },
    {} as Record<string, CommandItem[]>,
  );

  const flatItems = filteredItems.filter((i) => !i.disabled);

  // Focus input
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, flatItems.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (flatItems[selectedIndex]) {
            onSelect?.(flatItems[selectedIndex].id);
            onClose();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [flatItems, selectedIndex, onSelect, onClose],
  );

  if (!isOpen) return null;

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-x-4 top-[15%] mx-auto max-w-xl">
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-white/10 bg-[hsl(222,40%,11%)] shadow-2xl",
            "animate-fade-in-scale",
            className,
          )}
          role="dialog"
          aria-label="Command palette"
        >
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-4">
            <Search className="h-5 w-5 shrink-0 text-[hsl(var(--color-text-muted))]" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex h-14 flex-1 bg-transparent text-sm text-white placeholder:text-[hsl(var(--color-text-muted))] focus:outline-none"
            />
            <kbd className="hidden rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-[hsl(var(--color-text-muted))] sm:inline-block">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {flatItems.length === 0 ? (
              <div className="py-8 text-center text-sm text-[hsl(var(--color-text-muted))]">
                No results found
              </div>
            ) : (
              Object.entries(groups).map(([group, groupItems]) => (
                <div key={group}>
                  <div className="px-3 py-2 text-xs font-medium text-[hsl(var(--color-text-muted))]">
                    {group}
                  </div>
                  {groupItems.map((item) => {
                    if (item.disabled) return null;
                    runningIndex++;
                    const currentIndex = runningIndex;
                    const isSelected = currentIndex === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelect?.(item.id);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                          isSelected
                            ? "bg-white/[0.06] text-white"
                            : "text-[hsl(var(--color-text-secondary))]",
                        )}
                      >
                        {item.icon && (
                          <span className="shrink-0 text-[hsl(var(--color-text-muted))]">
                            {item.icon}
                          </span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="truncate font-medium">{item.label}</div>
                          {item.description && (
                            <div className="truncate text-xs text-[hsl(var(--color-text-muted))]">
                              {item.description}
                            </div>
                          )}
                        </div>
                        {item.shortcut && (
                          <div className="flex items-center gap-1">
                            {item.shortcut.split("+").map((key, i) => (
                              <kbd
                                key={i}
                                className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-[hsl(var(--color-text-muted))]"
                              >
                                {key}
                              </kbd>
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 border-t border-white/[0.06] px-4 py-2">
            <div className="flex items-center gap-1 text-xs text-[hsl(var(--color-text-muted))]">
              <ArrowUp className="h-3 w-3" />
              <ArrowDown className="h-3 w-3" />
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[hsl(var(--color-text-muted))]">
              <CornerDownLeft className="h-3 w-3" />
              <span>Select</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
