"use client";

import {
  Building2, Target, FileText, CheckCircle, ArrowLeft, Send, Lightbulb, Server,
  Cloud, Share2, Route,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { getBudgetRangeById } from "@/data/budget-ranges";
import { PROJECT_TYPES, BUSINESS_GOALS, DESIRED_FEATURES, TIMELINES } from "./types";
import type { WizardData } from "./types";

type Props = {
  data: WizardData;
  recommendations: {
    architecture: string;
    technologies: { category: string; items: string[] }[];
    deployment: string;
    services: string[];
    integrations: string[];
  };
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
};

export function ProjectSummary({ data, recommendations, onBack, onSubmit, submitting }: Props) {
  const budget = getBudgetRangeById(data.budgetRange);
  const projectLabel = PROJECT_TYPES.find((p) => p.value === data.projectType)?.label || data.projectType;
  const timelineLabel = TIMELINES.find((t) => t.value === data.timeline)?.label || data.timeline;

  const goalLabels = data.businessGoals.map((g) => BUSINESS_GOALS.find((bg) => bg.id === g)?.label || g);
  const featureLabels = data.desiredFeatures.map((f) => DESIRED_FEATURES.find((df) => df.id === f)?.label || f);

  return (
    <Section padding="lg">
      <Container>
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                <FileText className="h-7 w-7 text-blue-400" />
              </div>
              <Heading
                level="h2"
                description="Review your project details and recommendations before submitting."
              >
                Project Summary
              </Heading>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {/* Business Info */}
            <Card glass className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Business Information</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem label="Company" value={data.company} />
                <DetailItem label="Industry" value={data.industry} />
                <DetailItem label="Team Size" value={data.teamSize} />
                <DetailItem label="Country" value={data.country} />
                {data.website && <DetailItem label="Website" value={data.website} />}
                <DetailItem label="Contact" value={`${data.contactName} (${data.contactEmail})`} />
              </div>
            </Card>

            {/* Project Details */}
            <Card glass className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Project Details</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem label="Project Type" value={projectLabel} />
                <DetailItem label="Timeline" value={timelineLabel} />
                <DetailItem label="Budget Range" value={budget?.label || data.budgetRange} />
              </div>
              <div className="mt-4">
                <p className="mb-2 text-sm text-white/50">Business Goals</p>
                <div className="flex flex-wrap gap-2">
                  {goalLabels.map((g) => (
                    <Badge key={g} variant="green" size="sm">{g}</Badge>
                  ))}
                </div>
              </div>
              {featureLabels.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-sm text-white/50">Desired Features</p>
                  <div className="flex flex-wrap gap-2">
                    {featureLabels.map((f) => (
                      <Badge key={f} variant="blue" size="sm">{f}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Recommendations */}
            <Card glass className="border-l-4 border-l-blue-500/30 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Recommendations (Guidance Only)</h3>
              </div>

              <div className="mb-4">
                <div className="mb-1 flex items-center gap-2">
                  <Route className="h-4 w-4 text-cyan-400" />
                  <p className="text-sm font-medium text-white/70">Suggested Architecture</p>
                </div>
                <p className="text-sm text-white/50">{recommendations.architecture}</p>
              </div>

              <div className="mb-4">
                <div className="mb-1 flex items-center gap-2">
                  <Server className="h-4 w-4 text-purple-400" />
                  <p className="text-sm font-medium text-white/70">Recommended Technologies</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {recommendations.technologies.map((t) => (
                    <div key={t.category}>
                      <p className="mb-1 text-xs text-white/40">{t.category}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {t.items.map((tech) => (
                          <Badge key={tech} variant="default" size="sm">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-1 flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-blue-400" />
                  <p className="text-sm font-medium text-white/70">Deployment</p>
                </div>
                <p className="text-sm text-white/50">{recommendations.deployment}</p>
              </div>

              {recommendations.services.length > 0 && (
                <div className="mb-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-emerald-400" />
                    <p className="text-sm font-medium text-white/70">Suggested Services</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendations.services.map((s) => (
                      <Badge key={s} variant="cyan" size="sm">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {recommendations.integrations.length > 0 && (
                <div>
                  <p className="mb-1 text-sm font-medium text-white/70">Potential Integrations</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendations.integrations.map((i) => (
                      <Badge key={i} variant="purple" size="sm">{i}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-4 border-t border-white/[0.06] pt-4 text-xs text-white/30">
                These are AI-generated recommendations based on your selections and are for guidance only.
                Final architecture, technology, and pricing decisions will be made during the consultation.
              </p>
            </Card>

            {/* Preparation Checklist */}
            <Card glass className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Preparation Checklist</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  Define key stakeholders and decision-makers for the project
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  Gather existing system documentation and architecture diagrams
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  Identify integration points with current software ecosystem
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  Prepare any relevant data samples or API documentation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  Define success criteria and key performance indicators
                </li>
              </ul>
            </Card>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="ghost" onClick={onBack} disabled={submitting}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Edit Details
            </Button>
            <Button variant="primary" onClick={onSubmit} disabled={submitting}>
              {submitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Project Inquiry
                </>
              )}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-white/40">{label}</p>
      <p className="text-sm font-medium text-white/80">{value}</p>
    </div>
  );
}
