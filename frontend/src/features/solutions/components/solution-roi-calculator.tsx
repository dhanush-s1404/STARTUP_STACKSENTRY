"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { cn } from "@/lib/cn";
import {
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
  Rocket,
  Download,
  ChevronDown,
  Check,
} from "lucide-react";

type CompanySize = "small" | "medium" | "enterprise";

type PainPoint =
  | "Manual Processes"
  | "Data Silos"
  | "Compliance"
  | "Scalability"
  | "Security"
  | "Integration";

const industryOptions = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Logistics",
  "Other",
];

const painPointOptions: PainPoint[] = [
  "Manual Processes",
  "Data Silos",
  "Compliance",
  "Scalability",
  "Security",
  "Integration",
];

const suggestedSolutionsBySize: Record<CompanySize, string[]> = {
  small: ["Workflow Automation", "Cloud Migration", "Security Audit"],
  medium: ["Enterprise Integration", "Data Analytics Platform", "DevOps Pipeline"],
  enterprise: ["Full Digital Transformation", "AI/ML Platform", "Enterprise Architecture"],
};

export function SolutionROICalculator() {
  const [companySize, setCompanySize] = useState<CompanySize>("medium");
  const [employees, setEmployees] = useState<number>(100);
  const [industry, setIndustry] = useState("Technology");
  const [currentSoftware, setCurrentSoftware] = useState("");
  const [selectedPainPoints, setSelectedPainPoints] = useState<PainPoint[]>([
    "Manual Processes",
  ]);
  const [monthlyWorkload, setMonthlyWorkload] = useState<number>(200);
  const [automationOpportunity, setAutomationOpportunity] = useState<number>(60);

  const togglePainPoint = (point: PainPoint) => {
    setSelectedPainPoints((prev) =>
      prev.includes(point)
        ? prev.filter((p) => p !== point)
        : [...prev, point]
    );
  };

  const results = useMemo(() => {
    const hourlyRate = 50;
    const timeSaved = Math.round(
      monthlyWorkload * (automationOpportunity / 100) * 0.8
    );
    const costReduction = timeSaved * hourlyRate;
    const productivityIncrease = Math.round(automationOpportunity * 0.7);
    const suggestedSolutions = suggestedSolutionsBySize[companySize];
    const implementationTimeline =
      companySize === "small"
        ? "3-6 months"
        : companySize === "medium"
        ? "6-12 months"
        : "12-18 months";

    return {
      timeSaved,
      costReduction,
      productivityIncrease,
      suggestedSolutions,
      implementationTimeline,
    };
  }, [companySize, monthlyWorkload, automationOpportunity]);

  return (
    <Section padding="lg" background="gradient">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            description="Estimate the return on investment for your digital transformation"
            className="mb-16"
          >
            ROI Calculator
          </Heading>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <FadeIn direction="left">
            <Card padding="lg" glow="blue">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
                <Calculator className="h-5 w-5 text-blue-400" />
                Your Parameters
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Company Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["small", "medium", "enterprise"] as CompanySize[]).map(
                      (size) => (
                        <button
                          key={size}
                          onClick={() => setCompanySize(size)}
                          className={cn(
                            "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            companySize === size
                              ? "border-blue-500/30 bg-blue-500/20 text-blue-400"
                              : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                          )}
                        >
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Number of Employees:{" "}
                    <span className="text-white">{employees}</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={5000}
                    step={10}
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="mt-1 flex justify-between text-xs text-white/30">
                    <span>10</span>
                    <span>5,000</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Industry
                  </label>
                  <div className="relative">
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    >
                      {industryOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-black text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Current Software / Tools
                  </label>
                  <input
                    type="text"
                    value={currentSoftware}
                    onChange={(e) => setCurrentSoftware(e.target.value)}
                    placeholder="e.g., Excel, Salesforce, custom CRM..."
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Pain Points
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {painPointOptions.map((point) => (
                      <button
                        key={point}
                        onClick={() => togglePainPoint(point)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                          selectedPainPoints.includes(point)
                            ? "border-blue-500/30 bg-blue-500/20 text-blue-400"
                            : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
                        )}
                      >
                        {selectedPainPoints.includes(point) && (
                          <Check className="h-3 w-3" />
                        )}
                        {point}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Monthly Workload (hours):{" "}
                    <span className="text-white">{monthlyWorkload}</span>
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={2000}
                    step={10}
                    value={monthlyWorkload}
                    onChange={(e) => setMonthlyWorkload(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="mt-1 flex justify-between text-xs text-white/30">
                    <span>20h</span>
                    <span>2,000h</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Automation Opportunity:{" "}
                    <span className="text-white">{automationOpportunity}%</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={automationOpportunity}
                    onChange={(e) =>
                      setAutomationOpportunity(Number(e.target.value))
                    }
                    className="w-full accent-blue-500"
                  />
                  <div className="mt-1 flex justify-between text-xs text-white/30">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>

          <FadeIn direction="right">
            <Card padding="lg" glow="blue" className="h-full">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Estimated Results
              </h3>

              <Stagger staggerChildren={0.1}>
                <div className="mb-8 grid grid-cols-2 gap-4">
                  <StaggerItem>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
                      <Clock className="mx-auto mb-2 h-5 w-5 text-blue-400" />
                      <div className="text-2xl font-bold text-white">
                        <CountUp to={results.timeSaved} suffix="h" />
                      </div>
                      <p className="mt-1 text-xs text-white/40">
                        Hours saved / month
                      </p>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
                      <DollarSign className="mx-auto mb-2 h-5 w-5 text-emerald-400" />
                      <div className="text-2xl font-bold text-white">
                        <CountUp
                          to={results.costReduction}
                          prefix="$"
                        />
                      </div>
                      <p className="mt-1 text-xs text-white/40">
                        Cost reduction / month
                      </p>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
                      <TrendingUp className="mx-auto mb-2 h-5 w-5 text-purple-400" />
                      <div className="text-2xl font-bold text-white">
                        <CountUp
                          to={results.productivityIncrease}
                          suffix="%"
                        />
                      </div>
                      <p className="mt-1 text-xs text-white/40">
                        Productivity increase
                      </p>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
                      <Rocket className="mx-auto mb-2 h-5 w-5 text-amber-400" />
                      <div className="text-sm font-bold text-white">
                        {results.implementationTimeline}
                      </div>
                      <p className="mt-1 text-xs text-white/40">
                        Implementation timeline
                      </p>
                    </div>
                  </StaggerItem>
                </div>
              </Stagger>

              <FadeIn direction="up" delay={0.3}>
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-medium text-white/70">
                    Suggested Solutions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.suggestedSolutions.map((solution) => (
                      <Badge key={solution} variant="blue" size="md">
                        {solution}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Estimated Annual Savings
                      </p>
                      <p className="text-2xl font-bold text-emerald-400">
                        <CountUp
                          to={results.costReduction * 12}
                          prefix="$"
                          duration={2.5}
                        />
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        Based on {employees} employees and{" "}
                        {automationOpportunity}% automation opportunity
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.4}>
                <div className="mt-6 flex gap-3">
                  <Button variant="primary" className="flex-1">
                    Request Custom Quote
                  </Button>
                  <Button
                    variant="outline"
                    icon={<Download className="h-4 w-4" />}
                  >
                    Export PDF
                  </Button>
                </div>
              </FadeIn>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
