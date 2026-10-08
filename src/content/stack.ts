export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "cloud" | "mobile" | "data";
  tag: string;
}

export const stackRowOne: TechItem[] = [
  { name: "Next.js 15", category: "frontend", tag: "App Router" },
  { name: "TypeScript", category: "frontend", tag: "Strict Mode" },
  { name: "React 19", category: "frontend", tag: "Modern Core" },
  { name: "React Native", category: "mobile", tag: "Cross-Platform" },
  { name: "Tailwind CSS", category: "frontend", tag: "Utility First" },
  { name: "Framer Motion", category: "frontend", tag: "Tactile Springs" },
  { name: "Flutter", category: "mobile", tag: "High-FPS" },
  { name: "GraphQL", category: "data", tag: "Typed Queries" },
  { name: "Swift", category: "mobile", tag: "iOS Native" },
  { name: "Kotlin", category: "mobile", tag: "Android Native" },
];

export const stackRowTwo: TechItem[] = [
  { name: "Node.js", category: "backend", tag: "High Concurrency" },
  { name: "PostgreSQL", category: "data", tag: "ACID Database" },
  { name: "Python", category: "backend", tag: "Data & AI" },
  { name: "Supabase", category: "backend", tag: "Realtime & Auth" },
  { name: "Redis", category: "data", tag: "Sub-ms Cache" },
  { name: "Docker", category: "cloud", tag: "Containerized" },
  { name: "AWS Cloud", category: "cloud", tag: "Serverless & ECS" },
  { name: "OpenAI API", category: "backend", tag: "LLM Agents" },
  { name: "FastAPI", category: "backend", tag: "Async APIs" },
  { name: "Vercel", category: "cloud", tag: "Edge Network" },
];
