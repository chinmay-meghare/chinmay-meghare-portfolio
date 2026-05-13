"use client";

import {useState, useRef, useEffect } from "react";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      const img = document.createElement("img");
      img.src = src;
      return img;
    });

    // GSAP Context for automatic cleanup
    const ctx = gsap.context(() => {
      gsap.to(imageDivRef.current, {
        scrollTrigger: {
          trigger: imageDivRef.current,
          start: "top 25%",
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

            setCurrentImage(preloadedImages[imageIndex].src);
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
    <div>
      <div className="section-1 relative py-1">
        {/* Image */}
        <div
          ref={imageDivRef}
          className="absolute h-[20vw] w-[15vw] rounded-3xl top-10 lg:top-44 left-[29vw] overflow-hidden"
        >
          <Image
            src={currentImage}
            alt="about-image"
            fill
            priority
            className="object-cover rounded-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative font-[font-2]">
          <div className="mt-[60vh]">
            <h1 className="text-[15vw] text-center uppercase leading-[14vw]">
              chinm@y <br />
              megh@re
            </h1>
          </div>

          <div className="pl-[45%] mt-20">
            <p className="text-6xl">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              We're inquisitive and open-minded, and we make sure creativity
              crowds out ego from every corner. A brand is a living thing,
              with values, a personality and a story. If we ignore that,
              we can achieve short-term success, but not influence that
              goes the distance. We bring that perspective to every brand
              story we help tell.
            </p>
          </div>
        </div>
      </div>

      <div className="section-2"></div>
    </div>
  );
};
