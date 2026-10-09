export interface ProcessStep {
  number: number;
  id: string;
  title: string;
  timeframe: string;
  summary: string;
  deliverables: string[];
  clientAction: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    id: "discover",
    title: "Discover",
    timeframe: "Week 1",
    summary: "We dig deep into your business goals, user bottlenecks, and technical constraints to define crystal-clear project milestones.",
    deliverables: ["Product spec sheet", "Architecture blueprint", "Fixed-price milestone agreement"],
    clientAction: "Share your business goals, current workflow, and technical access with our lead team.",
  },
  {
    number: 2,
    id: "design",
    title: "Design",
    timeframe: "Weeks 2–3",
    summary: "We craft interactive, high-fidelity prototypes and bubbly component systems that validate UX before writing a line of code.",
    deliverables: ["Figma design system", "Clickable user journey", "Design token map"],
    clientAction: "Review clickable wireframes and confirm the layout direction feels right for your users.",
  },
  {
    number: 3,
    id: "build",
    title: "Build",
    timeframe: "Weeks 4–8",
    summary: "Two-week agile sprints with working software demos every Friday, 100% typed code, and zero handoffs to junior contractors.",
    deliverables: ["Production codebase", "Weekly staging builds", "Automated test coverage"],
    clientAction: "Explore working staging demos every Friday and provide regular practical feedback.",
  },
  {
    number: 4,
    id: "launch",
    title: "Launch",
    timeframe: "Week 9",
    summary: "Stress testing, SEO auditing, domain routing, and seamless deployment with zero downtime and full telemetry enabled.",
    deliverables: ["Cloud production deployment", "Analytics integration", "Turnover documentation"],
    clientAction: "Give final release sign-off while our engineers handle domains, security, and DNS cutover.",
  },
  {
    number: 5,
    id: "grow",
    title: "Grow",
    timeframe: "Ongoing",
    summary: "We remain your dedicated technology partner for feature iterations, performance tuning, and 24/7 reliability monitoring.",
    deliverables: ["SLA uptime monitoring", "Monthly iteration sprints", "Priority engineer support"],
    clientAction: "Meet monthly to review production metrics and pick the next features to engineer.",
  },
];

