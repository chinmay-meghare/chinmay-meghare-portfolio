"use client"
import React, { useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AnimatedCopy({
    children,
    colorInitial = "#333333",
    colorAccent = "#eb5939",
    colorFinal = "#b7ab98"
}) {
    const containerRef = useRef(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. Split text into words and chars
        const wordSplit = SplitText.create(containerRef.current, {
            type: "words",
            wordsClass: "word"
        });

        const charSplit = SplitText.create(wordSplit.words, {
            type: "chars",
            charsClass: "char",
        });

        const allChars = charSplit.chars;

        // 2. Set initial faded state
        gsap.set(allChars, { color: colorInitial });

        // 3. Create an optimized native GSAP timeline linked to ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                end: "bottom 25%",
                scrub: 1,
            }
        });

        // 4. Stagger colors natively 
        // This lights up to accent color, then right down to final color smoothly
        tl.to(allChars, {
            color: colorAccent,
            stagger: 0.1,
            duration: 0.2
        })
            .to(allChars, {
                color: colorFinal,
                stagger: 0.1,
                duration: 0.2
            }, 0.1); // Slight offset to create "trailing glow" effect

        return () => {
            if (charSplit) charSplit.revert();
            if (wordSplit) wordSplit.revert();
        };
    }, { scope: containerRef, dependencies: [colorInitial, colorAccent, colorFinal] });

    if (React.Children.count(children) === 1) {
        return React.cloneElement(children, { ref: containerRef })
    }

    return (
        <div ref={containerRef} data-copy-wrapper="true">
            {children}
        </div>
    )
}