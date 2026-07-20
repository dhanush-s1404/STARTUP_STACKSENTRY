export type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
  };
};

export type SearchItem = {
  id: string;
  label: string;
  description?: string;
  href: string;
  icon?: string;
  group: string;
  shortcut?: string;
  popular?: boolean;
};

export type SearchHistoryItem = {
  query: string;
  timestamp: number;
};

export type Language = {
  code: string;
  name: string;
  nativeName: string;
  dir?: "ltr" | "rtl";
};

export type FloatingAction = {
  id: string;
  label: string;
  href: string;
  icon?: string;
  variant?: "primary" | "secondary" | "ghost";
  position?: "left" | "right";
};

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export type WithChildren = {
  children: React.ReactNode;
};

export type WithClassName = {
  className?: string;
};

export type WithChildrenAndClassName = WithChildren & WithClassName;

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating?: number;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  href?: string;
};

export type Stat = {
  id: string;
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatar: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  slug: string;
  image?: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  period?: string;
  features: string[];
  highlighted?: boolean;
  cta?: string;
  href?: string;
};

export type FooterLink = {
  title: string;
  href: string;
  external?: boolean;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type ApiResponse<T> = {
  data: T;
  message?: string;
  status: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ContactForm = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
};

export type NewsletterForm = {
  email: string;
};

export type Theme = "dark" | "light" | "system";

export type ColorScheme = "blue" | "purple" | "cyan" | "emerald" | "amber" | "rose";

export type AlertVariant = "info" | "success" | "warning" | "error";

export type StepStatus = "completed" | "current" | "upcoming";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export type DropdownItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  separator?: boolean;
};

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type StepperStep = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

export type SidebarItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export type SidebarSection = {
  title?: string;
  items: SidebarItem[];
};

export type CommandPaletteItem = {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  group?: string;
  disabled?: boolean;
};

export type FilterField = {
  id: string;
  label: string;
  type: "checkbox" | "select" | "radio";
  options: { label: string; value: string }[];
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type AnnouncementBanner = {
  id: string;
  message: string;
  href?: string;
  linkText?: string;
  type: "info" | "maintenance" | "promotion" | "update";
  dismissible: boolean;
  active: boolean;
  priority: number;
};
