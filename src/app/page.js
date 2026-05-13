import StickyCards from "@/components/home/StickyCards/StickyCards";
import About from "../components/home/About";
import Hero from "../components/home/Hero";
import TechSection from "../components/tech/TechSection";

export default function HomePage() {
    return (
        <>
            <Hero/>
            <About/>
            <TechSection/>
            <StickyCards/>
        </>
    )
}