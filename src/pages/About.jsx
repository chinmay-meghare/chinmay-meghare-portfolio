import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";

const About = () => {
  gsap.registerPlugin(ScrollTrigger);
  const imageDivRef = useRef(null);
  const imageRef = useRef(null);
  const preloadedImages = useRef([]);

  const imageArray = [
    "https://images.pexels.com/photos/4079215/pexels-photo-4079215.jpeg",
    "https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg",
    "https://images.pexels.com/photos/5901065/pexels-photo-5901065.jpeg",
    "https://images.pexels.com/photos/5191436/pexels-photo-5191436.jpeg",
    "https://images.pexels.com/photos/31978035/pexels-photo-31978035.jpeg",
    "https://images.pexels.com/photos/17023274/pexels-photo-17023274.jpeg",
    "https://images.pexels.com/photos/32031995/pexels-photo-32031995.jpeg",
    "https://images.pexels.com/photos/5542498/pexels-photo-5542498.jpeg",
  ];

  // Preload all images before GSAP runs
  useEffect(() => {
    preloadedImages.current = imageArray.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, []);

  useGSAP(function () {
    gsap.to(imageDivRef.current, {
      scrollTrigger: {
        trigger: imageDivRef.current,
        start: "top 29%",
        end: "top -70%",
        pin: true,
        onUpdate: (elem) => {
          let imageIndex;
          if (elem.progress < 1) {
            imageIndex = Math.floor(elem.progress * imageArray.length);
          } else {
            imageIndex = imageArray.length - 1;
          }
         
          imageRef.current.src = preloadedImages.current[imageIndex].src;
        },
      },
    });
  }, []);

  return (
    <div>
      <div className="section-1 relative py-1">
        <div
          ref={imageDivRef}
          className="absolute h-[20vw] overflow-hidden rounded-3xl w-[15vw] top-44 left-[29vw]"
        >
          <img
            ref={imageRef}
            className="h-full w-full object-cover"
            src="https://images.pexels.com/photos/4079215/pexels-photo-4079215.jpeg"
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
