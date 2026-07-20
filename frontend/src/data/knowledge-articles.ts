export type KnowledgeArticleData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  order: number;
};

export const KNOWLEDGE_ARTICLES: KnowledgeArticleData[] = [
  {
    slug: "microservices-vs-modular-monolith",
    title: "Microservices vs Modular Monolith",
    excerpt:
      "A practical comparison of decomposition strategies — when a well-structured modular monolith outperforms premature microservice adoption, and when the boundaries of microservices justify the operational complexity",
    category: "Architecture Guides",
    tags: [
      "architecture",
      "microservices",
      "modular-monolith",
      "system-design",
    ],
    readTime: "8 min read",
    order: 1,
  },
  {
    slug: "event-driven-architecture-patterns",
    title: "Event-Architecture Patterns",
    excerpt:
      "Deep dive into event sourcing, CQRS, and pub/sub patterns — how event-driven architectures decouple services, enable real-time features, and create audit-friendly data flows at scale",
    category: "Architecture Guides",
    tags: [
      "event-driven",
      "cqrs",
      "event-sourcing",
      "architecture",
    ],
    readTime: "10 min read",
    order: 2,
  },
  {
    slug: "api-gateway-design",
    title: "API Gateway Design",
    excerpt:
      "Designing an API gateway that handles authentication, rate limiting, request routing, and protocol translation — the patterns that keep your microservice mesh secure and performant",
    category: "Architecture Guides",
    tags: [
      "api-gateway",
      "microservices",
      "authentication",
      "infrastructure",
    ],
    readTime: "7 min read",
    order: 3,
  },
  {
    slug: "choosing-the-right-tech-stack",
    title: "Choosing the Right Tech Stack",
    excerpt:
      "A decision framework for selecting technologies based on team expertise, project requirements, ecosystem maturity, and long-term maintainability rather than hype cycles",
    category: "Technology Insights",
    tags: [
      "tech-stack",
      "decision-making",
      "frameworks",
      "planning",
    ],
    readTime: "9 min read",
    order: 4,
  },
  {
    slug: "cloud-migration-strategy",
    title: "Cloud Migration Strategy",
    excerpt:
      "Step-by-step approach to migrating on-premise workloads to the cloud — from initial assessment and workload classification through phased migration and cost optimization",
    category: "Technology Insights",
    tags: [
      "cloud",
      "migration",
      "aws",
      "infrastructure",
    ],
    readTime: "11 min read",
    order: 5,
  },
  {
    slug: "modern-frontend-architecture",
    title: "Modern Frontend Architecture",
    excerpt:
      "How server components, streaming SSR, islands architecture, and edge rendering are reshaping frontend development — and how to choose the right rendering strategy for your use case",
    category: "Technology Insights",
    tags: [
      "frontend",
      "react",
      "nextjs",
      "rendering",
    ],
    readTime: "8 min read",
    order: 6,
  },
  {
    slug: "building-a-security-first-culture",
    title: "Building a Security-First Culture",
    excerpt:
      "How to embed security awareness across engineering teams — from threat modeling workshops and secure coding training to automated security gates in CI/CD that catch issues before they ship",
    category: "Security Tips",
    tags: [
      "security",
      "culture",
      "devsecops",
      "training",
    ],
    readTime: "6 min read",
    order: 7,
  },
  {
    slug: "owasp-top-10-explained",
    title: "OWASP Top 10 Explained",
    excerpt:
      "Plain-language walkthrough of the OWASP Top 10 web application security risks — what each vulnerability means, real-world examples, and the specific defenses that prevent them in modern applications",
    category: "Security Tips",
    tags: [
      "owasp",
      "security",
      "vulnerabilities",
      "web-security",
    ],
    readTime: "12 min read",
    order: 8,
  },
  {
    slug: "zero-trust-architecture",
    title: "Zero Trust Architecture",
    excerpt:
      "Moving beyond perimeter security — how Zero Trust principles of never trust, always verify reshape network design, identity management, and micro-segmentation in modern cloud-native environments",
    category: "Security Tips",
    tags: [
      "zero-trust",
      "security",
      "network",
      "identity",
    ],
    readTime: "9 min read",
    order: 9,
  },
  {
    slug: "achieving-95-lighthouse-score",
    title: "Achieving 95+ Lighthouse Score",
    excerpt:
      "Practical guide to systematically improving Lighthouse scores — identifying the highest-impact optimizations for each metric and implementing them without compromising developer experience",
    category: "Performance",
    tags: [
      "performance",
      "lighthouse",
      "optimization",
      "web-vitals",
    ],
    readTime: "10 min read",
    order: 10,
  },
  {
    slug: "image-optimization-at-scale",
    title: "Image Optimization at Scale",
    excerpt:
      "Automated image pipelines that handle format conversion, responsive sizing, lazy loading, and CDN delivery for platforms serving millions of images across diverse devices and network conditions",
    category: "Performance",
    tags: [
      "images",
      "performance",
      "cdn",
      "optimization",
    ],
    readTime: "7 min read",
    order: 11,
  },
  {
    slug: "caching-strategies-for-web-apps",
    title: "Caching Strategies for Web Apps",
    excerpt:
      "From browser cache headers to Redis and CDN edge caching — a layered approach to caching that dramatically reduces load times and server costs without sacrificing data freshness",
    category: "Performance",
    tags: [
      "caching",
      "redis",
      "cdn",
      "performance",
    ],
    readTime: "8 min read",
    order: 12,
  },
];

const articleBySlug = new Map(
  KNOWLEDGE_ARTICLES.map((a) => [a.slug, a]),
);

export function getArticleBySlug(
  slug: string,
): KnowledgeArticleData | undefined {
  return articleBySlug.get(slug);
}

const articlesByCategory = new Map<string, KnowledgeArticleData[]>();
for (const article of KNOWLEDGE_ARTICLES) {
  const existing = articlesByCategory.get(article.category) ?? [];
  existing.push(article);
  articlesByCategory.set(article.category, existing);
}

export function getArticlesByCategory(
  category: string,
): KnowledgeArticleData[] {
  return articlesByCategory.get(category) ?? [];
}

export function searchArticles(query: string): KnowledgeArticleData[] {
  const lower = query.toLowerCase();
  return KNOWLEDGE_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(lower) ||
      a.excerpt.toLowerCase().includes(lower) ||
      a.tags.some((t) => t.toLowerCase().includes(lower)),
  );
}
