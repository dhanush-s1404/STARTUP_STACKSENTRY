import type { NavItem, FooterSection, SearchItem, Language, FloatingAction, AnnouncementBanner } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Solutions",
    href: "/solutions",
    children: [
      { title: "AI Automation", href: "/solutions/ai-automation", description: "Intelligent workflow automation", icon: "Brain", badge: "New" },
      { title: "Cloud Platform", href: "/solutions/cloud", description: "Scalable cloud infrastructure", icon: "Cloud" },
      { title: "Data Analytics", href: "/solutions/analytics", description: "Real-time business intelligence", icon: "BarChart3", badge: "Popular" },
      { title: "Security Suite", href: "/solutions/security", description: "Enterprise-grade protection", icon: "Shield" },
    ],
    featured: {
      title: "AI Automation Launch",
      description: "Our new AI-powered automation suite is now generally available. Learn how it can transform your workflows.",
      href: "/solutions/ai-automation",
    },
  },
  {
    title: "Platform",
    href: "/platform",
    children: [
      { title: "Overview", href: "/platform", description: "Full platform capabilities", icon: "LayoutDashboard" },
      { title: "Integrations", href: "/platform/integrations", description: "Connect your tools", icon: "Puzzle" },
      { title: "API Reference", href: "/platform/api", description: "Build with our API", icon: "Code2" },
      { title: "Changelog", href: "/platform/changelog", description: "Latest updates", icon: "GitCommit" },
    ],
    featured: {
      title: "Platform Updates",
      description: "Check out our latest platform release with enhanced API capabilities and new integrations.",
      href: "/platform/changelog",
    },
  },
  {
    title: "Resources",
    href: "/resources",
    children: [
      { title: "Documentation", href: "/resources/docs", description: "Guides and references", icon: "BookOpen" },
      { title: "Blog", href: "/blog", description: "Insights and news", icon: "Newspaper", badge: "New" },
      { title: "Case Studies", href: "/resources/case-studies", description: "Customer stories", icon: "Briefcase" },
      { title: "Community", href: "/resources/community", description: "Join the conversation", icon: "Users" },
    ],
    featured: {
      title: "Latest Blog Post",
      description: "How StackSentry is revolutionizing enterprise AI with our cutting-edge platform architecture.",
      href: "/blog",
    },
  },
  {
    title: "Company",
    href: "/company",
    children: [
      { title: "About", href: "/company/about", description: "Our mission and team", icon: "Info" },
      { title: "Careers", href: "/careers", description: "Join our team", icon: "Briefcase" },
      { title: "Press", href: "/company/press", description: "Media resources", icon: "Radio" },
      { title: "Contact", href: "/contact", description: "Get in touch", icon: "Mail" },
    ],
    featured: {
      title: "We're Hiring!",
      description: "Join our world-class team and help build the future of enterprise software.",
      href: "/careers",
    },
  },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Services",
    links: [
      { title: "AI Automation", href: "/solutions/ai-automation" },
      { title: "Cloud Platform", href: "/solutions/cloud" },
      { title: "Data Analytics", href: "/solutions/analytics" },
      { title: "Security Suite", href: "/solutions/security" },
      { title: "Custom Development", href: "/services" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { title: "Enterprise", href: "/solutions/enterprise" },
      { title: "Startups", href: "/solutions/startups" },
      { title: "Healthcare", href: "/industries/healthcare" },
      { title: "Finance", href: "/industries/finance" },
      { title: "All Industries", href: "/industries" },
    ],
  },
  {
    title: "Portfolio",
    links: [
      { title: "Case Studies", href: "/case-studies" },
      { title: "Client Success", href: "/client-success" },
      { title: "Testimonials", href: "/testimonials" },
      { title: "Technology", href: "/technology" },
    ],
  },
  {
    title: "Blog",
    links: [
      { title: "Latest Posts", href: "/blog" },
      { title: "Engineering", href: "/engineering" },
      { title: "Industry Insights", href: "/blog" },
      { title: "Tutorials", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About Us", href: "/company/about" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
      { title: "Consultation", href: "/consultation" },
    ],
  },
];

export const COMPANY_STATS = [
  { id: "clients", label: "Enterprise Clients", value: 500, suffix: "+" },
  { id: "uptime", label: "Platform Uptime", value: 99.99, suffix: "%" },
  { id: "transactions", label: "Daily Transactions", value: 10, suffix: "M+" },
  { id: "countries", label: "Countries Served", value: 40, suffix: "+" },
] as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
  slideInLeft: {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  },
  slideInRight: {
    hidden: { x: 60, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const SEARCH_ITEMS: SearchItem[] = [
  { id: "solutions", label: "Solutions Overview", href: "/solutions", group: "Pages", icon: "LayoutDashboard" },
  { id: "ai-automation", label: "AI Automation", description: "Intelligent workflow automation", href: "/solutions/ai-automation", group: "Solutions", icon: "Brain", popular: true },
  { id: "cloud-platform", label: "Cloud Platform", description: "Scalable cloud infrastructure", href: "/solutions/cloud", group: "Solutions", icon: "Cloud" },
  { id: "analytics", label: "Data Analytics", description: "Real-time business intelligence", href: "/solutions/analytics", group: "Solutions", icon: "BarChart3", popular: true },
  { id: "security", label: "Security Suite", description: "Enterprise-grade protection", href: "/solutions/security", group: "Solutions", icon: "Shield" },
  { id: "integrations", label: "Integrations", description: "Connect your tools", href: "/platform/integrations", group: "Platform", icon: "Puzzle" },
  { id: "api-ref", label: "API Reference", description: "Build with our API", href: "/platform/api", group: "Platform", icon: "Code2", popular: true },
  { id: "docs", label: "Documentation", description: "Guides and references", href: "/resources/docs", group: "Resources", icon: "BookOpen", popular: true },
  { id: "blog", label: "Blog", description: "Insights and news", href: "/blog", group: "Resources", icon: "Newspaper" },
  { id: "case-studies", label: "Case Studies", description: "Customer stories", href: "/resources/case-studies", group: "Resources", icon: "Briefcase" },
  { id: "pricing", label: "Pricing", description: "View our pricing plans", href: "/pricing", group: "Pages", icon: "DollarSign" },
  { id: "about", label: "About Us", description: "Our mission and team", href: "/company/about", group: "Company", icon: "Info" },
  { id: "careers", label: "Careers", description: "Join our team", href: "/careers", group: "Company", icon: "Briefcase" },
  { id: "contact", label: "Contact", description: "Get in touch", href: "/contact", group: "Company", icon: "Mail" },
  { id: "privacy", label: "Privacy Policy", href: "/privacy", group: "Legal", icon: "FileText" },
  { id: "terms", label: "Terms of Service", href: "/terms", group: "Legal", icon: "FileText" },
];

export const ICON_MAP: Record<string, string> = {
  Brain: "Brain",
  Cloud: "Cloud",
  BarChart3: "BarChart3",
  Shield: "Shield",
  LayoutDashboard: "LayoutDashboard",
  Puzzle: "Puzzle",
  Code2: "Code2",
  GitCommit: "GitCommit",
  BookOpen: "BookOpen",
  Newspaper: "Newspaper",
  Briefcase: "Briefcase",
  Users: "Users",
  Info: "Info",
  Radio: "Radio",
  Mail: "Mail",
  DollarSign: "DollarSign",
  FileText: "FileText",
  GraduationCap: "GraduationCap",
  List: "List",
  MessageCircle: "MessageCircle",
  Phone: "Phone",
  Search: "Search",
  ArrowRight: "ArrowRight",
  ExternalLink: "ExternalLink",
};

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
];

export const FLOATING_ACTIONS: FloatingAction[] = [
  { id: "proposal", label: "Request Proposal", href: "/contact", icon: "FileText", variant: "primary", position: "right" },
  { id: "consultation", label: "Book Consultation", href: "/contact", icon: "Phone", variant: "secondary", position: "right" },
];

export const TRENDING_SEARCHES = [
  "AI Automation",
  "API Reference",
  "Data Analytics",
  "Pricing",
  "Documentation",
];

export const ANNOUNCEMENTS: AnnouncementBanner[] = [
  {
    id: "welcome",
    message: "Welcome to StackSentry Technologies — Building Intelligent Software for Tomorrow",
    href: "/company/about",
    linkText: "Learn More",
    type: "info",
    dismissible: true,
    active: true,
    priority: 1,
  },
];

export const SITE_MAP_SECTIONS = [
  {
    title: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/company/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "AI Automation", href: "/solutions/ai-automation" },
      { label: "Cloud Platform", href: "/solutions/cloud" },
      { label: "Data Analytics", href: "/solutions/analytics" },
      { label: "Security Suite", href: "/solutions/security" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "All Solutions", href: "/solutions" },
      { label: "Enterprise", href: "/solutions/enterprise" },
      { label: "Startups", href: "/solutions/startups" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "All Industries", href: "/industries" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Finance", href: "/industries/finance" },
      { label: "Retail", href: "/industries/retail" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Technology", href: "/technology" },
      { label: "Engineering", href: "/engineering" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];
