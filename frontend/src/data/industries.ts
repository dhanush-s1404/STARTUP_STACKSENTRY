export type IndustryData = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  challenges: string[];
  solutions: string[];
  benefits: string[];
  metrics: { label: string; value: string; suffix: string }[];
  technologies: string[];
  caseStudySlugs: string[];
  relatedProjectSlugs: string[];
  digitalRoadmap: { phase: number; title: string; duration: string; description: string }[];
  solutionSlugs: string[];
  challengeSlugs: string[];
};

export const INDUSTRIES: IndustryData[] = [
  {
    slug: "healthcare",
    title: "Healthcare",
    description: "Digital health solutions, EHR systems, telemedicine platforms",
    longDescription:
      "Transforming patient care through intelligent software solutions. From HIPAA-compliant EHR systems to AI-powered diagnostics and telemedicine platforms, we build technology that improves outcomes while reducing administrative burden on healthcare professionals.",
    icon: "HeartPulse",
    challenges: [
      "Fragmented patient records across departments leading to incomplete clinical pictures and delayed diagnoses",
      "Manual billing processes causing revenue leakage with error rates exceeding 15% in claims processing",
      "Strict HIPAA and regulatory compliance requirements creating operational complexity and audit risk",
    ],
    solutions: [
      "Unified EHR platform with FHIR-compliant data exchange enabling seamless interoperability across departments and facilities",
      "Automated billing and claims processing engine with AI-powered coding validation reducing denial rates",
      "Built-in compliance framework with automated audit trails, access controls, and real-time regulatory monitoring",
    ],
    benefits: [
      "45% faster patient processing through digitized intake and automated clinical workflows",
      "30% reduction in billing errors with AI-assisted coding and real-time claims validation",
      "Improved patient outcomes through data-driven clinical decision support and predictive analytics",
    ],
    metrics: [
      { label: "Patient Processing", value: "45", suffix: "% faster" },
      { label: "Billing Errors", value: "30", suffix: "% reduction" },
      { label: "Record Access", value: "3", suffix: "x quicker" },
      { label: "Compliance Score", value: "99", suffix: "%" },
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis", "FHIR", "HIPAA"],
    caseStudySlugs: ["hospital-digital-transformation"],
    relatedProjectSlugs: ["hospital-management-system"],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Evaluate current EHR systems, compliance posture, and clinical workflows to identify integration gaps." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Define FHIR integration roadmap, HIPAA compliance strategy, and phased EHR modernization plan." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Deploy HIPAA-compliant cloud infrastructure, set up data exchange layer, and configure audit trails." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Roll out unified EHR, automated billing, and clinical decision support modules across departments." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Fine-tune AI diagnostic models, optimize query performance, and calibrate billing automation accuracy." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Expand telehealth capabilities, integrate predictive analytics, and adopt emerging health tech standards." },
    ],
    solutionSlugs: ["healthcare-system", "hospital-management"],
    challengeSlugs: ["disconnected-systems", "compliance", "legacy-software"],
  },
  {
    slug: "education",
    title: "Education",
    description: "Learning management, student information, EdTech platforms",
    longDescription:
      "Modernizing education through technology that empowers institutions, educators, and students. Our EdTech solutions streamline administration, enhance learning experiences, and provide actionable insights for data-driven academic decisions.",
    icon: "GraduationCap",
    challenges: [
      "Paper-based administration consuming excessive resources with staff spending 60% of time on manual tasks",
      "Poor parent-teacher-student communication leading to disengagement and information gaps",
      "Difficulty tracking academic progress at scale across thousands of students with inconsistent data systems",
    ],
    solutions: [
      "Digital student information management system consolidating enrollment, attendance, grades, and communications",
      "Integrated LMS with content delivery, assignment management, and real-time progress tracking for hybrid learning",
      "Parent portal with real-time notifications for attendance, grades, assignments, and school announcements",
    ],
    benefits: [
      "60% reduction in admin overhead freeing educators to focus on teaching and student engagement",
      "Improved student engagement and outcomes through personalized learning paths and real-time feedback",
      "Data-driven academic decision making with network-level analytics across schools and districts",
    ],
    metrics: [
      { label: "Admin Overhead", value: "60", suffix: "% reduction" },
      { label: "Parent Engagement", value: "65", suffix: "% increase" },
      { label: "Cost Savings", value: "180", suffix: "K annually" },
      { label: "Schools Managed", value: "50", suffix: "+" },
    ],
    technologies: ["React", "Django", "PostgreSQL", "Docker", "Redis"],
    caseStudySlugs: [],
    relatedProjectSlugs: ["school-erp"],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Audit existing administrative systems, teaching workflows, and parent communication channels." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Design digital campus blueprint including LMS selection, SIS integration, and parent portal architecture." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Set up cloud infrastructure, student data migration pipelines, and authentication systems." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Deploy student information system, LMS modules, and parent portal with real-time notifications." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Optimize learning paths based on engagement data, tune notification delivery, and improve mobile experience." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Introduce AI-powered tutoring, adaptive assessments, and predictive academic analytics." },
    ],
    solutionSlugs: ["school-erp"],
    challengeSlugs: ["manual-processes", "communication-gaps", "data-silos"],
  },
  {
    slug: "finance",
    title: "Finance",
    description: "Banking software, fintech solutions, regulatory compliance",
    longDescription:
      "Building the future of financial services with secure, compliant, and scalable software. From core banking platforms to AI-powered fraud detection and regulatory automation, we help financial institutions innovate while maintaining the highest standards of security and compliance.",
    icon: "Landmark",
    challenges: [
      "Complex regulatory compliance requirements across multiple jurisdictions with evolving standards and reporting mandates",
      "Legacy systems hindering digital transformation with monolithic architectures that cannot scale or integrate",
      "Real-time fraud detection at scale requiring sub-second analysis of millions of transactions daily",
    ],
    solutions: [
      "Automated regulatory reporting and compliance engine with configurable rules for multi-jurisdiction support",
      "Modern API-first core banking platform enabling rapid product launches and third-party integrations",
      "ML-powered fraud detection and prevention system with real-time risk scoring and adaptive learning models",
    ],
    benefits: [
      "Zero compliance violations through automated monitoring, reporting, and proactive regulatory change management",
      "50% faster product launches with modular architecture enabling independent feature development and deployment",
      "60% reduction in fraudulent transactions through real-time ML-based anomaly detection and behavioral analysis",
    ],
    metrics: [
      { label: "Compliance", value: "100", suffix: "% uptime" },
      { label: "Product Launch", value: "50", suffix: "% faster" },
      { label: "Fraud Reduction", value: "60", suffix: "%" },
      { label: "KYC Processing", value: "15", suffix: " min" },
    ],
    technologies: ["Python", "FastAPI", "ElasticSearch", "Redis", "PostgreSQL"],
    caseStudySlugs: ["fintech-compliance"],
    relatedProjectSlugs: ["crm-platform", "inventory-management"],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Audit core banking systems, compliance workflows, and fraud detection capabilities for gaps." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Design API-first banking architecture, regulatory automation roadmap, and ML fraud detection strategy." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Deploy secure cloud infrastructure, API gateway, and real-time data streaming pipelines." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Launch core banking APIs, compliance engine, and ML fraud detection in parallel workstreams." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Tune ML models for fraud detection accuracy, optimize API latency, and calibrate compliance rules." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Expand open banking capabilities, deploy advanced risk models, and adopt real-time payment rails." },
    ],
    solutionSlugs: ["erp", "accounting-system", "crm"],
    challengeSlugs: ["legacy-software", "security-concerns", "compliance"],
  },
  {
    slug: "recruitment",
    title: "Recruitment",
    description: "ATS systems, candidate matching, hiring automation",
    longDescription:
      "Revolutionizing talent acquisition with AI-powered recruitment platforms. We build systems that automate screening, enhance candidate experience, and give hiring teams the insights they need to make faster, better hiring decisions at scale.",
    icon: "Users",
    challenges: [
      "Manual resume screening consuming 70% of recruiter time with inconsistent evaluation criteria across teams",
      "High cost-per-hire and time-to-fill metrics causing competitive disadvantage in talent acquisition",
      "Poor candidate experience and ghost rates damaging employer brand and reducing offer acceptance rates",
    ],
    solutions: [
      "AI-powered resume screening and scoring engine with NLP-based semantic matching against role requirements",
      "Automated interview scheduling pipeline with calendar integration, multi-round coordination, and candidate self-service",
      "Candidate experience portal with real-time status updates, feedback loops, and employer branding touchpoints",
    ],
    benefits: [
      "60% reduction in time-to-hire through automated screening, scheduling, and pipeline management",
      "40% lower cost-per-hire by reducing agency reliance and optimizing recruiter productivity",
      "Higher offer acceptance rates through improved candidate experience and faster communication cycles",
    ],
    metrics: [
      { label: "Time-to-Hire", value: "60", suffix: "% reduction" },
      { label: "Cost-per-Hire", value: "40", suffix: "% lower" },
      { label: "Candidate Satisfaction", value: "41", suffix: "% increase" },
      { label: "Hiring Speed", value: "3", suffix: "x faster" },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AI/ML", "Python", "OpenAI"],
    caseStudySlugs: ["ai-recruitment-transformation"],
    relatedProjectSlugs: ["recruitment-management-system", "ai-resume-screening"],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Audit current recruitment workflows, ATS capabilities, and candidate journey pain points." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Design AI screening model architecture, interview scheduling pipeline, and candidate portal UX." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Set up ML infrastructure for resume parsing, integrate calendar APIs, and build candidate data platform." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Deploy AI screening engine, automated scheduling system, and candidate experience portal." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Refine matching algorithms based on hire outcomes, optimize scheduling logic, and improve portal UX." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Add video interview analysis, predictive performance modeling, and talent pool nurturing." },
    ],
    solutionSlugs: ["recruitment-platform", "hrms"],
    challengeSlugs: ["recruitment-delays", "talent-retention", "manual-processes"],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description: "Production management, IoT integration, quality control",
    longDescription:
      "Driving Industry 4.0 transformation with intelligent manufacturing software. From AI-driven production scheduling to IoT-powered shop floor monitoring and statistical process control, we help manufacturers optimize operations and eliminate waste.",
    icon: "Factory",
    challenges: [
      "Production bottlenecks and unplanned downtime costing thousands per hour in lost productivity and missed deadlines",
      "Quality defects causing excessive waste, rework, and customer complaints eroding profit margins",
      "Lack of real-time shop floor visibility preventing data-driven decisions on production optimization",
    ],
    solutions: [
      "AI-driven production scheduling system (APS) optimizing resource allocation, sequencing, and capacity planning",
      "Statistical process control with real-time SPC dashboards detecting quality drift before defects occur",
      "IoT-powered shop floor monitoring dashboard providing real-time OEE, machine status, and production metrics",
    ],
    benefits: [
      "20% increase in production throughput through optimized scheduling and reduced changeover times",
      "50% reduction in quality defects via real-time monitoring and proactive process adjustments",
      "Predictive maintenance reducing unplanned downtime by 40% through ML-based failure prediction models",
    ],
    metrics: [
      { label: "Throughput", value: "20", suffix: "% increase" },
      { label: "Quality Defects", value: "50", suffix: "% reduction" },
      { label: "Downtime", value: "40", suffix: "% less" },
      { label: "Efficiency", value: "95", suffix: "% OEE" },
    ],
    technologies: ["React", "Django", "PostgreSQL", "Docker", "IoT", "Python"],
    caseStudySlugs: ["erp-implementation"],
    relatedProjectSlugs: ["inventory-management"],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Audit shop floor operations, IoT readiness, and current quality control processes." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Design IoT integration architecture, APS system blueprint, and SPC dashboard specifications." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Deploy IoT gateway infrastructure, set up time-series databases, and configure production data pipelines." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Launch APS scheduling, IoT monitoring dashboard, and SPC quality control modules." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Calibrate IoT sensors, optimize scheduling algorithms, and tune SPC thresholds based on production data." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Introduce predictive maintenance models, digital twin simulations, and AI-driven quality optimization." },
    ],
    solutionSlugs: ["manufacturing-system", "erp", "inventory-management"],
    challengeSlugs: ["quality-control", "disconnected-systems", "high-operational-costs"],
  },
  {
    slug: "retail",
    title: "Retail",
    description: "POS systems, inventory, omnichannel experiences",
    longDescription:
      "Powering modern retail with unified commerce platforms. We build POS systems, omnichannel inventory management, and customer experience solutions that help retailers compete in an era of shifting consumer expectations and digital-first shopping.",
    icon: "Store",
    challenges: [
      "Inventory mismatch between online and offline channels causing overselling, stockouts, and frustrated customers",
      "Poor customer experience across channels with inconsistent pricing, promotions, and loyalty program data",
      "Difficulty managing promotions and pricing dynamically across thousands of SKUs and multiple locations",
    ],
    solutions: [
      "Unified omnichannel inventory management providing real-time stock visibility across all channels and warehouses",
      "Smart POS with real-time sync, analytics, and integrated customer profiles for personalized service",
      "Dynamic pricing and promotion engine with A/B testing, competitor monitoring, and margin optimization",
    ],
    benefits: [
      "30% increase in inventory turnover through accurate demand forecasting and automated replenishment",
      "25% higher customer lifetime value via personalized experiences and seamless cross-channel journeys",
      "Real-time cross-channel visibility enabling accurate stock allocation and fulfillment optimization",
    ],
    metrics: [
      { label: "Inventory Turnover", value: "30", suffix: "% increase" },
      { label: "Customer LTV", value: "25", suffix: "% higher" },
      { label: "Revenue Growth", value: "20", suffix: "%" },
      { label: "SKUs Managed", value: "45", suffix: "K+" },
    ],
    technologies: ["React", "FastAPI", "PostgreSQL", "Redis", "Node.js"],
    caseStudySlugs: [],
    relatedProjectSlugs: ["inventory-management"],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Audit POS systems, inventory channels, and customer data platforms for integration opportunities." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Design omnichannel architecture, unified inventory model, and dynamic pricing strategy." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Deploy event-driven inventory sync, customer data platform, and pricing engine infrastructure." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Roll out unified inventory management, smart POS, and dynamic pricing across all channels." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Optimize pricing algorithms based on demand signals, tune inventory allocation, and refine personalization." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Add AR try-on experiences, predictive demand forecasting, and AI-powered visual merchandising." },
    ],
    solutionSlugs: ["inventory-management", "crm", "e-commerce-platform"],
    challengeSlugs: ["inventory-issues", "customer-experience", "slow-reporting"],
  },
  {
    slug: "e-commerce",
    title: "E-Commerce",
    description: "Marketplace platforms, payment processing, logistics",
    longDescription:
      "Building scalable e-commerce platforms that handle millions of transactions. From custom marketplace solutions to optimized checkout flows and multi-payment gateway integration, we create technology that converts browsers into buyers at scale.",
    icon: "ShoppingCart",
    challenges: [
      "High platform fees from third-party marketplaces eating into margins with commission rates exceeding 20%",
      "Complex multi-vendor management with inconsistent product data, pricing, and fulfillment quality",
      "Cart abandonment and checkout friction resulting in 70% of shoppers leaving before completing a purchase",
    ],
    solutions: [
      "Custom marketplace with vendor self-service portal, automated onboarding, and centralized product management",
      "Multi-payment gateway with digital wallet support, one-click checkout, and PCI DSS compliant processing",
      "Optimized checkout with saved payment details, address auto-fill, and real-time shipping cost calculation",
    ],
    benefits: [
      "3x faster time-to-market for new features and marketplace modules through modular architecture",
      "40% lower platform costs by eliminating third-party marketplace commissions and customizing for your needs",
      "Scalable infrastructure handling millions of transactions with auto-scaling during traffic spikes",
    ],
    metrics: [
      { label: "Time-to-Market", value: "3", suffix: "x faster" },
      { label: "Platform Costs", value: "40", suffix: "% lower" },
      { label: "Uptime", value: "99.99", suffix: "%" },
      { label: "Revenue Growth", value: "200", suffix: "%" },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
    caseStudySlugs: ["ecommerce-scale"],
    relatedProjectSlugs: ["inventory-management"],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Audit current platform costs, checkout conversion funnel, and multi-vendor workflows." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Design custom marketplace architecture, payment gateway strategy, and checkout optimization plan." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Set up cloud-native infrastructure, CDN, payment processing layer, and vendor management system." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Launch marketplace platform, optimized checkout, and multi-payment gateway with vendor portal." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "A/B test checkout flows, optimize payment success rates, and tune search and recommendation engines." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Add AI-powered product recommendations, AR visualization, and social commerce integrations." },
    ],
    solutionSlugs: ["e-commerce-platform", "inventory-management", "crm"],
    challengeSlugs: ["poor-scalability", "customer-experience", "inventory-issues"],
  },
  {
    slug: "government",
    title: "Government",
    description: "E-governance, citizen services, digital transformation",
    longDescription:
      "Accelerating digital government with secure, transparent, and citizen-centric platforms. We build e-governance solutions that streamline public services, ensure data security, and foster transparency through technology.",
    icon: "Building",
    challenges: [
      "Slow citizen service delivery with manual processes causing weeks-long processing times for common applications",
      "Disconnected departmental systems creating data silos and forcing citizens to submit the same information repeatedly",
      "Stringent data security and transparency requirements with public accountability mandates",
    ],
    solutions: [
      "Digital citizen services portal with eKYC, online applications, and real-time status tracking for all government services",
      "Inter-departmental data exchange platform enabling single-source-of-truth citizen records across agencies",
      "Blockchain-based audit trail and transparency system ensuring immutable records of all government transactions",
    ],
    benefits: [
      "70% faster citizen service delivery through end-to-end digitization and automated processing workflows",
      "Improved public trust through transparent processes, open data initiatives, and real-time service tracking",
      "Significant cost savings through digitization of paper-based processes and elimination of redundant systems",
    ],
    metrics: [
      { label: "Service Speed", value: "70", suffix: "% faster" },
      { label: "Paper Reduction", value: "90", suffix: "%" },
      { label: "Cost Savings", value: "2", suffix: "M annually" },
      { label: "Citizen Satisfaction", value: "48", suffix: "% increase" },
    ],
    technologies: ["React", "NestJS", "PostgreSQL", "Blockchain", "Docker"],
    caseStudySlugs: [],
    relatedProjectSlugs: [],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Audit existing government services, departmental systems, and citizen interaction touchpoints." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Design digital citizen portal architecture, data exchange framework, and blockchain audit strategy." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Deploy secure government cloud, establish data exchange protocols, and build identity verification layer." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Launch citizen services portal, inter-departmental data platform, and blockchain audit system." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Optimize portal performance, tune data exchange latency, and refine citizen notification systems." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Introduce AI-powered service routing, expand open data portals, and add multilingual support." },
    ],
    solutionSlugs: ["erp", "crm"],
    challengeSlugs: ["compliance", "manual-processes", "disconnected-systems"],
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    description: "Property management, CRM, listing platforms",
    longDescription:
      "Transforming real estate operations with digital property management, intelligent CRM systems, and immersive listing platforms. We build solutions that streamline transactions, improve lead conversion, and modernize the property lifecycle.",
    icon: "Home",
    challenges: [
      "Manual property listing and management consuming agent time with duplicated efforts across platforms",
      "Poor lead tracking and conversion with 80% of leads going cold within the first 48 hours of inquiry",
      "Complex lease and payment management with fragmented systems for rent collection and maintenance requests",
    ],
    solutions: [
      "Digital property listing platform with virtual tours, automated syndication to major portals, and lead capture",
      "Real estate CRM with lead scoring, automated follow-up sequences, and pipeline visualization for agents",
      "Automated lease management and rent collection system with online payments and maintenance request tracking",
    ],
    benefits: [
      "50% faster property listings through automated data entry, photo processing, and multi-portal syndication",
      "35% improvement in lead conversion through AI-powered lead scoring and automated nurture sequences",
      "Streamlined tenant management with self-service portal, online payments, and maintenance request tracking",
    ],
    metrics: [
      { label: "Listing Speed", value: "50", suffix: "% faster" },
      { label: "Lead Conversion", value: "35", suffix: "% higher" },
      { label: "Tenant Satisfaction", value: "40", suffix: "% increase" },
      { label: "Properties Managed", value: "10", suffix: "K+" },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "React"],
    caseStudySlugs: [],
    relatedProjectSlugs: [],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Audit listing workflows, lead management processes, and lease administration systems." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Design unified property platform architecture, CRM integration, and lease management workflows." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Build property data platform, CRM integration layer, and virtual tour infrastructure." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Deploy listing platform, real estate CRM, and automated lease management system." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Optimize lead scoring models, improve listing syndication speed, and refine tenant portal UX." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Add AI property valuation, 3D virtual tours, and predictive market analytics." },
    ],
    solutionSlugs: ["crm", "erp"],
    challengeSlugs: ["customer-experience", "disconnected-systems", "slow-reporting"],
  },
  {
    slug: "travel",
    title: "Travel",
    description: "Booking systems, itinerary management, travel platforms",
    longDescription:
      "Creating seamless travel experiences through intelligent booking engines, AI-powered itinerary optimization, and real-time travel assistance platforms. We build technology that makes travel planning effortless and travel experiences unforgettable.",
    icon: "Plane",
    challenges: [
      "Fragmented booking and inventory systems requiring manual reconciliation across airlines, hotels, and activity providers",
      "Manual itinerary creation and management consuming agent hours for each customer trip",
      "Poor customer support during travel with long response times and limited proactive issue resolution",
    ],
    solutions: [
      "Unified booking engine with multi-provider API aggregation, real-time availability, and dynamic pricing",
      "AI-powered itinerary builder and optimizer generating personalized multi-destination trip plans in seconds",
      "24/7 chatbot and real-time travel assistance platform with proactive flight alerts and disruption management",
    ],
    benefits: [
      "3x faster booking processing through automated search, comparison, and reservation workflows",
      "40% reduction in booking errors via real-time validation and automated confirmation management",
      "Improved traveler satisfaction scores through proactive support and personalized travel recommendations",
    ],
    metrics: [
      { label: "Booking Speed", value: "3", suffix: "x faster" },
      { label: "Booking Errors", value: "40", suffix: "% reduction" },
      { label: "Customer Satisfaction", value: "35", suffix: "% higher" },
      { label: "Revenue Growth", value: "25", suffix: "%" },
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Node.js"],
    caseStudySlugs: [],
    relatedProjectSlugs: [],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Audit booking systems, provider APIs, and customer support workflows for automation opportunities." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Design unified booking engine architecture, itinerary AI model, and chatbot integration plan." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Set up API aggregation layer, travel data warehouse, and NLP infrastructure for chatbot." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Launch booking engine, AI itinerary builder, and real-time travel assistance platform." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Optimize booking conversion, refine itinerary recommendations, and improve chatbot accuracy." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Add predictive pricing, personalized travel packages, and AR destination previews." },
    ],
    solutionSlugs: ["crm", "e-commerce-platform"],
    challengeSlugs: ["customer-experience", "communication-gaps", "high-operational-costs"],
  },
  {
    slug: "logistics",
    title: "Logistics",
    description: "Supply chain, fleet management, route optimization",
    longDescription:
      "Optimizing supply chain operations with AI-driven logistics platforms. From route optimization and fleet management to warehouse automation and real-time shipment tracking, we build systems that reduce costs and improve delivery performance.",
    icon: "Truck",
    challenges: [
      "Inefficient route planning increasing fuel costs by 25% with drivers covering unnecessary mileage daily",
      "Lack of end-to-end shipment visibility leaving operations blind to delays until customers report them",
      "Complex warehouse management at scale with manual picking, packing, and inventory reconciliation errors",
    ],
    solutions: [
      "AI-optimized route planning engine considering traffic, delivery windows, vehicle capacity, and driver hours",
      "Real-time shipment tracking dashboard with predictive ETAs, exception alerts, and customer notification automation",
      "WMS with barcode/RFID scanning, automated picking optimization, and real-time inventory synchronization",
    ],
    benefits: [
      "25% reduction in fuel costs through AI-optimized routes and intelligent load consolidation",
      "95%+ on-time delivery rate achieved through predictive scheduling and real-time route adjustment",
      "40% faster warehouse operations with automated picking, packing, and shipping workflows",
    ],
    metrics: [
      { label: "Fuel Costs", value: "25", suffix: "% reduction" },
      { label: "On-Time Delivery", value: "95", suffix: "%+" },
      { label: "Warehouse Speed", value: "40", suffix: "% faster" },
      { label: "Shipment Accuracy", value: "99.8", suffix: "%" },
    ],
    technologies: ["React", "FastAPI", "PostgreSQL", "Redis", "Python"],
    caseStudySlugs: [],
    relatedProjectSlugs: ["inventory-management"],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Audit route planning, shipment tracking, and warehouse operations for optimization potential." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Design AI route optimization architecture, real-time tracking platform, and WMS integration plan." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Deploy GPS/telemetry infrastructure, real-time event streaming, and warehouse IoT sensors." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Launch route optimization engine, shipment tracking dashboard, and automated WMS modules." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Tune route algorithms for fuel efficiency, optimize warehouse pick paths, and refine ETA predictions." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Introduce autonomous vehicle integration, drone delivery pilots, and predictive supply chain analytics." },
    ],
    solutionSlugs: ["fleet-management", "inventory-management", "erp"],
    challengeSlugs: ["high-operational-costs", "inventory-issues", "disconnected-systems"],
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    description: "Hotel management, booking engines, guest experience",
    longDescription:
      "Elevating guest experiences with modern hospitality technology. We build integrated PMS platforms, dynamic revenue management systems, and personalized guest engagement tools that help hotels maximize occupancy, revenue, and guest satisfaction.",
    icon: "UtensilsCrossed",
    challenges: [
      "Manual reservation and check-in processes creating long wait times and poor first impressions for guests",
      "Poor guest experience personalization with no visibility into guest preferences across stays and touchpoints",
      "Revenue management across multiple distribution channels with static pricing missing demand-driven opportunities",
    ],
    solutions: [
      "Integrated PMS with online booking engine, self-service check-in kiosks, and mobile-first guest app",
      "Guest profile and preference management system consolidating data from all touchpoints for personalized service",
      "Dynamic pricing and revenue management system with demand forecasting, competitor rate monitoring, and channel optimization",
    ],
    benefits: [
      "40% faster check-in/check-out through self-service kiosks, mobile pre-registration, and automated key management",
      "25% increase in guest satisfaction through personalized service, targeted upselling, and proactive communication",
      "15% revenue uplift through dynamic pricing optimization and improved distribution channel management",
    ],
    metrics: [
      { label: "Check-in Speed", value: "40", suffix: "% faster" },
      { label: "Guest Satisfaction", value: "25", suffix: "% increase" },
      { label: "Revenue Uplift", value: "15", suffix: "%" },
      { label: "Occupancy Rate", value: "88", suffix: "%" },
    ],
    technologies: ["React", "NestJS", "PostgreSQL", "Redis", "Node.js"],
    caseStudySlugs: [],
    relatedProjectSlugs: [],
    digitalRoadmap: [
      { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Audit PMS systems, guest touchpoints, and revenue management workflows across distribution channels." },
      { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Design integrated PMS architecture, guest data platform, and dynamic pricing model." },
      { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Deploy cloud PMS infrastructure, guest data consolidation layer, and channel manager integrations." },
      { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Launch PMS platform, guest preference engine, and dynamic pricing system across all channels." },
      { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Calibrate pricing algorithms, optimize guest personalization rules, and improve self-service kiosk UX." },
      { phase: 6, title: "Innovation", duration: "Ongoing", description: "Add AI concierge, voice-activated room controls, and predictive guest satisfaction analytics." },
    ],
    solutionSlugs: ["crm", "erp", "e-commerce-platform"],
    challengeSlugs: ["customer-experience", "communication-gaps", "high-operational-costs"],
  },
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}
