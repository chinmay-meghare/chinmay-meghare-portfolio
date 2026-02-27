import React from "react";

const ProjectCard = (props) => {
  return (
    <>
      <div className="h-full w-1/2 group relative rounded-none hover:rounded-[60px] overflow-hidden transition-[border-radius] duration-500">
        <img
          loading="lazy" 
          decoding="async"  
          className="h-full w-full object-cover"
          src={props.image1}
          alt=""
        />
        <div className="opacity-0 group-hover:opacity-100 absolute left-0 top-0 h-full w-full flex items-center justify-center bg-black/10">
          <h2 className="uppercase text-6xl font-[font1] border-4 pt-4 px-8 text-white border-white rounded-full">
            Project 1
          </h2>
        </div>
      </div>
      <div className="h-full w-1/2 group relative rounded-none hover:rounded-[60px] overflow-hidden transition-[border-radius] duration-500">
        <img
          loading="lazy" 
          decoding="async"
          className="h-full w-full object-cover"
          src={props.image2}
          alt=""
        />
        <div className="opacity-0 group-hover:opacity-100 absolute left-0 top-0 h-full w-full flex items-center justify-center bg-black/10">
          <h2 className="uppercase text-6xl font-[font1] border-4 pt-4 px-8 text-white border-white rounded-full">
            Project 1
          </h2>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
