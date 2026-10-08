import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

const Services = dynamic(() => import("@/components/sections/Services").then((m) => m.Services));
const Process = dynamic(() => import("@/components/sections/Process").then((m) => m.Process));
const Work = dynamic(() => import("@/components/sections/Work").then((m) => m.Work));
const Proof = dynamic(() => import("@/components/sections/Proof").then((m) => m.Proof));
const StackMarquee = dynamic(() => import("@/components/sections/StackMarquee").then((m) => m.StackMarquee));
const Principles = dynamic(() => import("@/components/sections/Principles").then((m) => m.Principles));
const Faq = dynamic(() => import("@/components/sections/Faq").then((m) => m.Faq));
const FinalCta = dynamic(() => import("@/components/sections/FinalCta").then((m) => m.FinalCta));

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Signature Hero Moment (5-second hook) */}
      <Hero />

      {/* 2. Services: What we build (6 large squishy cards) */}
      <Services />

      {/* 3. Process: How we work (Scroll-linked connected pill track) */}
      <Process />

      {/* 4. Work: Things we're proud of (Case studies with circular portal masks) */}
      <Work />

      {/* 5. Proof: Numbers that matter (Cocoa contrast band, count-up stats, speech-bubble testimonials) */}
      <Proof />

      {/* 6. Technology Stack Marquee (Dual opposing ribbons) */}
      <StackMarquee />

      {/* 7. Principles (3 differentiators in bento grid) */}
      <Principles />

      {/* 8. Frequently Asked Questions (Accordion + Schema.org JSON-LD) */}
      <Faq />

      {/* 9. Final CTA (Giant cream-on-orange band with reactive cursor blobs) */}
      <FinalCta />
    </div>
  );
}
