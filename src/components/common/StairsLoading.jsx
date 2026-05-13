"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function StairsLoading ({ children }) {
  const pathname = usePathname();

  const containerRef = useRef(null);
  const stairParentRef = useRef(null);
  const pageRef = useRef(null);

  useGSAP(
    () => {
      // GSAP Context prevents selector leaking
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // Show stairs container
        tl.set(stairParentRef.current, {
          display: "block",
        });

        // Animate stairs in
        tl.from(".stair", {
          height: 0,
          stagger: {
            amount: -0.2,
          },
          duration: 0.5,
          ease: "power2.inOut",
        });

        // Move stairs down
        tl.to(".stair", {
          y: "100%",
          stagger: {
            amount: -0.25,
          },
          duration: 0.6,
          ease: "power2.inOut",
        });

        // Hide overlay
        tl.set(stairParentRef.current, {
          display: "none",
        });

        // Reset stairs position
        tl.set(".stair", {
          y: "0%",
        });

        // Page animation
        gsap.from(pageRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        });
      }, containerRef);

      // CLEANUP IMPORTANT 🚨
      return () => ctx.revert();
    },
    {
      dependencies: [pathname],
      scope: containerRef,
    }
  );

  return (
    <div ref={containerRef}>
      {/* Loading Overlay */}
      <div
        ref={stairParentRef}
        className="fixed top-0 left-0 z-50 hidden h-screen w-full"
      >
        <div className="flex h-full w-full">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="stair h-full w-1/5 bg-black"
            />
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div ref={pageRef}>
        {children}
      </div>
    </div>
  );
};