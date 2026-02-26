import React from "react";
import ProjectCard from "../components/projects/ProjectCard";

const Projects = () => {
  const projects = [
    {
      image1:
        "https://images.pexels.com/photos/285814/pexels-photo-285814.jpeg",
      image2:
        "https://images.pexels.com/photos/35873260/pexels-photo-35873260.jpeg",
    },
    {
      image1:
        "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg",
      image2:
        "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg",
    },
    {
      image1:
        "https://images.pexels.com/photos/1167021/pexels-photo-1167021.jpeg",
      image2:
        "https://images.pexels.com/photos/3312232/pexels-photo-3312232.jpeg",
    },
    {
      image1:
        "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
      image2:
        "https://images.pexels.com/photos/1013516/pexels-photo-1013516.jpeg",
    },
  ];

  return (
    <>
      <div className="p-4">
        <div className="pt-[45vh]">
          <h2 className="font-[font2] text-[9.5vw] uppercase">Projects</h2>
        </div>

        <div>
          {projects.map((elem) => {
            return (
              <div className="w-full h-96 mb-4 flex gap-4">
                <ProjectCard image1={elem.image1} image2={elem.image2} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Projects;
