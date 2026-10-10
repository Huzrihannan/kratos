export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "cloud" | "mobile" | "data";
  tag: string;
  clientBenefit: string;
}

export const stackRowOne: TechItem[] = [
  {
    name: "Next.js 15",
    category: "frontend",
    tag: "App Router",
    clientBenefit: "Delivers sub-second page loads and instant search indexing for your visitors.",
  },
  {
    name: "TypeScript",
    category: "frontend",
    tag: "Strict Mode",
    clientBenefit: "Catches mistakes before they reach production, keeping your product stable.",
  },
  {
    name: "React 19",
    category: "frontend",
    tag: "Modern Core",
    clientBenefit: "Powers snappy, responsive interfaces that react immediately to every click.",
  },
  {
    name: "React Native",
    category: "mobile",
    tag: "Cross-Platform",
    clientBenefit: "Builds iOS and Android apps from a shared codebase to launch twice as fast.",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    tag: "Utility First",
    clientBenefit: "Keeps styling consistent across all screens without bloated stylesheets.",
  },
  {
    name: "Framer Motion",
    category: "frontend",
    tag: "Tactile Springs",
    clientBenefit: "Adds natural, tactile transitions that make your app feel polished and premium.",
  },
  {
    name: "Flutter",
    category: "mobile",
    tag: "High-FPS",
    clientBenefit: "Renders silky-smooth 60fps mobile screens across iPhones and Android devices.",
  },
  {
    name: "GraphQL",
    category: "data",
    tag: "Typed Queries",
    clientBenefit: "Fetches precisely what each view requires, speeding up mobile connections.",
  },
  {
    name: "Swift",
    category: "mobile",
    tag: "iOS Native",
    clientBenefit: "Leverages Apple hardware capabilities directly for peak iPhone and iPad speed.",
  },
  {
    name: "Kotlin",
    category: "mobile",
    tag: "Android Native",
    clientBenefit: "Creates modern, crash-resistant Android applications following Google standards.",
  },
];

export const stackRowTwo: TechItem[] = [
  {
    name: "Node.js",
    category: "backend",
    tag: "High Concurrency",
    clientBenefit: "Handles thousands of simultaneous visitors smoothly with event-driven speed.",
  },
  {
    name: "PostgreSQL",
    category: "data",
    tag: "ACID Database",
    clientBenefit: "Protects your critical customer records with rock-solid transactional safety.",
  },
  {
    name: "Python",
    category: "backend",
    tag: "Data & AI",
    clientBenefit: "Drives intelligent workflows, data processing, and custom automation tasks.",
  },
  {
    name: "Supabase",
    category: "backend",
    tag: "Realtime & Auth",
    clientBenefit: "Enables instant user accounts, secure permissions, and real-time data sync.",
  },
  {
    name: "Redis",
    category: "data",
    tag: "Sub-ms Cache",
    clientBenefit: "Keeps frequently needed data in memory for lightning-fast responses.",
  },
  {
    name: "Docker",
    category: "cloud",
    tag: "Containerized",
    clientBenefit: "Ensures your software runs identically in development, staging, and live cloud.",
  },
  {
    name: "AWS Cloud",
    category: "cloud",
    tag: "Serverless & ECS",
    clientBenefit: "Scales compute power and reliable storage automatically as your audience grows.",
  },
  {
    name: "OpenAI API",
    category: "backend",
    tag: "LLM Agents",
    clientBenefit: "Automates repetitive text tasks and equips your product with smart assistant features.",
  },
  {
    name: "FastAPI",
    category: "backend",
    tag: "Async APIs",
    clientBenefit: "Processes background operations and machine learning queries at high async speed.",
  },
  {
    name: "Vercel",
    category: "cloud",
    tag: "Edge Network",
    clientBenefit: "Serves your web app from global edge data centers located close to every user.",
  },
];
