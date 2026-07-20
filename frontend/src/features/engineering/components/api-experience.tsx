"use client";

import {
  Layers,
  GitBranch,
  ShieldCheck,
  ListChecks,
  AlertTriangle,
  Key,
  Gauge,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";

const API_PRINCIPLES = [
  {
    icon: Layers,
    title: "RESTful Design",
    description: "Resource-oriented URLs with proper HTTP semantics for intuitive, consistent APIs.",
    example: "GET /api/v2/users/{id}",
  },
  {
    icon: GitBranch,
    title: "Versioning",
    description: "URL-based versioning for backward-compatible evolution without breaking consumers.",
    example: "/api/v1/ vs /api/v2/",
  },
  {
    icon: ShieldCheck,
    title: "Validation",
    description: "Strict request validation with Pydantic schemas ensuring type safety and data integrity.",
    example: "Pydantic models with constraints",
  },
  {
    icon: ListChecks,
    title: "Pagination",
    description: "Cursor-based pagination for efficient traversal of large datasets.",
    example: "cursor=abc123&limit=20",
  },
  {
    icon: AlertTriangle,
    title: "Error Handling",
    description: "Consistent error responses with error codes, messages, and suggested actions.",
    example: "{ error: { code, message, field } }",
  },
  {
    icon: Key,
    title: "Authentication",
    description: "JWT-based authentication with token refresh and scope-based authorization.",
    example: "Authorization: Bearer {token}",
  },
  {
    icon: Gauge,
    title: "Rate Limiting",
    description: "Tiered rate limiting with token bucket algorithm to protect service stability.",
    example: "X-RateLimit-Remaining: 99",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Auto-generated OpenAPI/Swagger documentation kept in sync with implementation.",
    example: "GET /docs/openapi.json",
  },
];

const API_LAYERS = [
  { label: "Client", color: "bg-blue-500" },
  { label: "API Gateway", color: "bg-purple-500" },
  { label: "Auth Middleware", color: "bg-cyan-500" },
  { label: "Validation", color: "bg-green-500" },
  { label: "Controllers", color: "bg-amber-500" },
  { label: "Services", color: "bg-rose-500" },
  { label: "Data Access", color: "bg-indigo-500" },
  { label: "Database", color: "bg-emerald-500" },
];

export function ApiExperience() {
  return (
    <Section id="api" padding="lg" background="gradient">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            gradient
            description="Our API design principles ensure consistency, reliability, and developer-friendly interfaces."
            className="mb-12"
          >
            API Design &amp; Experience
          </Heading>
        </FadeIn>

        <Stagger staggerChildren={0.08} className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {API_PRINCIPLES.map((principle) => (
            <StaggerItem key={principle.title}>
              <Card glass hover glow="purple" padding="md" className="h-full">
                <principle.icon className="h-6 w-6 text-purple-400" />
                <h3 className="mt-3 font-semibold text-white">{principle.title}</h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{principle.description}</p>
                <code className="mt-3 block rounded-lg bg-white/5 px-3 py-2 text-xs text-cyan-400">
                  {principle.example}
                </code>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn direction="up" delay={0.2}>
          <Heading level="h3" className="mb-8">
            API Request Flow
          </Heading>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <div className="mx-auto max-w-2xl overflow-x-auto pb-4">
            <div className="flex items-center gap-1 min-w-max">
              {API_LAYERS.map((layer, index) => (
                <div key={layer.label} className="flex items-center gap-1">
                  <MotionDiv whileHover={{ scale: 1.05 }} className="shrink-0">
                    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      <div className={`h-2 w-2 rounded-full ${layer.color}`} />
                      <span className="text-xs font-medium text-white/70 whitespace-nowrap">{layer.label}</span>
                    </div>
                  </MotionDiv>
                  {index < API_LAYERS.length - 1 && (
                    <ArrowRight className="h-3 w-3 shrink-0 text-white/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
