"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHeader({
  eyebrow,
  lines = [],
  className = "",
  animateOnScroll = true,
  delay = 0,
  duration = 0.95,
  ease = "power3.out",
  stagger = 0,
  start = "top 73%",
  once = true,
}) {
  const eyebrowRef = useRef(null);

  // Eyebrow label lightweight ScrollTrigger (fade + slide)
  useGSAP(
    () => {
      if (!eyebrowRef.current) return;

      gsap.from(eyebrowRef.current, {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: eyebrowRef.current,
          start,
          once,
        },
      });
    },
    { scope: eyebrowRef, dependencies: [start, once] }
  );

  return (
    <div className={`mb-14 px-6 md:mb-20 md:px-12 lg:px-20 ${className}`}>

      {/* Eyebrow label — simple fade, not a SplitText reveal */}
      {eyebrow && (
        <p
          ref={eyebrowRef}
          className="mb-4 font-[font2] text-xs uppercase tracking-[0.3em] text-primary md:mb-6 md:text-sm"
        >
          ✦ {eyebrow}
        </p>
      )}

      {/* Display title — each line wrapped in overflow-hidden for curtain reveal */}
      <h2 className="font-[font1] uppercase leading-none tracking-tight">
        {lines.map((lineObj, index) => (
          <div
            key={index}
            className={`overflow-hidden ${index > 0 ? "-mt-2 md:-mt-4" : ""}`}
          >
            <TextReveal
              animateOnScroll={animateOnScroll}
              delay={delay + index * 0.08}
              duration={duration}
              ease={ease}
              stagger={0}
              start={start}
              once={once}
            >
              <span
                className={`block ${lineObj.className || "text-white"}`}
              >
                {lineObj.text}
              </span>
            </TextReveal>
          </div>
        ))}
      </h2>

    </div>
  );
}