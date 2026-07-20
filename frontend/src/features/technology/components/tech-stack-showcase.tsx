"use client";

import { useState } from "react";
import {
  Layout,
  Server,
  Database,
  Cloud,
  Brain,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Tabs } from "@/components/ui/tabs";
import { FadeIn } from "@/components/ui/fade-in";
import { TechCategory } from "./tech-category";

type TechItem = {
  name: string;
  description: string;
  experience: "beginner" | "intermediate" | "advanced" | "expert";
  useCases: string[];
};

type TechCategoryData = {
  id: string;
  title: string;
  icon: LucideIcon;
  technologies: TechItem[];
};

const categories: TechCategoryData[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Layout,
    technologies: [
      { name: "React", description: "Building interactive UIs", experience: "expert", useCases: ["Web apps", "SPAs", "component libraries"] },
      { name: "Next.js", description: "Full-stack React framework", experience: "expert", useCases: ["SSR apps", "e-commerce", "marketing sites"] },
      { name: "TypeScript", description: "Type-safe JavaScript", experience: "expert", useCases: ["All projects", "large codebases"] },
      { name: "Tailwind CSS", description: "Utility-first CSS", experience: "advanced", useCases: ["Rapid prototyping", "design systems"] },
      { name: "Vue.js", description: "Progressive JavaScript framework", experience: "intermediate", useCases: ["SPAs", "admin dashboards"] },
      { name: "Angular", description: "Enterprise frontend framework", experience: "intermediate", useCases: ["Enterprise apps", "dashboards"] },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    technologies: [
      { name: "Python", description: "Versatile programming language", experience: "expert", useCases: ["AI/ML", "APIs", "data processing"] },
      { name: "FastAPI", description: "High-performance Python API", experience: "expert", useCases: ["REST APIs", "real-time apps"] },
      { name: "Node.js", description: "JavaScript runtime", experience: "advanced", useCases: ["APIs", "microservices", "real-time"] },
      { name: "NestJS", description: "Enterprise Node.js framework", experience: "advanced", useCases: ["Enterprise APIs", "microservices"] },
      { name: "Go", description: "Performance-focused language", experience: "intermediate", useCases: ["Microservices", "CLI tools"] },
      { name: "Rust", description: "Systems programming language", experience: "beginner", useCases: ["Performance-critical components"] },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    technologies: [
      { name: "PostgreSQL", description: "Advanced relational database", experience: "expert", useCases: ["Primary data store", "analytics"] },
      { name: "Redis", description: "In-memory data store", experience: "advanced", useCases: ["Caching", "sessions", "real-time"] },
      { name: "MongoDB", description: "Document database", experience: "advanced", useCases: ["Content management", "logs"] },
      { name: "Elasticsearch", description: "Search engine", experience: "intermediate", useCases: ["Full-text search", "analytics"] },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    icon: Cloud,
    technologies: [
      { name: "Docker", description: "Container platform", experience: "expert", useCases: ["Development", "deployment", "CI/CD"] },
      { name: "Kubernetes", description: "Container orchestration", experience: "advanced", useCases: ["Production deployments", "scaling"] },
      { name: "AWS", description: "Cloud computing", experience: "advanced", useCases: ["Cloud infrastructure", "serverless"] },
      { name: "Azure", description: "Microsoft cloud", experience: "intermediate", useCases: ["Enterprise cloud", "hybrid"] },
      { name: "GCP", description: "Google cloud", experience: "intermediate", useCases: ["AI/ML workloads", "data analytics"] },
      { name: "Nginx", description: "Web server/reverse proxy", experience: "advanced", useCases: ["Load balancing", "SSL"] },
    ],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    icon: Brain,
    technologies: [
      { name: "OpenAI", description: "GPT integration", experience: "expert", useCases: ["Chatbots", "content generation", "analysis"] },
      { name: "LangChain", description: "LLM orchestration", experience: "advanced", useCases: ["AI agents", "RAG systems"] },
      { name: "TensorFlow", description: "ML framework", experience: "intermediate", useCases: ["Computer vision", "deep learning"] },
      { name: "PyTorch", description: "Deep learning framework", experience: "intermediate", useCases: ["Research", "NLP"] },
      { name: "MLflow", description: "ML lifecycle management", experience: "beginner", useCases: ["Experiment tracking", "model registry"] },
      { name: "Hugging Face", description: "NLP models", experience: "intermediate", useCases: ["Text classification", "summarization"] },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Automation",
    icon: Settings,
    technologies: [
      { name: "GitHub Actions", description: "CI/CD automation", experience: "expert", useCases: ["Build", "test", "deploy pipelines"] },
      { name: "Terraform", description: "Infrastructure as code", experience: "advanced", useCases: ["Cloud provisioning", "environments"] },
      { name: "Celery", description: "Task queue", experience: "advanced", useCases: ["Background jobs", "async processing"] },
      { name: "RabbitMQ", description: "Message broker", experience: "intermediate", useCases: ["Service communication", "queuing"] },
      { name: "Kafka", description: "Event streaming", experience: "intermediate", useCases: ["Event-driven architecture", "data pipelines"] },
    ],
  },
];

export function TechStackShowcase() {
  const [activeTab, setActiveTab] = useState(categories[0].id);

  const tabItems = categories.map((cat) => ({
    id: cat.id,
    label: cat.title,
    icon: <cat.icon className="h-4 w-4" />,
  }));

  const activeCategory = categories.find((cat) => cat.id === activeTab);

  return (
    <Section id="tech-showcase" padding="lg">
      <Container>
        <FadeIn direction="up">
          <Tabs
            items={tabItems.map((tab) => ({
              ...tab,
              content: null,
            }))}
            variant="pills"
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-12"
          />
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          {activeCategory && (
            <TechCategory
              key={activeCategory.id}
              title={activeCategory.title}
              icon={activeCategory.icon}
              technologies={activeCategory.technologies}
            />
          )}
        </FadeIn>
      </Container>
    </Section>
  );
}
