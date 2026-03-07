import React from "react";
import Video from "./Video";

const HomeHeroText = () => {
  return (
    <div className="font-inter pt-80 sm:pt-0">
      <div className="text-[9.5vw] capitalize leading-[8vw] flex justify-center items-center">The spark for</div>
      <div className="text-[9.5vw] uppercase leading-[8vw] flex justify-center items-center">all <div className="h-[8vw] rounded-full overflow-hidden"><Video/></div> things</div>
      <div className="text-[9.5vw] uppercase leading-[8vw] flex justify-center items-center">creative</div>
    </div> 
  );
};

export default HomeHeroText;
