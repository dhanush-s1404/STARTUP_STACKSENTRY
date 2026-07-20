export type EngineeringPrinciple = {
  id: string;
  icon: string;
  title: string;
  description: string;
  businessValue: string;
  category: string;
  useCases: string[];
  relatedPractices: string[];
};

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    id: "clean-code",
    icon: "Code2",
    title: "Clean Code",
    description: "Writing readable, maintainable code that communicates intent and follows established conventions.",
    businessValue: "Reduces onboarding time by 60% and bug rates by 40% through consistent, well-documented codebases.",
    category: "Code Quality",
    useCases: [
      "Code reviews with automated linting",
      "Refactoring legacy systems for maintainability",
      "Establishing team coding standards and conventions",
    ],
    relatedPractices: ["Pair programming", "TDD", "SOLID principles"],
  },
  {
    id: "test-driven",
    icon: "TestTube",
    title: "Test-Driven Development",
    description: "Writing tests before implementation to ensure correctness, design quality, and regression safety.",
    businessValue: "Delivers 99.9% uptime by catching regressions before production and enabling confident deployments.",
    category: "Code Quality",
    useCases: [
      "Unit testing for business logic validation",
      "Integration testing for API contract verification",
      "End-to-end testing for user workflow validation",
    ],
    relatedPractices: ["CI/CD pipelines", "Code coverage gates", "Mutation testing"],
  },
  {
    id: "modular-architecture",
    icon: "Box",
    title: "Modular Architecture",
    description: "Building systems as loosely coupled, highly cohesive modules that can be developed and deployed independently.",
    businessValue: "Enables parallel development across teams, reducing delivery timelines by 35% for large projects.",
    category: "Architecture",
    useCases: [
      "Microservices for independent service scaling",
      "Feature flags for incremental rollouts",
      "Monorepo with shared packages and tooling",
    ],
    relatedPractices: ["Domain-driven design", "API contracts", "Feature toggles"],
  },
  {
    id: "security-first",
    icon: "Shield",
    title: "Security First",
    description: "Embedding security practices into every stage of development rather than treating it as an afterthought.",
    businessValue: "Prevents data breaches that cost enterprises $4.45M on average, protecting reputation and revenue.",
    category: "Security",
    useCases: [
      "SAST/DAST scanning in CI pipelines",
      "Dependency vulnerability auditing",
      "OWASP Top 10 compliance and penetration testing",
    ],
    relatedPractices: ["Code signing", "Secret management", "Security headers"],
  },
  {
    id: "ci-cd",
    icon: "GitBranch",
    title: "Continuous Integration & Delivery",
    description: "Automating build, test, and deployment pipelines to deliver features rapidly and reliably.",
    businessValue: "Reduces deployment frequency from monthly to multiple times daily while maintaining stability.",
    category: "DevOps",
    useCases: [
      "Automated build and test on every PR",
      "Blue-green and canary deployment strategies",
      "Rollback automation for incident recovery",
    ],
    relatedPractices: ["Infrastructure as code", "Feature flags", "Deployment metrics"],
  },
  {
    id: "performance-budget",
    icon: "Gauge",
    title: "Performance Budget",
    description: "Setting and enforcing performance budgets to ensure applications stay fast as they grow.",
    businessValue: "Each 100ms of latency reduction improves conversion rates by 1%, directly impacting revenue.",
    category: "Performance",
    useCases: [
      "Core Web Vitals monitoring and budgets",
      "Bundle size analysis and tree shaking",
      "Performance regression testing in CI",
    ],
    relatedPractices: ["Lighthouse CI", "RUM monitoring", "Asset optimization"],
  },
  {
    id: "documentation",
    icon: "BookOpen",
    title: "Living Documentation",
    description: "Maintaining up-to-date documentation that evolves with the codebase and serves as a knowledge base.",
    businessValue: "Reduces support tickets by 50% and accelerates developer productivity from day one.",
    category: "Code Quality",
    useCases: [
      "Auto-generated API docs from code annotations",
      "Architecture Decision Records (ADRs)",
      "Runbooks for operational procedures",
    ],
    relatedPractices: ["RFC process", "Onboarding guides", "Changelog automation"],
  },
  {
    id: "observability",
    icon: "Eye",
    title: "Observability",
    description: "Building systems that expose internal state through logs, metrics, and traces for rapid debugging.",
    businessValue: "Reduces mean time to recovery (MTTR) by 70%, minimizing downtime impact on users.",
    category: "DevOps",
    useCases: [
      "Structured logging with correlation IDs",
      "Distributed tracing across services",
      "Custom dashboards and alerting rules",
    ],
    relatedPractices: ["SLI/SLO definitions", "Incident postmortems", "Error budgets"],
  },
  {
    id: "scalability",
    icon: "TrendingUp",
    title: "Scalability by Design",
    description: "Architecting systems to handle growth in users, data, and traffic without rewrites.",
    businessValue: "Supports 10x user growth without infrastructure re-architecture, protecting long-term investment.",
    category: "Architecture",
    useCases: [
      "Horizontal scaling with container orchestration",
      "Database sharding and read replica strategies",
      "Event-driven architecture for async processing",
    ],
    relatedPractices: ["Load testing", "Capacity planning", "Auto-scaling policies"],
  },
];

export const PRINCIPLE_CATEGORIES = [...new Set(ENGINEERING_PRINCIPLES.map((p) => p.category))];
