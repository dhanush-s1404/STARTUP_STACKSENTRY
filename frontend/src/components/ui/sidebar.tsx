"use client";

import { useCallback, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ChevronLeft, Menu } from "lucide-react";

type SidebarItem = {
  label: string;
  href?: string;
  icon?: ReactNode;
  badge?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

type SidebarSection = {
  title?: string;
  items: SidebarItem[];
};

type SidebarProps = {
  sections: SidebarSection[];
  header?: ReactNode;
  footer?: ReactNode;
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
};

export function Sidebar({
  sections,
  header,
  footer,
  collapsed = false,
  onToggle,
  className,
}: SidebarProps) {
  const handleItemClick = useCallback((item: SidebarItem) => {
    if (item.disabled) return;
    item.onClick?.();
  }, []);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-white/[0.06] bg-[hsl(222,40%,11%)]/50 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      {header && (
        <div className={cn("flex items-center border-b border-white/[0.06] p-4", collapsed && "justify-center")}>
          {collapsed ? (
            <button
              onClick={onToggle}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[hsl(var(--color-text-muted))] transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Expand sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : (
            <>
              <div className="flex-1">{header}</div>
              <button
                onClick={onToggle}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[hsl(var(--color-text-muted))] transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={cn(sectionIndex > 0 && "mt-6")}>
            {section.title && !collapsed && (
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => {
                const isActive = item.active;
                const itemKey = `${sectionIndex}-${itemIndex}`;
                return (
                  <button
                    key={itemKey}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-blue-500/10 text-blue-400"
                        : "text-[hsl(var(--color-text-secondary))] hover:bg-white/[0.04] hover:text-white",
                      collapsed && "justify-center px-2",
                      item.disabled && "cursor-not-allowed opacity-50",
                    )}
                    title={collapsed ? item.label : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon && (
                      <span className={cn("shrink-0", isActive ? "text-blue-400" : "text-[hsl(var(--color-text-muted))]")}>
                        {item.icon}
                      </span>
                    )}
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full bg-blue-600/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div className={cn("border-t border-white/[0.06] p-4", collapsed && "flex justify-center")}>
          {footer}
        </div>
      )}
    </aside>
  );
}
