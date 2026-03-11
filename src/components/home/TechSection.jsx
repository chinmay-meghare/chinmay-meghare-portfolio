import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import TechMarquee from "./TechMarquee";

gsap.registerPlugin(ScrollTrigger);

const TechSection = () => {
  const sectionRef = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);
  const labelRef   = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      // Eyebrow label fades in first
      tl.from(labelRef.current, {
        opacity: 0,
        y: 17,
        duration: 0.7,
        ease: "power2.out",
      })
        // Line 1 slides up from behind its mask
        .from(
          line1Ref.current,
          {
            yPercent: 110,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.3" // slight overlap for a fluid feel
        )
        // Line 2 follows with a small stagger
        .from(
          line2Ref.current,
          {
            yPercent: 110,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.65"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#111] border-y border-y-[#222] py-20 lg:py-32 overflow-hidden"
    >
      {/* ── TITLE BLOCK ──────────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 mb-14 md:mb-20">

        {/* Eyebrow label */}
        <p
          ref={labelRef}
          className="text-primary font-[font2] text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6"
        >
          ✦ What I build with
        </p>

        {/* Title — two lines, each masked for the curtain slide-up reveal */}
        <h2 className="font-[font1] uppercase leading-none tracking-tight overflow-hidden">

          {/* LINE 1: "MY"  */}
          <div className="overflow-hidden">
            <span
              ref={line1Ref}
              className="block text-[13vw] md:text-[10vw] lg:text-[8vw] font-thin text-white/40"
            >
              My
            </span>
          </div>

          {/* LINE 2: "ARSENAL" */}
          <div className="overflow-hidden -mt-2 md:-mt-4">
            <span
              ref={line2Ref}
              className="block text-[13vw] md:text-[10vw] lg:text-[8vw] font-black text-white"
            >
              {/* "ARSENAL" with accent dot/underline on last letter for flair */}
              Arsenal
            </span>
          </div>

        </h2>
      </div>

      {/* ──────── MARQUEE ──────────── */}
      <TechMarquee />

    </section>
  );
};

export default TechSection;