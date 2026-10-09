/**
 * Glossary of common software development terms explained in plain, accurate language.
 * Designed for non-technical founders, managers, and visitors.
 */

export interface GlossaryEntry {
  term: string;
  shortDefinition: string;
  details?: string;
  category?: "architecture" | "development" | "performance" | "product";
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  api: {
    term: "API",
    shortDefinition: "A secure digital bridge that lets different apps exchange data automatically.",
    details: "For example, allowing your website to accept credit card payments through Stripe without building a payment network from scratch.",
    category: "architecture",
  },
  frontend: {
    term: "Frontend",
    shortDefinition: "The visual, interactive side of your app that customers see and tap on their screens.",
    details: "Built with buttons, layouts, animations, and forms designed for clarity and ease of use.",
    category: "development",
  },
  backend: {
    term: "Backend",
    shortDefinition: "The behind-the-scenes engine handling databases, user logins, and core business calculations.",
    details: "Ensures calculations are secure and customer records remain strictly private.",
    category: "architecture",
  },
  database: {
    term: "Database",
    shortDefinition: "A structured digital filing system where all your user profiles, orders, and records are safely stored.",
    details: "Optimized for fast searches, automatic backups, and encrypted protection.",
    category: "architecture",
  },
  cloud: {
    term: "Cloud",
    shortDefinition: "High-performance servers managed by major providers so your app stays online worldwide 24/7.",
    details: "Eliminates the cost and fragility of running physical server computers in an office.",
    category: "architecture",
  },
  mvp: {
    term: "MVP (Minimum Viable Product)",
    shortDefinition: "The leanest first working version of your app with essential features to launch fast and learn from real customers.",
    details: "Focuses resources on what solves the user's primary problem first.",
    category: "product",
  },
  "ci/cd": {
    term: "CI/CD",
    shortDefinition: "Automated pipelines that test code and publish software updates safely in minutes.",
    details: "Catches bugs before customers ever see them and makes continuous improvements painless.",
    category: "development",
  },
  latency: {
    term: "Latency",
    shortDefinition: "The tiny split-second delay between a visitor tapping a screen and the page responding.",
    details: "Lower latency means a snappy, instantaneous experience that keeps visitors engaged.",
    category: "performance",
  },
  sla: {
    term: "SLA (Service Level Agreement)",
    shortDefinition: "A clear operational commitment specifying target uptime and rapid support response times.",
    details: "Provides contractual peace of mind for business-critical software.",
    category: "product",
  },
  webhook: {
    term: "Webhook",
    shortDefinition: "An automated notification sent instantly between systems when an important event occurs.",
    details: "Such as notifying your team the moment a customer completes a checkout.",
    category: "architecture",
  },
  refactoring: {
    term: "Refactoring",
    shortDefinition: "Tidying and modernizing internal code structure so it stays fast and easy to build upon.",
    details: "Prevents technical debt from slowing down future feature development.",
    category: "development",
  },
  headless: {
    term: "Headless Architecture",
    shortDefinition: "Separating the website's visual frontend from the content system for maximum speed and design freedom.",
    details: "Allows you to update content without risking the layout or speed of the live app.",
    category: "architecture",
  },
  scalability: {
    term: "Scalability",
    shortDefinition: "The ability of your software infrastructure to handle 10x or 100x user growth without breaking.",
    details: "Ensures speed and stability remain rock solid during marketing surges or peak seasons.",
    category: "performance",
  },
};

export function getGlossaryDefinition(termKey: string): GlossaryEntry | undefined {
  const normalized = termKey.toLowerCase().trim();
  return GLOSSARY[normalized];
}
