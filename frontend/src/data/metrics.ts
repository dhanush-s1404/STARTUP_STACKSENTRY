export type MetricData = {
  slug: string;
  label: string;
  value: string;
  suffix: string;
  prefix?: string;
  description: string;
  category: string;
};

export const METRICS: MetricData[] = [
  {
    slug: "revenue-growth",
    label: "Revenue Growth",
    value: "250",
    suffix: "%",
    description: "Average revenue growth for clients within 12 months",
    category: "Financial",
  },
  {
    slug: "automation-rate",
    label: "Automation Rate",
    value: "80",
    suffix: "%",
    description: "Process automation achieved across deployments",
    category: "Operations",
  },
  {
    slug: "productivity",
    label: "Employee Productivity",
    value: "45",
    suffix: "%",
    description: "Productivity increase through intelligent automation",
    category: "Operations",
  },
  {
    slug: "satisfaction",
    label: "Client Satisfaction",
    value: "98",
    suffix: "%",
    description: "Overall client satisfaction score",
    category: "Experience",
  },
  {
    slug: "uptime",
    label: "System Uptime",
    value: "99.99",
    suffix: "%",
    description: "Enterprise-grade system availability",
    category: "Infrastructure",
  },
  {
    slug: "cloud-adoption",
    label: "Cloud Adoption",
    value: "95",
    suffix: "%",
    description: "Modern cloud-native deployments",
    category: "Infrastructure",
  },
  {
    slug: "security-improvement",
    label: "Security Improvement",
    value: "60",
    suffix: "%",
    description: "Security posture improvement post-engagement",
    category: "Security",
  },
  {
    slug: "time-saved",
    label: "Time Saved",
    value: "5000",
    suffix: "+ hours",
    description: "Annual hours saved per client through automation",
    category: "Operations",
  },
  {
    slug: "cost-reduction",
    label: "Cost Reduction",
    value: "35",
    suffix: "%",
    description: "Average operational cost reduction within first year",
    category: "Financial",
  },
  {
    slug: "deployment-speed",
    label: "Deployment Speed",
    value: "3",
    suffix: "x faster",
    description: "Faster deployment cycles with CI/CD pipelines",
    category: "Infrastructure",
  },
  {
    slug: "data-accuracy",
    label: "Data Accuracy",
    value: "99.5",
    suffix: "%",
    description: "Data quality improvement through automated validation",
    category: "Data",
  },
  {
    slug: "user-adoption",
    label: "User Adoption",
    value: "92",
    suffix: "%",
    description: "Platform user adoption rate within 60 days of launch",
    category: "Experience",
  },
  {
    slug: "projects-delivered",
    label: "Projects Delivered",
    value: "200",
    suffix: "+",
    description: "Enterprise projects successfully delivered",
    category: "Operations",
  },
  {
    slug: "countries-served",
    label: "Countries Served",
    value: "25",
    suffix: "+",
    description: "Countries with active client engagements",
    category: "Global",
  },
  {
    slug: "enterprise-clients",
    label: "Enterprise Clients",
    value: "50",
    suffix: "+",
    description: "Enterprise clients across industries",
    category: "Financial",
  },
  {
    slug: "uptime-guarantee",
    label: "SLA Guarantee",
    value: "99.99",
    suffix: "%",
    description: "Service level agreement uptime commitment",
    category: "Infrastructure",
  },
];

export function getMetricBySlug(slug: string): MetricData | undefined {
  return METRICS.find((m) => m.slug === slug);
}

export function getMetricsByCategory(category: string): MetricData[] {
  return METRICS.filter(
    (m) => m.category.toLowerCase() === category.toLowerCase(),
  );
}
