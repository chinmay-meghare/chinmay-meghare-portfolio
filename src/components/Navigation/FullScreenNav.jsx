import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FullScreenNav = () => {
  const fullNavLinksRef = useRef(null);

  useGSAP(function () {
    const tl = gsap.timeline();

    tl.from(".stairing", {
      delay: 1,
      height: 0,
      stagger: {
        amount: -0.2,
      },
    });
    tl.from(fullNavLinksRef.current, {
      opacity: 0,
    });
    tl.from(".link", {
      opacity:0,
      rotateX: 90,
      stagger: {
        amount: -0.2,
      },
    });
  });

  return (
    <div 
      id="fullscreennav"
      className="fullscreennav hidden text-white overflow-hidden h-screen w-full z-50 absolute"
    >
      <div className="h-screen w-full fixed">
        <div className="h-full w-full flex">
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
        </div>
      </div>

      <div ref={fullNavLinksRef} className="relative">
        <div className="navlink flex w-full justify-between items-start p-2">
          <div className="">
            <h3 className="uppercase text-3xl">chinmay.</h3>
          </div>
          <div className="h-36 w-36 group flex items-center justify-center">
            <svg
              viewBox="4 4 16 16"
              width="140"
              height="140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                strokeWidth="0.2"
                strokeLinecap="round"
                className="stroke-white transition-colors duration-200 group-hover:stroke-accentcolor"
              />
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                strokeWidth="0.2"
                strokeLinecap="round"
                className="stroke-white transition-colors duration-200 group-hover:stroke-accentcolor"
              />
            </svg>
          </div>
        </div>

        {/* Nav Links */}
        <div className="">
          {/* PROJECTS */}
          <div className="link origin-top relative border-t border-white">
            <h1 className="font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
              projects
            </h1>
            <div className="moveLink absolute text-black flex top-0 bg-accentcolor">
              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/811587/pexels-photo-811587.jpeg"
                  alt=""
                />
              </div>
              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/811587/pexels-photo-811587.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div className="link origin-top relative border-t border-white">
            <h1 className="font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
              About
            </h1>
            <div className="moveLink absolute text-black flex top-0 bg-accentcolor">
              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/811587/pexels-photo-811587.jpeg"
                  alt=""
                />
              </div>
              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/811587/pexels-photo-811587.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="link origin-top relative border-y border-white">
            <h1 className="font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
              Contact
            </h1>
            <div className="moveLink absolute text-black flex top-0 bg-accentcolor">
              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/811587/pexels-photo-811587.jpeg"
                  alt=""
                />
              </div>
              <div className="moveX flex items-center">
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[8vw] text-center leading-[0.9] pt-3 uppercase">
                  see&nbsp;everything
                </h2>
                <img
                  className="h-[4.3rem] shrink-0 object-cover w-64 rounded-full"
                  src="https://images.pexels.com/photos/811587/pexels-photo-811587.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenNav;
