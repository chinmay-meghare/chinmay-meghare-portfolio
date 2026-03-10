import React from "react";
import Video from "../components/home/Video";
import HomeHeroText from "../components/home/HomeHeroText";
import HomeBotttomText from "../components/home/HomeBotttomText";
import Hero from "../components/home/Hero";
import About from "./About";
import Projects from "./Projects";

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
      <Projects />
    </>
  );
};

export default Home;
