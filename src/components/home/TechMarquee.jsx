import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLenis } from "lenis/react";

import {
  ExpressIcon,
  CssIcon,
  HtmlIcon,
  JSIcon,
  MongoDBIcon,
  MongooseIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
  ViteIcon,
  GithubIcon,
  GitIcon,
  NextjsIcon,
  NginxIcon,
  NodejsIcon,
  PostmanIcon,
  ReduxIcon,
} from "../common/icons/iconsindex";

gsap.registerPlugin(ScrollTrigger);

// Prevent GSAP from "catching up" after tab switch — keeps animation smooth on return
gsap.ticker.lagSmoothing(0);

// ─── ADD MORE ROWS HERE IN THE FUTURE ───────────────────────────────────────
// To add a second row: create row2Logos array, add a second <MarqueeRow> below.
// Each row accepts its own `logos`, `duration`, and `direction` props.
const row1Logos = [
  { name: "React", Icon: ReactIcon },
  { name: "HTML5", Icon: HtmlIcon },
  { name: "CSS3", Icon: CssIcon },
  { name: "JavaScript", Icon: JSIcon },
  { name: "TypeScript", Icon: TypescriptIcon },
  { name: "Tailwind CSS", Icon: TailwindIcon },
  { name: "Vite", Icon: ViteIcon },
  { name: "Redux", Icon: ReduxIcon },
  { name: "Node.js", Icon: NodejsIcon },
  { name: "Express", Icon: ExpressIcon },
  { name: "MongoDB", Icon: MongoDBIcon },
  { name: "Mongoose", Icon: MongooseIcon },
  { name: "Git", Icon: GitIcon },
  { name: "GitHub", Icon: GithubIcon },
  { name: "Next.js", Icon: NextjsIcon },
  { name: "Postman", Icon: PostmanIcon },
];

// ─── ICON WRAPPER: invert for dark-invisible icons ──────────────────────────
// ExpressIcon, GithubIcon, NextjsIcon have black/near-black fills.
// We invert them on the dark #111 bg so they're visible in their "real" color.
const INVERT_ICONS = ["Express", "GitHub", "Next.js"];

const TechMarquee = () => {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const tween1Ref = useRef(null);

  // ── Fix #3: track the LAST non-zero direction so the tween keeps that
  //    direction when the user stops scrolling (velocity → 0).
  const lastDirectionRef = useRef(1); // 1 = left (default forward)

  // ── Fix #1: resume tween when tab becomes visible again
  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden && tween1Ref.current) {
        tween1Ref.current.play();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useLenis(({ velocity }) => {
    if (!tween1Ref.current) return;

    // ── Fix #3: only update direction when velocity is meaningful
    if (Math.abs(velocity) > 0.05) {
      lastDirectionRef.current = velocity > 0 ? 1 : -1;
    }

    const direction = lastDirectionRef.current;
    const speed = 1 + Math.abs(velocity) * 0.05;

    // Skew on scroll for that premium inertia feel (clamped ±10°)
    const skewAmount = Math.min(Math.max(-10, velocity * -0.1), 10);

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

  useGSAP(
    () => {
      // ── Fix #2: `will-change: transform` prevents paint stalls that caused
      //    the tween to hiccup on hover/repaint cycles.
      gsap.set(row1Ref.current, { willChange: "transform" });

      tween1Ref.current = gsap.to(row1Ref.current, {
        xPercent: -50, // moves exactly one set-width left → seamless loop
        repeat: -1,
        duration: 35,
        ease: "none",
      });

      // Section reveal on scroll into view
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-[#111] border-y border-y-[#222]">
      <div ref={containerRef} className="flex flex-col gap-8 md:gap-14 w-full">

        {/* ── ROW 1 ─────────────────────────────────────────────────────────── */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap">
          <div ref={row1Ref} className="flex gap-8 md:gap-14 px-4 w-max shrink-0">
            {/* Duplicate 2× so xPercent: -50 lands exactly at the seam */}
            {[0, 1].map((setIdx) => (
              <div key={setIdx} className="flex gap-8 md:gap-14 items-center">
                {row1Logos.map((tech, i) => (
                  <div
                    key={`${setIdx}-${tech.name}-${i}`}
                    className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center group/icon"
                    // ── Fix #2: NO hover:scale on this wrapper — scale is done
                    //    via CSS on the inner element so GSAP tween is unaffected
                  >
                    <tech.Icon
                      className={[
                        "w-full h-full drop-shadow-lg",
                        "transition-transform duration-300 group-hover/icon:scale-110",
                        // Invert dark-fill icons so they're visible on #111 bg
                        INVERT_ICONS.includes(tech.name)
                          ? "invert brightness-200"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                    {/* Simple native HTML tooltip — no state, no re-renders */}
                    <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#222] border border-[#333] px-2 py-0.5 text-xs text-white opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 z-10">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/*
          ── SCALABILITY SLOT ──────────────────────────────────────────────────
          When you're ready to add a second row (e.g. backend tools), just:
          1. Define `row2Logos` array above.
          2. Uncomment the block below and add a new tween in useGSAP.
          3. Pass `xPercent: 50` with `gsap.set(row2Ref, { xPercent: -50 })`
             for the reverse-direction effect.

          <div className="w-full h-[1px] bg-[#333] hidden md:block" />

          <div className="relative w-full overflow-hidden flex whitespace-nowrap">
            <div ref={row2Ref} className="flex gap-8 md:gap-14 px-4 w-max shrink-0">
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="flex gap-8 md:gap-14 items-center">
                  {row2Logos.map((tech, i) => ( ... ))}
                </div>
              ))}
            </div>
          </div>
        */}

      </div>
    </section>
  );
};

export default TechMarquee;