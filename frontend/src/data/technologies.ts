export type TechnologyData = {
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  icon: string;
  experience: "beginner" | "intermediate" | "advanced" | "expert";
  useCases: string[];
  benefits: string[];
  projectSlugs: string[];
  relatedTechnologies: string[];
};

export const TECHNOLOGIES: TechnologyData[] = [
  {
    slug: "react",
    name: "React",
    category: "Frontend",
    description: "Building interactive user interfaces with component-based architecture",
    longDescription:
      "React is the cornerstone of modern frontend development, offering a declarative, component-based approach to building interactive user interfaces. At StackSentry, we leverage React's powerful ecosystem to create performant, accessible, and scalable web applications. From complex enterprise dashboards to dynamic single-page applications, our team has deep expertise in React patterns including composition, hooks, context, and performance optimization. We build reusable component libraries, implement server-side rendering with Next.js, and ensure every interface meets the highest standards of design and user experience.",
    icon: "Layout",
    experience: "expert",
    useCases: [
      "Single-page applications with complex state management",
      "Enterprise dashboards and admin panels",
      "Component libraries and design systems",
    ],
    benefits: [
      "Rapid UI development with reusable components",
      "Virtual DOM for optimal rendering performance",
      "Massive ecosystem of libraries and community support",
    ],
    projectSlugs: [
      "recruitment-management-system",
      "inventory-management",
      "enterprise-hrms",
    ],
    relatedTechnologies: ["nextjs", "nodejs"],
  },
  {
    slug: "nextjs",
    name: "Next.js",
    category: "Frontend",
    description: "Full-stack React framework with SSR, SSG, and API routes",
    longDescription:
      "Next.js is the production-grade React framework that enables full-stack web development with server-side rendering, static site generation, and API routes. StackSentry uses Next.js to build lightning-fast applications that excel in both performance and SEO. Our expertise spans App Router, server components, streaming, and edge runtime configurations. We optimize for Core Web Vitals, implement sophisticated caching strategies, and deploy on platforms like Vercel and AWS for global edge delivery. Whether it's an e-commerce storefront or a content-heavy platform, Next.js is our go-to choice for React applications that demand the best.",
    icon: "Layout",
    experience: "expert",
    useCases: [
      "Server-rendered e-commerce and marketing sites",
      "Full-stack applications with API routes",
      "Static and dynamic content platforms",
    ],
    benefits: [
      "Automatic code splitting and optimized loading",
      "Built-in SEO with server-side rendering",
      "Full-stack capabilities without separate backend",
    ],
    projectSlugs: [
      "ecommerce-platform",
      "learning-management-system",
      "business-analytics-dashboard",
    ],
    relatedTechnologies: ["react", "nodejs"],
  },
  {
    slug: "python",
    name: "Python",
    category: "Backend",
    description: "Versatile language powering AI/ML, APIs, and data processing",
    longDescription:
      "Python is the Swiss Army knife of modern software development, excelling in AI/ML, backend APIs, data processing, and automation. StackSentry's Python expertise covers the full spectrum — from building high-performance async APIs with FastAPI to training machine learning models with TensorFlow and PyTorch. We write clean, well-typed Python with comprehensive test coverage, leverage async patterns for concurrent workloads, and build robust data pipelines that process millions of records daily. Our team follows best practices for packaging, dependency management, and CI/CD to ensure Python applications are production-ready and maintainable.",
    icon: "Server",
    experience: "expert",
    useCases: [
      "AI/ML model development and training pipelines",
      "High-performance async REST APIs",
      "Data processing and ETL pipelines",
    ],
    benefits: [
      "Rich ecosystem for AI/ML and data science",
      "Rapid prototyping and development speed",
      "Excellent library ecosystem for every domain",
    ],
    projectSlugs: [
      "ai-resume-screening",
      "fintech-compliance",
      "ai-chatbot-platform",
    ],
    relatedTechnologies: ["fastapi", "tensorflow", "openai"],
  },
  {
    slug: "fastapi",
    name: "FastAPI",
    category: "Backend",
    description: "High-performance async Python API framework",
    longDescription:
      "FastAPI has redefined what's possible with Python web frameworks, delivering performance on par with Node.js and Go while maintaining Python's developer-friendly syntax. StackSentry uses FastAPI as our primary choice for Python API development, taking full advantage of its automatic OpenAPI documentation, Pydantic validation, and native async/await support. We build APIs that handle thousands of concurrent connections with minimal latency, implement WebSocket endpoints for real-time features, and leverage dependency injection for clean, testable architecture. FastAPI's type safety catches bugs at development time, making our APIs both fast to build and reliable in production.",
    icon: "Server",
    experience: "expert",
    useCases: [
      "Real-time REST and WebSocket APIs",
      "ML model serving endpoints",
      "High-throughput data processing APIs",
    ],
    benefits: [
      "Performance comparable to Go and Node.js",
      "Automatic OpenAPI documentation generation",
      "Type-safe request/response validation with Pydantic",
    ],
    projectSlugs: [
      "ai-resume-screening",
      "inventory-management",
      "healthcare-platform",
    ],
    relatedTechnologies: ["python", "nodejs"],
  },
  {
    slug: "nodejs",
    name: "Node.js",
    category: "Backend",
    description: "JavaScript runtime for scalable server-side applications",
    longDescription:
      "Node.js brings JavaScript to the server, enabling full-stack development with a single language across the entire application. StackSentry leverages Node.js for building scalable backend services, real-time applications, and microservice architectures. Our expertise includes event-driven patterns, worker threads for CPU-intensive tasks, streaming APIs, and clustering for multi-core utilization. We pair Node.js with TypeScript for type safety and use battle-tested frameworks and libraries to build production APIs that handle millions of requests. From real-time collaboration tools to high-throughput API gateways, Node.js is a staple in our technology arsenal.",
    icon: "Server",
    experience: "advanced",
    useCases: [
      "Real-time collaborative applications",
      "Microservices and API gateways",
      "Background job processing and task queues",
    ],
    benefits: [
      "Non-blocking I/O for high concurrency",
      "Full-stack JavaScript across client and server",
      "npm ecosystem with over 1.5 million packages",
    ],
    projectSlugs: [
      "recruitment-management-system",
      "ecommerce-platform",
      "workflow-automation",
    ],
    relatedTechnologies: ["react", "nestjs"],
  },
  {
    slug: "nestjs",
    name: "NestJS",
    category: "Backend",
    description: "Enterprise-grade Node.js framework with TypeScript",
    longDescription:
      "NestJS brings enterprise architecture patterns to the Node.js ecosystem, providing a structured, modular approach to building scalable backend applications. StackSentry uses NestJS for complex enterprise projects where clean architecture, dependency injection, and maintainability are paramount. Its Angular-inspired design patterns make it familiar to enterprise developers while leveraging Node.js's performance characteristics. We build modular monoliths and microservices with NestJS, implementing features like custom decorators, guards, interceptors, and microservice transport layers. NestJS's type-safe modules and comprehensive testing utilities make it ideal for large teams and long-lived codebases.",
    icon: "Server",
    experience: "advanced",
    useCases: [
      "Enterprise API platforms and microservices",
      "Modular monolith architectures",
      "Complex business domain applications",
    ],
    benefits: [
      "Modular architecture for large-scale applications",
      "Built-in dependency injection and decorators",
      "Comprehensive CLI for code generation",
    ],
    projectSlugs: [
      "hospital-management-system",
      "enterprise-hrms",
      "customer-support-system",
    ],
    relatedTechnologies: ["nodejs", "postgresql"],
  },
  {
    slug: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    description: "Advanced relational database for mission-critical data",
    longDescription:
      "PostgreSQL is the most advanced open-source relational database, and it's the default choice for StackSentry's data storage needs. Its standards compliance, extensibility, and reliability make it ideal for mission-critical applications. We design normalized schemas optimized for query performance, implement row-level security for multi-tenant applications, and leverage advanced features like window functions, CTEs, and materialized views for complex analytics. Our PostgreSQL expertise includes partitioning for time-series data, full-text search with tsvector, JSONB for semi-structured data, and replication strategies for high availability. From fintech to healthcare, we trust PostgreSQL to store and serve data with integrity.",
    icon: "Database",
    experience: "expert",
    useCases: [
      "Primary transactional data store for applications",
      "Analytics and reporting with complex queries",
      "Multi-tenant SaaS with row-level security",
    ],
    benefits: [
      "ACID compliance with advanced SQL features",
      "Extensible with custom types, functions, and extensions",
      "Proven reliability for mission-critical workloads",
    ],
    projectSlugs: [
      "recruitment-management-system",
      "hospital-management-system",
      "ecommerce-platform",
    ],
    relatedTechnologies: ["redis", "nestjs"],
  },
  {
    slug: "redis",
    name: "Redis",
    category: "Database",
    description: "In-memory data store for caching and real-time features",
    longDescription:
      "Redis is the world's fastest in-memory data store, and StackSentry uses it extensively as a caching layer, session store, and real-time messaging backbone. Its sub-millisecond latency makes it indispensable for applications that demand instant responsiveness. We implement Redis for session management, real-time leaderboards, pub/sub messaging for WebSocket events, and caching strategies that reduce database load by orders of magnitude. Our Redis expertise covers clustering for high availability, streams for event sourcing, and Lua scripting for atomic operations. Whether it's caching API responses or powering real-time collaboration features, Redis is a critical component in our architecture toolkit.",
    icon: "Database",
    experience: "advanced",
    useCases: [
      "Application caching and session management",
      "Real-time pub/sub and messaging",
      "Rate limiting and distributed locking",
    ],
    benefits: [
      "Sub-millisecond read/write latency",
      "Support for multiple data structures and patterns",
      "Built-in replication and clustering for HA",
    ],
    projectSlugs: [
      "ecommerce-platform",
      "crm-platform",
      "learning-management-system",
    ],
    relatedTechnologies: ["postgresql", "mongodb"],
  },
  {
    slug: "mongodb",
    name: "MongoDB",
    category: "Database",
    description: "Document database for flexible data models",
    longDescription:
      "MongoDB provides a flexible, document-oriented approach to data storage that excels when application data doesn't fit neatly into relational tables. StackSentry uses MongoDB for projects with rapidly evolving schemas, nested data structures, and high-volume writes. Its aggregation framework powers complex analytics pipelines, while change streams enable real-time reactive applications. We implement MongoDB for content management, event logging, and applications where the data model naturally maps to JSON documents. Our expertise includes sharding strategies for horizontal scaling, aggregation pipeline optimization, and schema design patterns that balance flexibility with query performance.",
    icon: "Database",
    experience: "advanced",
    useCases: [
      "Content management with nested document structures",
      "Real-time event logging and analytics",
      "Applications with rapidly evolving data models",
    ],
    benefits: [
      "Schema flexibility for rapid iteration",
      "Native horizontal scaling with sharding",
      "Rich aggregation framework for analytics",
    ],
    projectSlugs: [
      "crm-platform",
      "learning-management-system",
    ],
    relatedTechnologies: ["postgresql", "redis"],
  },
  {
    slug: "docker",
    name: "Docker",
    category: "DevOps",
    description: "Container platform for consistent development and deployment",
    longDescription:
      "Docker has revolutionized software deployment by packaging applications into portable, isolated containers that run identically across any environment. StackSentry builds multi-stage Docker images optimized for size and security, designs container architectures that separate concerns cleanly, and maintains Docker Compose configurations for local development that mirror production. We implement health checks, resource limits, and security scanning in our container builds. Every project at StackSentry ships with Docker configurations that ensure developers can spin up a complete development environment with a single command, and production deployments use container images as the deployment artifact.",
    icon: "Settings",
    experience: "expert",
    useCases: [
      "Development environment standardization",
      "CI/CD pipeline container builds",
      "Microservice packaging and deployment",
    ],
    benefits: [
      "Consistent environments from development to production",
      "Lightweight isolation compared to virtual machines",
      "Fast startup and efficient resource utilization",
    ],
    projectSlugs: [
      "enterprise-hrms",
      "school-erp",
      "workflow-automation",
    ],
    relatedTechnologies: ["kubernetes", "aws"],
  },
  {
    slug: "kubernetes",
    name: "Kubernetes",
    category: "DevOps",
    description: "Container orchestration for production workloads",
    longDescription:
      "Kubernetes is the industry standard for container orchestration, automating deployment, scaling, and management of containerized applications. StackSentry deploys production workloads on Kubernetes for applications that demand auto-scaling, rolling deployments, and self-healing infrastructure. We design Kubernetes manifests, Helm charts, and operator patterns for complex stateful and stateless workloads. Our expertise covers horizontal pod autoscaling, network policies, persistent volume management, and service mesh integration. For projects that need to handle unpredictable traffic patterns or require zero-downtime deployments, Kubernetes provides the infrastructure foundation that scales with demand.",
    icon: "Settings",
    experience: "advanced",
    useCases: [
      "Production container orchestration at scale",
      "Auto-scaling based on traffic and resource metrics",
      "Zero-downtime rolling deployments",
    ],
    benefits: [
      "Automatic scaling and self-healing capabilities",
      "Declarative infrastructure as code",
      "Rich ecosystem of operators and tooling",
    ],
    projectSlugs: [
      "ai-resume-screening",
      "ecommerce-platform",
    ],
    relatedTechnologies: ["docker", "aws"],
  },
  {
    slug: "aws",
    name: "AWS",
    category: "Cloud",
    description: "Leading cloud platform for scalable infrastructure",
    longDescription:
      "Amazon Web Services provides the comprehensive cloud infrastructure that powers the majority of StackSentry's production deployments. From ECS and Lambda for compute, to RDS and ElastiCache for managed databases, to S3 and CloudFront for content delivery — we architect solutions that leverage the right AWS services for each use case. Our team is experienced in cost optimization, security best practices, and designing highly available architectures across multiple availability zones. We implement infrastructure as code with Terraform and CDK, set up CI/CD pipelines with CodePipeline and GitHub Actions, and monitor with CloudWatch and Datadog. AWS gives us the building blocks to scale from prototype to enterprise-grade production.",
    icon: "Cloud",
    experience: "advanced",
    useCases: [
      "Scalable cloud infrastructure and hosting",
      "Serverless computing with Lambda and API Gateway",
      "Managed databases, caching, and storage",
    ],
    benefits: [
      "Global infrastructure with 30+ regions",
      "Extensive managed services reducing operational overhead",
      "Pay-as-you-go pricing with cost optimization tools",
    ],
    projectSlugs: [
      "ecommerce-platform",
      "fintech-compliance",
      "enterprise-hrms",
    ],
    relatedTechnologies: ["azure", "docker", "kubernetes"],
  },
  {
    slug: "azure",
    name: "Azure",
    category: "Cloud",
    description: "Microsoft cloud for enterprise hybrid solutions",
    longDescription:
      "Microsoft Azure is the cloud platform of choice for enterprises already invested in the Microsoft ecosystem, and StackSentry leverages Azure for clients that require hybrid cloud solutions, Active Directory integration, or compliance with specific regulatory frameworks. Azure's strength in enterprise identity management, .NET ecosystem support, and hybrid cloud capabilities make it essential for certain projects. We architect solutions using Azure App Service, Azure Functions, Cosmos DB, and Azure DevOps. Our team understands the nuances of Azure networking, security groups, and resource management, enabling us to build secure, compliant cloud solutions that integrate seamlessly with existing enterprise infrastructure.",
    icon: "Cloud",
    experience: "intermediate",
    useCases: [
      "Enterprise hybrid cloud deployments",
      "Active Directory and SSO integration",
      "Regulatory-compliant cloud infrastructure",
    ],
    benefits: [
      "Deep enterprise Microsoft ecosystem integration",
      "Strong hybrid cloud capabilities",
      "Comprehensive compliance and security certifications",
    ],
    projectSlugs: [
      "school-erp",
    ],
    relatedTechnologies: ["aws", "docker"],
  },
  {
    slug: "tensorflow",
    name: "TensorFlow",
    category: "AI/ML",
    description: "End-to-end ML platform for deep learning",
    longDescription:
      "TensorFlow is Google's open-source machine learning framework that provides everything from model building to deployment at scale. StackSentry uses TensorFlow for projects requiring custom deep learning models — from computer vision and natural language processing to time-series prediction. Our ML engineers build, train, and optimize TensorFlow models using both the high-level Keras API and lower-level operations for custom architectures. We implement model serving with TensorFlow Serving, optimize inference with TensorRT, and deploy models as API endpoints or embedded in applications. TensorFlow's ecosystem for distributed training and production deployment makes it our choice for ML projects that need to scale from prototype to production.",
    icon: "Brain",
    experience: "intermediate",
    useCases: [
      "Custom deep learning model development",
      "Computer vision and image processing",
      "Time-series prediction and anomaly detection",
    ],
    benefits: [
      "End-to-end ML pipeline from training to deployment",
      "Support for distributed training at scale",
      "Extensive pre-trained models and transfer learning",
    ],
    projectSlugs: [
      "ai-resume-screening",
    ],
    relatedTechnologies: ["python", "openai"],
  },
  {
    slug: "openai",
    name: "OpenAI",
    category: "AI/ML",
    description: "GPT integration for conversational AI and content generation",
    longDescription:
      "OpenAI's GPT models represent the cutting edge of natural language AI, and StackSentry has deep expertise in integrating these models into production applications. We build conversational AI platforms, content generation systems, document analysis pipelines, and intelligent automation powered by GPT-4 and newer models. Our approach goes beyond simple API calls — we implement prompt engineering, fine-tuning, function calling, and retrieval-augmented generation (RAG) for domain-specific accuracy. We handle rate limiting, cost optimization, response streaming, and fallback strategies to ensure reliable AI-powered features. From chatbots to document intelligence, OpenAI integration is a core capability at StackSentry.",
    icon: "Brain",
    experience: "expert",
    useCases: [
      "Conversational AI and intelligent chatbots",
      "Content generation and document summarization",
      "Natural language understanding and extraction",
    ],
    benefits: [
      "State-of-the-art language understanding",
      "Rapid integration with existing applications",
      "Continuous model improvements via API updates",
    ],
    projectSlugs: [
      "ai-chatbot-platform",
      "ai-resume-screening",
    ],
    relatedTechnologies: ["langchain", "python"],
  },
  {
    slug: "langchain",
    name: "LangChain",
    category: "AI/ML",
    description: "Framework for building LLM-powered applications",
    longDescription:
      "LangChain is the leading framework for building applications powered by large language models, providing abstractions for chains, agents, memory, and retrieval-augmented generation. StackSentry uses LangChain to build sophisticated AI workflows that go beyond simple prompt-completion patterns. We implement RAG pipelines that ground LLM responses in enterprise knowledge bases, multi-step reasoning agents that can use tools, and conversational agents with persistent memory. LangChain's ecosystem — including LangSmith for observability and LangServe for deployment — enables us to build, debug, and monitor LLM applications with production-grade tooling. For projects requiring complex LLM orchestration, LangChain is our framework of choice.",
    icon: "Brain",
    experience: "advanced",
    useCases: [
      "Retrieval-augmented generation (RAG) systems",
      "Multi-step reasoning agents with tool use",
      "LLM-powered workflow automation",
    ],
    benefits: [
      "Abstractions for complex LLM orchestration patterns",
      "Built-in support for RAG and vector stores",
      "Extensive integration ecosystem for LLM providers",
    ],
    projectSlugs: [
      "ai-chatbot-platform",
    ],
    relatedTechnologies: ["openai", "python"],
  },
];

const technologyBySlug = new Map(TECHNOLOGIES.map((t) => [t.slug, t]));

export function getTechnologyBySlug(slug: string): TechnologyData | undefined {
  return technologyBySlug.get(slug);
}
