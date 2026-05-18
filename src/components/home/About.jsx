"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCopy from "../common/AnimatedCopy";

gsap.registerPlugin(ScrollTrigger);

const imageArray = [
  "https://images.pexels.com/photos/4079215/pexels-photo-4079215.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/5901065/pexels-photo-5901065.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/5191436/pexels-photo-5191436.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/31978035/pexels-photo-31978035.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
];

export default function About() {
  const sectionRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(imageArray[0]);

  useEffect(() => {
    // Preload images safely
    const preloadedImages = imageArray.map((src) => {
      const img = new window.Image();
      img.src = src;
      return img;
    });

    const ctx = gsap.context(() => {
      let lastIndex = 0;

      // animate based on scrolling through the WHOLE section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 20%",
        end: "bottom 80%",
        scrub: 1,
        // NO MORE PINNING HERE. CSS handles the pinning.
        onUpdate: (self) => {
          const imageIndex =
            self.progress < 1
              ? Math.floor(self.progress * imageArray.length)
              : imageArray.length - 1;

          if (imageIndex !== lastIndex) {
            lastIndex = imageIndex;
            setCurrentImage(preloadedImages[imageIndex].src);
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative flex flex-col lg:flex-row w-full px-6 py-20 gap-10">

      {/* Left Column: Image (Sticky Container) */}
      <div className="w-full lg:w-1/2 relative">
        <div className="sticky top-20 h-[50vh] lg:h-[80vh] w-full rounded-3xl overflow-hidden">
          <Image
            src={currentImage}
            alt="about-image"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover rounded-3xl"
          />
        </div>
      </div>

      {/* Right Column: Content */}
      <div className="w-full lg:w-1/2 py-10 lg:py-40">
        <AnimatedCopy colorAccent="#abff02">
          <p className="text-2xl md:text-5xl text-left px-4">
            I'm Chinmay, a Frontend Engineer originally from Nagpur and now based in Pune,  with 1.3+ years of experience building scalable web applications using React.js, Next.js, and TypeScript.
            <br /> <br />
            Skilled in SSR/SSG, API integration, and state management using TanStack Query and Redux Toolkit. Focused on performance optimization, scalable frontend architecture, and building responsive user experiences   </p>
        </AnimatedCopy>
      </div>
    </div>
  );
}