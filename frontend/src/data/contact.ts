export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  mission: string;
  email: string;
  phone: string;
  businessHours: string;
  responseTime: string;
  remoteServices: boolean;
  globalAvailability: boolean;
}

export interface Office {
  city: string;
  country: string;
  address: string;
  isHQ: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  description: string;
}

export interface InquiryType {
  id: string;
  label: string;
  description: string;
  fields?: string[];
}

export const companyInfo: CompanyInfo = {
  name: "StackSentry Technologies",
  tagline: "Let's Build Something Extraordinary Together",
  description:
    "StackSentry Technologies is an enterprise AI-powered software platform company. We partner with startups, businesses, and enterprises to build custom software solutions, implement AI automation, and drive digital transformation.",
  mission:
    "Empower organizations with cutting-edge technology solutions that drive measurable business outcomes and enable sustainable growth.",
  email: "hello@stacksentry.tech",
  phone: "+1 (555) 123-4567",
  businessHours: "Monday — Friday: 9:00 AM — 6:00 PM",
  responseTime: "We typically respond within 24 hours on business days.",
  remoteServices: true,
  globalAvailability: true,
};

export const offices: Office[] = [
  {
    city: "San Francisco",
    country: "United States",
    address: "548 Market Street, Suite 100, San Francisco, CA 94104",
    isHQ: true,
  },
  {
    city: "New York",
    country: "United States",
    address: "20 W 34th Street, New York, NY 10001",
    isHQ: false,
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "71 Queen Victoria Street, London EC4V 4AY",
    isHQ: false,
  },
  {
    city: "Dubai",
    country: "UAE",
    address: "Dubai Silicon Oasis, DDP, Building A1, Dubai",
    isHQ: false,
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/stacksentry",
    icon: "Linkedin",
    description: "Follow us for industry insights and company updates",
  },
  {
    name: "GitHub",
    url: "https://github.com/stacksentry",
    icon: "Github",
    description: "Explore our open source projects and contributions",
  },
  {
    name: "X (Twitter)",
    url: "https://twitter.com/stacksentry",
    icon: "Twitter",
    description: "Stay updated with the latest tech news and tips",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/stacksentry",
    icon: "Instagram",
    description: "Behind the scenes at StackSentry",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/stacksentry",
    icon: "Facebook",
    description: "Join our community and connect with the team",
  },
];

export const inquiryTypes: InquiryType[] = [
  {
    id: "general",
    label: "General Question",
    description: "General inquiries about StackSentry and our services",
  },
  {
    id: "project",
    label: "New Project",
    description: "Start a conversation about a new software project",
    fields: ["project_type", "budget_range", "timeline"],
  },
  {
    id: "partnership",
    label: "Partnership",
    description: "Explore partnership and collaboration opportunities",
  },
  {
    id: "support",
    label: "Support",
    description: "Get support for an existing project or platform",
  },
  {
    id: "careers",
    label: "Careers",
    description: "Inquire about career opportunities (Coming Soon)",
  },
  {
    id: "media",
    label: "Media Inquiry",
    description: "Press and media-related inquiries",
  },
  {
    id: "other",
    label: "Other",
    description: "Something else? We'd love to hear from you",
  },
];

export const contactFAQs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on scope and complexity. A simple web application can take 2-3 months, while enterprise platforms can take 6-12+ months. We provide detailed timelines during the consultation phase.",
    category: "Projects",
  },
  {
    question: "How do your consultations work?",
    answer:
      "Our consultations are free, no-obligation conversations where we discuss your project goals, challenges, and requirements. We'll provide initial recommendations and a high-level estimate. Consultations can be conducted via video call, phone, or in person.",
    category: "Consultation",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve a wide range of industries including healthcare, finance, e-commerce, education, logistics, manufacturing, real estate, and more. Our solutions are adaptable to any industry that needs custom software.",
    category: "Services",
  },
  {
    question: "Do you build custom software from scratch?",
    answer:
      "Yes. We specialize in building custom software solutions tailored to your specific business needs. We also modernize and enhance existing systems. Every solution is built with scalability, security, and maintainability in mind.",
    category: "Services",
  },
  {
    question: "Can you modernize my existing systems?",
    answer:
      "Absolutely. We assess your current architecture, identify modernization opportunities, and create a roadmap to upgrade your systems. This includes cloud migration, microservices adoption, and technology stack upgrades.",
    category: "Services",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Our technology stack includes Python, TypeScript, React, Next.js, FastAPI, Node.js, Go, PostgreSQL, Redis, Kubernetes, Docker, AWS, GCP, Azure, and more. We select the best technologies for each project's specific requirements.",
    category: "Services",
  },
  {
    question: "Is post-launch support available?",
    answer:
      "Yes. We offer comprehensive post-launch support including maintenance, monitoring, updates, security patches, performance optimization, and feature enhancements. Support plans are tailored to your needs.",
    category: "Support",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "We provide a dedicated project manager, regular status updates, weekly standups, and access to our project management tools. You'll always know where your project stands and what's coming next.",
    category: "Process",
  },
];
