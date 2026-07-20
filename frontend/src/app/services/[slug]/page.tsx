import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailHero } from "@/features/services/components/service-detail-hero";
import { ServiceDetailOverview } from "@/features/services/components/service-detail-overview";
import { ServiceProcess } from "@/features/services/components/service-process";
import { ServiceDetailTech } from "@/features/services/components/service-detail-tech";
import { ServiceDetailPricing } from "@/features/services/components/service-detail-pricing";
import { ServiceDetailRelated } from "@/features/services/components/service-detail-related";
import { ServiceFAQEnhanced } from "@/features/services/components/service-faq-enhanced";
import { ServiceConsultationCTA } from "@/features/services/components/service-consultation-cta";
import { StructuredData } from "@/components/shared/structured-data";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

type ServiceData = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  problemsSolved: string[];
  keyFeatures: string[];
  technologies: { name: string; description: string }[];
  pricingTiers: {
    name: string;
    price: string;
    features: string[];
    highlighted?: boolean;
  }[];
  relatedSlugs: string[];
};

const services: ServiceData[] = [
  {
    slug: "ai-development",
    title: "AI Development",
    description:
      "We design and build custom artificial intelligence solutions that automate complex workflows, unlock insights from data, and create intelligent products. Our team works with state-of-the-art frameworks to deliver production-grade AI systems.",
    icon: "brain_circuit",
    features: ["Custom ML Models", "Neural Networks", "NLP", "Computer Vision", "AI Integration"],
    problemsSolved: [
      "Repetitive manual processes consuming team resources",
      "Difficulty extracting actionable insights from large datasets",
      "Lack of personalization in customer-facing products",
      "Inability to predict demand, churn, or anomalies",
    ],
    keyFeatures: [
      "End-to-end model development from data prep to deployment",
      "MLOps pipelines for continuous model improvement",
      "Explainable AI for regulatory compliance",
      "Real-time inference at scale",
      "A/B testing framework for model comparison",
    ],
    technologies: [
      { name: "TensorFlow", description: "Open-source ML framework for production deployments" },
      { name: "PyTorch", description: "Dynamic computation graph for research and production" },
      { name: "LangChain", description: "Framework for building LLM-powered applications" },
      { name: "Hugging Face", description: "Pre-trained models and tokenizers for NLP" },
      { name: "MLflow", description: "ML lifecycle management and experiment tracking" },
      { name: "Apache Spark", description: "Large-scale data processing for ML pipelines" },
    ],
    pricingTiers: [
      {
        name: "Starter",
        price: "$15K+",
        features: ["Single use-case AI model", "Data assessment", "Basic deployment", "3 months support"],
      },
      {
        name: "Professional",
        price: "$50K+",
        features: ["Multi-model system", "Custom training pipeline", "MLOps setup", "6 months support", "Performance monitoring"],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Full AI platform", "Dedicated team", "Custom SLA", "Ongoing optimization", "24/7 support"],
      },
    ],
    relatedSlugs: ["generative-ai", "machine-learning", "data-analytics"],
  },
  {
    slug: "generative-ai",
    title: "Generative AI",
    description:
      "Harness the power of large language models and generative AI to create content, automate conversations, and build intelligent agents. We help you integrate cutting-edge AI capabilities into your products and workflows.",
    icon: "sparkles",
    features: ["LLM Integration", "Prompt Engineering", "AI Content Generation", "RAG Systems"],
    problemsSolved: [
      "Slow content creation processes at scale",
      "Inability to leverage internal knowledge bases effectively",
      "Manual customer support overwhelming support teams",
      "Lack of AI-powered features in existing products",
    ],
    keyFeatures: [
      "Custom LLM fine-tuning on your domain data",
      "Retrieval-Augmented Generation (RAG) pipelines",
      "AI agent orchestration and tool use",
      "Prompt optimization and testing frameworks",
      "Guardrails and safety filters for production use",
    ],
    technologies: [
      { name: "OpenAI API", description: "GPT models for text generation and embeddings" },
      { name: "Anthropic Claude", description: "Constitutional AI for safe, helpful responses" },
      { name: "LangChain", description: "Chain-of-thought orchestration for LLM apps" },
      { name: "Vector Databases", description: "Pinecone, Weaviate, and Chroma for semantic search" },
      { name: "LlamaIndex", description: "Data framework for LLM application development" },
      { name: "vLLM", description: "High-throughput LLM serving engine" },
    ],
    pricingTiers: [
      {
        name: "Pilot",
        price: "$10K+",
        features: ["Proof of concept", "Single LLM integration", "Basic RAG setup", "2 months support"],
      },
      {
        name: "Production",
        price: "$40K+",
        features: ["Full RAG pipeline", "Fine-tuned models", "Agent framework", "Monitoring dashboard", "6 months support"],
        highlighted: true,
      },
      {
        name: "Platform",
        price: "Custom",
        features: ["Multi-model orchestration", "Custom training", "Enterprise guardrails", "Dedicated support", "Ongoing optimization"],
      },
    ],
    relatedSlugs: ["ai-development", "machine-learning", "business-automation"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "We build high-performance, scalable web applications using modern frameworks and best practices. From single-page applications to complex enterprise platforms, we deliver pixel-perfect experiences that delight users.",
    icon: "globe",
    features: ["React / Next.js", "Progressive Web Apps", "Micro-Frontends", "SSR/SSG"],
    problemsSolved: [
      "Outdated web presence failing to convert visitors",
      "Slow page loads hurting SEO and user engagement",
      "Monolithic frontends that are hard to maintain",
      "Lack of mobile-responsive or accessible design",
    ],
    keyFeatures: [
      "Server-side rendering for optimal SEO and performance",
      "Progressive Web App capabilities for offline support",
      "Component-driven architecture with design systems",
      "Automated performance budgets and Lighthouse scoring",
      "A/B testing and feature flag infrastructure",
    ],
    technologies: [
      { name: "Next.js", description: "React framework with SSR, SSG, and API routes" },
      { name: "React 19", description: "Component library with server components" },
      { name: "TypeScript", description: "Type-safe development for large codebases" },
      { name: "Tailwind CSS", description: "Utility-first CSS for rapid UI development" },
      { name: "Vite", description: "Lightning-fast build tool and dev server" },
      { name: "Storybook", description: "Component documentation and visual testing" },
    ],
    pricingTiers: [
      {
        name: "MVP",
        price: "$20K+",
        features: ["Up to 10 pages", "Responsive design", "Basic CMS", "3 months support"],
      },
      {
        name: "Growth",
        price: "$60K+",
        features: ["Custom design system", "Advanced CMS", "API integrations", "Performance optimization", "6 months support"],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Micro-frontends", "SSR/SSG hybrid", "A/B testing", "Custom analytics", "Dedicated team"],
      },
    ],
    relatedSlugs: ["ui-ux-design", "api-development", "e-commerce"],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description:
      "We architect, migrate, and optimize cloud infrastructure across AWS, Azure, and GCP. Our cloud engineers design resilient, cost-effective systems that scale with your business demands.",
    icon: "cloud",
    features: ["AWS / Azure / GCP", "Cloud Migration", "Cost Optimization", "Auto-Scaling"],
    problemsSolved: [
      "Skyrocketing cloud costs without clear optimization path",
      "Unreliable infrastructure causing downtime",
      "Difficulty migrating legacy systems to the cloud",
      "Lack of visibility into cloud resource utilization",
    ],
    keyFeatures: [
      "Multi-cloud architecture design and implementation",
      "Automated cost optimization and right-sizing",
      "Disaster recovery and high-availability planning",
      "Cloud-native observability and monitoring",
      "Compliance-ready infrastructure (SOC 2, HIPAA, GDPR)",
    ],
    technologies: [
      { name: "AWS", description: "EC2, Lambda, S3, RDS, and full AWS ecosystem" },
      { name: "Azure", description: "Azure Functions, AKS, Cosmos DB, and DevOps" },
      { name: "GCP", description: "GKE, BigQuery, Cloud Functions, and Vertex AI" },
      { name: "Terraform", description: "Infrastructure as code for multi-cloud" },
      { name: "Pulumi", description: "IaC using general-purpose programming languages" },
      { name: "Datadog", description: "Cloud-scale monitoring and observability" },
    ],
    pricingTiers: [
      {
        name: "Assessment",
        price: "$8K+",
        features: ["Cloud audit", "Cost analysis", "Migration roadmap", "Architecture review"],
      },
      {
        name: "Migration",
        price: "$35K+",
        features: ["Full migration execution", "Infrastructure as code", "CI/CD setup", "Monitoring", "3 months support"],
        highlighted: true,
      },
      {
        name: "Managed",
        price: "Custom",
        features: ["Ongoing management", "24/7 monitoring", "Cost optimization", "Security patching", "Monthly reports"],
      },
    ],
    relatedSlugs: ["devops", "cyber-security", "maintenance"],
  },
  {
    slug: "devops",
    title: "DevOps",
    description:
      "We implement robust DevOps practices that accelerate your development velocity while maintaining reliability. From CI/CD pipelines to container orchestration, we build the infrastructure that powers modern software delivery.",
    icon: "container",
    features: ["CI/CD Pipelines", "Kubernetes", "Infrastructure as Code", "GitOps"],
    problemsSolved: [
      "Slow and error-prone deployment processes",
      "Inconsistent environments between dev, staging, and production",
      "Lack of automated testing in the deployment pipeline",
      "Difficulty scaling applications to meet demand",
    ],
    keyFeatures: [
      "Automated CI/CD with quality gates and rollback",
      "Container orchestration with Kubernetes",
      "GitOps workflows for declarative infrastructure",
      "Secret management and rotation automation",
      "Chaos engineering and resilience testing",
    ],
    technologies: [
      { name: "Kubernetes", description: "Container orchestration at scale" },
      { name: "Docker", description: "Containerization for consistent environments" },
      { name: "GitHub Actions", description: "Workflow automation for CI/CD" },
      { name: "ArgoCD", description: "GitOps continuous delivery for Kubernetes" },
      { name: "Helm", description: "Package manager for Kubernetes applications" },
      { name: "Terraform", description: "Infrastructure provisioning and management" },
    ],
    pricingTiers: [
      {
        name: "Setup",
        price: "$12K+",
        features: ["CI/CD pipeline", "Docker setup", "Basic monitoring", "Documentation"],
      },
      {
        name: "Standard",
        price: "$30K+",
        features: ["Full DevOps stack", "Kubernetes deployment", "GitOps workflow", "Security scanning", "6 months support"],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Platform engineering", "SRE practices", "Chaos engineering", "Dedicated DevOps team", "24/7 support"],
      },
    ],
    relatedSlugs: ["cloud-solutions", "cyber-security", "api-development"],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    description:
      "We protect your digital assets with comprehensive security solutions. From vulnerability assessments to compliance implementation, we build security into every layer of your technology stack.",
    icon: "shield",
    features: ["Security Audits", "Penetration Testing", "Compliance", "Zero Trust"],
    problemsSolved: [
      "Uncertainty about current security posture and vulnerabilities",
      "Regulatory compliance requirements (SOC 2, HIPAA, GDPR)",
      "Growing attack surface with cloud and remote work",
      "Lack of incident response plan or security monitoring",
    ],
    keyFeatures: [
      "Comprehensive security assessments and penetration testing",
      "Zero-trust architecture implementation",
      "Automated vulnerability scanning in CI/CD",
      "Security operations center (SOC) setup",
      "Compliance automation and evidence collection",
    ],
    technologies: [
      { name: "OWASP", description: "Web application security testing methodology" },
      { name: "Burp Suite", description: "Web vulnerability scanner and testing tool" },
      { name: "Wiz", description: "Cloud security posture management" },
      { name: "Snyk", description: "Developer-first security scanning" },
      { name: "CrowdStrike", description: "Endpoint detection and response" },
      { name: "Vault", description: "Secrets management by HashiCorp" },
    ],
    pricingTiers: [
      {
        name: "Assessment",
        price: "$10K+",
        features: ["Security audit", "Vulnerability report", "Remediation roadmap", "Executive summary"],
      },
      {
        name: "Hardening",
        price: "$35K+",
        features: ["Full penetration test", "Zero-trust setup", "CI/CD security", "Compliance prep", "6 months support"],
        highlighted: true,
      },
      {
        name: "Managed Security",
        price: "Custom",
        features: ["24/7 SOC monitoring", "Incident response", "Threat hunting", "Compliance management", "Quarterly reviews"],
      },
    ],
    relatedSlugs: ["cloud-solutions", "devops", "consulting"],
  },
  {
    slug: "api-development",
    title: "API Development",
    description:
      "We design and build robust, well-documented APIs that power your applications and integrations. From RESTful services to real-time GraphQL subscriptions, we create APIs that developers love to use.",
    icon: "workflow",
    features: ["RESTful APIs", "GraphQL", "gRPC", "API Gateway"],
    problemsSolved: [
      "Fragile integrations breaking with partner systems",
      "Poor API documentation causing developer friction",
      "Lack of rate limiting, versioning, or authentication",
      "Difficulty scaling APIs to handle high throughput",
    ],
    keyFeatures: [
      "RESTful, GraphQL, and gRPC API design",
      "Comprehensive API documentation and SDKs",
      "Rate limiting, caching, and throttling strategies",
      "API versioning and deprecation management",
      "Real-time capabilities with WebSockets and SSE",
    ],
    technologies: [
      { name: "Node.js", description: "JavaScript runtime for API servers" },
      { name: "GraphQL", description: "Query language for flexible data fetching" },
      { name: "gRPC", description: "High-performance RPC framework" },
      { name: "Kong", description: "Cloud-native API gateway" },
      { name: "PostgreSQL", description: "Reliable relational database for API backends" },
      { name: "Redis", description: "In-memory data store for caching and sessions" },
    ],
    pricingTiers: [
      {
        name: "Starter API",
        price: "$12K+",
        features: ["Up to 10 endpoints", "REST design", "Basic auth", "Documentation"],
      },
      {
        name: "Full Platform",
        price: "$40K+",
        features: ["Unlimited endpoints", "GraphQL + REST", "Rate limiting", "SDK generation", "6 months support"],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Multi-service mesh", "gRPC", "API marketplace", "Dedicated team", "Custom SLA"],
      },
    ],
    relatedSlugs: ["web-development", "cloud-solutions", "devops"],
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    description:
      "We automate repetitive business processes to reduce costs, eliminate errors, and free your team for high-value work. From workflow engines to intelligent document processing, we streamline operations.",
    icon: "zap",
    features: ["Workflow Automation", "RPA", "Process Optimization", "Integrations"],
    problemsSolved: [
      "Manual data entry consuming employee hours",
      "Inconsistent processes leading to errors and delays",
      "Disconnected systems requiring copy-paste workarounds",
      "Lack of visibility into process bottlenecks",
    ],
    keyFeatures: [
      "Custom workflow engine design and implementation",
      "Intelligent document processing with AI",
      "System integration and data synchronization",
      "Process mining and optimization analysis",
      "Bot orchestration for repetitive tasks",
    ],
    technologies: [
      { name: "n8n", description: "Open-source workflow automation platform" },
      { name: "Zapier", description: "No-code automation for business apps" },
      { name: "UiPath", description: "Enterprise robotic process automation" },
      { name: "Airflow", description: "Workflow orchestration for data pipelines" },
      { name: "Make", description: "Visual automation platform for complex workflows" },
      { name: "Temporal", description: "Durable workflow execution engine" },
    ],
    pricingTiers: [
      {
        name: "Quick Win",
        price: "$8K+",
        features: ["1-3 workflow automations", "Integration setup", "Documentation", "Training"],
      },
      {
        name: "Transformation",
        price: "$25K+",
        features: ["10+ workflows", "Custom engine", "AI document processing", "Analytics dashboard", "6 months support"],
        highlighted: true,
      },
      {
        name: "Enterprise RPA",
        price: "Custom",
        features: ["Full process automation", "Bot orchestration", "Process mining", "Dedicated team", "Ongoing optimization"],
      },
    ],
    relatedSlugs: ["ai-development", "erp-systems", "data-analytics"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    description:
      "We build beautiful, performant mobile applications for iOS and Android. Using cross-platform frameworks or native development, we deliver apps that users love and businesses rely on.",
    icon: "smartphone",
    features: ["React Native", "Flutter", "Native iOS/Android", "Offline-First"],
    problemsSolved: [
      "Need to reach users on both iOS and Android efficiently",
      "Existing mobile app is slow, buggy, or outdated",
      "Poor offline experience frustrating users",
      "Difficulty maintaining two separate native codebases",
    ],
    keyFeatures: [
      "Cross-platform development for iOS and Android",
      "Offline-first architecture with sync capabilities",
      "Push notifications and deep linking",
      "App Store optimization and submission",
      "Performance profiling and crash analytics",
    ],
    technologies: [
      { name: "React Native", description: "Cross-platform mobile with React" },
      { name: "Flutter", description: "Google's UI toolkit for native compilation" },
      { name: "Expo", description: "Platform for React Native development" },
      { name: "Swift", description: "Native iOS development" },
      { name: "Kotlin", description: "Native Android development" },
      { name: "Firebase", description: "Mobile backend services by Google" },
    ],
    pricingTiers: [
      {
        name: "MVP App",
        price: "$25K+",
        features: ["Single platform", "Core features", "App store submission", "3 months support"],
      },
      {
        name: "Cross-Platform",
        price: "$50K+",
        features: ["iOS + Android", "Offline support", "Push notifications", "Analytics", "6 months support"],
        highlighted: true,
      },
      {
        name: "Enterprise Mobile",
        price: "Custom",
        features: ["Native + cross-platform", "MDM integration", "Custom backend", "Dedicated team", "24/7 support"],
      },
    ],
    relatedSlugs: ["web-development", "ui-ux-design", "api-development"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "We create intuitive, beautiful user experiences backed by research and data. From wireframes to polished design systems, we ensure your product is both visually stunning and effortless to use.",
    icon: "palette",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    problemsSolved: [
      "High user churn due to confusing interface design",
      "Lack of design consistency across product surfaces",
      "Expensive redesign cycles because of poor upfront design",
      "Difficulty validating design decisions before development",
    ],
    keyFeatures: [
      "User research and persona development",
      "Interactive prototyping and user testing",
      "Scalable design systems and component libraries",
      "Accessibility-first design (WCAG 2.1 AA)",
      "Design-to-code handoff with accurate specifications",
    ],
    technologies: [
      { name: "Figma", description: "Industry-leading design and prototyping tool" },
      { name: "Storybook", description: "Component documentation and visual testing" },
      { name: "Maze", description: "User testing and research platform" },
      { name: "Hotjar", description: "User behavior analytics and heatmaps" },
      { name: "Lottie", description: "Lightweight animations for web and mobile" },
      { name: "Design Tokens", description: "Platform-agnostic design variables" },
    ],
    pricingTiers: [
      {
        name: "Audit",
        price: "$5K+",
        features: ["UX audit report", "Heuristic evaluation", "Competitor analysis", "Recommendations"],
      },
      {
        name: "Full Design",
        price: "$20K+",
        features: ["User research", "Full UI/UX design", "Prototyping", "Design system", "3 months support"],
        highlighted: true,
      },
      {
        name: "Design Team",
        price: "Custom",
        features: ["Embedded designer", "Ongoing design sprints", "Design system maintenance", "User testing program", "Monthly reports"],
      },
    ],
    relatedSlugs: ["web-development", "mobile-apps", "e-commerce"],
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    description:
      "We transform raw data into actionable business intelligence. From dashboards to predictive models, we help you make data-driven decisions that drive growth and efficiency.",
    icon: "bar_chart3",
    features: ["Business Intelligence", "Data Warehousing", "ETL Pipelines", "Visualization"],
    problemsSolved: [
      "Data scattered across multiple systems with no single source of truth",
      "Inability to measure key business metrics in real time",
      "Manual reporting consuming analyst hours",
      "Lack of data-driven decision making across the organization",
    ],
    keyFeatures: [
      "End-to-end data pipeline design and implementation",
      "Real-time and batch analytics dashboards",
      "Data warehouse architecture and optimization",
      "Self-service analytics for business users",
      "Automated alerting and anomaly detection",
    ],
    technologies: [
      { name: "Snowflake", description: "Cloud data platform for analytics" },
      { name: "dbt", description: "Data transformation for analytics engineering" },
      { name: "Apache Kafka", description: "Real-time data streaming platform" },
      { name: "Metabase", description: "Open-source business intelligence tool" },
      { name: "Great Expectations", description: "Data validation and quality framework" },
      { name: "Apache Airflow", description: "Workflow orchestration for data pipelines" },
    ],
    pricingTiers: [
      {
        name: "Starter",
        price: "$15K+",
        features: ["Single dashboard", "Data assessment", "Basic ETL", "3 months support"],
      },
      {
        name: "Analytics Platform",
        price: "$45K+",
        features: ["Data warehouse", "Multiple dashboards", "Real-time pipelines", "Self-service analytics", "6 months support"],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Full data platform", "ML integration", "Advanced governance", "Dedicated data team", "24/7 support"],
      },
    ],
    relatedSlugs: ["machine-learning", "ai-development", "business-automation"],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    description:
      "We build predictive models and intelligent systems that learn from your data. From forecasting to recommendation engines, our ML solutions deliver measurable business impact.",
    icon: "brain",
    features: ["Predictive Analytics", "NLP", "Computer Vision", "Recommendation Systems"],
    problemsSolved: [
      "Inability to predict customer behavior or demand",
      "Manual classification of images, text, or documents",
      "Generic product recommendations not driving engagement",
      "Missed opportunities hidden in historical data",
    ],
    keyFeatures: [
      "Custom model development for your specific use case",
      "Automated feature engineering and selection",
      "Model monitoring and drift detection",
      "A/B testing framework for model validation",
      "Explainable AI for stakeholder transparency",
    ],
    technologies: [
      { name: "scikit-learn", description: "Classical ML algorithms and utilities" },
      { name: "PyTorch", description: "Deep learning framework for research and production" },
      { name: "XGBoost", description: "Gradient boosting for tabular data" },
      { name: "OpenCV", description: "Computer vision library" },
      { name: "spaCy", description: "Industrial-strength NLP in Python" },
      { name: "MLflow", description: "ML experiment tracking and model registry" },
    ],
    pricingTiers: [
      {
        name: "Prototype",
        price: "$12K+",
        features: ["Single model POC", "Data assessment", "Basic evaluation", "2 months support"],
      },
      {
        name: "Production",
        price: "$40K+",
        features: ["Production ML system", "Model monitoring", "A/B testing", "API serving", "6 months support"],
        highlighted: true,
      },
      {
        name: "ML Platform",
        price: "Custom",
        features: ["Full MLOps platform", "Multi-model system", "AutoML capabilities", "Dedicated data science team", "Ongoing optimization"],
      },
    ],
    relatedSlugs: ["ai-development", "data-analytics", "generative-ai"],
  },
  {
    slug: "consulting",
    title: "Consulting",
    description:
      "We provide strategic technical guidance to help you make the right technology decisions. From architecture reviews to digital transformation roadmaps, our consultants bring decades of combined experience.",
    icon: "lightbulb",
    features: ["Technical Strategy", "Architecture Review", "Digital Transformation", "Tech Audit"],
    problemsSolved: [
      "Uncertainty about the right technology stack for your project",
      "Legacy systems blocking innovation and growth",
      "Lack of technical leadership or CTO-level guidance",
      "Failed digital transformation initiatives",
    ],
    keyFeatures: [
      "Technology strategy and roadmap development",
      "Architecture review and modernization planning",
      "Vendor evaluation and technology selection",
      "Team structure and hiring strategy",
      "Technical due diligence for M&A",
    ],
    technologies: [
      { name: "Architecture Patterns", description: "Microservices, event-driven, CQRS, DDD" },
      { name: "Cloud Strategy", description: "Multi-cloud and hybrid cloud planning" },
      { name: "Team Scaling", description: "Engineering team structure and growth" },
      { name: "Agile/Lean", description: "Process optimization and delivery strategy" },
      { name: "Security Review", description: "High-level security posture assessment" },
      { name: "Cost Analysis", description: "TCO modeling and ROI projections" },
    ],
    pricingTiers: [
      {
        name: "Quick Advisory",
        price: "$3K+",
        features: ["2-hour strategy session", "Written recommendations", "Follow-up email", "Resource list"],
      },
      {
        name: "Technical Audit",
        price: "$15K+",
        features: ["Full architecture review", "Security assessment", "Roadmap creation", "Executive presentation", "1 month follow-up"],
        highlighted: true,
      },
      {
        name: "Transformation",
        price: "Custom",
        features: ["Ongoing advisory", "Fractional CTO", "Architecture governance", "Team mentoring", "Quarterly reviews"],
      },
    ],
    relatedSlugs: ["cloud-solutions", "devops", "cyber-security"],
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    description:
      "We keep your software running at peak performance with proactive monitoring, timely updates, and rapid issue resolution. Our maintenance services ensure your systems are always reliable and secure.",
    icon: "wrench",
    features: ["24/7 Support", "Monitoring", "Updates", "Performance Optimization"],
    problemsSolved: [
      "Unexpected downtime impacting revenue and reputation",
      "Security vulnerabilities going unpatched",
      "Performance degrading over time without optimization",
      "No dedicated team to handle production issues",
    ],
    keyFeatures: [
      "24/7 infrastructure monitoring and alerting",
      "Proactive security patching and updates",
      "Performance monitoring and optimization",
      "Incident response and root cause analysis",
      "Monthly health reports and recommendations",
    ],
    technologies: [
      { name: "Datadog", description: "Full-stack observability platform" },
      { name: "PagerDuty", description: "Incident management and escalation" },
      { name: "Grafana", description: "Open-source monitoring dashboards" },
      { name: "Prometheus", description: "Metrics collection and alerting" },
      { name: "Sentry", description: "Error tracking and performance monitoring" },
      { name: "StatusPage", description: "Public status page and incident communication" },
    ],
    pricingTiers: [
      {
        name: "Basic",
        price: "$2K/mo",
        features: ["Business hours monitoring", "Monthly updates", "Bug fixes", "Email support"],
      },
      {
        name: "Professional",
        price: "$5K/mo",
        features: ["24/7 monitoring", "Weekly updates", "Performance tuning", "Priority support", "Monthly reports"],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Dedicated SRE team", "Sub-15-min response", "Custom SLA", "Proactive optimization", "Quarterly reviews"],
      },
    ],
    relatedSlugs: ["cloud-solutions", "devops", "cyber-security"],
  },
  {
    slug: "erp-systems",
    title: "ERP Systems",
    description:
      "We build custom enterprise resource planning solutions tailored to your business processes. Our ERP systems unify finance, operations, HR, and supply chain into a single coherent platform.",
    icon: "building2",
    features: ["Custom ERP Modules", "System Integration", "Reporting & Analytics", "Workflow Automation"],
    problemsSolved: [
      "Disconnected departments using separate, incompatible systems",
      "Manual data reconciliation between finance, ops, and HR",
      "Lack of real-time visibility into business operations",
      "Rigid off-the-shelf ERP not matching your processes",
    ],
    keyFeatures: [
      "Custom module development for unique business needs",
      "Integration with existing systems (CRM, HRIS, accounting)",
      "Real-time dashboards and automated reporting",
      "Role-based access control and audit trails",
      "Mobile access for field workers and executives",
    ],
    technologies: [
      { name: "Next.js", description: "Modern web framework for ERP frontend" },
      { name: "Node.js", description: "Backend services and API layer" },
      { name: "PostgreSQL", description: "Reliable database for transactional data" },
      { name: "GraphQL", description: "Flexible API for complex data relationships" },
      { name: "Redis", description: "Caching and session management" },
      { name: "Kubernetes", description: "Container orchestration for reliability" },
    ],
    pricingTiers: [
      {
        name: "Core Module",
        price: "$40K+",
        features: ["Single business module", "Basic reporting", "User management", "3 months support"],
      },
      {
        name: "Full Suite",
        price: "$100K+",
        features: ["Multi-module system", "Custom workflows", "Advanced analytics", "Integrations", "6 months support"],
        highlighted: true,
      },
      {
        name: "Enterprise ERP",
        price: "Custom",
        features: ["Complete platform", "Custom modules", "Multi-entity support", "Dedicated team", "Ongoing development"],
      },
    ],
    relatedSlugs: ["business-automation", "web-development", "data-analytics"],
  },
  {
    slug: "e-commerce",
    title: "E-Commerce",
    description:
      "We build scalable, high-converting online stores and marketplace platforms. From headless commerce to custom checkout flows, we create e-commerce experiences that drive revenue and delight customers.",
    icon: "shopping_cart",
    features: ["Headless Commerce", "Payment Gateway", "Inventory Management", "Marketplace"],
    problemsSolved: [
      "Low conversion rates due to poor checkout experience",
      "Limited scalability during high-traffic events",
      "Difficulty managing multi-vendor or marketplace operations",
      "Lack of customization with off-the-shelf e-commerce platforms",
    ],
    keyFeatures: [
      "Headless commerce architecture for maximum flexibility",
      "Custom checkout and payment flows",
      "Multi-vendor marketplace capabilities",
      "Real-time inventory and order management",
      "Personalization engine for product recommendations",
    ],
    technologies: [
      { name: "Medusa.js", description: "Open-source headless commerce engine" },
      { name: "Shopify Hydrogen", description: "React-based storefront framework" },
      { name: "Stripe", description: "Payment processing and billing" },
      { name: "Algolia", description: "Search and discovery for e-commerce" },
      { name: "Next.js", description: "Frontend framework for storefronts" },
      { name: "Redis", description: "Session cart and caching layer" },
    ],
    pricingTiers: [
      {
        name: "Starter Store",
        price: "$20K+",
        features: ["Standard storefront", "Payment integration", "Product management", "3 months support"],
      },
      {
        name: "Growth",
        price: "$55K+",
        features: ["Headless commerce", "Custom checkout", "Multi-currency", "Analytics", "6 months support"],
        highlighted: true,
      },
      {
        name: "Marketplace",
        price: "Custom",
        features: ["Multi-vendor platform", "Custom logistics", "Advanced personalization", "Dedicated team", "Ongoing optimization"],
      },
    ],
    relatedSlugs: ["web-development", "ui-ux-design", "api-development"],
  },
];

const slugToService = new Map(services.map((s) => [s.slug, s]));

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = slugToService.get(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = slugToService.get(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = service.relatedSlugs
    .map((rs) => slugToService.get(rs))
    .filter(Boolean)
    .map((s) => ({
      title: s!.title,
      description: s!.description,
      href: `/services/${s!.slug}`,
      icon: s!.icon,
    }));

  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateServiceSchema({
          title: service.title,
          description: service.description,
          slug: service.slug,
        })}
      />
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
          { name: service.title, url: `${siteConfig.url}/services/${service.slug}` },
        ])}
      />
      <ServiceDetailHero
        title={service.title}
        description={service.description}
        icon={service.icon}
        features={service.features}
      />
      <ServiceDetailOverview
        title={service.title}
        description={service.description}
        problemsSolved={service.problemsSolved}
        keyFeatures={service.keyFeatures}
      />
      <ServiceProcess />
      <ServiceDetailTech technologies={service.technologies} />
      <ServiceDetailPricing tiers={service.pricingTiers} />
      <ServiceDetailRelated services={relatedServices} />
      <ServiceFAQEnhanced
        showSearch={true}
        title={`${service.title} — FAQ`}
        subtitle="Common questions about this service"
      />
      <ServiceConsultationCTA />
    </main>
  );
}
