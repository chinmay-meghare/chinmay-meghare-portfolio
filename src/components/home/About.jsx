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
  "https://images.pexels.com/photos/17023274/pexels-photo-17023274.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/32031995/pexels-photo-32031995.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/5542498/pexels-photo-5542498.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
];

export default function About() {
  const imageDivRef = useRef(null);

  const [currentImage, setCurrentImage] = useState(imageArray[0]);

  useEffect(() => {
    // Preload images safely in browser only
    const preloadedImages = imageArray.map((src) => {
      const img = new window.Image();
      img.src = src;
      return img;
    });

    // GSAP Context for automatic cleanup
    const ctx = gsap.context(() => {
      let lastIndex = 0;

      gsap.to(imageDivRef.current, {
        scrollTrigger: {
          trigger: imageDivRef.current,
          start: "top 20%",
          end: "top -100%",
          pin: true,
          pinSpacing: true,
          pinReparent: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,

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
        },
      });
    });

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="h-[200vh] relative p-6">
      {/* Image */}
      <div
        ref={imageDivRef}
        className="absolute h-[34vw] w-[30vw] rounded-3xl top-10 lg:top-44 left-[8vw] overflow-hidden"
      >
        <Image
          src={currentImage}
          alt="about-image"
          fill
          sizes="(max-width: 1024px) 25vw, 20vw"
          priority
          className="object-cover rounded-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative">

        <div className="pl-[45%] ">
          <AnimatedCopy>

            <p className="text-6xl text-left px-4">
              I'm Chinmay, a Frontend Engineer originally from Nagpur and now based in Pune,  with 1.3+ years of experience building scalable web applications using React.js, Next.js, and TypeScript.
              Skilled in SSR/SSG, API integration, and state management using TanStack Query and Redux Toolkit. Focused on performance optimization, scalable frontend architecture, and building responsive user experiences   </p>
          </AnimatedCopy>

        </div>
      </div>
    </div>
  );
};
