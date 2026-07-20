"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { useInView } from "@/hooks";
import { cn } from "@/lib/cn";
import { PROJECTS, type ProjectData } from "@/data/projects";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Calendar,
} from "lucide-react";

const selectClass =
  "h-10 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors duration-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25 appearance-none cursor-pointer";

const industries = [
  "All",
  ...Array.from(new Set(PROJECTS.map((p) => p.industry))).sort(),
];

const years = [
  "All",
  ...Array.from(new Set(PROJECTS.map((p) => p.year)))
    .sort((a, b) => b - a)
    .map(String),
];

const statuses = ["All", "Completed", "In Progress", "Maintenance"];

const industryColors: Record<string, string> = {
  Healthcare: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  Education: "border-blue-500/40 bg-blue-500/10 text-blue-400",
  Finance: "border-purple-500/40 bg-purple-500/10 text-purple-400",
  Recruitment: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  Manufacturing: "border-orange-500/40 bg-orange-500/10 text-orange-400",
  Retail: "border-pink-500/40 bg-pink-500/10 text-pink-400",
  Logistics: "border-cyan-500/40 bg-cyan-500/10 text-cyan-400",
};

const industryDotColors: Record<string, string> = {
  Healthcare: "bg-emerald-500",
  Education: "bg-blue-500",
  Finance: "bg-purple-500",
  Recruitment: "bg-amber-500",
  Manufacturing: "bg-orange-500",
  Retail: "bg-pink-500",
  Logistics: "bg-cyan-500",
};

const statusStyles: Record<string, string> = {
  completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  in_progress: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  maintenance: "border-amber-500/30 bg-amber-500/10 text-amber-400",
};

const statusLabels: Record<string, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  maintenance: "Maintenance",
};

const timelineDotColors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
];

function TimelinePhase({
  phase,
  index,
  isLast,
  industry,
}: {
  phase: { phase: string; duration: string; description: string };
  index: number;
  isLast: boolean;
  industry: string;
}) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const dotColor =
    industryDotColors[industry] || timelineDotColors[index % timelineDotColors.length];

  return (
    <div ref={ref} className="relative flex gap-4 pb-4">
      <div className="flex flex-col items-center">
        <MotionDiv
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={cn(
            "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
            dotColor,
          )}
        >
          <span className="text-[10px] font-bold text-white">{index + 1}</span>
        </MotionDiv>
        {!isLast && (
          <div className="h-full w-px bg-gradient-to-b from-white/10 to-transparent" />
        )}
      </div>

      <MotionDiv
        initial={{ opacity: 0, x: -15 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
        transition={{
          duration: 0.4,
          delay: index * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex-1"
      >
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-white">{phase.phase}</h4>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50 border border-white/[0.06]">
              {phase.duration}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-white/40">
            {phase.description}
          </p>
        </div>
      </MotionDiv>
    </div>
  );
}

function ProjectTimelineCard({
  project,
  isExpanded,
  onToggle,
}: {
  project: ProjectData;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors duration-200 hover:border-white/[0.1]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={cn(
              "h-2 w-2 shrink-0 rounded-full",
              industryDotColors[project.industry] || "bg-white/30",
            )}
          />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-white">
              {project.title}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] border",
                  industryColors[project.industry] || "border-white/20 text-white/50",
                )}
              >
                {project.industry}
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] border",
                  statusStyles[project.status] || "border-white/20 text-white/50",
                )}
              >
                {statusLabels[project.status]}
              </Badge>
              <span className="text-[10px] text-white/30">
                {project.projectDuration}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-white/30 hidden sm:inline">
            {project.developmentTimeline.length} phases
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-white/30" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white/30" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.06] px-5 pb-5 pt-4">
              <p className="mb-4 text-xs leading-relaxed text-white/40">
                {project.shortDescription}
              </p>
              <div className="relative">
                {project.developmentTimeline.map((phase, i) => (
                  <TimelinePhase
                    key={phase.phase}
                    phase={phase}
                    index={i}
                    isLast={i === project.developmentTimeline.length - 1}
                    industry={project.industry}
                  />
                ))}
              </div>
              <a
                href={`/portfolio/${project.slug}`}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                View full project
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}

function YearSection({
  year,
  projects,
  expandedProject,
  onToggle,
}: {
  year: number;
  projects: ProjectData[];
  expandedProject: string | null;
  onToggle: (slug: string) => void;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className="relative">
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-20 z-10 mb-4"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[hsl(240,6%,8%)] px-4 py-1.5 backdrop-blur-sm">
          <Calendar className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-sm font-semibold text-white">{year}</span>
          <span className="text-[10px] text-white/40">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </span>
        </div>
      </MotionDiv>

      <Stagger className="space-y-3 pl-4 md:pl-8">
        {projects.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectTimelineCard
              project={project}
              isExpanded={expandedProject === project.slug}
              onToggle={() => onToggle(project.slug)}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export function PortfolioTimeline() {
  const [industryFilter, setIndustryFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (industryFilter !== "All" && p.industry !== industryFilter)
        return false;
      if (yearFilter !== "All" && p.year !== Number(yearFilter)) return false;
      if (statusFilter !== "All") {
        const statusMap: Record<string, string> = {
          Completed: "completed",
          "In Progress": "in_progress",
          Maintenance: "maintenance",
        };
        if (p.status !== statusMap[statusFilter]) return false;
      }
      return true;
    }).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return 0;
    });
  }, [industryFilter, yearFilter, statusFilter]);

  const projectsByYear = useMemo(() => {
    const groups: Record<number, ProjectData[]> = {};
    for (const project of filteredProjects) {
      if (!groups[project.year]) groups[project.year] = [];
      groups[project.year].push(project);
    }
    return groups;
  }, [filteredProjects]);

  const sortedYears = useMemo(
    () => Object.keys(projectsByYear).map(Number).sort((a, b) => b - a),
    [projectsByYear],
  );

  const handleToggle = (slug: string) => {
    setExpandedProject((prev) => (prev === slug ? null : slug));
  };

  return (
    <Section padding="lg">
      <Container size="md">
        <FadeIn direction="up">
          <div className="mb-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-1 flex-wrap items-center gap-3">
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className={selectClass}
                  aria-label="Filter by industry"
                >
                  {industries.map((i) => (
                    <option
                      key={i}
                      value={i}
                      className="bg-[hsl(240,5%,6%)]"
                    >
                      {i === "All" ? "All Industries" : i}
                    </option>
                  ))}
                </select>

                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className={selectClass}
                  aria-label="Filter by year"
                >
                  {years.map((y) => (
                    <option
                      key={y}
                      value={y}
                      className="bg-[hsl(240,5%,6%)]"
                    >
                      {y === "All" ? "All Years" : y}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={selectClass}
                  aria-label="Filter by status"
                >
                  {statuses.map((s) => (
                    <option
                      key={s}
                      value={s}
                      className="bg-[hsl(240,5%,6%)]"
                    >
                      {s === "All" ? "All Statuses" : s}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-xs text-white/30">
                {filteredProjects.length} project
                {filteredProjects.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </FadeIn>

        {filteredProjects.length === 0 ? (
          <FadeIn direction="up" delay={0.1}>
            <div className="py-16 text-center">
              <p className="text-sm text-white/40">
                No projects match the selected filters.
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="space-y-10">
            {sortedYears.map((year) => (
              <YearSection
                key={year}
                year={year}
                projects={projectsByYear[year]}
                expandedProject={expandedProject}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
