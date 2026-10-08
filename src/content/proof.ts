export interface StatItem {
  id: string;
  targetValue: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  isPlaceholder: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  isPlaceholder: boolean;
  avatarColor: string;
}

export const statsData: StatItem[] = [
  {
    id: "uptime",
    targetValue: 99.9,
    suffix: "%",
    label: "[PLACEHOLDER] Production Uptime",
    description: "Enterprise-grade reliability across all deployed applications and APIs.",
    isPlaceholder: true,
  },
  {
    id: "prototype-speed",
    targetValue: 4,
    prefix: "< ",
    suffix: " wks",
    label: "[PLACEHOLDER] To First Working Build",
    description: "From kickoff workshop to a working, clickable software staging deployment.",
    isPlaceholder: true,
  },
  {
    id: "type-safety",
    targetValue: 100,
    suffix: "%",
    label: "[PLACEHOLDER] Strict Type Safety",
    description: "End-to-end TypeScript and automated CI test suites on every pull request.",
    isPlaceholder: true,
  },
  {
    id: "vendor-lock",
    targetValue: 0,
    suffix: "",
    label: "[PLACEHOLDER] Proprietary Lock-In",
    description: "You own 100% of the repository, cloud credentials, documentation, and IP.",
    isPlaceholder: true,
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "testimonial-1",
    quote: "Krat.OS moved faster than our internal team ever could. In 6 weeks we had an enterprise-grade portal running in production that our customers actually enjoy using.",
    author: "[PLACEHOLDER] Marcus Vance",
    role: "VP of Product",
    company: "[PLACEHOLDER] Horizon Health Technologies",
    isPlaceholder: true,
    avatarColor: "bg-orange",
  },
  {
    id: "testimonial-2",
    quote: "They don't speak in buzzwords or hide behind layers of account managers. You talk directly with engineers who understand business impact. Rare and invaluable.",
    author: "[PLACEHOLDER] Elena Rostova",
    role: "Co-Founder & CEO",
    company: "[PLACEHOLDER] Relay Logistics",
    isPlaceholder: true,
    avatarColor: "bg-butter",
  },
  {
    id: "testimonial-3",
    quote: "Strong underneath and friendly on top isn't just a marketing slogan—it's exactly how their software feels. Rock-solid architecture with a genuinely friendly UX.",
    author: "[PLACEHOLDER] David Kim",
    role: "Chief Technology Officer",
    company: "[PLACEHOLDER] Archware Systems",
    isPlaceholder: true,
    avatarColor: "bg-peach",
  },
];
