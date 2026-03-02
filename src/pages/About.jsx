import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

const imageArray = [
  "https://images.pexels.com/photos/4079215/pexels-photo-4079215.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/5901065/pexels-photo-5901065.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/5191436/pexels-photo-5191436.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/31978035/pexels-photo-31978035.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/17023274/pexels-photo-17023274.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/32031995/pexels-photo-32031995.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
  "https://images.pexels.com/photos/5542498/pexels-photo-5542498.jpeg?auto=compress&cs=tinysrgb&w=800&q=70",
];

const preloadedImages = imageArray.map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const imageDivRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(function () {
    gsap.to(imageDivRef.current, {
      scrollTrigger: {
        trigger: imageDivRef.current,
        start: "top 25%",
        end: "top -100%",
        pin: true,
        pinSpacing: true,
        pinReparent: true,
        // pinType: "transform",
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (elem) => {
          if (!imageRef.current || preloadedImages.length === 0) return;

          const imageIndex =
            elem.progress < 1
              ? Math.floor(elem.progress * imageArray.length)
              : imageArray.length - 1;

          imageRef.current.src = preloadedImages[imageIndex].src;
        },
      },
    });
  }, []);

  return (
    <div>
      <div className="section-1 relative py-1">
        <div
          ref={imageDivRef}
          className="absolute h-[20vw] rounded-3xl w-[15vw] top:10 lg:top-44 left-[29vw]"
        >
          <img
            ref={imageRef}
            className="h-full w-full object-cover rounded-3xl"
            src="https://images.pexels.com/photos/4079215/pexels-photo-4079215.jpeg"
            alt=""
          />
        </div>
        <div className="relative font-[font-2]">
          <div className="mt-[60vh]">
            <h1 className="text-[15vw] text-center uppercase leading-[14vw] ">
              chinm@y <br />
              megh@re{" "}
            </h1>
          </div>
          <div className="pl-[45%] mt-20">
            <p className="text-6xl">
              {" "}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; We're
              inquisitive and open-minded, and we make sure creativity crowds
              out ego from every corner. A brand is a living thing, with values,
              a personality and a story. If we ignore that, we can achieve
              short-term success, but not influence that goes the distance. We
              bring that perspective to every brand story we help tell.
            </p>
          </div>
        </div>
      </div>
      <div className="section-2">    </div>
    </div>
  );
};

export default About;
