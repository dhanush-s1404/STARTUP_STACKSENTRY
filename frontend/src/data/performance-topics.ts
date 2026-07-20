export type PerformanceTopicData = {
  slug: string;
  title: string;
  description: string;
  category: string;
  impact: string;
  bestPractices: string[];
  tools: string[];
  order: number;
};

export const PERFORMANCE_TOPICS: PerformanceTopicData[] = [
  {
    slug: "performance-optimization",
    title: "Performance Optimization",
    description:
      "Systematic approach to reducing load times, improving responsiveness, and eliminating bottlenecks across the full stack",
    category: "Core Performance",
    impact:
      "Every 100ms of reduced load time correlates with a 1-2% increase in conversion rates and measurable improvements in user retention and engagement metrics",
    bestPractices: [
      "Profile before optimizing — use Lighthouse, WebPageTest, and APM data to identify the actual bottleneck",
      "Set performance budgets in CI and block merges when metrics regress beyond defined thresholds",
      "Optimize the critical rendering path to deliver meaningful content as early as possible",
    ],
    tools: [
      "Lighthouse",
      "WebPageTest",
      "Chrome DevTools Performance Panel",
    ],
    order: 1,
  },
  {
    slug: "accessibility",
    title: "Accessibility (WCAG AA)",
    description:
      "Building interfaces that are usable by everyone, including users with visual, motor, auditory, and cognitive disabilities",
    category: "User Experience",
    impact:
      "Accessible design expands the addressable audience by 15-20%, reduces legal risk, and often improves usability for all users through clearer structure and navigation",
    bestPractices: [
      "Implement semantic HTML with proper heading hierarchy, ARIA landmarks, and role attributes",
      "Ensure keyboard navigability for all interactive elements with visible focus indicators",
      "Maintain minimum 4.5:1 color contrast ratio for text and provide alternative text for all meaningful images",
    ],
    tools: [
      "axe-core",
      "NVDA / VoiceOver",
      "Storybook a11y addon",
    ],
    order: 2,
  },
  {
    slug: "seo",
    title: "SEO",
    description:
      "Search Engine Optimization through technical best practices, structured data, and content strategy for organic discoverability",
    category: "Visibility",
    impact:
      "Strong technical SEO improves organic traffic by 20-40%, reduces customer acquisition costs, and compounds over time as content authority grows",
    bestPractices: [
      "Use server-side rendering or static generation to ensure full content is available to search engine crawlers",
      "Implement structured data (JSON-LD) for rich results including FAQ, product, and organization schemas",
      "Maintain a clean sitemap, robots.txt, and canonical URL strategy to prevent indexing issues",
    ],
    tools: [
      "Google Search Console",
      "Screaming Frog",
      "Schema.org Validator",
    ],
    order: 3,
  },
  {
    slug: "responsive-design",
    title: "Responsive Design",
    description:
      "Fluid, adaptive layouts that deliver optimal experiences across mobile, tablet, and desktop screen sizes",
    category: "User Experience",
    impact:
      "Responsive design ensures mobile users (typically 55-70% of traffic) receive a usable, engaging experience rather than a degraded desktop layout",
    bestPractices: [
      "Design mobile-first with progressive enhancement for larger viewports and more capable devices",
      "Use CSS Container Queries for component-level responsiveness independent of viewport width",
      "Test across real devices and network conditions, not just browser resize in development",
    ],
    tools: [
      "BrowserStack",
      "Chrome DevTools Device Mode",
      "CSS Container Queries",
    ],
    order: 4,
  },
  {
    slug: "image-optimization",
    title: "Image Optimization",
    description:
      "Reducing image payload size and optimizing delivery format to improve load times without sacrificing visual quality",
    category: "Core Performance",
    impact:
      "Images typically account for 50-70% of page weight — optimizing them can reduce page load time by 30-50% on image-heavy pages",
    bestPractices: [
      "Serve images in modern formats (WebP, AVIF) with automatic fallback to JPEG/PNG for older browsers",
      "Implement responsive images with srcset and sizes attributes to serve device-appropriate dimensions",
      "Lazy-load images below the fold using native loading='lazy' or Intersection Observer",
    ],
    tools: [
      "Sharp",
      "Next/Image",
      "Cloudinary",
    ],
    order: 5,
  },
  {
    slug: "code-splitting",
    title: "Code Splitting",
    description:
      "Breaking JavaScript bundles into smaller chunks that load on demand, reducing initial page load time and memory usage",
    category: "Core Performance",
    impact:
      "Code splitting can reduce initial JavaScript payload by 40-60%, directly improving First Contentful Paint and Time to Interactive metrics",
    bestPractices: [
      "Split code at route boundaries so each page only loads the JavaScript it requires",
      "Use dynamic import() for heavyweight components like rich text editors and chart libraries",
      "Analyze bundle composition regularly with source map explorers to identify split opportunities",
    ],
    tools: [
      "Webpack Bundle Analyzer",
      "Rollup",
      "Next.js dynamic imports",
    ],
    order: 6,
  },
  {
    slug: "caching-strategy",
    title: "Caching Strategy",
    description:
      "Multi-layered caching across browser, CDN, and server to minimize redundant computation and data fetching",
    category: "Core Performance",
    impact:
      "Effective caching reduces server load by 60-80% and can cut API response times from hundreds of milliseconds to single digits for cache hits",
    bestPractices: [
      "Implement Cache-Control headers with appropriate max-age, stale-while-revalidate, and immutable directives",
      "Use a tiered caching strategy — browser cache for static assets, CDN for pages, Redis for API responses",
      "Design cache invalidation strategies explicitly — time-based expiry for tolerant data, event-driven invalidation for critical data",
    ],
    tools: [
      "Redis",
      "CloudFront Cache Behaviors",
      "Service Worker Cache API",
    ],
    order: 7,
  },
  {
    slug: "lazy-loading",
    title: "Lazy Loading",
    description:
      "Deferring the loading of non-critical resources until they are needed or enter the viewport",
    category: "Core Performance",
    impact:
      "Lazy loading reduces initial page weight by 30-50%, improving Time to Interactive and reducing bandwidth consumption on mobile networks",
    bestPractices: [
      "Lazy-load images and iframes below the fold using the native loading='lazy' attribute",
      "Implement intersection observer-based loading for infinite scroll lists and deferred components",
      "Combine lazy loading with skeleton screens to maintain perceived performance during deferred load",
    ],
    tools: [
      "Intersection Observer API",
      "React.lazy()",
      "next/dynamic",
    ],
    order: 8,
  },
  {
    slug: "bundle-optimization",
    title: "Bundle Optimization",
    description:
      "Minimizing JavaScript and CSS bundle size through tree-shaking, dead code elimination, and dependency auditing",
    category: "Core Performance",
    impact:
      "Reducing bundle size by 100KB typically improves First Contentful Paint by 100-200ms on 3G networks, directly impacting mobile user experience",
    bestPractices: [
      "Enable tree-shaking with ES module imports and verify dead code elimination in production builds",
      "Audit dependencies regularly — replace heavyweight libraries with lighter alternatives where possible",
      "Apply Brotli or gzip compression for text assets at the build or server level to reduce transfer size",
    ],
    tools: [
      "esbuild",
      "Bundlephobia",
      "Brotli compression",
    ],
    order: 9,
  },
  {
    slug: "core-web-vitals",
    title: "Core Web Vitals",
    description:
      "Google's standardized metrics — LCP, FID/INP, and CLS — measuring real-world loading performance, interactivity, and visual stability",
    category: "Core Performance",
    impact:
      "Core Web Vitals are a direct Google ranking factor — meeting the 'good' thresholds on all three metrics improves SEO ranking and user experience scores",
    bestPractices: [
      "Track LCP by optimizing the largest content element — preload hero images and critical fonts to eliminate load delays",
      "Minimize Cumulative Layout Shift (CLS) by reserving space for dynamic content and using font-display: swap",
      "Improve Interaction to Next Paint (INP) by breaking long tasks into smaller chunks and reducing JavaScript main thread work",
    ],
    tools: [
      "PageSpeed Insights",
      "Chrome UX Report (CrUX)",
      "web-vitals JavaScript library",
    ],
    order: 10,
  },
];

const performanceTopicBySlug = new Map(
  PERFORMANCE_TOPICS.map((t) => [t.slug, t]),
);

export function getPerformanceTopicBySlug(
  slug: string,
): PerformanceTopicData | undefined {
  return performanceTopicBySlug.get(slug);
}
