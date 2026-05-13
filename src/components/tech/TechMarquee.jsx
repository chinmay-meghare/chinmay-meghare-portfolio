"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import {
  ExpressIcon,
  CssIcon,
  HtmlIcon,
  JSIcon,
  ReactIcon,
  TailwindIcon,
  ViteIcon,
  GithubIcon,
  GitIcon,
  PostmanIcon,
  ReduxIcon,
} from "../common/icons/iconsindex";

gsap.registerPlugin(useGSAP);

// Prevent GSAP burst catch-up after inactive tab
gsap.ticker.lagSmoothing(0);

// ─────────────────────────────────────────────────────────────
// LOGOS
// ─────────────────────────────────────────────────────────────

const row1Logos = [
  { name: "React", Icon: ReactIcon },
  { name: "HTML5", Icon: HtmlIcon },
  { name: "CSS3", Icon: CssIcon },
  { name: "JavaScript", Icon: JSIcon },
  { name: "Tailwind CSS", Icon: TailwindIcon },
  { name: "Vite", Icon: ViteIcon },
  { name: "Redux", Icon: ReduxIcon },
  { name: "Git", Icon: GitIcon },
  { name: "GitHub", Icon: GithubIcon },
  { name: "Postman", Icon: PostmanIcon },
  { name: "Express", Icon: ExpressIcon },
];

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────
  
const BASE_DURATION = 22;
const VELOCITY_SPEED = 0.12;
const SKEW_MULTIPLIER = 0.25;
const SKEW_CLAMP = 20;

export default function TechMarquee() {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const tween1Ref = useRef(null);
  const lastDirectionRef = useRef(1);

  // ───────────────────────────────────────────────────────────
  // TAB VISIBILITY FIX
  // SSR SAFE
  // ───────────────────────────────────────────────────────────

  useEffect(() => {
    // window/document exists only client-side
    if (typeof document === "undefined") return;

    const handleVisibility = () => {
      if (!document.hidden && tween1Ref.current) {
        tween1Ref.current.play();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  // ───────────────────────────────────────────────────────────
  // LENIS SCROLL REACTION
  // ───────────────────────────────────────────────────────────

  useLenis(({ velocity }) => {
    if (!tween1Ref.current || !containerRef.current) return;

    // Ignore tiny floating-point drift values
    if (Math.abs(velocity) > 0.05) {
      lastDirectionRef.current =
        velocity > 0 ? 1 : -1;
    }

    const direction = lastDirectionRef.current;

    const speed =
      1 + Math.abs(velocity) * VELOCITY_SPEED;

    const skewAmount = Math.min(
      Math.max(
        -SKEW_CLAMP,
        velocity * -SKEW_MULTIPLIER
      ),
      SKEW_CLAMP
    );

    gsap.to(tween1Ref.current, {
      timeScale: direction * speed,
      duration: 0.4,
      overwrite: "auto",
    });

    gsap.to(containerRef.current, {
      skewY: skewAmount,
      duration: 0.5,
      overwrite: "auto",
    });
  });

  // ───────────────────────────────────────────────────────────
  // GSAP ANIMATION
  // Automatically cleaned by useGSAP context
  // ───────────────────────────────────────────────────────────

  useGSAP(
    () => {
      if (!row1Ref.current) return;

      gsap.set(row1Ref.current, {
        willChange: "transform",
      });

      tween1Ref.current = gsap.to(row1Ref.current, {
        xPercent: -50,
        repeat: -1,
        duration: BASE_DURATION,
        ease: "none",
      });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section
      ref={containerRef}
      className="w-full overflow-hidden"
    >
      <div className="relative flex w-full overflow-hidden whitespace-nowrap">
        <div
          ref={row1Ref}
          className="flex w-max shrink-0 gap-8 px-4 md:gap-14"
        >
          {[0, 1].map((setIdx) => (
            <div
              key={setIdx}
              className="flex items-center gap-8 md:gap-14"
            >
              {row1Logos.map((tech, i) => (
                <div
                  key={`${setIdx}-${tech.name}-${i}`}
                  className="group/icon relative flex h-16 w-16 items-center justify-center md:h-24 md:w-24"
                >
                  <tech.Icon
                    className="
                      h-full
                      w-full
                      drop-shadow-lg
                      transition-transform
                      duration-300
                      group-hover/icon:scale-110
                    "
                  />

                  <span
                    className="
                      pointer-events-none
                      absolute
                      -bottom-7
                      left-1/2
                      z-10
                      -translate-x-1/2
                      whitespace-nowrap
                      rounded
                      border
                      border-[#333]
                      bg-[#1a1a1a]
                      px-2
                      py-0.5
                      text-xs
                      text-white/70
                      opacity-0
                      transition-opacity
                      duration-200
                      group-hover/icon:opacity-100
                    "
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}