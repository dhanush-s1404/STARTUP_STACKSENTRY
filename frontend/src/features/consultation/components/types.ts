export type WizardData = {
  // Step 1: Business Information
  company: string;
  industry: string;
  teamSize: string;
  country: string;
  website: string;
  // Step 2: Project Type
  projectType: string;
  // Step 3: Business Goals
  businessGoals: string[];
  // Step 4: Desired Features
  desiredFeatures: string[];
  // Step 5: Preferred Technologies
  preferredTechnologies: {
    frontend: string[];
    backend: string[];
    database: string[];
    cloud: string[];
    ai: string[];
  };
  // Step 6: Timeline
  timeline: string;
  // Step 7: Budget
  budgetRange: string;
  // Step 8: Additional Requirements
  additionalRequirements: string;
  // Contact Info
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

export const INITIAL_WIZARD_DATA: WizardData = {
  company: "",
  industry: "",
  teamSize: "",
  country: "",
  website: "",
  projectType: "",
  businessGoals: [],
  desiredFeatures: [],
  preferredTechnologies: {
    frontend: [],
    backend: [],
    database: [],
    cloud: [],
    ai: [],
  },
  timeline: "",
  budgetRange: "",
  additionalRequirements: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
};

export const PROJECT_TYPES = [
  { value: "web-application", label: "Web Application" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "ai-solution", label: "AI Solution" },
  { value: "enterprise-software", label: "Enterprise Software" },
  { value: "automation", label: "Automation" },
  { value: "cloud-migration", label: "Cloud Migration" },
  { value: "api-development", label: "API Development" },
  { value: "custom-software", label: "Custom Software" },
  { value: "other", label: "Other" },
];

export const BUSINESS_GOALS = [
  { id: "productivity", label: "Improve productivity" },
  { id: "reduce-manual", label: "Reduce manual work" },
  { id: "revenue", label: "Increase revenue" },
  { id: "modernize", label: "Modernize systems" },
  { id: "customer-experience", label: "Improve customer experience" },
  { id: "automate", label: "Automate workflows" },
  { id: "scale", label: "Scale infrastructure" },
  { id: "compliance", label: "Meet compliance requirements" },
  { id: "insights", label: "Gain data insights" },
  { id: "collaboration", label: "Enhance collaboration" },
];

export const DESIRED_FEATURES = [
  { id: "authentication", label: "Authentication" },
  { id: "dashboards", label: "Dashboards" },
  { id: "payments", label: "Payments" },
  { id: "notifications", label: "Notifications" },
  { id: "reporting", label: "Reporting" },
  { id: "ai-features", label: "AI Features" },
  { id: "integrations", label: "Integrations" },
  { id: "analytics", label: "Analytics" },
  { id: "admin-panel", label: "Admin Panel" },
  { id: "file-uploads", label: "File Uploads" },
  { id: "search", label: "Search" },
  { id: "multi-language", label: "Multi-language" },
  { id: "custom-workflows", label: "Custom workflows" },
  { id: "future-expansion", label: "Future expansion" },
];

export const TEAM_SIZES = [
  { value: "1-5", label: "1–5" },
  { value: "5-20", label: "5–20" },
  { value: "20-50", label: "20–50" },
  { value: "50-200", label: "50–200" },
  { value: "200+", label: "200+" },
];

export const TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1–3 Months" },
  { value: "3-6-months", label: "3–6 Months" },
  { value: "6-12-months", label: "6–12 Months" },
  { value: "flexible", label: "Flexible" },
];

export const TECH_OPTIONS = {
  frontend: [
    { id: "react", label: "React" },
    { id: "nextjs", label: "Next.js" },
    { id: "vue", label: "Vue" },
    { id: "angular", label: "Angular" },
    { id: "svelte", label: "Svelte" },
    { id: "flutter", label: "Flutter" },
  ],
  backend: [
    { id: "nodejs", label: "Node.js" },
    { id: "python", label: "Python" },
    { id: "java", label: "Java" },
    { id: "go", label: "Go" },
    { id: "rust", label: "Rust" },
    { id: "dotnet", label: ".NET" },
  ],
  database: [
    { id: "postgresql", label: "PostgreSQL" },
    { id: "mongodb", label: "MongoDB" },
    { id: "mysql", label: "MySQL" },
    { id: "redis", label: "Redis" },
    { id: "elasticsearch", label: "Elasticsearch" },
    { id: "cassandra", label: "Cassandra" },
  ],
  cloud: [
    { id: "aws", label: "AWS" },
    { id: "azure", label: "Azure" },
    { id: "gcp", label: "GCP" },
    { id: "digitalocean", label: "DigitalOcean" },
  ],
  ai: [
    { id: "openai", label: "OpenAI" },
    { id: "tensorflow", label: "TensorFlow" },
    { id: "pytorch", label: "PyTorch" },
    { id: "langchain", label: "LangChain" },
    { id: "huggingface", label: "Hugging Face" },
    { id: "anthropic", label: "Anthropic" },
  ],
};

export const INDUSTRIES = [
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance & Banking" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "logistics", label: "Logistics & Supply Chain" },
  { value: "real-estate", label: "Real Estate" },
  { value: "hospitality", label: "Hospitality & Travel" },
  { value: "technology", label: "Technology" },
  { value: "government", label: "Government & Public Sector" },
  { value: "recruitment", label: "Recruitment & HR" },
  { value: "other", label: "Other" },
];

export const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "NL", label: "Netherlands" },
  { value: "IN", label: "India" },
  { value: "SG", label: "Singapore" },
  { value: "AU", label: "Australia" },
  { value: "AE", label: "UAE" },
  { value: "BR", label: "Brazil" },
  { value: "ZA", label: "South Africa" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "other", label: "Other" },
];
