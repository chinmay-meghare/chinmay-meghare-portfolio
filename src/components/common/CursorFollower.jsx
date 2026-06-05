"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CursorFollower() {
  const cursorRef = useRef(null);

  useGSAP(() => {
    if (!cursorRef.current) return;

    // 1. Mobile/Touch Device Guard: Instantly abort on touch-only environments
    if (window.matchMedia("(pointer: coarse)").matches) {
      gsap.set(cursorRef.current, { display: "none" });
      return;
    }

    // 2. No-Flash Mount Initialization: Start hidden and scaled down
    gsap.set(cursorRef.current, { scale: 0, opacity: 0 });

    const size = 20; // Explicitly matches the Tailwind width/height (w-5 = 20px)

    // 3. High-Performance Pipe Engines: Bypasses overhead of spawning new tweens
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power4.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power4.out" });

    const handleMouseMove = (e) => {
      // Fixed operator precedence bug: centers perfectly on coordinates
      xTo(e.clientX - size / 2);
      yTo(e.clientY - size / 2);
    };

    // Smoothly scale cursor in/out when entering/leaving the browser window
    const handleMouseEnter = () => {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    // Bind event tracking to boundaries
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Fade in gracefully on first move if mouse is already in viewport
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.4, delay: 0.1 });

    // Clean up event listeners on page/component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: cursorRef });

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999] will-change-transform"
    />
  );
}