export type FAQCategory = "process" | "pricing" | "timeline" | "technology" | "general";

export type FAQItem = {
  slug: string;
  question: string;
  answer: string;
  category: FAQCategory;
  tags: string[];
  order: number;
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    slug: "typical-project-duration",
    question: "How long does a typical software project take?",
    answer:
      "Project timelines vary based on scope and complexity, but most custom software projects at StackSentry range from 8 to 24 weeks. A focused MVP or single-module application can be delivered in as little as 6–8 weeks, while a full-scale enterprise platform with multiple integrations typically takes 16–24 weeks. During our initial discovery phase, we provide a detailed timeline estimate with milestone breakdowns so you have full visibility from day one.",
    category: "process",
    tags: ["duration", "timeline", "how long", "schedule", "weeks"],
    order: 1,
  },
  {
    slug: "requirements-gathering",
    question: "How are requirements gathered?",
    answer:
      "We begin every engagement with a structured discovery phase that includes stakeholder interviews, process mapping workshops, and competitive analysis. Our business analysts work closely with your team to translate business objectives into detailed technical specifications, user stories, and acceptance criteria. We also conduct technical audits of any existing systems to understand integration points and constraints before writing a single line of code.",
    category: "process",
    tags: ["requirements", "discovery", "specifications", "planning", "analysis"],
    order: 2,
  },
  {
    slug: "development-process",
    question: "What does the development process look like?",
    answer:
      "We follow an agile development methodology with two-week sprints, continuous integration, and regular stakeholder demos. Each sprint produces working, testable software that moves the project closer to launch. Our pipeline includes automated testing, code reviews, and CI/CD deployments to staging environments, giving you real-time progress visibility. This iterative approach allows us to adapt to changing requirements while maintaining quality and schedule discipline.",
    category: "process",
    tags: ["process", "agile", "methodology", "sprints", "workflow"],
    order: 3,
  },
  {
    slug: "project-communication",
    question: "How does project communication work?",
    answer:
      "Every client engagement includes a dedicated project manager as your single point of contact, along with access to a shared project dashboard showing real-time progress, sprint velocity, and blockers. We hold weekly status calls, provide bi-weekly sprint demos, and maintain an always-open Slack or Teams channel for day-to-day communication. Escalation paths are defined upfront so critical decisions never stall waiting for responses.",
    category: "process",
    tags: ["communication", "updates", "meetings", "project manager", "status"],
    order: 4,
  },
  {
    slug: "handling-scope-changes",
    question: "How do you handle project changes or scope creep?",
    answer:
      "We embrace controlled change through a formal change request process. When new requirements emerge, we evaluate the impact on timeline, budget, and architecture, then present you with clear options before proceeding. Changes that align with project goals are incorporated into upcoming sprints, while lower-priority items are captured in a backlog for future phases. This keeps the project focused without stifling adaptability.",
    category: "process",
    tags: ["scope creep", "changes", "change request", "flexibility", "requirements"],
    order: 5,
  },
  {
    slug: "pricing-determination",
    question: "How is pricing determined?",
    answer:
      "Pricing is based on a thorough assessment of project scope, technical complexity, integration requirements, and desired timeline. After our discovery phase, we provide a detailed proposal with itemized cost breakdowns so you understand exactly where your investment goes. We offer both fixed-price engagements for well-defined projects and time-and-materials contracts for evolving scopes, ensuring the pricing model aligns with your risk tolerance and flexibility needs.",
    category: "pricing",
    tags: ["pricing", "cost", "budget", "quote", "estimate"],
    order: 6,
  },
  {
    slug: "cost-factors",
    question: "What factors affect the cost?",
    answer:
      "The primary cost drivers are the number and complexity of features, the number of third-party integrations required, UI/UX design complexity, and compliance requirements (such as HIPAA, SOC 2, or PCI DSS). Data migration from legacy systems and advanced capabilities like AI/ML features also impact pricing. We work with you to prioritize features using a value-vs-effort framework so we can maximize impact within your budget.",
    category: "pricing",
    tags: ["cost factors", "budget", "influencers", "complexity", "integrations"],
    order: 7,
  },
  {
    slug: "fixed-price-vs-time-and-materials",
    question: "Do you offer fixed-price or time-and-materials?",
    answer:
      "We offer both models depending on your project's needs. Fixed-price contracts work best when requirements are well-defined and stable, giving you budget certainty from the start. Time-and-materials contracts provide flexibility for projects where scope may evolve, with transparent hourly billing and regular burn-rate reports. Many clients start with a fixed-price discovery phase, then transition to time-and-materials for the build phase once scope is fully clarified.",
    category: "pricing",
    tags: ["fixed price", "time and materials", "contract type", "billing"],
    order: 8,
  },
  {
    slug: "hidden-costs",
    question: "Are there any hidden costs?",
    answer:
      "No. We believe in full pricing transparency. Your proposal will clearly itemize all development costs, third-party licensing fees, cloud hosting estimates, and any post-launch support or maintenance plans. We flag potential cost variables during discovery, such as API rate limits or data migration complexity, so there are no surprises. If additional scope is needed mid-project, our change request process ensures you approve any cost adjustments before work begins.",
    category: "pricing",
    tags: ["hidden costs", "transparency", "additional fees", "billing clarity"],
    order: 9,
  },
  {
    slug: "delivery-timeline",
    question: "What is the typical delivery timeline?",
    answer:
      "Most projects follow a phased delivery schedule: discovery and architecture (2–4 weeks), core development (8–16 weeks), testing and hardening (2–4 weeks), and launch preparation (1–2 weeks). We deliver working software incrementally, so you see tangible progress within the first month. Critical path items are prioritized early, and our milestone-based approach ensures nothing is left to the final sprint.",
    category: "timeline",
    tags: ["delivery", "timeline", "schedule", "milestones", "phases"],
    order: 10,
  },
  {
    slug: "faster-delivery",
    question: "Can projects be delivered faster?",
    answer:
      "Yes, when timelines are critical we can accelerate delivery by allocating additional senior engineers, parallelizing independent workstreams, and reducing scope to an essential MVP. We also leverage our existing component libraries and pre-built integration patterns to eliminate reinventing common solutions. Accelerated timelines may carry a premium due to the increased resource commitment, and we will be upfront about any trade-offs involved.",
    category: "timeline",
    tags: ["fast delivery", "accelerated", "rush", "urgent", "MVP"],
    order: 11,
  },
  {
    slug: "milestone-handling",
    question: "How do you handle milestones?",
    answer:
      "Every project is broken into clearly defined milestones tied to deliverables, not just calendar dates. Each milestone includes a review checkpoint where you evaluate working software, provide feedback, and approve progression to the next phase. Payment schedules are aligned with milestones so you only pay as tangible value is delivered. This structure keeps both teams accountable and ensures the project stays on track.",
    category: "timeline",
    tags: ["milestones", "checkpoints", "payments", "deliverables", "progress"],
    order: 12,
  },
  {
    slug: "technology-recommendations",
    question: "What technologies do you recommend?",
    answer:
      "Technology selection is project-specific, but our core stack includes React and Next.js for frontends, NestJS and FastAPI for backends, PostgreSQL and Redis for data, and AWS or Docker for infrastructure. We choose technologies based on your team's capabilities, long-term maintainability, ecosystem maturity, and performance requirements. Our architecture decisions are documented in an Architecture Decision Record (ADR) so the rationale is always transparent.",
    category: "technology",
    tags: ["tech stack", "technologies", "frameworks", "recommendations"],
    order: 13,
  },
  {
    slug: "existing-system-integration",
    question: "Can existing systems be integrated?",
    answer:
      "Absolutely. We specialize in integrating new software with existing systems through REST and GraphQL APIs, message queues like RabbitMQ and Kafka, and database-level data pipelines. Whether you need to connect to a legacy ERP, a SaaS platform, or a custom internal tool, we design integration layers that are resilient, well-monitored, and decoupled so changes in one system do not cascade failures into another.",
    category: "technology",
    tags: ["integration", "existing systems", "legacy", "API", "connectivity"],
    order: 14,
  },
  {
    slug: "security-assurance",
    question: "How do you ensure security?",
    answer:
      "Security is embedded throughout our development lifecycle, not bolted on at the end. We implement OWASP Top 10 protections, enforce least-privilege access controls, encrypt all data at rest and in transit, and conduct automated vulnerability scanning in every CI/CD pipeline. For regulated industries, we build compliance frameworks (HIPAA, SOC 2, PCI DSS) into the architecture from the start, with audit trails, immutable logging, and regular penetration testing.",
    category: "technology",
    tags: ["security", "compliance", "OWASP", "encryption", "vulnerability"],
    order: 15,
  },
  {
    slug: "future-scalability",
    question: "Can projects scale later?",
    answer:
      "Every solution we build is designed for growth from the ground up. We use cloud-native infrastructure with auto-scaling, microservices or modular monolith architectures that allow independent feature scaling, and database strategies (read replicas, sharding readiness) that handle data growth gracefully. Our architectural patterns ensure that scaling from 1,000 to 1,000,000 users does not require a rewrite.",
    category: "general",
    tags: ["scalability", "growth", "future-proof", "scaling", "expansion"],
    order: 16,
  },
  {
    slug: "post-launch-support",
    question: "What happens after launch?",
    answer:
      "We provide a structured post-launch support phase that includes bug fixes, performance monitoring, and rapid response to any issues that surface in production. After stabilization, we offer ongoing maintenance plans covering security patches, dependency updates, and feature enhancements. Many clients also engage us for continuous improvement sprints to iterate on user feedback and add new capabilities as their business evolves.",
    category: "general",
    tags: ["post launch", "support", "maintenance", "after launch", "warranty"],
    order: 17,
  },
];

export function getFAQBySlug(slug: string): FAQItem | undefined {
  return FAQ_ITEMS.find((f) => f.slug === slug);
}

export function getFAQByCategory(category: FAQCategory): FAQItem[] {
  return FAQ_ITEMS.filter((f) => f.category === category);
}

export function searchFAQ(query: string): FAQItem[] {
  const q = query.toLowerCase();
  return FAQ_ITEMS.filter(
    (f) =>
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
