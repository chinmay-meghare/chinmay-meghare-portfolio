import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

const About = () => {
  const imgDivRef = useRef(null);
  const imageRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to(imgDivRef.current, {
      scrollTrigger: {
        trigger: imgDivRef.current,
        markers: true,
        start: "top 29%",
        end: "top -70%",
        scrub:true,
        pin:true,
      },
    });
  }, []);

  return (
    <div>
      <div className="section-1">
        <div
          ref={imgDivRef}
          className="absolute h-[20vw] overflow-hidden rounded-3xl w-[15vw] top-44 left-[29vw] bg-red-400"
        >
          <img ref={imageRef}
            className="h-full w-full object-cover"
            src="https://k72.ca/images/teamMembers/Carl_480x640.jpg?w=480&h=640&fit=crop&s=f0a84706bc91a6f505e8ad35f520f0b7"
            alt=""
          />
        </div>
        <div className="relative font-[font-2]">
          <div className="mt-[60vh]">
            <h1 className="text-[19vw] text-center uppercase leading-[14vw] ">
              seven7y <br />
              two{" "}
            </h1>
          </div>
          <div className="pl-[45%]">
            <p className="text-6xl">
              {" "}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;We're
              inquisitive and open-minded, and we make sure creativity crowds
              out ego from every corner. A brand is a living thing, with values,
              a personality and a story. If we ignore that, we can achieve
              short-term success, but not influence that goes the distance. We
              bring that perspective to every brand story we help tell.
            </p>
          </div>
        </div>
      </div>
      <div className="section-2"></div>
    </div>
  );
};

export default About;
