"use client"

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Copy({
    children,
    animateOnScroll = true,
    delay = 0,
    duration = 1,
    ease = "power4.out",
    stagger = 0.1,
    start = "top 75%",
    once = true,
}) {
    const containerRef = useRef(null);
    const splitRef = useRef([]);
    const linesRef = useRef([]);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            // Reset on every run
            splitRef.current = [];
            linesRef.current = [];

            const elements = containerRef.current.hasAttribute("data-copy-wrapper")
                ? Array.from(containerRef.current.children)
                : [containerRef.current];

            elements.forEach((el) => {
                gsap.set(el, { autoAlpha: 1 });

                const split = SplitText.create(el, {
                    type: "lines",
                    mask: "lines",
                    linesClass: "line++",
                });

                // Preserve text-indent if the element uses it (e.g. pull-quotes)
                const indent = window.getComputedStyle(el).textIndent;
                if (indent && indent !== "0px" && split.lines.length > 0) {
                    split.lines[0].style.paddingLeft = indent;
                    el.style.textIndent = "0";
                }

                splitRef.current.push(split);
                linesRef.current.push(...split.lines);
            });

            // ── Reduced motion support (from Hero.jsx) ───
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Start lines hidden below their mask
                gsap.set(linesRef.current, { y: "100%" });

                const animProps = {
                    y: "0%",
                    duration,
                    stagger,
                    ease,
                    delay,
                };

                if (animateOnScroll) {
                    gsap.to(linesRef.current, {
                        ...animProps,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start,
                            once, // `once: true` → plays once, never re-triggers (most performant)
                        },
                    });
                } else {
                    // No ScrollTrigger
                    gsap.to(linesRef.current, animProps);
                }

                // Cleanup returned from matchMedia callback
                return () => {
                    ScrollTrigger.getAll().forEach((st) => {
                        if (st.vars.trigger === containerRef.current) st.kill();
                    });
                };
            });

            // Cleanup
            return () => {
                mm.revert();
                splitRef.current.forEach((split) => split?.revert());
            };
        },

        { scope: containerRef, dependencies: [animateOnScroll, delay, duration, ease, stagger, start, once] }
    );

    if (React.Children.count(children) === 1) {
        return React.cloneElement(children, { ref: containerRef });
    }

    return (
        <div ref={containerRef} data-copy-wrapper="true">
            {children}
        </div>
    );
}