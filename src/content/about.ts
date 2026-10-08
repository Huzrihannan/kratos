import { ContentStatus, PublishableItem } from "@/lib/content-status";

export interface WorkingPrinciple {
  number: string;
  title: string;
  tagline: string;
  description: string;
}

export interface TeamMember extends PublishableItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
  avatarBg: string;
  status: ContentStatus;
}

export const aboutData = {
  hero: {
    eyebrow: "// who we are",
    headline: "Software that runs your business, engineered like a machine.",
    subhead:
      "Krat.OS means strength. We engineer high-performance systems with mechanical precision, strict types, and zero architectural debt. Real software that founders can depend on.",
  },

  story: {
    title: "Why technical precision over agency fluff?",
    paragraphs: [
      "Most software development companies force you to choose between two bad extremes: an agency that makes flashy mockups that crumble under real user traffic, or a sluggish legacy consultancy that builds opaque code wrapped in an interface only an engineer could tolerate.",
      "We built Krat.OS Software Solutions to prove that you don't have to choose. Great software should give users a fast, tactile, effortless experience on the surface — while running on strict TypeScript types, sub-second edge queries, and automated deployment pipelines underneath.",
      "We speak plain English. We don't hide behind acronyms or sell you bloat you don't need. When you partner with us, you work directly with the senior engineers designing and building your product.",
    ],
  },

  principles: [
    {
      number: "01",
      title: "Plain-Spoken Honesty",
      tagline: "No jargon. No smoke and mirrors.",
      description:
        "We speak to founders and product managers like human beings. If a simple off-the-shelf tool solves your problem cheaper than custom code, we will tell you honestly.",
    },
    {
      number: "02",
      title: "Production-Grade on Day One",
      tagline: "Strict types, zero sloppy shortcuts.",
      description:
        "Every project starts with strict TypeScript, automated linting, atomic commit discipline, and mobile-first responsive constraints. We don't write prototype spaghetti.",
    },
    {
      number: "03",
      title: "You Own 100% of Everything",
      tagline: "Zero proprietary lock-in. Ever.",
      description:
        "From the very first commit, code goes directly to your private GitHub repository, and cloud resources run in your accounts. You own the IP, the keys, and the infrastructure.",
    },
    {
      number: "04",
      title: "Working Software Every Friday",
      tagline: "No three-month black box silences.",
      description:
        "We operate in transparent two-week sprints. Every single Friday, you get a private staging URL with real working software you can click, tap, and test on your phone.",
    },
  ] as WorkingPrinciple[],

  team: [
    {
      id: "alex-chen",
      name: "Alex Chen",
      role: "Lead Systems Architect & Founder",
      bio: "12+ years designing distributed cloud architectures and low-latency databases for high-growth tech platforms.",
      specialty: "Distributed Systems & Next.js",
      avatarBg: "#FB9A5E",
      status: "needs-input",
    },
    {
      id: "sarah-jenkins",
      name: "Sarah Jenkins",
      role: "Head of Product Design & Motion",
      bio: "Former design system lead obsessed with monospace ergonomics, mechanical precision, and delightful accessibility.",
      specialty: "Design Systems & Tactile UX",
      avatarBg: "#FFD9B8",
      status: "needs-input",
    },
    {
      id: "david-okafor",
      name: "David Okafor",
      role: "Staff Mobile Engineer",
      bio: "Cross-platform mobile specialist crafting 60fps React Native and Flutter experiences with offline-first synchronization.",
      specialty: "iOS, Android & Offline SQLite",
      avatarBg: "#FFC857",
      status: "needs-input",
    },
    {
      id: "maya-patel",
      name: "Maya Patel",
      role: "AI & Workflow Automation Lead",
      bio: "Pragmatic data engineer building reliable LLM pipelines, asynchronous Python workers, and document extraction engines.",
      specialty: "Python, FastAPI & Enterprise RAG",
      avatarBg: "#FB9A5E",
      status: "needs-input",
    },
  ] as TeamMember[],
};
