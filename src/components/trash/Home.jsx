import React from "react";
import Video from "../components/trash/Video";
import HomeHeroText from "../components/trash/HomeHeroText";
import HomeBotttomText from "../components/trash/HomeBotttomText";
import Hero from "../components/home/Hero";
import About from "./About";
import Projects from "../components/trash/Projects";
import TechSection from "../components/home/TechSection";

const Home = () => {
  return (
    <>
      {/* <div className="h-screen w-screen fixed">
      <Video />
    </div>  
    <div className="h-screen w-screen text-white relative flex flex-col justify-between">
      <HomeHeroText/>
      <HomeBotttomText/>
    </div> */}

      <Hero />
      <About />
      <TechSection />
      <Projects />
    </>
  );
};

export default Home;
