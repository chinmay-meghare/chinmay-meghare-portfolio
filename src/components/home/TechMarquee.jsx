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
  ReactIcon,
  TailwindIcon,
  ViteIcon,
  GithubIcon,
  GitIcon,
  PostmanIcon,
  ReduxIcon,
} from "../common/icons/iconsindex";

gsap.registerPlugin(ScrollTrigger);

// Prevents GSAP from burst-catching-up after a tab switch
gsap.ticker.lagSmoothing(0);

// ─── LOGO ROWS ───────────────────────────────────────────────────────────────
// To add a new row in the future:
//   1. Define a new array here e.g. `const row2Logos = [...]`
//   2. Add a new row block inside the return JSX (see FUTURE ROW SLOT comment)
//   3. Wire a new tweenRef into useLenis with `-direction` for opposite scroll
const row1Logos = [
  { name: "React",        Icon: ReactIcon      },
  { name: "HTML5",        Icon: HtmlIcon       },
  { name: "CSS3",         Icon: CssIcon        },
  { name: "JavaScript",   Icon: JSIcon         },
  { name: "Tailwind CSS", Icon: TailwindIcon   },
  { name: "Vite",         Icon: ViteIcon       },
  { name: "Redux",        Icon: ReduxIcon      },
  { name: "Git",          Icon: GitIcon        },
  { name: "GitHub",       Icon: GithubIcon     },
  { name: "Postman",      Icon: PostmanIcon    },
];

// ─── SPEED & SKEW CONSTANTS — tweak these to taste ───────────────────────────
const BASE_DURATION   = 22;   // seconds per loop — lower = faster base speed
const VELOCITY_SPEED  = 0.12; // how much scroll velocity amplifies speed
const SKEW_MULTIPLIER = 0.25; // skew intensity on scroll
const SKEW_CLAMP      = 20;   // max degrees of skew in either direction

const TechMarquee = () => {
  const containerRef     = useRef(null);
  const row1Ref          = useRef(null);
  const tween1Ref        = useRef(null);
  const lastDirectionRef = useRef(1); // persists last intentional direction

  // Resume tween after browser pauses it on tab switch
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

    // Only commit direction when scroll is intentional — filters coast-to-zero noise
    if (Math.abs(velocity) > 0.05) {
      lastDirectionRef.current = velocity > 0 ? 1 : -1;
    }

    const direction  = lastDirectionRef.current;
    const speed      = 1 + Math.abs(velocity) * VELOCITY_SPEED;
    const skewAmount = Math.min(Math.max(-SKEW_CLAMP, velocity * -SKEW_MULTIPLIER), SKEW_CLAMP);

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
      // Promote row to compositor layer — prevents paint stalls on hover/repaint
      gsap.set(row1Ref.current, { willChange: "transform" });

      tween1Ref.current = gsap.to(row1Ref.current, {
        xPercent: -50, // exactly one set-width left → seamless since we duplicate 2×
        repeat: -1,
        duration: BASE_DURATION,
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full overflow-hidden">

      {/* ── ROW 1 ────────────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
        <div ref={row1Ref} className="flex gap-8 md:gap-14 px-4 w-max shrink-0">
          {/* 2 identical sets — xPercent: -50 snaps back to start invisibly */}
          {[0, 1].map((setIdx) => (
            <div key={setIdx} className="flex gap-8 md:gap-14 items-center">
              {row1Logos.map((tech, i) => (
                <div
                  key={`${setIdx}-${tech.name}-${i}`}
                  className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center group/icon"
                >
                  {/* Scale on SVG, not wrapper — keeps GSAP tween unaffected */}
                  <tech.Icon
                    className={[
                      "w-full h-full drop-shadow-lg",
                      "transition-transform duration-300 group-hover/icon:scale-110",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                  {/* Pure CSS tooltip — zero state, zero re-renders */}
                  <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#1a1a1a] border border-[#333] px-2 py-0.5 text-xs text-white/70 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 z-10">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/*
        ── FUTURE ROW SLOT ─────────────────────────────────────────────────
        When you add a second row:
        1. Define row2Logos array at top of this file
        2. Add row2Ref + tween2Ref useRefs
        3. Wire tween2Ref into useLenis: gsap.to(tween2Ref.current, { timeScale: -direction * speed })
        4. In useGSAP:
             gsap.set(row2Ref.current, { xPercent: -50, willChange: "transform" })
             tween2Ref.current = gsap.to(row2Ref.current, { xPercent: 50, repeat: -1, duration: BASE_DURATION + 5, ease: "none" })
        5. Uncomment the JSX below:

        <div className="w-full h-[1px] bg-[#2a2a2a] mt-8 md:mt-14 hidden md:block" />

        <div className="relative w-full overflow-hidden flex whitespace-nowrap mt-8 md:mt-14">
          <div ref={row2Ref} className="flex gap-8 md:gap-14 px-4 w-max shrink-0">
            {[0, 1].map((setIdx) => (
              <div key={setIdx} className="flex gap-8 md:gap-14 items-center">
                {row2Logos.map((tech, i) => (
                  <div key={...} className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center group/icon">
                    <tech.Icon className={...} />
                    <span className="...tooltip classes...">{tech.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      */}

    </div>
  );
};

export default TechMarquee;