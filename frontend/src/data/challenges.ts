export type ChallengeData = {
  slug: string;
  title: string;
  description: string;
  category: string;
  impact: string;
  symptoms: string[];
  rootCause: string;
  solutions: string[];
  relevantIndustries: string[];
};

export const CHALLENGES: ChallengeData[] = [
  {
    slug: "manual-processes",
    title: "Manual Processes",
    description:
      "Reliance on spreadsheets, paper forms, and repetitive manual tasks that consume employee time and introduce errors.",
    category: "Operations",
    impact: "High",
    symptoms: [
      "Employees spending 60%+ of their time on repetitive data entry",
      "Frequent errors in reports and records requiring rework",
      "Slow turnaround times for customer-facing processes",
    ],
    rootCause:
      "Lack of automation tools and digital workflow systems to handle routine business operations.",
    solutions: [
      "Workflow automation with rules-based task routing",
      "RPA (Robotic Process Automation) for repetitive tasks",
      "Digital form replacement with intelligent data capture",
    ],
    relevantIndustries: [
      "healthcare",
      "education",
      "government",
      "manufacturing",
      "logistics",
    ],
  },
  {
    slug: "disconnected-systems",
    title: "Disconnected Systems",
    description:
      "Multiple software tools that do not communicate, creating operational silos and duplicate data entry.",
    category: "Integration",
    impact: "High",
    symptoms: [
      "Teams manually transferring data between systems",
      "Inconsistent data across departments leading to conflicts",
      "No single source of truth for business-critical information",
    ],
    rootCause:
      "Siloed software procurement decisions with no enterprise integration strategy or middleware layer.",
    solutions: [
      "Enterprise Service Bus (ESB) or API gateway integration",
      "Centralized data platform with real-time sync",
      "Microservices architecture replacing monolithic legacy systems",
    ],
    relevantIndustries: [
      "healthcare",
      "finance",
      "manufacturing",
      "government",
      "retail",
    ],
  },
  {
    slug: "legacy-software",
    title: "Legacy Software",
    description:
      "Outdated systems built on unsupported technologies that are costly to maintain and impossible to scale.",
    category: "Technology",
    impact: "Critical",
    symptoms: [
      "Frequent system outages and performance degradation",
      "Inability to integrate with modern tools and APIs",
      "High maintenance costs with specialized vendor dependencies",
    ],
    rootCause:
      "Technology debt accumulated over years of incremental patches without modernization investment.",
    solutions: [
      "Strangler Fig pattern for incremental migration",
      "Cloud-native re-architecture of core systems",
      "API wrapping of legacy systems as an interim measure",
    ],
    relevantIndustries: [
      "finance",
      "healthcare",
      "government",
      "manufacturing",
      "logistics",
    ],
  },
  {
    slug: "security-concerns",
    title: "Security Concerns",
    description:
      "Vulnerabilities in infrastructure and applications that expose sensitive data to breaches and compliance violations.",
    category: "Security",
    impact: "Critical",
    symptoms: [
      "Frequent phishing attacks and unauthorized access attempts",
      "Lack of audit trails for sensitive data access",
      "Failed security audits and compliance assessments",
    ],
    rootCause:
      "Insufficient security architecture, lack of defense-in-depth, and absence of continuous monitoring.",
    solutions: [
      "Zero-trust security architecture implementation",
      "Automated vulnerability scanning and penetration testing",
      "SIEM deployment with real-time threat detection",
    ],
    relevantIndustries: [
      "finance",
      "healthcare",
      "government",
      "e-commerce",
      "recruitment",
    ],
  },
  {
    slug: "poor-scalability",
    title: "Poor Scalability",
    description:
      "Systems that cannot handle growth in users, transactions, or data volume without degradation.",
    category: "Technology",
    impact: "High",
    symptoms: [
      "Application crashes during peak traffic periods",
      "Performance degradation as database size grows",
      "Inability to launch new products or features quickly",
    ],
    rootCause:
      "Monolithic architecture, tight coupling, and lack of horizontal scaling capabilities.",
    solutions: [
      "Microservices decomposition of monolithic applications",
      "Container orchestration with Kubernetes auto-scaling",
      "Database sharding and read-replica strategies",
    ],
    relevantIndustries: [
      "e-commerce",
      "finance",
      "logistics",
      "travel",
      "retail",
    ],
  },
  {
    slug: "data-silos",
    title: "Data Silos",
    description:
      "Isolated data stores across departments that prevent unified analytics and decision-making.",
    category: "Data",
    impact: "High",
    symptoms: [
      "Different departments reporting conflicting KPIs",
      "Inability to generate cross-functional business reports",
      "Duplicated data storage with inconsistent formats",
    ],
    rootCause:
      "Department-specific tools without a unified data strategy or governance framework.",
    solutions: [
      "Data lake or warehouse consolidation with ETL pipelines",
      "Master Data Management (MDM) implementation",
      "Self-service BI dashboards with governed data models",
    ],
    relevantIndustries: [
      "healthcare",
      "manufacturing",
      "retail",
      "hospitality",
      "education",
    ],
  },
  {
    slug: "slow-reporting",
    title: "Slow Reporting",
    description:
      "Delayed access to business insights due to manual report generation and slow data aggregation.",
    category: "Data",
    impact: "Medium",
    symptoms: [
      "Weekly reports delivered 3-5 days after the reporting period",
      "Manually compiled spreadsheets with formula errors",
      "Leadership making decisions on outdated data",
    ],
    rootCause:
      "Lack of automated reporting infrastructure and real-time data pipelines.",
    solutions: [
      "Real-time analytics dashboards with live data feeds",
      "Automated report generation and distribution",
      "OLAP cubes or materialized views for complex queries",
    ],
    relevantIndustries: [
      "finance",
      "manufacturing",
      "retail",
      "logistics",
      "hospitality",
    ],
  },
  {
    slug: "compliance",
    title: "Compliance",
    description:
      "Difficulty meeting regulatory requirements across multiple jurisdictions with manual compliance processes.",
    category: "Regulatory",
    impact: "Critical",
    symptoms: [
      "Penalties and fines for missed regulatory deadlines",
      "Extensive manual effort during audit periods",
      "Inconsistent policy enforcement across the organization",
    ],
    rootCause:
      "Absence of automated compliance monitoring and policy enforcement mechanisms.",
    solutions: [
      "Automated compliance monitoring with rule engines",
      "Digital audit trails with immutable logging",
      "Policy-as-code enforcement in CI/CD pipelines",
    ],
    relevantIndustries: [
      "finance",
      "healthcare",
      "government",
      "e-commerce",
      "real-estate",
    ],
  },
  {
    slug: "customer-experience",
    title: "Customer Experience",
    description:
      "Poor customer journeys caused by fragmented touchpoints, slow response times, and lack of personalization.",
    category: "Experience",
    impact: "High",
    symptoms: [
      "High customer churn rates and negative reviews",
      "Long response times on customer inquiries and complaints",
      "No personalization in customer interactions or recommendations",
    ],
    rootCause:
      "Lack of unified customer data platform and omnichannel orchestration.",
    solutions: [
      "Customer Data Platform (CDP) with 360-degree view",
      "AI-powered personalization engine for recommendations",
      "Omnichannel engagement platform with real-time routing",
    ],
    relevantIndustries: [
      "retail",
      "e-commerce",
      "hospitality",
      "travel",
      "recruitment",
    ],
  },
  {
    slug: "recruitment-delays",
    title: "Recruitment Delays",
    description:
      "Extended time-to-hire due to manual screening, poor candidate pipeline visibility, and slow interview coordination.",
    category: "Operations",
    impact: "High",
    symptoms: [
      "Average time-to-hire exceeding 60 days for standard roles",
      "Top candidates accepting offers from competitors",
      "Recruiters spending 70% of time on administrative tasks",
    ],
    rootCause:
      "Manual recruitment workflows without AI-assisted screening or pipeline automation.",
    solutions: [
      "AI-powered resume screening and candidate matching",
      "Automated interview scheduling with calendar integration",
      "Talent pipeline nurturing with drip campaigns",
    ],
    relevantIndustries: [
      "recruitment",
      "healthcare",
      "technology",
      "finance",
    ],
  },
  {
    slug: "inventory-issues",
    title: "Inventory Issues",
    description:
      "Inaccurate stock levels, frequent stockouts, and excess inventory tying up working capital.",
    category: "Operations",
    impact: "High",
    symptoms: [
      "Frequent stockouts leading to lost sales and backorders",
      "Excess inventory consuming warehouse space and capital",
      "Manual cycle counts revealing 15-20% inventory discrepancies",
    ],
    rootCause:
      "Lack of real-time inventory visibility and demand forecasting capabilities.",
    solutions: [
      "Real-time inventory management with IoT and barcode integration",
      "AI-driven demand forecasting and automatic reorder triggers",
      "Multi-warehouse inventory optimization and allocation",
    ],
    relevantIndustries: [
      "retail",
      "e-commerce",
      "manufacturing",
      "logistics",
    ],
  },
  {
    slug: "high-operational-costs",
    title: "High Operational Costs",
    description:
      "Escalating operational expenses due to inefficiencies, redundant systems, and poor resource utilization.",
    category: "Financial",
    impact: "Critical",
    symptoms: [
      "Operating costs growing faster than revenue",
      "Low employee productivity relative to industry benchmarks",
      "High overhead from maintaining multiple redundant tools",
    ],
    rootCause:
      "Process inefficiencies, technology fragmentation, and lack of automation.",
    solutions: [
      "Process mining and optimization with intelligent automation",
      "System consolidation reducing tool sprawl and licensing costs",
      "Cloud migration eliminating on-premise infrastructure overhead",
    ],
    relevantIndustries: [
      "manufacturing",
      "logistics",
      "healthcare",
      "government",
      "hospitality",
    ],
  },
  {
    slug: "quality-control",
    title: "Quality Control",
    description:
      "Inconsistent product or service quality due to manual inspection and lack of statistical process control.",
    category: "Operations",
    impact: "High",
    symptoms: [
      "Defect rates exceeding acceptable thresholds in production",
      "Customer complaints about inconsistent service delivery",
      "High rework and waste costs eroding profit margins",
    ],
    rootCause:
      "Absence of real-time quality monitoring and statistical process control systems.",
    solutions: [
      "Statistical Process Control (SPC) with real-time dashboards",
      "IoT-based anomaly detection on production lines",
      "Automated quality gates in build and deployment pipelines",
    ],
    relevantIndustries: [
      "manufacturing",
      "healthcare",
      "hospitality",
      "logistics",
    ],
  },
  {
    slug: "communication-gaps",
    title: "Communication Gaps",
    description:
      "Poor internal and external communication leading to misalignment, delays, and customer dissatisfaction.",
    category: "Experience",
    impact: "Medium",
    symptoms: [
      "Teams working with outdated information and priorities",
      "Customers receiving inconsistent messaging across channels",
      "Missed handoffs between departments in critical workflows",
    ],
    rootCause:
      "Lack of unified communication platforms and standardized workflow handoff processes.",
    solutions: [
      "Unified communication platform with workflow integration",
      "Automated notification and escalation systems",
      "Shared workspaces with real-time collaboration tools",
    ],
    relevantIndustries: [
      "healthcare",
      "education",
      "hospitality",
      "travel",
      "government",
    ],
  },
  {
    slug: "talent-retention",
    title: "Talent Retention",
    description:
      "Difficulty retaining skilled employees due to poor experiences, lack of growth paths, and outdated tools.",
    category: "People",
    impact: "High",
    symptoms: [
      "Annual voluntary turnover rates exceeding industry averages",
      "Low employee satisfaction survey scores",
      "High recruitment costs replacing departing employees",
    ],
    rootCause:
      "Absence of employee experience platforms, career development tools, and modern digital workplace solutions.",
    solutions: [
      "Employee experience platform with engagement tracking",
      "AI-powered career pathing and skills gap analysis",
      "Modern digital workplace with self-service HR tools",
    ],
    relevantIndustries: [
      "technology",
      "healthcare",
      "finance",
      "recruitment",
      "manufacturing",
    ],
  },
  {
    slug: "remote-collaboration",
    title: "Remote Collaboration",
    description:
      "Ineffective remote and hybrid work processes that reduce productivity and disconnect distributed teams.",
    category: "Operations",
    impact: "Medium",
    symptoms: [
      "Project delays due to timezone and communication barriers",
      "Inconsistent productivity tracking for remote teams",
      "Difficulty maintaining company culture across distributed teams",
    ],
    rootCause:
      "Lack of remote-first tooling, asynchronous collaboration processes, and distributed team management.",
    solutions: [
      "Remote-first project management with async communication",
      "Virtual workspace platforms with real-time co-editing",
      "Distributed team analytics and engagement dashboards",
    ],
    relevantIndustries: [
      "technology",
      "recruitment",
      "education",
      "e-commerce",
      "finance",
    ],
  },
  {
    slug: "cloud-migration-risk",
    title: "Cloud Migration Risk",
    description:
      "Uncertainty and risk in migrating critical workloads from on-premise infrastructure to cloud platforms.",
    category: "Technology",
    impact: "High",
    symptoms: [
      "Fear of downtime during migration disrupting business",
      "Unclear cost projections leading to budget overruns",
      "Data loss or security gaps during transition periods",
    ],
    rootCause:
      "Lack of cloud migration expertise, incomplete assessment of dependencies, and absence of phased migration plans.",
    solutions: [
      "Cloud readiness assessment with dependency mapping",
      "Phased migration with parallel-run validation",
      "Cloud-native refactoring for long-term cost optimization",
    ],
    relevantIndustries: [
      "healthcare",
      "finance",
      "government",
      "manufacturing",
      "education",
    ],
  },
  {
    slug: "analytics-insight-gap",
    title: "Analytics & Insight Gap",
    description:
      "Inability to turn raw data into actionable business intelligence for strategic decision-making.",
    category: "Data",
    impact: "High",
    symptoms: [
      "Leadership relying on intuition rather than data",
      "Marketing campaigns without measurable attribution",
      "No predictive models for demand, churn, or risk",
    ],
    rootCause:
      "Absence of analytics infrastructure, data literacy gaps, and lack of self-service BI tools.",
    solutions: [
      "Enterprise data platform with governed data models",
      "Self-service BI with drag-and-drop dashboarding",
      "Machine learning models for predictive analytics",
    ],
    relevantIndustries: [
      "finance",
      "retail",
      "e-commerce",
      "healthcare",
      "logistics",
    ],
  },
];

export function getChallengeBySlug(slug: string): ChallengeData | undefined {
  return CHALLENGES.find((c) => c.slug === slug);
}

export function getChallengesByCategory(category: string): ChallengeData[] {
  return CHALLENGES.filter(
    (c) => c.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getChallengesByIndustry(industry: string): ChallengeData[] {
  return CHALLENGES.filter((c) =>
    c.relevantIndustries.includes(industry.toLowerCase()),
  );
}

export function getChallengesBySlugs(slugs: string[]): ChallengeData[] {
  return slugs.map((slug) => getChallengeBySlug(slug)).filter(Boolean) as ChallengeData[];
}
