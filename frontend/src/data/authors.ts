export interface Author {
  name: string;
  slug: string;
  role: string;
  avatar: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export const authors: Author[] = [
  {
    name: "Sarah Chen",
    slug: "sarah-chen",
    role: "Senior AI Engineer",
    avatar: "/images/team/sarah-chen.jpg",
    bio: "Sarah specializes in building enterprise-grade AI agents and LLM-powered solutions. With 8+ years in machine learning, she leads StackSentry's AI practice.",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "James Mitchell",
    slug: "james-mitchell",
    role: "Principal Architect",
    avatar: "/images/team/james-mitchell.jpg",
    bio: "James architects distributed systems and microservices for Fortune 500 clients. He brings 15+ years of experience in software architecture and system design.",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Alex Rivera",
    slug: "alex-rivera",
    role: "Cloud Security Lead",
    avatar: "/images/team/alex-rivera.jpg",
    bio: "Alex leads cloud security initiatives and has helped over 30 enterprises achieve compliance and secure their cloud infrastructure.",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Emily Park",
    slug: "emily-park",
    role: "HR Technology Director",
    avatar: "/images/team/emily-park.jpg",
    bio: "Emily drives innovation in HR technology and recruitment automation, helping companies build world-class teams with AI-powered tools.",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "David Kim",
    slug: "david-kim",
    role: "Senior Python Developer",
    avatar: "/images/team/david-kim.jpg",
    bio: "David is a Python expert who has built enterprise applications for fintech, healthcare, and e-commerce. He champions clean code and testing best practices.",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Lisa Wang",
    slug: "lisa-wang",
    role: "Cybersecurity Architect",
    avatar: "/images/team/lisa-wang.jpg",
    bio: "Lisa designs zero-trust architectures and security frameworks for enterprise clients. She holds CISSP and CISM certifications.",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
