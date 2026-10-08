export interface WorkingPrinciple {
  number: string;
  title: string;
  tagline: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
  avatarBg: string;
  isPlaceholder: boolean;
}

export const aboutData = {
  hero: {
    eyebrow: "// who we are",
    headline: "Software that feels like a friend, engineered like a tank.",
    subhead:
      "Krat.OS means strength. But we don't believe enterprise strength has to look like cold, gray, robotic tech from 2005. We build soft, warm, joyful interfaces backed by unshakeable architectures.",
  },

  story: {
    title: "Why 'Strong underneath. Friendly on top.'?",
    paragraphs: [
      "Most software development companies force you to choose between two bad extremes: an agency that makes gorgeous designs that crumble under real user traffic, or an enterprise consultancy that builds robust backend code wrapped in an interface only an engineer could tolerate.",
      "We started Krat.OS Software Solutions to prove that you don't have to choose. Great software should give users a warm, tactile, effortless smile on the surface-while running on strict TypeScript types, sub-second edge queries, and automated deployment pipelines underneath.",
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
      name: "[PLACEHOLDER] Alex Chen",
      role: "Lead Systems Architect & Founder",
      bio: "12+ years designing distributed cloud architectures and low-latency databases for high-growth tech platforms.",
      specialty: "Distributed Systems & Next.js",
      avatarBg: "#FB9A5E",
      isPlaceholder: true,
    },
    {
      id: "sarah-jenkins",
      name: "[PLACEHOLDER] Sarah Jenkins",
      role: "Head of Product Design & Motion",
      bio: "Former design system lead obsessed with bubbly typography, micro-interaction physics, and delightful accessibility.",
      specialty: "Design Systems & Tactile UX",
      avatarBg: "#FFD9B8",
      isPlaceholder: true,
    },
    {
      id: "david-okafor",
      name: "[PLACEHOLDER] David Okafor",
      role: "Staff Mobile Engineer",
      bio: "Cross-platform mobile specialist crafting 60fps React Native and Flutter experiences with offline-first synchronization.",
      specialty: "iOS, Android & Offline SQLite",
      avatarBg: "#FFC857",
      isPlaceholder: true,
    },
    {
      id: "maya-patel",
      name: "[PLACEHOLDER] Maya Patel",
      role: "AI & Workflow Automation Lead",
      bio: "Pragmatic data engineer building reliable LLM pipelines, asynchronous Python workers, and document extraction engines.",
      specialty: "Python, FastAPI & Enterprise RAG",
      avatarBg: "#FB9A5E",
      isPlaceholder: true,
    },
  ] as TeamMember[],
};
