import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const introLineRef = useRef(null);
  const heroSectionRef = useRef(null);
  const aboutMeRef = useRef(null);

  useGSAP(
    () => {
      // Scroll-driven shrink: clips the hero section from bottom to top
      gsap.to(heroSectionRef.current, {
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top -50%",
          end: "bottom top",
          scrub: true,
        },
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "none",
      });

      // --- SplitText masking line reveal on the <h1> ---
      // Make the hidden text visible (pairs with #intro { visibility: hidden } in CSS)
      gsap.set(aboutMeRef.current, { autoAlpha: 1 });

      let mm = gsap.matchMedia();
      mm.add(
        { reducedMotion: "(prefers-reduced-motion: no-preference)" },
        () => {
          SplitText.create(aboutMeRef.current, {
            type: "words,lines",
            linesClass: "line",
            autoSplit: true,
            mask: "lines",
            onSplit(self) {
              return gsap.from(self.lines, {
                delay:0.4,
                duration: 1,
                yPercent: 100,
                opacity: 0,
                stagger: 0.1,
                ease: "expo.out",
              });
            },
          });
        }
      );
    },
    { scope: heroSectionRef }
  );

  return (
    <section
      ref={heroSectionRef}
      className="relative h-screen w-full overflow-hidden font-inter"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.1) 100%), url('https://images.pexels.com/photos/16577536/pexels-photo-16577536.jpeg?auto=compress&cs=tinysrgb&w=800&q=70')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-brightness-90"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full overflow-hidden flex-col items-center justify-end px-6 pb-20 text-center text-white lg:pb-32">
        <p
          ref={introLineRef}
          className="mb-4 text-sm font-medium tracking-wide sm:text-base lg:text-lg"
        >
          Hi, I'm <span className="font-bold">Chinmay</span> a curious
          <span className="font-bold"> product designer</span> who
          <span className="font-bold italic"> loves asking "why"</span>
        </p>

        <p id="intro" ref={aboutMeRef} className="max-w-5xl text-3xl leading-tight font-inter italic sm:text-4xl md:text-5xl lg:text-6xl">

          I blend <span className="text-emerald-400 not-italic">
            my engineering perspective
          </span> with product design principles to create interfaces
          <span className="text-amber-200"> that solve problems</span>
        </p>
      </div>
    </section>
  );
};

export default Hero;