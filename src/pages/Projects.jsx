import React from "react";

const Projects = () => {
  return (
    <div>
      <div className="p-4">
        <div className="pt-[45vh]">
          <h2 className="font-[font2] text-[9.5vw] uppercase">Projects</h2>
        </div>

        <div>
          <div className="w-full h-96 mb-4 flex gap-4">
            <div className="w-1/2 h-full transition-all rounded-none hover:rounded-[60px] overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src="https://images.pexels.com/photos/285814/pexels-photo-285814.jpeg"
                alt=""
              />
            </div>
            <div className="w-1/2 h-full ">
              <img
                src="https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-96 mb-4 flex gap-4 ">
            <div className="w-1/2 h-full "></div>
            <div className="w-1/2 h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
