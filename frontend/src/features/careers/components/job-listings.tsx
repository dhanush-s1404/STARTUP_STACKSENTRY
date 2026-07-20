"use client";

import { useState, useMemo, useCallback } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/cn";
import { JobsHero } from "./jobs-hero";
import { JobCard } from "./job-card";
import { JOBS, DEPARTMENTS, LOCATIONS } from "@/data/careers";
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "executive", label: "Executive" },
];

const EMPLOYMENT_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", "label": "Internship" },
];

const WORK_MODELS = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "Onsite" },
];

const SALARY_RANGES = [
  { min: 0, max: 50000, label: "Under $50K" },
  { min: 50000, max: 100000, label: "$50K - $100K" },
  { min: 100000, max: 150000, label: "$100K - $150K" },
  { min: 150000, max: 200000, label: "$150K - $200K" },
  { min: 200000, max: Infinity, label: "$200K+" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "salary-desc", label: "Salary High to Low" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];

type FilterState = {
  departments: string[];
  locations: string[];
  experienceLevels: string[];
  employmentTypes: string[];
  workModels: string[];
  salaryRange: { min: number; max: number } | null;
};

const ITEMS_PER_PAGE = 9;

export function JobListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    departments: [],
    locations: [],
    experienceLevels: [],
    employmentTypes: [],
    workModels: [],
    salaryRange: null,
  });
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [openFilterSection, setOpenFilterSection] = useState<string | null>(null);

  const toggleFilterSection = useCallback((section: string) => {
    setOpenFilterSection((prev) => (prev === section ? null : section));
  }, []);

  const toggleFilter = useCallback(
    (key: keyof FilterState, value: string) => {
      setFilters((prev) => {
        const current = prev[key] as string[];
        const next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...prev, [key]: next };
      });
      setCurrentPage(1);
    },
    [],
  );

  const setSalaryRange = useCallback((range: { min: number; max: number } | null) => {
    setFilters((prev) => ({ ...prev, salaryRange: range }));
    setCurrentPage(1);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      departments: [],
      locations: [],
      experienceLevels: [],
      employmentTypes: [],
      workModels: [],
      salaryRange: null,
    });
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.departments.length) count += filters.departments.length;
    if (filters.locations.length) count += filters.locations.length;
    if (filters.experienceLevels.length) count += filters.experienceLevels.length;
    if (filters.employmentTypes.length) count += filters.employmentTypes.length;
    if (filters.workModels.length) count += filters.workModels.length;
    if (filters.salaryRange) count += 1;
    return count;
  }, [filters]);

  const filteredJobs = useMemo(() => {
    let jobs = JOBS.filter((j) => j.isActive);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.shortDescription.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.technologyStack.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (filters.departments.length) {
      jobs = jobs.filter((j) => filters.departments.includes(j.departmentSlug));
    }
    if (filters.locations.length) {
      jobs = jobs.filter((j) => filters.locations.includes(j.locationSlug));
    }
    if (filters.experienceLevels.length) {
      jobs = jobs.filter((j) => filters.experienceLevels.includes(j.experienceLevel));
    }
    if (filters.employmentTypes.length) {
      jobs = jobs.filter((j) => filters.employmentTypes.includes(j.employmentType));
    }
    if (filters.workModels.length) {
      jobs = jobs.filter((j) => filters.workModels.includes(j.workModel));
    }
    if (filters.salaryRange) {
      jobs = jobs.filter(
        (j) =>
          j.salaryMax >= filters.salaryRange!.min && j.salaryMin <= filters.salaryRange!.max,
      );
    }

    switch (sortBy) {
      case "newest":
        jobs = [...jobs].sort(
          (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
        );
        break;
      case "popular":
        jobs = [...jobs].sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "salary-desc":
        jobs = [...jobs].sort((a, b) => b.salaryMax - a.salaryMax);
        break;
    }

    return jobs;
  }, [searchQuery, filters, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getCounts = (key: "departmentSlug" | "locationSlug", values: string[]) => {
    return values.map((v) => ({
      value: v,
      count: JOBS.filter((j) => j.isActive && j[key] === v).length,
    }));
  };

  const departmentCounts = useMemo(
    () => getCounts("departmentSlug", DEPARTMENTS.map((d) => d.slug)),
    [],
  );
  const locationCounts = useMemo(
    () => getCounts("locationSlug", LOCATIONS.map((l) => l.slug)),
    [],
  );

  return (
    <>
      <JobsHero
        searchValue={searchQuery}
        onSearch={(v) => {
          setSearchQuery(v);
          setCurrentPage(1);
        }}
        onClear={() => {
          setSearchQuery("");
          setCurrentPage(1);
        }}
      />

      <Section padding="lg">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Mobile filter toggle */}
            <div className="flex items-center justify-between lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.08]"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="blue" size="sm">
                    {activeFilterCount}
                  </Badge>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "rounded-lg p-2 transition-colors",
                    viewMode === "grid"
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:text-white/70",
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "rounded-lg p-2 transition-colors",
                    viewMode === "list"
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:text-white/70",
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Filter Sidebar */}
            <aside
              className={cn(
                "w-full shrink-0 lg:w-72",
                showFilters ? "block" : "hidden lg:block",
              )}
            >
              <Card padding="lg" className="sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Filters</h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-blue-400 transition-colors hover:text-blue-300"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  {/* Department Filter */}
                  <FilterSection
                    title="Department"
                    isOpen={openFilterSection === "department"}
                    onToggle={() => toggleFilterSection("department")}
                    selectedCount={filters.departments.length}
                  >
                    {departmentCounts.map(({ value, count }) => {
                      const dept = DEPARTMENTS.find((d) => d.slug === value);
                      return (
                        <FilterCheckbox
                          key={value}
                          label={dept?.name || value}
                          count={count}
                          checked={filters.departments.includes(value)}
                          onChange={() => toggleFilter("departments", value)}
                        />
                      );
                    })}
                  </FilterSection>

                  {/* Location Filter */}
                  <FilterSection
                    title="Location"
                    isOpen={openFilterSection === "location"}
                    onToggle={() => toggleFilterSection("location")}
                    selectedCount={filters.locations.length}
                  >
                    {locationCounts.map(({ value, count }) => {
                      const loc = LOCATIONS.find((l) => l.slug === value);
                      return (
                        <FilterCheckbox
                          key={value}
                          label={loc?.name || value}
                          count={count}
                          checked={filters.locations.includes(value)}
                          onChange={() => toggleFilter("locations", value)}
                        />
                      );
                    })}
                  </FilterSection>

                  {/* Experience Level Filter */}
                  <FilterSection
                    title="Experience Level"
                    isOpen={openFilterSection === "experience"}
                    onToggle={() => toggleFilterSection("experience")}
                    selectedCount={filters.experienceLevels.length}
                  >
                    {EXPERIENCE_LEVELS.map(({ value, label }) => {
                      const count = JOBS.filter(
                        (j) => j.isActive && j.experienceLevel === value,
                      ).length;
                      return (
                        <FilterCheckbox
                          key={value}
                          label={label}
                          count={count}
                          checked={filters.experienceLevels.includes(value)}
                          onChange={() => toggleFilter("experienceLevels", value)}
                        />
                      );
                    })}
                  </FilterSection>

                  {/* Employment Type Filter */}
                  <FilterSection
                    title="Employment Type"
                    isOpen={openFilterSection === "employment"}
                    onToggle={() => toggleFilterSection("employment")}
                    selectedCount={filters.employmentTypes.length}
                  >
                    {EMPLOYMENT_TYPES.map(({ value, label }) => {
                      const count = JOBS.filter(
                        (j) => j.isActive && j.employmentType === value,
                      ).length;
                      return (
                        <FilterCheckbox
                          key={value}
                          label={label}
                          count={count}
                          checked={filters.employmentTypes.includes(value)}
                          onChange={() => toggleFilter("employmentTypes", value)}
                        />
                      );
                    })}
                  </FilterSection>

                  {/* Work Model Filter */}
                  <FilterSection
                    title="Work Model"
                    isOpen={openFilterSection === "workModel"}
                    onToggle={() => toggleFilterSection("workModel")}
                    selectedCount={filters.workModels.length}
                  >
                    {WORK_MODELS.map(({ value, label }) => {
                      const count = JOBS.filter(
                        (j) => j.isActive && j.workModel === value,
                      ).length;
                      return (
                        <FilterCheckbox
                          key={value}
                          label={label}
                          count={count}
                          checked={filters.workModels.includes(value)}
                          onChange={() => toggleFilter("workModels", value)}
                        />
                      );
                    })}
                  </FilterSection>

                  {/* Salary Range Filter */}
                  <FilterSection
                    title="Salary Range"
                    isOpen={openFilterSection === "salary"}
                    onToggle={() => toggleFilterSection("salary")}
                    selectedCount={filters.salaryRange ? 1 : 0}
                  >
                    {SALARY_RANGES.map((range) => {
                      const isActive =
                        filters.salaryRange?.min === range.min &&
                        filters.salaryRange?.max === range.max;
                      return (
                        <button
                          key={range.label}
                          onClick={() =>
                            setSalaryRange(isActive ? null : { min: range.min, max: range.max })
                          }
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-blue-500/10 text-blue-400"
                              : "text-white/60 hover:bg-white/[0.04] hover:text-white/80",
                          )}
                        >
                          <span>{range.label}</span>
                        </button>
                      );
                    })}
                  </FilterSection>
                </div>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <FadeIn>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-white/40">
                    Showing{" "}
                    <span className="font-medium text-white/70">{paginatedJobs.length}</span> of{" "}
                    <span className="font-medium text-white/70">{filteredJobs.length}</span>{" "}
                    positions
                  </p>

                  <div className="hidden items-center gap-4 sm:flex">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-3.5 w-3.5 text-white/40" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 outline-none focus:border-blue-500/50"
                      >
                        {SORT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="hidden items-center gap-1 lg:flex">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={cn(
                          "rounded-lg p-2 transition-colors",
                          viewMode === "grid"
                            ? "bg-white/10 text-white"
                            : "text-white/40 hover:text-white/70",
                        )}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={cn(
                          "rounded-lg p-2 transition-colors",
                          viewMode === "list"
                            ? "bg-white/10 text-white"
                            : "text-white/40 hover:text-white/70",
                        )}
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Active Filter Tags */}
              {activeFilterCount > 0 && (
                <FadeIn>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {filters.departments.map((v) => {
                      const dept = DEPARTMENTS.find((d) => d.slug === v);
                      return (
                        <FilterTag
                          key={v}
                          label={dept?.name || v}
                          onRemove={() => toggleFilter("departments", v)}
                        />
                      );
                    })}
                    {filters.locations.map((v) => {
                      const loc = LOCATIONS.find((l) => l.slug === v);
                      return (
                        <FilterTag
                          key={v}
                          label={loc?.name || v}
                          onRemove={() => toggleFilter("locations", v)}
                        />
                      );
                    })}
                    {filters.experienceLevels.map((v) => (
                      <FilterTag
                        key={v}
                        label={EXPERIENCE_LEVELS.find((e) => e.value === v)?.label || v}
                        onRemove={() => toggleFilter("experienceLevels", v)}
                      />
                    ))}
                    {filters.employmentTypes.map((v) => (
                      <FilterTag
                        key={v}
                        label={EMPLOYMENT_TYPES.find((e) => e.value === v)?.label || v}
                        onRemove={() => toggleFilter("employmentTypes", v)}
                      />
                    ))}
                    {filters.workModels.map((v) => (
                      <FilterTag
                        key={v}
                        label={WORK_MODELS.find((e) => e.value === v)?.label || v}
                        onRemove={() => toggleFilter("workModels", v)}
                      />
                    ))}
                    {filters.salaryRange && (
                      <FilterTag
                        label={`${SALARY_RANGES.find(
                          (r) =>
                            r.min === filters.salaryRange!.min && r.max === filters.salaryRange!.max,
                        )?.label || "Custom"}`}
                        onRemove={() => setSalaryRange(null)}
                      />
                    )}
                  </div>
                </FadeIn>
              )}

              {paginatedJobs.length === 0 ? (
                <EmptyState
                  variant="search"
                  title="No positions found"
                  description="Try adjusting your search or filters to find what you're looking for."
                  action={
                    <Button variant="secondary" onClick={clearAllFilters}>
                      Clear All Filters
                    </Button>
                  }
                />
              ) : (
                <Stagger staggerChildren={0.08} className="mt-2">
                  <div
                    className={cn(
                      viewMode === "grid"
                        ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                        : "flex flex-col gap-4",
                    )}
                  >
                    {paginatedJobs.map((job) => (
                      <StaggerItem key={job.id}>
                        <JobCard job={job} />
                      </StaggerItem>
                    ))}
                  </div>
                </Stagger>
              )}

              {totalPages > 1 && (
                <FadeIn delay={0.2}>
                  <div className="mt-10 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function FilterSection({
  title,
  isOpen,
  onToggle,
  selectedCount,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  selectedCount: number;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/[0.04] py-1">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.03]"
      >
        <span className="flex items-center gap-2">
          {title}
          {selectedCount > 0 && (
            <Badge variant="blue" size="sm">
              {selectedCount}
            </Badge>
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-white/30 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="space-y-0.5 px-1 pb-2 pt-1">{children}</div>
      </div>
    </div>
  );
}

function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
        checked
          ? "bg-blue-500/10 text-blue-400"
          : "text-white/50 hover:bg-white/[0.03] hover:text-white/70",
      )}
    >
      <span className="flex items-center gap-2.5">
        <span
          className={cn(
            "flex h-4 w-4 items-center justify-center rounded border transition-colors",
            checked
              ? "border-blue-500 bg-blue-500"
              : "border-white/20 bg-transparent",
          )}
        >
          {checked && (
            <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        {label}
      </span>
      <span className="text-xs text-white/30">{count}</span>
    </button>
  );
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
      {label}
      <button onClick={onRemove} className="ml-0.5 rounded-full p-0.5 hover:bg-blue-500/20">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
