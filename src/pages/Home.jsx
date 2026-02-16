import React from "react";
import Video from "../components/home/Video";
import HomeHeroText from "../components/home/HomeHeroText";
import HomeBotttomText from "../components/home/HomeBotttomText";

const Home = () => {
  return (
    <>
    <div className="h-screen w-screen fixed">
      <Video />
    </div>
    <div className="h-screen w-screen relative flex flex-col">
      <HomeHeroText/>
      <HomeBotttomText/>
    </div>
    </>
  );
};

export default Home;
