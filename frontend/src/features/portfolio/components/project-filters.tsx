"use client";

import { SearchInput } from "@/components/ui/search-input";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/cn";

export type FilterState = {
  search: string;
  category: string;
  industry: string;
  technology: string;
  status: string;
  sort: string;
  view: "grid" | "list";
};

type ProjectFiltersProps = {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
};

const categories = [
  "All",
  "Web Development",
  "Mobile App",
  "AI/ML",
  "Cloud",
  "DevOps",
  "E-Commerce",
  "Enterprise",
];

const industries = [
  "All",
  "Healthcare",
  "Education",
  "Finance",
  "Recruitment",
  "Manufacturing",
  "Retail",
  "Government",
  "Real Estate",
  "Travel",
  "Logistics",
  "Hospitality",
];

const statuses = ["All", "Completed", "In Progress", "Maintenance"];

const sorts = ["Newest", "Oldest", "Featured", "A-Z", "Most Viewed"];

const selectClass =
  "h-10 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors duration-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25 appearance-none cursor-pointer";

export function ProjectFilters({ filters, onFilterChange }: ProjectFiltersProps) {
  const update = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex-1 lg:max-w-xs">
            <SearchInput
              value={filters.search}
              onChange={(e) => update("search", e.target.value)}
              onClear={() => update("search", "")}
              placeholder="Search projects..."
              aria-label="Search projects"
            />
          </div>

          <div className="flex flex-1 flex-wrap items-center gap-3">
            <select
              value={filters.category}
              onChange={(e) => update("category", e.target.value)}
              className={selectClass}
              aria-label="Filter by category"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-[hsl(240,5%,6%)]">
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>

            <select
              value={filters.industry}
              onChange={(e) => update("industry", e.target.value)}
              className={selectClass}
              aria-label="Filter by industry"
            >
              {industries.map((i) => (
                <option key={i} value={i} className="bg-[hsl(240,5%,6%)]">
                  {i === "All" ? "All Industries" : i}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) => update("status", e.target.value)}
              className={selectClass}
              aria-label="Filter by status"
            >
              {statuses.map((s) => (
                <option key={s} value={s} className="bg-[hsl(240,5%,6%)]">
                  {s === "All" ? "All Statuses" : s}
                </option>
              ))}
            </select>

            <select
              value={filters.sort}
              onChange={(e) => update("sort", e.target.value)}
              className={selectClass}
              aria-label="Sort projects"
            >
              {sorts.map((s) => (
                <option key={s} value={s} className="bg-[hsl(240,5%,6%)]">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => update("view", "grid")}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                filters.view === "grid"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-white/40 hover:text-white/70",
              )}
              aria-label="Grid view"
              aria-pressed={filters.view === "grid"}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => update("view", "list")}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                filters.view === "list"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-white/40 hover:text-white/70",
              )}
              aria-label="List view"
              aria-pressed={filters.view === "list"}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
