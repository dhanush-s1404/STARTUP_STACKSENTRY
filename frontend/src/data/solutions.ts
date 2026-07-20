export type SolutionData = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  businessProblems: string[];
  keyFeatures: string[];
  businessBenefits: string[];
  architecture: { layer: string; description: string; technologies: string[] }[];
  deploymentModels: string[];
  integrationSupport: string[];
};

export const SOLUTIONS: SolutionData[] = [
  {
    slug: "recruitment-platform",
    title: "Recruitment Platform",
    description:
      "End-to-end hiring automation with AI-powered candidate matching, interview scheduling, and comprehensive analytics.",
    icon: "users",
    features: [
      "AI Candidate Matching",
      "Automated Screening",
      "Interview Scheduling",
      "Analytics Dashboard",
      "Job Posting",
      "Talent Pool",
    ],
    businessProblems: [
      "Manual resume screening consuming hundreds of hours monthly",
      "High cost-per-hire due to inefficient recruitment processes",
      "Poor candidate experience leading to dropped applications",
    ],
    keyFeatures: [
      "AI-powered resume parsing and candidate scoring",
      "Automated interview scheduling with calendar integration",
      "Multi-channel job posting to 50+ job boards",
      "Real-time recruitment analytics and pipeline visibility",
    ],
    businessBenefits: [
      "60% reduction in time-to-hire",
      "40% lower cost-per-hire",
      "Improved quality of hire through data-driven matching",
    ],
    architecture: [
      {
        layer: "Frontend",
        description: "React-based responsive dashboard",
        technologies: ["React", "TypeScript", "Tailwind"],
      },
      {
        layer: "API Gateway",
        description: "RESTful and GraphQL endpoints",
        technologies: ["Node.js", "GraphQL", "REST"],
      },
      {
        layer: "Services",
        description: "Microservices for each domain",
        technologies: ["Python", "FastAPI", "Celery"],
      },
      {
        layer: "Data Layer",
        description: "Multi-database architecture",
        technologies: ["PostgreSQL", "Redis", "Elasticsearch"],
      },
    ],
    deploymentModels: ["Cloud SaaS", "On-Premise", "Hybrid"],
    integrationSupport: [
      "LinkedIn API",
      "Indeed API",
      "Calendar Systems",
      "ATS Migration",
    ],
  },
  {
    slug: "hrms",
    title: "HRMS",
    description:
      "Complete human resource management system with payroll processing, attendance tracking, performance reviews, and employee self-service.",
    icon: "user_cog",
    features: [
      "Payroll Management",
      "Attendance Tracking",
      "Performance Reviews",
      "Employee Self-Service",
      "Leave Management",
      "Recruitment Module",
    ],
    businessProblems: [
      "Disparate HR systems creating data silos",
      "Manual payroll processing prone to errors",
      "No centralized employee information management",
    ],
    keyFeatures: [
      "Automated payroll with multi-currency support",
      "Biometric and geofence-based attendance",
      "360-degree performance management",
      "Employee self-service portal with mobile app",
    ],
    businessBenefits: [
      "50% reduction in HR administrative tasks",
      "100% payroll accuracy with automation",
      "Improved employee satisfaction through self-service",
    ],
    architecture: [
      {
        layer: "Presentation",
        description: "Multi-device responsive UI",
        technologies: ["Next.js", "React", "PWA"],
      },
      {
        layer: "Application",
        description: "Domain-driven service layer",
        technologies: ["NestJS", "TypeScript", "gRPC"],
      },
      {
        layer: "Processing",
        description: "Background job processing",
        technologies: ["RabbitMQ", "Bull", "Workers"],
      },
      {
        layer: "Storage",
        description: "Optimized data storage",
        technologies: ["PostgreSQL", "MongoDB", "S3"],
      },
    ],
    deploymentModels: ["Cloud SaaS", "On-Premise", "Private Cloud"],
    integrationSupport: [
      "Biometric Devices",
      "Banking APIs",
      "Tax Authorities",
      "Insurance Providers",
    ],
  },
  {
    slug: "crm",
    title: "CRM",
    description:
      "Powerful customer relationship management with sales pipeline automation, lead scoring, and comprehensive analytics.",
    icon: "contact",
    features: [
      "Sales Pipeline",
      "Contact Management",
      "Email Integration",
      "Revenue Analytics",
      "Lead Scoring",
      "Workflow Automation",
    ],
    businessProblems: [
      "Scattered customer data across multiple tools",
      "Missed follow-ups leading to lost deals",
      "No visibility into sales pipeline health",
    ],
    keyFeatures: [
      "Visual sales pipeline with drag-and-drop",
      "AI-powered lead scoring and prioritization",
      "Automated email sequences and follow-ups",
      "360-degree customer view with interaction history",
    ],
    businessBenefits: [
      "35% increase in sales conversion rates",
      "28% shorter sales cycles",
      "Improved customer retention through better engagement",
    ],
    architecture: [
      {
        layer: "Client",
        description: "Single-page application",
        technologies: ["React", "Redux", "Chart.js"],
      },
      {
        layer: "API Layer",
        description: "RESTful services",
        technologies: ["Express.js", "TypeORM", "JWT"],
      },
      {
        layer: "Services",
        description: "Core business logic",
        technologies: ["Node.js", "Bull", "Nodemailer"],
      },
      {
        layer: "Data",
        description: "Analytics-ready storage",
        technologies: ["PostgreSQL", "ClickHouse", "Redis"],
      },
    ],
    deploymentModels: ["Cloud SaaS", "Self-Hosted", "Multi-Tenant"],
    integrationSupport: [
      "Gmail/Outlook",
      "Twilio/SMS",
      "Zapier",
      "Marketing Platforms",
    ],
  },
  {
    slug: "erp",
    title: "ERP",
    description:
      "Enterprise resource planning for finance, operations, and supply chain management with real-time business intelligence.",
    icon: "building2",
    features: [
      "Financial Management",
      "Supply Chain",
      "Inventory Control",
      "Business Intelligence",
      "Procurement",
      "Project Management",
    ],
    businessProblems: [
      "Fragmented business processes across departments",
      "Lack of real-time visibility into financial health",
      "Inefficient supply chain causing delays and excess costs",
    ],
    keyFeatures: [
      "Unified financial management and reporting",
      "End-to-end supply chain visibility",
      "Real-time inventory optimization",
      "Advanced business intelligence dashboards",
    ],
    businessBenefits: [
      "25% reduction in operational costs",
      "Real-time decision-making with unified data",
      "Improved compliance and audit readiness",
    ],
    architecture: [
      {
        layer: "Interface",
        description: "Role-based dashboards",
        technologies: ["React", "D3.js", "Material UI"],
      },
      {
        layer: "Services",
        description: "Modular microservices",
        technologies: ["Java", "Spring Boot", "Kafka"],
      },
      {
        layer: "Integration",
        description: "Enterprise service bus",
        technologies: ["MuleSoft", "REST", "SOAP"],
      },
      {
        layer: "Database",
        description: "Multi-model data store",
        technologies: ["Oracle", "PostgreSQL", "MongoDB"],
      },
    ],
    deploymentModels: ["On-Premise", "Cloud", "Hybrid"],
    integrationSupport: [
      "Banking Systems",
      "Tax Authorities",
      "Third-Party APIs",
      "Legacy System Migration",
    ],
  },
  {
    slug: "healthcare-system",
    title: "Healthcare System",
    description:
      "Comprehensive hospital management with electronic health records, patient scheduling, and integrated billing.",
    icon: "heart_pulse",
    features: [
      "EHR Management",
      "Patient Scheduling",
      "Medical Billing",
      "Telehealth Integration",
      "Lab Management",
      "Pharmacy",
    ],
    businessProblems: [
      "Paper-based records slowing down patient care",
      "Billing errors causing revenue leakage",
      "Poor coordination between departments",
    ],
    keyFeatures: [
      "HIPAA-compliant electronic health records",
      "Integrated billing with insurance claim processing",
      "Telehealth module with video consultations",
      "Real-time lab results and pharmacy integration",
    ],
    businessBenefits: [
      "45% faster patient processing",
      "30% reduction in billing errors",
      "Improved patient outcomes through coordinated care",
    ],
    architecture: [
      {
        layer: "Patient Portal",
        description: "Secure patient-facing app",
        technologies: ["React", "PWA", "WebRTC"],
      },
      {
        layer: "Clinical",
        description: "Clinical workflow engine",
        technologies: ["Node.js", "FHIR", "HL7"],
      },
      {
        layer: "Backend",
        description: "Core services layer",
        technologies: ["Python", "Django", "Celery"],
      },
      {
        layer: "Compliance",
        description: "Security and compliance",
        technologies: ["PostgreSQL", "AES-256", "Audit Logs"],
      },
    ],
    deploymentModels: ["On-Premise", "Cloud (HIPAA)", "Hybrid"],
    integrationSupport: [
      "Lab Systems (LIS)",
      "Pharmacy Systems",
      "Insurance APIs",
      "Government Health Records",
    ],
  },
  {
    slug: "inventory-management",
    title: "Inventory Management",
    description:
      "Real-time inventory tracking, demand forecasting, and multi-warehouse optimization with barcode and RFID support.",
    icon: "package",
    features: [
      "Real-Time Tracking",
      "Demand Forecasting",
      "Multi-Warehouse",
      "Barcode/RFID",
      "Reorder Automation",
      "Reporting",
    ],
    businessProblems: [
      "Stockouts and overstock situations causing revenue loss",
      "Manual inventory counts consuming labor hours",
      "No real-time visibility across multiple warehouses",
    ],
    keyFeatures: [
      "Real-time stock level monitoring with alerts",
      "AI-powered demand forecasting and reorder suggestions",
      "Barcode and RFID scanning integration",
      "Multi-warehouse transfer and allocation management",
    ],
    businessBenefits: [
      "35% reduction in carrying costs",
      "95%+ inventory accuracy",
      "Automated replenishment reducing stockouts by 80%",
    ],
    architecture: [
      {
        layer: "Dashboard",
        description: "Real-time inventory views",
        technologies: ["React", "WebSocket", "D3.js"],
      },
      {
        layer: "Core",
        description: "Inventory management engine",
        technologies: ["Node.js", "Event-Driven", "CQRS"],
      },
      {
        layer: "Integration",
        description: "Hardware integration",
        technologies: ["MQTT", "BLE", "REST"],
      },
      {
        layer: "Analytics",
        description: "Forecasting and reporting",
        technologies: ["Python", "TensorFlow", "ClickHouse"],
      },
    ],
    deploymentModels: ["Cloud SaaS", "On-Premise", "Edge Computing"],
    integrationSupport: [
      "POS Systems",
      "ERP Integration",
      "Shipping APIs",
      "Barcode/RFID Hardware",
    ],
  },
  {
    slug: "accounting-system",
    title: "Accounting System",
    description:
      "Complete financial management with automated invoicing, tax compliance, and real-time financial reporting.",
    icon: "calculator",
    features: [
      "Invoicing",
      "Tax Management",
      "Financial Reports",
      "Bank Reconciliation",
      "Expense Tracking",
      "Multi-Currency",
    ],
    businessProblems: [
      "Manual bookkeeping consuming excessive time",
      "Tax compliance errors leading to penalties",
      "Lack of real-time financial visibility",
    ],
    keyFeatures: [
      "Automated invoicing and payment reminders",
      "Multi-journal accounting with double-entry system",
      "Tax calculation and filing automation",
      "Real-time financial dashboards and reports",
    ],
    businessBenefits: [
      "70% reduction in bookkeeping time",
      "Zero tax compliance errors",
      "Real-time cash flow visibility",
    ],
    architecture: [
      {
        layer: "UI",
        description: "Intuitive accounting interface",
        technologies: ["Next.js", "React", "Chart.js"],
      },
      {
        layer: "Engine",
        description: "Double-entry accounting core",
        technologies: ["Node.js", "TypeScript", "Validation"],
      },
      {
        layer: "Reports",
        description: "Financial reporting engine",
        technologies: ["Python", "Pandas", "PDFKit"],
      },
      {
        layer: "Storage",
        description: "Audit-safe data storage",
        technologies: ["PostgreSQL", "S3", "Encryption"],
      },
    ],
    deploymentModels: ["Cloud SaaS", "Desktop", "Mobile"],
    integrationSupport: [
      "Banking APIs",
      "Payment Gateways",
      "Tax Authorities",
      "Accounting Software Migration",
    ],
  },
  {
    slug: "hospital-management",
    title: "Hospital Management",
    description:
      "Complete hospital operations management platform covering OPD/IPD, bed management, lab, pharmacy, and staff scheduling.",
    icon: "hospital",
    features: [
      "Bed Management",
      "OPD/IPD Management",
      "Lab Integration",
      "Pharmacy Management",
      "Staff Scheduling",
      "Revenue Cycle",
    ],
    businessProblems: [
      "Inefficient bed management causing patient delays",
      "Disconnected lab, pharmacy, and clinical departments",
      "Complex staff scheduling across departments and shifts",
    ],
    keyFeatures: [
      "Real-time bed occupancy dashboard and allocation",
      "Integrated lab orders with result delivery",
      "Automated pharmacy dispensing and inventory",
      "AI-assisted staff scheduling optimization",
    ],
    businessBenefits: [
      "20% increase in bed utilization",
      "40% faster lab result turnaround",
      "Optimized staffing reducing overtime costs by 25%",
    ],
    architecture: [
      {
        layer: "Web Portal",
        description: "Staff and admin dashboard",
        technologies: ["React", "TypeScript", "WebSocket"],
      },
      {
        layer: "Mobile",
        description: "Doctor and patient apps",
        technologies: ["React Native", "Push Notifications", "Offline"],
      },
      {
        layer: "Services",
        description: "Hospital operations engine",
        technologies: ["Java", "Spring Boot", "RabbitMQ"],
      },
      {
        layer: "Infrastructure",
        description: "Reliable data infrastructure",
        technologies: ["PostgreSQL", "Redis", "Kubernetes"],
      },
    ],
    deploymentModels: ["On-Premise", "Cloud", "Hybrid"],
    integrationSupport: [
      "Lab Equipment",
      "Pharmacy Systems",
      "Insurance/Payer Systems",
      "Government Health APIs",
    ],
  },
  {
    slug: "school-erp",
    title: "School ERP",
    description:
      "Education management with student information, academic planning, parent communication, and comprehensive administrative tools.",
    icon: "graduation_cap",
    features: [
      "Student Information",
      "Academic Planning",
      "Parent Portal",
      "Fee Management",
      "Attendance",
      "Library Management",
    ],
    businessProblems: [
      "Paper-based administration consuming teacher time",
      "Poor parent-school communication channels",
      "Difficulty tracking student academic progress",
    ],
    keyFeatures: [
      "Complete student lifecycle management",
      "Digital attendance with parent notifications",
      "Online fee collection and receipt generation",
      "Academic analytics and report card generation",
    ],
    businessBenefits: [
      "60% reduction in administrative overhead",
      "Improved parent engagement and satisfaction",
      "Data-driven academic performance tracking",
    ],
    architecture: [
      {
        layer: "Web App",
        description: "Admin and teacher portal",
        technologies: ["Next.js", "React", "TypeScript"],
      },
      {
        layer: "Mobile",
        description: "Parent and student apps",
        technologies: ["Flutter", "Firebase", "Push"],
      },
      {
        layer: "Backend",
        description: "School management engine",
        technologies: ["Node.js", "Express", "MongoDB"],
      },
      {
        layer: "Integrations",
        description: "Third-party services",
        technologies: ["Payment Gateways", "SMS", "Email"],
      },
    ],
    deploymentModels: ["Cloud SaaS", "On-Premise", "Mobile-First"],
    integrationSupport: [
      "Payment Gateways",
      "SMS Providers",
      "LMS Platforms",
      "Government Education APIs",
    ],
  },
  {
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description:
      "Scalable online store platform with multi-vendor marketplace support, payment processing, and logistics management.",
    icon: "shopping_cart",
    features: [
      "Multi-Vendor Support",
      "Payment Gateway",
      "Order Management",
      "Analytics",
      "Inventory Sync",
      "Marketing Tools",
    ],
    businessProblems: [
      "High platform fees eating into margins",
      "Limited customization in off-the-shelf solutions",
      "Complex multi-vendor management and payouts",
    ],
    keyFeatures: [
      "Customizable storefront with theme engine",
      "Multi-vendor marketplace with automated payouts",
      "Multi-payment gateway support with wallet system",
      "Advanced order management and fulfillment tracking",
    ],
    businessBenefits: [
      "3x faster time-to-market for online stores",
      "40% lower platform costs vs. SaaS alternatives",
      "Scalable to millions of products and transactions",
    ],
    architecture: [
      {
        layer: "Storefront",
        description: "High-performance storefront",
        technologies: ["Next.js", "ISR", "CDN"],
      },
      {
        layer: "Services",
        description: "Commerce microservices",
        technologies: ["Node.js", "gRPC", "Event-Driven"],
      },
      {
        layer: "Search",
        description: "Product search and discovery",
        technologies: ["Elasticsearch", "Algolia", "ML"],
      },
      {
        layer: "Payments",
        description: "Payment and settlement",
        technologies: ["Stripe", "PayPal", "Wallet"],
      },
    ],
    deploymentModels: ["Cloud SaaS", "Self-Hosted", "Headless Commerce"],
    integrationSupport: [
      "Payment Gateways",
      "Shipping Providers",
      "ERP Systems",
      "Marketing Platforms",
    ],
  },
  {
    slug: "fleet-management",
    title: "Fleet Management",
    description:
      "Comprehensive vehicle tracking, route optimization, fuel management, and driver safety monitoring for fleet operations.",
    icon: "truck",
    features: [
      "GPS Tracking",
      "Route Optimization",
      "Fuel Management",
      "Driver Analytics",
      "Maintenance Scheduling",
      "Compliance",
    ],
    businessProblems: [
      "High fuel costs due to inefficient routing",
      "Vehicle downtime from unplanned maintenance",
      "Difficulty ensuring driver safety and compliance",
    ],
    keyFeatures: [
      "Real-time GPS tracking with geofencing",
      "AI-powered route optimization engine",
      "Fuel consumption monitoring and anomaly detection",
      "Predictive maintenance scheduling based on telemetry",
    ],
    businessBenefits: [
      "25% reduction in fuel costs",
      "30% fewer vehicle breakdowns",
      "Improved regulatory compliance and safety scores",
    ],
    architecture: [
      {
        layer: "Dashboard",
        description: "Fleet operations center",
        technologies: ["React", "Mapbox", "WebSocket"],
      },
      {
        layer: "Telemetry",
        description: "IoT data processing",
        technologies: ["MQTT", "Kafka", "TimescaleDB"],
      },
      {
        layer: "Intelligence",
        description: "Route and maintenance AI",
        technologies: ["Python", "OR-Tools", "ML"],
      },
      {
        layer: "Devices",
        description: "Vehicle hardware integration",
        technologies: ["OBD-II", "GPS", "BLE"],
      },
    ],
    deploymentModels: ["Cloud SaaS", "On-Premise", "Edge-Deployed"],
    integrationSupport: [
      "OBD-II Devices",
      "GPS Trackers",
      "ERP Systems",
      "Fuel Card Providers",
    ],
  },
  {
    slug: "manufacturing-system",
    title: "Manufacturing System",
    description:
      "Production planning, quality control, shop floor management, and IoT integration for modern manufacturing operations.",
    icon: "factory",
    features: [
      "Production Planning",
      "Quality Control",
      "Shop Floor Management",
      "IoT Integration",
      "BOM Management",
      "MRP",
    ],
    businessProblems: [
      "Production bottlenecks from poor planning",
      "Quality defects causing waste and rework",
      "Lack of real-time shop floor visibility",
    ],
    keyFeatures: [
      "Advanced production planning and scheduling (APS)",
      "Statistical quality control with SPC charts",
      "Real-time shop floor monitoring with IoT sensors",
      "Bill of materials (BOM) and MRP management",
    ],
    businessBenefits: [
      "20% increase in production throughput",
      "50% reduction in quality defects",
      "Real-time visibility across all production lines",
    ],
    architecture: [
      {
        layer: "MES",
        description: "Manufacturing execution system",
        technologies: ["React", "Real-Time", "Dashboard"],
      },
      {
        layer: "Planning",
        description: "Production planning engine",
        technologies: ["Python", "OR-Tools", "ML"],
      },
      {
        layer: "IoT",
        description: "Industrial IoT platform",
        technologies: ["MQTT", "OPC-UA", "Time-Series"],
      },
      {
        layer: "Enterprise",
        description: "ERP integration layer",
        technologies: ["REST", "SAP RFC", "ETL"],
      },
    ],
    deploymentModels: ["On-Premise", "Cloud", "Edge + Cloud Hybrid"],
    integrationSupport: [
      "PLC/SCADA Systems",
      "ERP Integration",
      "IoT Sensors",
      "Quality Lab Equipment",
    ],
  },
];

export function getSolutionBySlug(slug: string): SolutionData | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export function getSolutionsBySlugs(slugs: string[]): SolutionData[] {
  return slugs.map((slug) => getSolutionBySlug(slug)).filter(Boolean) as SolutionData[];
}
