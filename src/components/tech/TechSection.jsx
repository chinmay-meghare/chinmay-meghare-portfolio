"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import TechMarquee from "./TechMarquee";

gsap.registerPlugin(ScrollTrigger);

export default function TechSection () {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const labelRef = useRef(null);

  useGSAP(
    () => {
      // gsap.context() automatically scopes selectors
      // and cleans animations on unmount
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      tl.from(labelRef.current, {
        opacity: 0,
        y: 17,
        duration: 0.7,
        ease: "power2.out",
      })
        .from(
          line1Ref.current,
          {
            yPercent: 110,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          line2Ref.current,
          {
            yPercent: 110,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.65"
        );

      // cleanup for Next.js route changes
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-y-[#222] bg-[#111] py-20 lg:py-32"
    >
      {/* TITLE BLOCK */}
      <div className="mb-14 px-6 md:mb-20 md:px-12 lg:px-20">
        {/* Eyebrow label */}
        <p
          ref={labelRef}
          className="mb-4 text-xs uppercase tracking-[0.3em] text-primary md:mb-6 md:text-sm font-[font2]"
        >
          ✦ What I build with
        </p>

        {/* Title */}
        <h2 className="overflow-hidden font-[font1] leading-none tracking-tight uppercase">
          {/* LINE 1 */}
          <div className="overflow-hidden">
            <span
              ref={line1Ref}
              className="block text-[13vw] font-thin text-white/40 md:text-[10vw] lg:text-[8vw]"
            >
              My
            </span>
          </div>

          {/* LINE 2 */}
          <div className="-mt-2 overflow-hidden md:-mt-4">
            <span
              ref={line2Ref}
              className="block text-[13vw] font-black text-white md:text-[10vw] lg:text-[8vw]"
            >
              Arsenal
            </span>
          </div>
        </h2>
      </div>

      {/* MARQUEE */}
      <TechMarquee />
    </section>
  );
};