import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ProjectCard from "../components/projects/ProjectCard";

const projects = [
  {
    image1:
      "https://images.pexels.com/photos/285814/pexels-photo-285814.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
    image2:
      "https://images.pexels.com/photos/35873260/pexels-photo-35873260.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  },
  {
    image1:
      "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
    image2:
      "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  },
  {
    image1:
      "https://images.pexels.com/photos/1167021/pexels-photo-1167021.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
    image2:
      "https://images.pexels.com/photos/3312232/pexels-photo-3312232.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  },
  {
    image1:
      "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
    image2:
      "https://images.pexels.com/photos/1013516/pexels-photo-1013516.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  },
];

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  useGSAP(
    function () {
      gsap.from(".hero", {
        height: "70px",
        stagger: {
          amount: 0.4,
        },
        scrollTrigger: {
          trigger: ".lol",
          start: "top 80%",
          end: "top -150%",
          scrub: 0.5,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <div ref={containerRef} className="p-4">
        <div className="pt-[45vh]">
          <h2 className="font-[font2] text-[9.5vw] uppercase">Projects</h2>
        </div>

        <div className="lol">
          {projects.map((elem, idx) => {
            return (
              <div
                key={idx}
                className="hero will-change-transform w-full h-96 mb-4 flex gap-4"
              >
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
