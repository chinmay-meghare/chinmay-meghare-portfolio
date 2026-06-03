import TextReveal from "../common/TextReveal";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-screen w-full bg-black flex flex-col justify-center items-center text-white">

      <TextReveal animateOnScroll={false} delay={0.3} duration={0.6}>
        <h1 className="text-6xl font-black uppercase italic tracking-tight">
          I blend <span className="text-emerald-400">engineering</span> with
          design.
        </h1>
        <p className="mb-4 text-sm font-medium tracking-wide sm:text-base lg:text-lg">
          Hi, I'm Chinmay a curious product designer who loves asking "why"
        </p>
      </TextReveal>
    </section>
  );
}
