import React from "react";
import { Link } from "react-router-dom";

const HomeBotttomText = () => {
  return (
    <div className="font-[font-2] flex items-center justify-center gap-2">
      <Link
        className="text-[6vw] leading-[4.9rem] hover:border-[#D3FD50] hover:text-[#D3FD50] border-5 border-white rounded-full px-8 uppercase"
        to="/projects"
      >
        Projects
      </Link>
      <Link
        className="text-[6vw] leading-[4.9rem] hover:border-[#D3FD50] hover:text-[#D3FD50] border-5 border-white rounded-full px-8 uppercase"
        to="/about"
      >
        About
      </Link>
    </div>
  );
};

export default HomeBotttomText;
