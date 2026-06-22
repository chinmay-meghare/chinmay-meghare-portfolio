"use client"

import TextReveal from "../common/TextReveal";
import { ShaderAnimation } from "../shader-lines";

export default function Hero() {
  return (

    <section className="h-screen w-full">

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-1" />

      {/* Grain Texture */}
      <div className="grain absolute inset-0 z-2"></div>

      {/* Orange Glow  */}
      <div className="absolute left-1/2 top-1/2 h-125 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[180px] z-10" />

      <ShaderAnimation />
 
      <div className="relative z-10">
        <TextReveal animateOnScroll={false} delay={0.7} duration={0.8}>
          <h1 className="p-2 text-6xl leading-tight">
            I blend engineering with design
          </h1>
          <p className="mb-4 text-sm font-medium tracking-wide sm:text-base lg:text-lg">
            Hi, I'm Chinmay a curious product designer who loves asking "why"
          </p>
        </TextReveal>
      </div>
    </section>
  );
}