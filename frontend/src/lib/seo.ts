import { siteConfig } from "@/config/site";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    foundingDate: String(siteConfig.company.founded),
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@stacksentry.com",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateServiceSchema(service: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  slug: string;
  price?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    url: `${siteConfig.url}/solutions/${product.slug}`,
    applicationCategory: "BusinessApplication",
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "USD",
        }
      : undefined,
  };
}

export function generateProjectSchema(project: {
  title: string;
  description: string;
  slug: string;
  technologies?: string[];
  industry?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/portfolio/${project.slug}`,
    applicationCategory: "BusinessApplication",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    keywords: project.technologies?.join(", "),
    category: project.industry,
  };
}

export function generateCaseStudySchema(caseStudy: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.description,
    url: `${siteConfig.url}/case-studies/${caseStudy.slug}`,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };
}

export function generateIndustrySchema(industry: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${industry.name} Solutions`,
    description: industry.description,
    url: `${siteConfig.url}/industries/${industry.slug}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function generateTechnologySchema(tech: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: tech.name,
    description: tech.description,
    url: `${siteConfig.url}/technology/${tech.slug}`,
    programmingLanguage: tech.name,
  };
}

export function generateJobSchema(job: {
  title: string;
  description: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  datePosted: string;
  validThrough: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    url: `${siteConfig.url}/careers/jobs/${job.slug}`,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
      },
    },
    employmentType: job.employmentType.toUpperCase().replace("-", "_"),
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    ...(job.salaryMin && job.salaryMax ? {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: job.salaryCurrency || "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: job.salaryMin,
          maxValue: job.salaryMax,
          unitText: "YEAR",
        },
      },
    } : {}),
  };
}

export function generateCareersPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Careers at StackSentry Technologies",
    description: "Join StackSentry Technologies. Explore open positions, internship programs, and life at our company.",
    url: `${siteConfig.url}/careers`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function generateInternshipSchema(internship: {
  title: string;
  description: string;
  slug: string;
  duration: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: internship.title,
    description: internship.description,
    url: `${siteConfig.url}/careers/internships#${internship.slug}`,
    duration: internship.duration,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${siteConfig.url}/blog/${article.slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Organization",
      name: article.author || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    image: article.image || siteConfig.ogImage,
  };
}

export function generatePageSchema(page: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: `${siteConfig.url}${page.path}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}
