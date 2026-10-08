export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "pricing" | "process" | "ownership" | "support";
}

export const faqsData: FaqItem[] = [
  {
    id: "cost",
    category: "pricing",
    question: "How much does a custom software build typically cost?",
    answer: "Most core projects range between $10,000 and $40,000 depending on complexity, third-party integrations, and whether you need native mobile apps. We provide upfront, milestone-based pricing with zero hidden change orders—what we scope is what you pay. You can test our interactive Project Estimator right here on the site for an instant ballpark range.",
  },
  {
    id: "timeline",
    category: "process",
    question: "How quickly can we see the first working version?",
    answer: "Typically within 2 to 4 weeks. We work in two-week agile sprints and deploy working software to a private staging URL every Friday. You will never wait three months in the dark wondering what has been built.",
  },
  {
    id: "ownership",
    category: "ownership",
    question: "Who owns the code, intellectual property, and cloud infrastructure?",
    answer: "You do. 100%. From day one, all code is committed directly to your private GitHub organization, and cloud resources are hosted in your AWS/Supabase accounts. We hand over all architecture documentation, credentials, and deployment keys with zero proprietary lock-in.",
  },
  {
    id: "support",
    category: "support",
    question: "What happens after the project launches?",
    answer: "We include 30 days of complimentary post-launch warranty and bug fixes with every build. Beyond that, many of our clients retain us for monthly engineering sprints and 99.9% uptime monitoring to continuously iterate on user feedback.",
  },
  {
    id: "communication",
    category: "process",
    question: "How do we communicate throughout the build?",
    answer: "Directly with the lead engineer writing your code. We set up a shared Slack or Discord channel for daily asynchronous updates, conduct a 15-minute weekly video demo, and give you 24/7 access to your sprint board.",
  },
  {
    id: "scope-changes",
    category: "process",
    question: "What happens if our product requirements change halfway through?",
    answer: "Software is iterative, and learning from early users is essential. Because we work in two-week sprints, we can easily swap features of equivalent weight in future sprints without penalties or inflated fees. If you want to expand scope significantly, we will give you a clear, fixed estimate before doing the work.",
  },
  {
    id: "tech-stack",
    category: "process",
    question: "Can you work with our existing codebase or tech stack?",
    answer: "Yes. While we specialize in modern Next.js, TypeScript, React Native, and PostgreSQL, we frequently audit, modernize, and refactor existing legacy web applications or APIs without requiring a risky ground-up rewrite.",
  },
];
