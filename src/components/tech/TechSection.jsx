"use client";

import AnimatedHeader from "../common/AnimatedHeader";
import TechMarquee from "./TechMarquee";

export default function TechSection() {
  const headerLines = [
    { text: "My", className: "text-[13vw] font-thin text-white md:text-[10vw] lg:text-[8vw]" },
    { text: "Arsenal", className: "text-[13vw] font-black text-white md:text-[10vw] lg:text-[8vw]" }
  ];

  return (
    <section className="relative overflow-hidden border-y border-y-[#222] bg-[#111] py-20 lg:py-32">
      
      <AnimatedHeader 
        eyebrow="What I build with" 
        lines={headerLines} 
      />

      {/* MARQUEE */}
      <TechMarquee />
    </section>
  );
}