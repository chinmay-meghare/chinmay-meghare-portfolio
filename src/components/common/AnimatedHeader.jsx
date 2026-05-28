"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHeader({ eyebrow, lines = [], className = "" }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Create the timeline tied to this specific header block
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 73%",
          toggleActions: "play none none none",
        },
      });

      // 1. Animate the eyebrow label if it exists
      if (eyebrow) {
        tl.from(".animate-label", {
          opacity: 0,
          y: 17,
          duration: 0.7,
          ease: "power2.out",
        });
      }

      // 2. Query all elements with the '.animate-line' class inside this container
      const animatedLines = gsap.utils.toArray(".animate-line");

      // 3. Dynamically loop and build the slick cascading upward slide
      animatedLines.forEach((line, index) => {
        
        const offset = index === 0 ? "-=0.3" : "-=0.65";
        
        tl.from(
          line,
          {
            yPercent: 110,
            duration: 0.95,
            ease: "power3.out",
          },
          offset
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`mb-14 px-6 md:mb-20 md:px-12 lg:px-20 ${className}`}>
      {/* Eyebrow label */}
      {eyebrow && (
        <p className="animate-label mb-4 text-xs uppercase tracking-[0.3em] text-primary md:mb-6 md:text-sm font-[font2]">
          ✦ {eyebrow}
        </p>
      )}

      {/* Dynamic Multi-line Title */}
      <h2 className="font-[font1] leading-none tracking-tight uppercase">
        {lines.map((lineObj, index) => (
          <div 
            key={index} 
            className={`overflow-hidden ${index > 0 ? "-mt-2 md:-mt-4" : ""}`}
          >
            <span
              className={`animate-line block ${lineObj.className || "text-white"}`}
            >
              {lineObj.text}
            </span>
          </div>
        ))}
      </h2>
    </div>
  );
}