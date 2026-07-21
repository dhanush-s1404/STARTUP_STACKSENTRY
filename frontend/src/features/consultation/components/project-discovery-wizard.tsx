"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Building2, FileCode, Target,
  Puzzle, Cpu, Calendar, DollarSign, FileText, CheckCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/cn";
import { MotionDiv } from "@/lib/motion";
import { api } from "@/services/api";
import { getRecommendations } from "./recommendation-engine";
import { ProjectSummary } from "./project-summary";
import { SuccessConfirmation } from "./success-confirmation";
import { BUDGET_RANGES } from "@/data/budget-ranges";
import type { WizardData } from "./types";
import {
  INITIAL_WIZARD_DATA, PROJECT_TYPES, BUSINESS_GOALS, DESIRED_FEATURES,
  TEAM_SIZES, TIMELINES, TECH_OPTIONS, INDUSTRIES, COUNTRIES,
} from "./types";

const steps = [
  { id: "business-info", label: "Business Info", icon: Building2 },
  { id: "project-type", label: "Project Type", icon: FileCode },
  { id: "goals", label: "Goals", icon: Target },
  { id: "features", label: "Features", icon: Puzzle },
  { id: "technology", label: "Technology", icon: Cpu },
  { id: "timeline", label: "Timeline", icon: Calendar },
  { id: "budget", label: "Budget", icon: DollarSign },
  { id: "requirements", label: "Requirements", icon: FileText },
];

export function ProjectDiscoveryWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(INITIAL_WIZARD_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const update = useCallback(<K extends keyof WizardData>(key: K, value: WizardData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleArray = useCallback((key: "businessGoals" | "desiredFeatures", value: string) => {
    setData((prev) => {
      const arr = prev[key];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter((v) => v !== value) };
      }
      return { ...prev, [key]: [...arr, value] };
    });
  }, []);

  const toggleTech = (category: keyof WizardData["preferredTechnologies"], value: string) => {
    setData((prev) => {
      const arr = prev.preferredTechnologies[category];
      if (arr.includes(value)) {
        return {
          ...prev,
          preferredTechnologies: {
            ...prev.preferredTechnologies,
            [category]: arr.filter((v) => v !== value),
          },
        };
      }
      return {
        ...prev,
        preferredTechnologies: {
          ...prev.preferredTechnologies,
          [category]: [...arr, value],
        },
      };
    });
  };

  const canProceed = useCallback(() => {
    if (step === 0) return data.company.trim().length > 0 && data.contactName.trim().length > 0 && data.contactEmail.trim().length > 0;
    if (step === 1) return data.projectType.length > 0;
    if (step === 2) return data.businessGoals.length > 0;
    return true;
  }, [step, data]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await api.post("/consultation/project-discovery", {
        company: data.company,
        industry: data.industry,
        team_size: data.teamSize,
        country: data.country,
        website: data.website,
        project_type: data.projectType,
        business_goals: data.businessGoals,
        desired_features: data.desiredFeatures,
        preferred_technologies: data.preferredTechnologies,
        project_timeline: data.timeline,
        budget_range: data.budgetRange,
        additional_requirements: data.additionalRequirements,
        contact_name: data.contactName,
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone,
      });
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitError) {
    return (
      <Section padding="lg">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white">Submission Failed</h2>
            <p className="mt-4 text-white/60">Something went wrong. Please try again or contact us directly.</p>
            <button onClick={() => { setSubmitError(false); }} className="mt-6 rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600">
              Try Again
            </button>
          </div>
        </Container>
      </Section>
    );
  }

  if (submitted) {
    return <SuccessConfirmation type="project" />;
  }

  if (showSummary) {
    const recommendations = getRecommendations(data);
    return (
      <ProjectSummary
        data={data}
        recommendations={recommendations}
        onBack={() => setShowSummary(false)}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <Section padding="lg">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Progress */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-white/50">
                Step {step + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-blue-400">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            {/* Step indicators */}
            <div className="mt-4 flex gap-1">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => i < step && setStep(i)}
                  className={cn(
                    "flex h-8 flex-1 items-center justify-center rounded-md text-[10px] font-medium transition-all",
                    i === step && "bg-blue-500/20 text-blue-300",
                    i < step && "cursor-pointer bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25",
                    i > step && "bg-white/5 text-white/30",
                  )}
                >
                  <s.icon className="mr-1 h-3 w-3" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <MotionDiv
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card glass className="p-8 sm:p-10">
                {step === 0 && <StepBusinessInfo data={data} update={update} />}
                {step === 1 && <StepProjectType data={data} update={update} />}
                {step === 2 && <StepGoals data={data} toggleArray={toggleArray} />}
                {step === 3 && <StepFeatures data={data} toggleArray={toggleArray} />}
                {step === 4 && <StepTechnology data={data} toggleTech={toggleTech} />}
                {step === 5 && <StepTimeline data={data} update={update} />}
                {step === 6 && <StepBudget data={data} update={update} />}
                {step === 7 && <StepRequirements data={data} update={update} />}
              </Card>
            </MotionDiv>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => step === 0 ? window.history.back() : setStep(step - 1)}
              disabled={step === 0 && submitting}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {step === 0 ? "Back" : "Previous"}
            </Button>
            <div className="flex gap-3">
              {step === steps.length - 1 ? (
                <>
                  <Button variant="secondary" onClick={() => setShowSummary(true)}>
                    Review Summary
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// Step 1
function StepBusinessInfo({ data, update }: { data: WizardData; update: (k: keyof WizardData, v: any) => void }) {
  return (
    <div>
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
        <Building2 className="h-6 w-6 text-blue-400" />
      </div>
      <Heading level="h2" description="Tell us about your organization so we can tailor our recommendations.">
        Business Information
      </Heading>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <InputField label="Company Name *" value={data.company} onChange={(v) => update("company", v)} placeholder="Acme Corp" />
        <SelectField label="Industry" value={data.industry} onChange={(v) => update("industry", v)} options={INDUSTRIES} placeholder="Select industry" />
        <SelectField label="Team Size" value={data.teamSize} onChange={(v) => update("teamSize", v)} options={TEAM_SIZES} placeholder="Select size" />
        <SelectField label="Country" value={data.country} onChange={(v) => update("country", v)} options={COUNTRIES} placeholder="Select country" />
        <div className="sm:col-span-2">
          <InputField label="Website" value={data.website} onChange={(v) => update("website", v)} placeholder="https://example.com" />
        </div>
        <InputField label="Your Name *" value={data.contactName} onChange={(v) => update("contactName", v)} placeholder="John Doe" />
        <InputField label="Email Address *" value={data.contactEmail} onChange={(v) => update("contactEmail", v)} placeholder="john@acme.com" type="email" />
        <InputField label="Phone Number" value={data.contactPhone} onChange={(v) => update("contactPhone", v)} placeholder="+1 555-0123" />
      </div>
    </div>
  );
}

// Step 2
function StepProjectType({ data, update }: { data: WizardData; update: (k: keyof WizardData, v: any) => void }) {
  return (
    <div>
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
        <FileCode className="h-6 w-6 text-purple-400" />
      </div>
      <Heading level="h2" description="What type of software project are you planning?">
        Project Type
      </Heading>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {PROJECT_TYPES.map((pt) => (
          <button
            key={pt.value}
            onClick={() => update("projectType", pt.value)}
            className={cn(
              "rounded-xl border p-4 text-left transition-all",
              data.projectType === pt.value
                ? "border-blue-500/40 bg-blue-500/10 text-blue-300 shadow-lg shadow-blue-500/5"
                : "border-white/[0.06] bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/5 hover:text-white/80",
            )}
          >
            <span className="text-sm font-medium">{pt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 3
function StepGoals({ data, toggleArray }: { data: WizardData; toggleArray: (k: "businessGoals" | "desiredFeatures", v: string) => void }) {
  return (
    <div>
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
        <Target className="h-6 w-6 text-emerald-400" />
      </div>
      <Heading level="h2" description="Select the primary business goals for your project. (Multiple selection supported)">
        Business Goals
      </Heading>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {BUSINESS_GOALS.map((g) => (
          <button
            key={g.id}
            onClick={() => toggleArray("businessGoals", g.id)}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
              data.businessGoals.includes(g.id)
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-white/[0.06] bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/5 hover:text-white/80",
            )}
          >
            <div className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all",
              data.businessGoals.includes(g.id)
                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
                : "border-white/20 text-transparent",
            )}>
              {data.businessGoals.includes(g.id) && <CheckCircle className="h-4 w-4" />}
            </div>
            <span className="text-sm font-medium">{g.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 4
function StepFeatures({ data, toggleArray }: { data: WizardData; toggleArray: (k: "businessGoals" | "desiredFeatures", v: string) => void }) {
  return (
    <div>
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
        <Puzzle className="h-6 w-6 text-amber-400" />
      </div>
      <Heading level="h2" description="Select the features you'd like in your project. (Multiple selection supported)">
        Desired Features
      </Heading>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {DESIRED_FEATURES.map((f) => (
          <button
            key={f.id}
            onClick={() => toggleArray("desiredFeatures", f.id)}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
              data.desiredFeatures.includes(f.id)
                ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                : "border-white/[0.06] bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/5 hover:text-white/80",
            )}
          >
            <div className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all",
              data.desiredFeatures.includes(f.id)
                ? "border-amber-500/50 bg-amber-500/20 text-amber-400"
                : "border-white/20 text-transparent",
            )}>
              {data.desiredFeatures.includes(f.id) && <CheckCircle className="h-4 w-4" />}
            </div>
            <span className="text-sm font-medium">{f.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 5
function StepTechnology({ data, toggleTech }: { data: WizardData; toggleTech: (c: keyof WizardData["preferredTechnologies"], v: string) => void }) {
  return (
    <div>
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
        <Cpu className="h-6 w-6 text-cyan-400" />
      </div>
      <Heading level="h2" description="Select your preferred technologies (optional). Skip if you don't have a preference.">
        Preferred Technologies
      </Heading>
      <div className="mt-8 space-y-8">
        {(Object.entries(TECH_OPTIONS) as [keyof WizardData["preferredTechnologies"], { id: string; label: string }[]][]).map(([category, options]) => (
          <div key={category}>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-white/40">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleTech(category, opt.id)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm transition-all",
                    data.preferredTechnologies[category].includes(opt.id)
                      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                      : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/70",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Step 6
function StepTimeline({ data, update }: { data: WizardData; update: (k: keyof WizardData, v: any) => void }) {
  return (
    <div>
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
        <Calendar className="h-6 w-6 text-blue-400" />
      </div>
      <Heading level="h2" description="What is your expected project timeline?">
        Project Timeline
      </Heading>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {TIMELINES.map((t) => (
          <button
            key={t.value}
            onClick={() => update("timeline", t.value)}
            className={cn(
              "rounded-xl border p-5 text-center transition-all",
              data.timeline === t.value
                ? "border-blue-500/40 bg-blue-500/10 text-blue-300 shadow-lg shadow-blue-500/5"
                : "border-white/[0.06] bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/5 hover:text-white/80",
            )}
          >
            <span className="text-base font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 7
function StepBudget({ data, update }: { data: WizardData; update: (k: keyof WizardData, v: any) => void }) {
  return (
    <div>
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
        <DollarSign className="h-6 w-6 text-emerald-400" />
      </div>
      <Heading level="h2" description="Select an estimated budget range for guidance purposes only.">
        Estimated Budget Range
      </Heading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {BUDGET_RANGES.map((r) => (
          <button
            key={r.id}
            onClick={() => update("budgetRange", r.id)}
            className={cn(
              "rounded-xl border p-5 text-left transition-all",
              data.budgetRange === r.id
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 shadow-lg shadow-emerald-500/5"
                : "border-white/[0.06] bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/5 hover:text-white/80",
            )}
          >
            <span className="text-base font-medium">{r.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-white/30">
        This is a guidance range only. Final pricing depends on detailed requirements.
      </p>
    </div>
  );
}

// Step 8
function StepRequirements({ data, update }: { data: WizardData; update: (k: keyof WizardData, v: any) => void }) {
  return (
    <div>
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
        <FileText className="h-6 w-6 text-purple-400" />
      </div>
      <Heading level="h2" description="Share any additional details, special requirements, or context about your project.">
        Additional Requirements
      </Heading>
      <div className="mt-8">
        <textarea
          value={data.additionalRequirements}
          onChange={(e) => update("additionalRequirements", e.target.value)}
          placeholder="Describe your project in more detail — specific features, integration needs, target users, challenges you're facing, or anything else we should know..."
          className="min-h-[200px] w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
          maxLength={5000}
        />
        <div className="mt-2 flex justify-end">
          <span className="text-xs text-white/30">
            {data.additionalRequirements.length} / 5000 characters
          </span>
        </div>
        <p className="mt-4 text-xs text-white/30">
          Your draft is automatically saved as you type.
        </p>
      </div>
    </div>
  );
}

// Shared input components
function InputField({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/60">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/60">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
      >
        <option value="" className="bg-[hsl(230,63%,5%)]">{placeholder || "Select..."}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[hsl(230,63%,5%)]">{o.label}</option>
        ))}
      </select>
    </div>
  );
}
