import { ContentStatus, PublishableItem } from "@/lib/content-status";

export interface StatItem extends PublishableItem {
  id: string;
  targetValue: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  status: ContentStatus;
}

export interface TestimonialItem extends PublishableItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  status: ContentStatus;
  avatarColor: string;
}

export const statsData: StatItem[] = [
  {
    id: "uptime",
    targetValue: 99.9,
    suffix: "%",
    label: "Production Uptime",
    description: "Enterprise-grade reliability across all deployed applications and APIs.",
    status: "needs-input",
  },
  {
    id: "prototype-speed",
    targetValue: 4,
    prefix: "< ",
    suffix: " wks",
    label: "To First Working Build",
    description: "From kickoff workshop to a working, clickable software staging deployment.",
    status: "needs-input",
  },
  {
    id: "type-safety",
    targetValue: 100,
    suffix: "%",
    label: "Strict Type Safety",
    description: "End-to-end TypeScript and automated CI test suites on every pull request.",
    status: "needs-input",
  },
  {
    id: "vendor-lock",
    targetValue: 0,
    suffix: "",
    label: "Proprietary Lock-In",
    description: "You own 100% of the repository, cloud credentials, documentation, and IP.",
    status: "needs-input",
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "testimonial-1",
    quote: "Krat.OS moved faster than our internal team ever could. In 6 weeks we had an enterprise-grade portal running in production that our customers actually enjoy using.",
    author: "Marcus Vance",
    role: "VP of Product",
    company: "Horizon Health Technologies",
    status: "needs-input",
    avatarColor: "bg-orange",
  },
  {
    id: "testimonial-2",
    quote: "They don't speak in buzzwords or hide behind layers of account managers. You talk directly with engineers who understand business impact. Rare and invaluable.",
    author: "Elena Rostova",
    role: "Co-Founder & CEO",
    company: "Relay Logistics",
    status: "needs-input",
    avatarColor: "bg-butter",
  },
  {
    id: "testimonial-3",
    quote: "Strong underneath and friendly on top isn't just a marketing slogan—it's exactly how their software feels. Rock-solid architecture with a genuinely friendly UX.",
    author: "David Kim",
    role: "Chief Technology Officer",
    company: "Archware Systems",
    status: "needs-input",
    avatarColor: "bg-peach",
  },
];
