export type ArchitectureLayerData = {
  slug: string;
  title: string;
  layerOrder: number;
  description: string;
  responsibilities: string[];
  securityConsiderations: string[];
  scalabilityApproach: string[];
  performanceConsiderations: string[];
  technologies: string[];
};

export const ARCHITECTURE_LAYERS: ArchitectureLayerData[] = [
  {
    slug: "client-layer",
    title: "Client Layer",
    layerOrder: 1,
    description:
      "The user-facing presentation layer responsible for rendering interfaces, capturing user interactions, and communicating with backend services",
    responsibilities: [
      "Rendering responsive, accessible user interfaces across devices and browsers",
      "Client-side state management and optimistic UI updates for perceived performance",
      "Form validation, input sanitization, and graceful error handling on the frontend",
    ],
    securityConsiderations: [
      "Content Security Policy (CSP) headers to prevent XSS and code injection attacks",
      "Secure token storage using HttpOnly cookies or in-memory state with automatic expiry",
    ],
    scalabilityApproach: [
      "Static asset delivery via CDN for edge caching and global low-latency access",
      "Code splitting and lazy loading to minimize initial bundle size for fast first paint",
    ],
    performanceConsiderations: [
      "Targeting sub-1.5s Largest Contentful Paint (LCP) through optimized asset loading",
      "Server-side rendering or static generation for critical routes to improve SEO and initial load",
    ],
    technologies: [
      "React / Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    slug: "cdn-and-edge",
    title: "CDN & Edge",
    layerOrder: 2,
    description:
      "Distributed edge network that caches and serves static assets, API responses, and dynamic content close to the user's geographic location",
    responsibilities: [
      "Serving static assets (JS, CSS, images, fonts) from edge locations worldwide",
      "Edge-side caching of API responses and server-rendered pages with configurable TTL",
      "DDoS mitigation and Web Application Firewall (WAF) rule enforcement at the edge",
    ],
    securityConsiderations: [
      "TLS termination at the edge with automatic certificate management and HSTS enforcement",
      "Rate limiting and bot detection applied before traffic reaches the origin server",
    ],
    scalabilityApproach: [
      "Automatic global distribution of traffic across edge nodes with origin failover",
      "Cache invalidation APIs for selective purging without affecting other cached content",
    ],
    performanceConsiderations: [
      "Edge compute capabilities (Cloudflare Workers, Lambda@Edge) for personalization without origin round-trips",
      "Image transformation at the edge for device-appropriate format and resolution delivery",
    ],
    technologies: [
      "CloudFront / Cloudflare",
      "Edge Functions",
      "Brotli compression",
    ],
  },
  {
    slug: "load-balancer",
    title: "Load Balancer",
    layerOrder: 3,
    description:
      "Distributes incoming traffic across multiple application instances to ensure high availability, even load distribution, and graceful handling of failures",
    responsibilities: [
      "L7 load balancing with health checks and automatic removal of unhealthy instances",
      "SSL/TLS termination and HTTP/2 multiplexing for efficient connection handling",
      "Request routing based on path, headers, or geographic proximity to the nearest region",
    ],
    securityConsiderations: [
      "DDoS absorption through upstream provider capacity and connection rate limiting",
      "IP allowlisting for admin endpoints and internal-only traffic routing",
    ],
    scalabilityApproach: [
      "Auto-scaling integration that dynamically adds or removes backend instances based on metrics",
      "Session affinity options for stateful application requirements with sticky session support",
    ],
    performanceConsiderations: [
      "Connection pooling and keep-alive optimization to reduce backend connection overhead",
      "Request compression and response buffering for large payloads",
    ],
    technologies: [
      "AWS ALB / NLB",
      "NGINX",
      "HAProxy",
    ],
  },
  {
    slug: "web-application-layer",
    title: "Web Application Layer",
    layerOrder: 4,
    description:
      "The application server layer that serves server-rendered pages, handles server-side logic, and orchestrates communication between the client and backend services",
    responsibilities: [
      "Server-side rendering (SSR) and static site generation (SSG) for optimized page delivery",
      "Application-level routing, middleware processing, and request/response transformation",
      "Orchestration of data fetching from multiple backend services for each page request",
    ],
    securityConsiderations: [
      "Input validation and request sanitization at the server entry point before processing",
      "Secure session management with CSRF protection and automatic session expiry",
    ],
    scalabilityApproach: [
      "Stateless application design enabling horizontal scaling behind the load balancer",
      "Edge-rendered pages cached at CDN level to reduce application server load during traffic spikes",
    ],
    performanceConsiderations: [
      "Incremental Static Regeneration (ISR) to serve cached pages while rebuilding in the background",
      "Streaming server responses to begin delivering HTML before all data is resolved",
    ],
    technologies: [
      "Next.js Server Components",
      "Node.js",
      "Edge Runtime",
    ],
  },
  {
    slug: "api-gateway",
    title: "API Gateway",
    layerOrder: 5,
    description:
      "Unified entry point for all API requests providing authentication, rate limiting, request routing, and protocol translation",
    responsibilities: [
      "Request routing and versioning across downstream microservices",
      "Authentication and authorization enforcement before requests reach service logic",
      "Rate limiting, request throttling, and quota management per client or API key",
    ],
    securityConsiderations: [
      "Centralized JWT validation and token introspection for all downstream services",
      "Request and response transformation to prevent internal service details from leaking to clients",
    ],
    scalabilityApproach: [
      "Horizontal scaling of gateway instances with shared rate-limit state in Redis",
      "Request batching and response caching to reduce downstream service load",
    ],
    performanceConsiderations: [
      "gRPC and Protocol Buffer support for high-throughput internal communication",
      "Response compression and streaming for large payload delivery without buffering delays",
    ],
    technologies: [
      "Kong / AWS API Gateway",
      "GraphQL (Apollo)",
      "Rate limiting middleware",
    ],
  },
  {
    slug: "authentication-authorization",
    title: "Authentication & Authorization",
    layerOrder: 6,
    description:
      "Dedicated service layer responsible for identity verification, token issuance, and fine-grained access control enforcement",
    responsibilities: [
      "User authentication via credentials, SSO, and multi-factor authentication flows",
      "JWT access token and refresh token lifecycle management with rotation",
      "Role-based (RBAC) and attribute-based (ABAC) access policy evaluation",
    ],
    securityConsiderations: [
      "Credential storage using Argon2id or bcrypt with appropriate cost factors and salt",
      "Brute-force protection with progressive rate limiting and account lockout policies",
    ],
    scalabilityApproach: [
      "Stateless token validation enabling any service instance to verify requests without shared state",
      "Cached authorization policies to reduce policy evaluation latency at scale",
    ],
    performanceConsiderations: [
      "Token payload optimization to minimize bandwidth for every authenticated request",
      "Pre-computed permission sets cached in tokens to avoid database lookups on each request",
    ],
    technologies: [
      "OAuth 2.0 / OpenID Connect",
      "JWT",
      "Keycloak / Auth0",
    ],
  },
  {
    slug: "business-logic-microservices",
    title: "Business Logic / Microservices",
    layerOrder: 7,
    description:
      "Core domain services encapsulating business rules, workflows, and domain-specific operations behind well-defined interfaces",
    responsibilities: [
      "Implementing domain-specific business rules and workflow orchestration",
      "Processing commands and queries against the domain model with transactional integrity",
      "Publishing domain events for cross-service communication and eventual consistency",
    ],
    securityConsiderations: [
      "Service-to-service mutual TLS (mTLS) for encrypted internal communication",
      "Input validation and business rule enforcement independent of upstream validation",
    ],
    scalabilityApproach: [
      "Independent scaling of each service based on its specific load profile and resource needs",
      "Asynchronous message queues for decoupling high-throughput producers from consumers",
    ],
    performanceConsiderations: [
      "CQRS pattern separating read and write workloads for optimized query performance",
      "Event sourcing for audit-critical domains where the full change history must be preserved",
    ],
    technologies: [
      "NestJS / FastAPI",
      "RabbitMQ / Kafka",
      "Domain-Driven Design",
    ],
  },
  {
    slug: "database-layer",
    title: "Database Layer",
    layerOrder: 8,
    description:
      "Persistent data storage layer providing ACID transactions, complex queries, and durable data management for application state",
    responsibilities: [
      "Transactional data persistence with ACID guarantees for critical business operations",
      "Complex query execution, full-text search, and aggregation for analytics workloads",
      "Data integrity enforcement through constraints, triggers, and referential relationships",
    ],
    securityConsiderations: [
      "Encryption at rest with managed encryption keys and automated rotation",
      "Row-level security policies for multi-tenant data isolation at the database engine level",
    ],
    scalabilityApproach: [
      "Read replicas for distributing analytical and reporting query load across instances",
      "Table partitioning and sharding strategies for horizontal scaling of large datasets",
    ],
    performanceConsiderations: [
      "Query plan analysis and index optimization for frequently accessed access patterns",
      "Connection pooling via PgBouncer or built-in poolers to manage connection overhead efficiently",
    ],
    technologies: [
      "PostgreSQL",
      "MongoDB",
      "Elasticsearch",
    ],
  },
  {
    slug: "cache-layer",
    title: "Cache Layer",
    layerOrder: 9,
    description:
      "In-memory data store providing sub-millisecond access to frequently requested data, reducing database load and improving response times",
    responsibilities: [
      "Caching frequently read data such as user sessions, API responses, and configuration",
      "Session storage and management for authenticated user state across application instances",
      "Distributed locking and rate limiting counter storage for coordination across instances",
    ],
    securityConsiderations: [
      "Authentication and ACL enforcement on cache instances to prevent unauthorized data access",
      "No sensitive data cached without encryption and explicit TTL-based expiry policies",
    ],
    scalabilityApproach: [
      "Redis Cluster with automatic sharding for horizontal scaling of cache capacity",
      "Cache-aside pattern with graceful degradation when the cache layer is temporarily unavailable",
    ],
    performanceConsiderations: [
      "Cache hit ratio monitoring with alerting when ratios drop below defined thresholds",
      "Write-through and write-behind strategies chosen per use case to balance consistency and speed",
    ],
    technologies: [
      "Redis",
      "Memcached",
      "CDN edge cache",
    ],
  },
  {
    slug: "monitoring-observability",
    title: "Monitoring & Observability",
    layerOrder: 10,
    description:
      "Cross-cutting layer providing metrics, logging, distributed tracing, and alerting across every component of the architecture",
    responsibilities: [
      "Centralized log aggregation with structured logging across all application and infrastructure layers",
      "Distributed tracing with correlation IDs to track requests across service boundaries",
      "Real-time metrics collection, dashboarding, and threshold-based alerting for system health",
    ],
    securityConsiderations: [
      "Sensitive data scrubbing in logs to prevent PII and secrets from appearing in monitoring systems",
      "Access controls on monitoring platforms to restrict visibility to authorized personnel only",
    ],
    scalabilityApproach: [
      "Log sampling and tiered retention policies to manage storage costs at high volume",
      "Auto-scaling of monitoring infrastructure to handle traffic spikes without data loss",
    ],
    performanceConsiderations: [
      "Low-overhead instrumentation using OpenTelemetry to minimize impact on application performance",
      "Asynchronous log shipping to prevent logging from blocking application request processing",
    ],
    technologies: [
      "Datadog / Grafana",
      "OpenTelemetry",
      "Sentry",
    ],
  },
];

const layerBySlug = new Map(
  ARCHITECTURE_LAYERS.map((l) => [l.slug, l]),
);

export function getLayerBySlug(
  slug: string,
): ArchitectureLayerData | undefined {
  return layerBySlug.get(slug);
}
