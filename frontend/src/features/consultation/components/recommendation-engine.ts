import type { WizardData } from "./types";

export type Recommendation = {
  category: string;
  items: string[];
};

const PROJECT_TYPE_MAP: Record<string, { frontend: string[]; backend: string[]; database: string[]; cloud: string[]; ai: string[] }> = {
  "web-application": {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Python", "FastAPI"],
    database: ["PostgreSQL", "Redis"],
    cloud: ["AWS", "Vercel"],
    ai: [],
  },
  "mobile-app": {
    frontend: ["React Native", "Flutter"],
    backend: ["Node.js", "Python", "FastAPI"],
    database: ["PostgreSQL", "MongoDB"],
    cloud: ["AWS", "Google Cloud"],
    ai: [],
  },
  "ai-solution": {
    frontend: ["React", "Next.js", "TypeScript"],
    backend: ["Python", "FastAPI", "LangChain"],
    database: ["PostgreSQL", "Elasticsearch", "Redis"],
    cloud: ["AWS", "GCP"],
    ai: ["OpenAI", "TensorFlow", "PyTorch", "Hugging Face"],
  },
  "enterprise-software": {
    frontend: ["React", "TypeScript", "Tailwind CSS"],
    backend: ["Java", "Python", "NestJS"],
    database: ["PostgreSQL", "Redis", "Elasticsearch"],
    cloud: ["AWS", "Azure"],
    ai: [],
  },
  automation: {
    frontend: ["React", "Next.js"],
    backend: ["Python", "Node.js", "FastAPI"],
    database: ["PostgreSQL", "Redis"],
    cloud: ["AWS", "GCP"],
    ai: ["OpenAI", "TensorFlow"],
  },
  "cloud-migration": {
    frontend: ["React", "TypeScript"],
    backend: ["Node.js", "Python", "Go"],
    database: ["PostgreSQL", "MongoDB"],
    cloud: ["AWS", "Azure", "GCP"],
    ai: [],
  },
  "api-development": {
    frontend: [],
    backend: ["Node.js", "Python", "FastAPI", "Go"],
    database: ["PostgreSQL", "Redis"],
    cloud: ["AWS", "Vercel"],
    ai: [],
  },
  "custom-software": {
    frontend: ["React", "Next.js", "TypeScript"],
    backend: ["Python", "Node.js", "Java"],
    database: ["PostgreSQL", "MongoDB", "Redis"],
    cloud: ["AWS", "Azure"],
    ai: [],
  },
  other: {
    frontend: ["React", "Next.js"],
    backend: ["Python", "Node.js"],
    database: ["PostgreSQL"],
    cloud: ["AWS"],
    ai: [],
  },
};

const ARCH_MAP: Record<string, string> = {
  "web-application": "Modern SPA with API Gateway + Microservices",
  "mobile-app": "Mobile Client + RESTful API + Cloud Backend",
  "ai-solution": "Data Pipeline + ML Model Serving + API Layer",
  "enterprise-software": "Modular Monolith / Microservices + Event-Driven",
  automation: "Workflow Engine + Event Bus + Connector Layer",
  "cloud-migration": "Lift-and-Shift / Re-architecture + Cloud-Native",
  "api-development": "API Gateway + Service Mesh + Event-Driven",
  "custom-software": "Tiered Architecture + Domain-Driven Design",
  other: "Flexible Architecture Scoped to Requirements",
};

const DEPLOYMENT_MAP: Record<string, string> = {
  asap: "Cloud SaaS (Fastest deployment)",
  "1-3-months": "Cloud SaaS or Hybrid",
  "3-6-months": "Cloud SaaS, Hybrid, or On-Premise",
  "6-12-months": "Any model supported",
  flexible: "Flexible — scoped during planning",
};

export function getRecommendations(data: WizardData): {
  architecture: string;
  technologies: { category: string; items: string[] }[];
  deployment: string;
  services: string[];
  integrations: string[];
} {
  const type = data.projectType || "custom-software";
  const tech = PROJECT_TYPE_MAP[type] || PROJECT_TYPE_MAP["custom-software"];

  const technologies: { category: string; items: string[] }[] = [];
  if (tech.frontend.length > 0) technologies.push({ category: "Frontend", items: tech.frontend });
  if (tech.backend.length > 0) technologies.push({ category: "Backend", items: tech.backend });
  if (tech.database.length > 0) technologies.push({ category: "Database", items: tech.database });
  if (tech.cloud.length > 0) technologies.push({ category: "Cloud", items: tech.cloud });
  if (tech.ai.length > 0) technologies.push({ category: "AI/ML", items: tech.ai });

  const services: string[] = [];
  if (data.desiredFeatures.includes("authentication") || data.desiredFeatures.includes("admin-panel")) {
    services.push("User Management & Auth");
  }
  if (data.desiredFeatures.includes("payments")) {
    services.push("Payment Processing");
  }
  if (data.desiredFeatures.includes("notifications")) {
    services.push("Notification Service");
  }
  if (data.desiredFeatures.includes("analytics") || data.desiredFeatures.includes("reporting")) {
    services.push("Analytics & Reporting");
  }
  if (data.desiredFeatures.includes("ai-features")) {
    services.push("AI/ML Pipeline");
  }
  if (data.desiredFeatures.includes("integrations")) {
    services.push("Integration Gateway");
  }
  if (data.desiredFeatures.includes("file-uploads")) {
    services.push("File Storage & Management");
  }
  if (data.desiredFeatures.includes("search")) {
    services.push("Search Service");
  }

  const integrations: string[] = [];
  if (data.desiredFeatures.includes("payments")) {
    integrations.push("Stripe / PayPal / Payment Gateway");
  }
  if (data.desiredFeatures.includes("authentication")) {
    integrations.push("Auth0 / Clerk / Social Login");
  }
  if (data.desiredFeatures.includes("notifications")) {
    integrations.push("SendGrid / Twilio / Push Notifications");
  }
  if (data.desiredFeatures.includes("analytics")) {
    integrations.push("Mixpanel / Google Analytics / Segment");
  }
  if (tech.cloud.includes("AWS")) integrations.push("AWS S3 / Lambda / CloudFront");
  if (tech.cloud.includes("Azure")) integrations.push("Azure Blob / Functions / CDN");
  if (tech.cloud.includes("GCP")) integrations.push("GCP Cloud Storage / Cloud Functions");

  return {
    architecture: ARCH_MAP[type] || ARCH_MAP["custom-software"],
    technologies,
    deployment: DEPLOYMENT_MAP[data.timeline] || DEPLOYMENT_MAP["flexible"],
    services,
    integrations,
  };
}
