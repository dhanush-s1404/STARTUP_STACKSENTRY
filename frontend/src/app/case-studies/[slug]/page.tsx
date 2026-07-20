import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetailHero } from "@/features/case-studies/components/case-study-detail-hero";
import { CaseStudyDetailContent } from "@/features/case-studies/components/case-study-detail-content";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

type CaseStudyData = {
  slug: string;
  title: string;
  subtitle: string;
  technologiesUsed: string[];
  clientBackground: string;
  businessChallenge: string;
  discoveryPhase: string;
  requirements: string[];
  research: string;
  developmentProcess: string;
  deployment: string;
  results: string;
  kpis: { metric: string; before: string; after: string; improvement: string }[];
  roi: string;
  performanceImprovements: string[];
  lessonsLearned: string[];
  futureRoadmap: string[];
  timelineEvents: { phase: string; title: string; description: string; duration: string }[];
};

const caseStudies: CaseStudyData[] = [
  {
    slug: "ai-recruitment-transformation",
    title: "AI-Powered Recruitment Transformation",
    subtitle: "How we reduced hiring time by 60% for a Fortune 500 company",
    technologiesUsed: ["React", "Python", "OpenAI", "PostgreSQL"],
    clientBackground:
      "Our client is a Fortune 500 technology company with over 15,000 employees across 12 countries. Their recruitment team processed over 50,000 applications annually but struggled with long hiring cycles, inconsistent candidate evaluation, and high recruiter burnout rates. The existing ATS was outdated and couldn't leverage AI to streamline the hiring pipeline.",
    businessChallenge:
      "The average time-to-hire was 67 days, significantly above the industry benchmark of 42 days. Recruiters spent 70% of their time on repetitive screening tasks. Candidate quality varied wildly due to inconsistent evaluation criteria. The company was losing top talent to competitors who could move faster in the hiring process.",
    discoveryPhase:
      "We conducted a 3-week discovery phase, interviewing 25 recruiters, 15 hiring managers, and 10 candidates. We mapped the entire recruitment workflow, identified bottlenecks, and analyzed 6 months of hiring data to understand patterns in successful vs. unsuccessful hires.",
    requirements: [
      "AI-powered resume screening with 95%+ accuracy",
      "Automated candidate matching against job requirements",
      "Structured interview scoring system",
      "Real-time analytics dashboard for recruitment metrics",
      "Integration with existing Workday HRIS",
      "GDPR-compliant data handling",
    ],
    research:
      "We benchmarked against leading AI recruitment tools and conducted extensive A/B testing with our ML models. Our research showed that combining semantic understanding of resumes with structured data extraction yielded the best results. We also studied bias mitigation techniques to ensure fair candidate evaluation.",
    developmentProcess:
      "Using an agile methodology with 2-week sprints, we built the platform iteratively. The AI pipeline was developed in parallel with the frontend, allowing us to validate ML model accuracy early. We deployed daily builds to a staging environment for continuous feedback from the recruitment team.",
    deployment:
      "The platform was deployed in phases: first to a pilot team of 10 recruiters, then expanded to the full 50-person recruitment team over 6 weeks. We provided hands-on training sessions and created comprehensive documentation. The legacy ATS was gradually phased out as confidence in the new system grew.",
    results:
      "Within 3 months of full deployment, the recruitment team reported dramatic improvements. Time-to-hire dropped from 67 to 27 days. Recruiters reclaimed 40+ hours per week previously spent on manual screening. Candidate satisfaction scores improved by 35%, and the quality of hires, measured by first-year retention, increased by 28%.",
    kpis: [
      { metric: "Hiring Time", before: "67 days", after: "27 days", improvement: "60% reduction" },
      { metric: "Candidate Quality", before: "62% pass rate", after: "87% pass rate", improvement: "40% increase" },
      { metric: "Cost per Hire", before: "$4,200", after: "$2,730", improvement: "35% savings" },
      { metric: "Recruiter Productivity", before: "12 hires/mo", after: "31 hires/mo", improvement: "158% increase" },
      { metric: "Candidate Satisfaction", before: "3.2/5", after: "4.5/5", improvement: "41% improvement" },
      { metric: "First-Year Retention", before: "72%", after: "92%", improvement: "28% increase" },
    ],
    roi: "The platform delivered a 340% ROI within the first year. The $450K investment in development was offset by $1.58M in savings from reduced time-to-hire, lower recruiter headcount needs, and improved retention. The company estimates an additional $2.1M in avoided costs from not losing candidates to competitors.",
    performanceImprovements: [
      "Resume screening time reduced from 8 minutes to 45 seconds per candidate",
      "AI matching accuracy achieved 94.7% precision and 91.2% recall",
      "System processes 500+ applications per hour during peak periods",
      "99.98% uptime maintained since launch",
      "API response times consistently under 200ms",
    ],
    lessonsLearned: [
      "Early involvement of end users in model training significantly improved adoption",
      "Bias auditing must be continuous, not a one-time check",
      "Hybrid AI-human workflows outperform fully automated approaches for high-stakes decisions",
      "Investing in explainability builds trust with non-technical stakeholders",
    ],
    futureRoadmap: [
      "Expand AI capabilities to internal mobility and succession planning",
      "Add video interview analysis with sentiment detection",
      "Integrate predictive analytics for workforce planning",
      "Build a talent marketplace using the candidate database",
    ],
    timelineEvents: [
      { phase: "Discovery", title: "Research & Analysis", description: "Stakeholder interviews, workflow mapping, and data analysis to identify key pain points and opportunities.", duration: "3 weeks" },
      { phase: "Design", title: "UX/UI Design & Prototyping", description: "Created user flows, wireframes, and interactive prototypes validated with recruiters and hiring managers.", duration: "4 weeks" },
      { phase: "Development", title: "Core Platform Build", description: "Built the AI pipeline, frontend application, and integration layer with iterative feedback loops.", duration: "16 weeks" },
      { phase: "Testing", title: "QA & Model Validation", description: "Comprehensive testing including bias auditing, performance testing, and user acceptance testing.", duration: "3 weeks" },
      { phase: "Deployment", title: "Phased Rollout", description: "Pilot launch with 10 recruiters, gradual expansion, training sessions, and legacy system migration.", duration: "6 weeks" },
    ],
  },
  {
    slug: "hospital-digital-transformation",
    title: "Hospital Digital Transformation",
    subtitle: "Digitizing patient management for a 500-bed hospital network",
    technologiesUsed: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
    clientBackground:
      "A network of 5 hospitals with 500 total beds serving a metropolitan area of 2 million people. The organization was running on a 15-year-old legacy system with paper-based workflows in many departments. Staff spent hours each day on manual data entry, and patients faced long wait times due to inefficient scheduling.",
    businessChallenge:
      "Patient wait times averaged 45 minutes in the ER and 30 minutes for scheduled appointments. Paper-based processes led to frequent data entry errors, duplicate records, and delayed diagnoses. Staff morale was declining due to administrative burden. The hospital network was at risk of losing accreditation.",
    discoveryPhase:
      "Our team embedded within the hospital for 4 weeks, shadowing doctors, nurses, and administrative staff across all departments. We observed workflows, identified pain points, and mapped critical data flows. We also reviewed regulatory requirements including HIPAA compliance mandates.",
    requirements: [
      "HIPAA-compliant patient management system",
      "Real-time bed management and patient tracking",
      "Digital prescriptions and lab result delivery",
      "Patient portal for appointment scheduling",
      "Integration with existing medical devices and lab systems",
      "Offline capability for critical functions",
    ],
    research:
      "We studied leading hospital information systems globally and conducted competitive analysis. Our research emphasized the importance of reducing clicks for clinical staff and ensuring the system worked reliably even during network interruptions. We also analyzed patient journey maps to optimize the patient-facing portal.",
    developmentProcess:
      "We adopted a modular approach, building core modules (registration, scheduling, billing) first, followed by clinical modules (EHR, prescriptions, lab integration). Each module went through clinical validation before deployment. The development was closely coordinated with the hospital's IT team.",
    deployment:
      "A phased deployment across 5 hospitals over 4 months, starting with the smallest facility as a pilot. Each hospital received 2 weeks of on-site training. We maintained parallel running of old and new systems during transition. A dedicated support team was available 24/7 during the rollout period.",
    results:
      "The transformation delivered immediate impact. Patient wait times dropped dramatically. Staff reported significant reduction in administrative tasks. The digital system reduced medical errors by 40% through automated checks and alerts. The hospital network achieved full HIPAA compliance and received positive feedback from accreditation auditors.",
    kpis: [
      { metric: "Patient Wait Time", before: "45 min avg", after: "25 min avg", improvement: "45% reduction" },
      { metric: "Paper Usage", before: "12,000 pages/day", after: "1,200 pages/day", improvement: "90% reduction" },
      { metric: "Staff Efficiency", before: "60% admin", after: "20% admin", improvement: "3x improvement" },
      { metric: "Medical Errors", before: "8.2/month", after: "4.9/month", improvement: "40% reduction" },
      { metric: "Patient Satisfaction", before: "3.1/5", after: "4.6/5", improvement: "48% increase" },
    ],
    roi: "The $1.2M investment delivered $4.8M in annual savings through reduced paper costs, improved staff productivity, fewer medical errors, and increased patient throughput. Patient revenue increased 18% due to higher throughput and improved satisfaction scores.",
    performanceImprovements: [
      "System handles 10,000+ patient records with sub-second queries",
      "Real-time bed occupancy tracking with 99.99% accuracy",
      "Digital prescriptions reduce turnaround from 4 hours to 15 minutes",
      "Patient portal adoption reached 65% within 6 months",
      "Zero unplanned downtime since go-live",
    ],
    lessonsLearned: [
      "Clinical staff need hands-on training, not just documentation",
      "Offline-first design is non-negotiable in healthcare",
      "Involving doctors as champions drives adoption faster than top-down mandates",
      "Data migration from legacy systems requires careful validation",
    ],
    futureRoadmap: [
      "AI-assisted diagnosis support for radiology and pathology",
      "Telemedicine platform integration",
      "Predictive analytics for patient readmission prevention",
      "IoT integration for real-time patient monitoring",
    ],
    timelineEvents: [
      { phase: "Discovery", title: "Clinical Workflow Analysis", description: "Embedded within the hospital to observe and map clinical workflows across all departments.", duration: "4 weeks" },
      { phase: "Design", title: "System Architecture & UI Design", description: "Designed HIPAA-compliant architecture and created clinical-grade UI with input from medical staff.", duration: "5 weeks" },
      { phase: "Development", title: "Core & Clinical Modules", description: "Built registration, scheduling, EHR, prescriptions, and lab integration modules.", duration: "20 weeks" },
      { phase: "Testing", title: "Clinical Validation", description: "Rigorous testing including clinical validation, security auditing, and compliance verification.", duration: "4 weeks" },
      { phase: "Deployment", title: "Hospital-by-Hospital Rollout", description: "Phased deployment across 5 hospitals with parallel running and 24/7 support.", duration: "16 weeks" },
    ],
  },
  {
    slug: "ecommerce-scale",
    title: "Scaling E-Commerce to 1M Users",
    subtitle: "Building infrastructure that handles Black Friday traffic spikes",
    technologiesUsed: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
    clientBackground:
      "A fast-growing e-commerce platform specializing in consumer electronics, serving 200,000 active users with plans to expand to 1M. The existing monolithic architecture was struggling to handle traffic spikes, resulting in frequent downtime during marketing campaigns and holiday seasons.",
    businessChallenge:
      "The platform experienced a 47% revenue loss during the previous Black Friday due to server crashes. Page load times averaged 6 seconds, well above the 2-second e-commerce benchmark. The monolithic architecture made it impossible to scale individual components. The CTO estimated they'd lose $3M in the next major traffic event without intervention.",
    discoveryPhase:
      "We conducted a comprehensive infrastructure audit, load testing, and codebase analysis over 3 weeks. We identified critical bottlenecks in the database layer, unoptimized API endpoints, and missing caching strategies. We also analyzed traffic patterns from previous high-traffic events.",
    requirements: [
      "Handle 100,000+ concurrent users without degradation",
      "Sub-2-second page load times globally",
      "99.99% uptime during peak events",
      "Auto-scaling based on traffic patterns",
      "Real-time inventory management across warehouses",
      "PCI DSS compliant payment processing",
    ],
    research:
      "We studied architecture patterns used by Amazon, Shopify, and other high-scale e-commerce platforms. Our research focused on event-driven architectures, CDN strategies, and database optimization patterns. We also evaluated container orchestration options for the migration.",
    developmentProcess:
      "We decomposed the monolith into 12 microservices over 20 weeks. Each service was independently deployable and scalable. We implemented event-driven communication using message queues and established CI/CD pipelines for each service. The migration was done incrementally with feature flags to minimize risk.",
    deployment:
      "The new architecture was deployed on AWS with a multi-region setup. We ran extensive load testing simulating 150,000 concurrent users before the Black Friday event. A war room was established for the event with real-time monitoring and auto-scaling policies tuned for traffic spikes.",
    results:
      "The first Black Friday on the new platform handled 127,000 concurrent users with zero downtime. Page load times dropped to 1.8 seconds globally. Revenue increased 200% year-over-year. The platform has since handled multiple high-traffic events without issues, and the engineering team can deploy updates 10x faster.",
    kpis: [
      { metric: "Page Load", before: "6.2s average", after: "1.8s average", improvement: "71% faster" },
      { metric: "Uptime", before: "97.2%", after: "99.99%", improvement: "2.8% improvement" },
      { metric: "Revenue", before: "$2.1M/mo", after: "$6.3M/mo", improvement: "200% growth" },
      { metric: "Concurrent Users", before: "15,000 max", after: "127,000 max", improvement: "8.5x capacity" },
      { metric: "Deploy Frequency", before: "2x/month", after: "20x/day", improvement: "300x increase" },
    ],
    roi: "The $800K infrastructure investment generated $25M in additional annual revenue. The $3M in previously lost Black Friday revenue was fully recovered. Infrastructure costs decreased 35% through optimization despite handling 8x more traffic.",
    performanceImprovements: [
      "CDN caching reduced origin server load by 85%",
      "Database query optimization reduced average query time from 450ms to 12ms",
      "Redis caching layer handles 50,000 reads/ms during peak",
      "Auto-scaling spins up new instances in under 30 seconds",
      "Image optimization pipeline reduced asset sizes by 60%",
    ],
    lessonsLearned: [
      "Incremental migration is safer and more manageable than big-bang rewrites",
      "Load testing must simulate realistic user behavior, not just raw throughput",
      "Observability (logs, metrics, traces) is essential before scaling",
      "Database sharding strategy should be planned from day one of the migration",
    ],
    futureRoadmap: [
      "Global CDN expansion to 50+ edge locations",
      "AI-powered personalization engine for product recommendations",
      "Voice commerce integration",
      "Real-time collaborative shopping features",
    ],
    timelineEvents: [
      { phase: "Discovery", title: "Infrastructure Audit", description: "Comprehensive audit of existing architecture, load testing, and bottleneck identification.", duration: "3 weeks" },
      { phase: "Design", title: "Microservices Architecture", description: "Designed service boundaries, communication patterns, and data ownership strategy.", duration: "4 weeks" },
      { phase: "Development", title: "Service Decomposition", description: "Incrementally extracted 12 microservices with event-driven communication.", duration: "20 weeks" },
      { phase: "Testing", title: "Load Testing & Optimization", description: "Extensive load testing simulating 150K concurrent users with performance tuning.", duration: "3 weeks" },
      { phase: "Deployment", title: "Production Launch", description: "Multi-region AWS deployment with war room support for Black Friday event.", duration: "2 weeks" },
    ],
  },
  {
    slug: "erp-implementation",
    title: "Enterprise ERP Implementation",
    subtitle: "Streamlining operations for a manufacturing conglomerate",
    technologiesUsed: ["React", "Django", "PostgreSQL", "Docker"],
    clientBackground:
      "A manufacturing conglomerate with 8 factories across 3 countries, producing industrial components. The company was running separate systems for finance, inventory, production, and HR, leading to data silos, manual reconciliation, and poor visibility into operations.",
    businessChallenge:
      "Monthly financial reconciliation took 12 days. Inventory accuracy was only 78%, leading to frequent stockouts and overstock situations. Production planning relied on spreadsheets, causing 15% waste from overproduction. The CEO had no real-time visibility into company performance across all factories.",
    discoveryPhase:
      "We spent 6 weeks mapping business processes across all 8 factories, interviewing 50+ stakeholders from finance, operations, HR, and production. We documented 200+ business processes and identified 45 integration points between existing systems.",
    requirements: [
      "Unified platform for finance, inventory, production, and HR",
      "Real-time dashboards for executive visibility",
      "Multi-currency and multi-entity support",
      "Shop floor data collection and production tracking",
      "Automated financial consolidation across entities",
      "Mobile access for factory floor managers",
    ],
    research:
      "We evaluated SAP, Oracle, and custom-built solutions. Given the company's unique manufacturing processes, we determined that a custom ERP would provide better ROI than adapting off-the-shelf solutions. We designed the architecture to support phased module deployment.",
    developmentProcess:
      "We built the ERP as a modular monolith with clear domain boundaries, allowing future microservice extraction if needed. Development was organized by module: Finance first (4 months), then Inventory (3 months), Production (4 months), and HR (3 months). Each module went through factory-level validation.",
    deployment:
      "Deployment was factory-by-factory over 6 months, starting with the headquarters factory. Each factory received 3 weeks of on-site training and support. Data migration was carefully orchestrated with validation checks at each stage. Parallel running ensured business continuity.",
    results:
      "Financial consolidation time dropped from 12 days to 2 days. Inventory accuracy improved to 98.5%. Production waste reduced by 40% through better planning. The CEO now has a real-time dashboard showing performance across all factories. Annual savings of $2M from operational efficiencies.",
    kpis: [
      { metric: "Process Efficiency", before: "Manual processes", after: "85% automated", improvement: "55% improvement" },
      { metric: "Cost Savings", before: "$0", after: "$2M/year", improvement: "$2M annual" },
      { metric: "Data Accuracy", before: "78%", after: "99.5%", improvement: "21.5% increase" },
      { metric: "Financial Close", before: "12 days", after: "2 days", improvement: "83% faster" },
    ],
    roi: "The $1.5M ERP investment delivered $2M in annual savings through operational efficiencies, reduced waste, and improved inventory management. The payback period was 9 months. Productivity gains across 2,000+ employees compound the financial benefit significantly.",
    performanceImprovements: [
      "Real-time inventory visibility across all 8 factories",
      "Automated financial consolidation in under 2 hours",
      "Production planning accuracy improved by 60%",
      "Mobile access enables floor managers to update data in real-time",
      "Custom reporting reduced from 2 weeks to 5 minutes",
    ],
    lessonsLearned: [
      "Executive sponsorship is the single biggest success factor for ERP projects",
      "Phased deployment reduces risk and allows learning from each phase",
      "Data migration quality determines long-term system success",
      "Change management is as important as the technology itself",
    ],
    futureRoadmap: [
      "IoT integration for real-time machine monitoring",
      "AI-powered demand forecasting for production planning",
      "Supplier portal for procurement automation",
      "Business intelligence platform with advanced analytics",
    ],
    timelineEvents: [
      { phase: "Discovery", title: "Process Mapping", description: "Comprehensive mapping of 200+ business processes across 8 factories and 4 business units.", duration: "6 weeks" },
      { phase: "Design", title: "Architecture & Module Design", description: "Designed modular ERP architecture with clear domain boundaries and integration points.", duration: "4 weeks" },
      { phase: "Development", title: "Module Build (Finance, Inventory, Production, HR)", description: "Iterative development of 4 core modules with factory-level validation.", duration: "36 weeks" },
      { phase: "Testing", title: "Integration & UAT", description: "End-to-end integration testing and user acceptance testing at each factory.", duration: "6 weeks" },
      { phase: "Deployment", title: "Factory-by-Factory Rollout", description: "Phased deployment across 8 factories with training and parallel running.", duration: "24 weeks" },
    ],
  },
  {
    slug: "fintech-compliance",
    title: "Fintech Compliance Platform",
    subtitle: "Automating regulatory compliance for a digital banking startup",
    technologiesUsed: ["Python", "FastAPI", "ElasticSearch", "Redis"],
    clientBackground:
      "A digital banking startup that had grown from 50K to 500K users in 18 months. The compliance team of 5 was overwhelmed by increasing regulatory requirements across multiple jurisdictions. Manual compliance checks were creating bottlenecks in product launches and customer onboarding.",
    businessChallenge:
      "KYC/AML checks took an average of 48 hours, causing 30% customer drop-off during onboarding. The compliance team manually reviewed 200+ transactions daily. Regulatory fines in the industry averaged $2.4M for non-compliance. The startup needed to scale compliance operations without proportionally scaling headcount.",
    discoveryPhase:
      "We spent 4 weeks embedded with the compliance team, understanding regulatory requirements across their operating jurisdictions. We analyzed 6 months of compliance data, mapped decision trees for KYC/AML checks, and identified patterns in flagged transactions.",
    requirements: [
      "Automated KYC/AML screening with 99.5% accuracy",
      "Real-time transaction monitoring and risk scoring",
      "Regulatory reporting automation for multiple jurisdictions",
      "Audit trail for all compliance decisions",
      "Integration with third-party identity verification providers",
      "Configurable rules engine for evolving regulations",
    ],
    research:
      "We studied compliance frameworks across the US, EU, and UK. Our research focused on building a rules engine flexible enough to handle jurisdiction-specific requirements while maintaining a unified compliance view. We also studied false positive reduction techniques for AML screening.",
    developmentProcess:
      "We built the platform using a rules-engine-first approach, allowing compliance officers to configure rules without code changes. The transaction monitoring system was built with real-time streaming architecture for sub-second risk scoring. Development was driven by compliance officer feedback on false positive reduction.",
    deployment:
      "The platform was deployed in 3 phases: KYC automation first, then transaction monitoring, and finally regulatory reporting. Each phase included parallel running with manual processes. The compliance team was gradually transitioned from manual reviewers to exception handlers.",
    results:
      "KYC processing time dropped from 48 hours to 15 minutes. False positive rates in AML screening decreased by 65%. The compliance team now handles 5x the transaction volume with the same headcount. Regulatory reporting that took 3 days now takes 30 minutes. Zero regulatory findings in the last 2 audit cycles.",
    kpis: [
      { metric: "Compliance Time", before: "48 hours", after: "15 minutes", improvement: "80% faster" },
      { metric: "Audit Score", before: "76/100", after: "98/100", improvement: "22 point increase" },
      { metric: "Risk Events", before: "12/month", after: "3.6/month", improvement: "70% reduction" },
      { metric: "Customer Onboarding", before: "3 days", after: "8 minutes", improvement: "99% faster" },
    ],
    roi: "The $350K platform investment saved $1.8M annually in compliance labor costs and potential regulatory fines. Customer conversion during onboarding improved by 30%, generating an estimated $4.2M in additional annual revenue from reduced drop-off.",
    performanceImprovements: [
      "Transaction monitoring processes 10,000+ events per second",
      "KYC screening completes in under 15 minutes for 95% of applications",
      "Rules engine supports 500+ compliance rules across 12 jurisdictions",
      "False positive rate reduced from 42% to 14.7%",
      "Audit trail covers 100% of compliance decisions with full context",
    ],
    lessonsLearned: [
      "Compliance officers must be power users, not just stakeholders",
      "Rules engine flexibility is more valuable than hard-coded logic",
      "False positive reduction directly impacts team productivity and morale",
      "Regulatory changes require a deployment process, not just code changes",
    ],
    futureRoadmap: [
      "AI-powered transaction anomaly detection with self-learning models",
      "Expansion to 25+ jurisdictions with automated regulatory change detection",
      "Integration with blockchain for immutable audit trails",
      "Predictive compliance risk scoring for proactive risk management",
    ],
    timelineEvents: [
      { phase: "Discovery", title: "Regulatory Analysis", description: "Deep dive into compliance requirements across multiple jurisdictions and manual process analysis.", duration: "4 weeks" },
      { phase: "Design", title: "Rules Engine & Architecture", description: "Designed flexible rules engine architecture and real-time monitoring pipeline.", duration: "3 weeks" },
      { phase: "Development", title: "Platform Build", description: "Built KYC automation, transaction monitoring, and regulatory reporting modules.", duration: "14 weeks" },
      { phase: "Testing", title: "Compliance Validation", description: "Rigorous testing with real compliance scenarios and false positive optimization.", duration: "3 weeks" },
      { phase: "Deployment", title: "Phased Launch", description: "3-phase deployment with parallel running and compliance team transition.", duration: "8 weeks" },
    ],
  },
];

const slugToCaseStudy = new Map(caseStudies.map((cs) => [cs.slug, cs]));

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = slugToCaseStudy.get(slug);

  if (!caseStudy) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.subtitle,
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = slugToCaseStudy.get(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Case Studies", url: `${siteConfig.url}/case-studies` },
          { name: caseStudy.title, url: `${siteConfig.url}/case-studies/${caseStudy.slug}` },
        ])}
      />
      <CaseStudyDetailHero
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        technologiesUsed={caseStudy.technologiesUsed}
      />
      <CaseStudyDetailContent
        clientBackground={caseStudy.clientBackground}
        businessChallenge={caseStudy.businessChallenge}
        discoveryPhase={caseStudy.discoveryPhase}
        requirements={caseStudy.requirements}
        research={caseStudy.research}
        developmentProcess={caseStudy.developmentProcess}
        deployment={caseStudy.deployment}
        results={caseStudy.results}
        kpis={caseStudy.kpis}
        roi={caseStudy.roi}
        performanceImprovements={caseStudy.performanceImprovements}
        lessonsLearned={caseStudy.lessonsLearned}
        futureRoadmap={caseStudy.futureRoadmap}
        timelineEvents={caseStudy.timelineEvents}
      />
      <CTASection />
    </main>
  );
}
