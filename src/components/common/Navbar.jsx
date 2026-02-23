import { useRef } from "react";

const Navbar = () => {
  const navGreenRef = useRef(null);
  return (
    <div className="z-4 font-[font2] flex fixed top-0 w-full items-start justify-between">
      <div className="p-2">
        <h3 className="uppercase text-2xl">chinmay.</h3>
      </div>

      <div
        onMouseEnter={() => {
          navGreenRef.current.style.height = "100%";
        }}
        onMouseLeave={() => {
          navGreenRef.current.style.height = "0%";
        }}
        className="bg-black h-10 w-50 relative cursor-pointer"
      >
        <div className="h-full w-full flex justify-end items-center pr-2">
          <svg
            viewBox="0 0 24 24"
            width="105"
            height="64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="2"
              y1="10"
              x2="22"
              y2="10"
              stroke="#fff"
              strokeWidth="0.8"
              strokeLinecap="butt"
            />
            <line
              x1="8"
              y1="12"
              x2="22"
              y2="12"
              stroke="#fff"
              strokeWidth="0.8"
              strokeLinecap="butt"
            />
            <line
              x1="13"
              y1="14"
              x2="22"
              y2="14"
              stroke="#fff"
              strokeWidth="0.8"
              strokeLinecap="butt"
            />
          </svg>
        </div>
        <div
          ref={navGreenRef}
          className="bg-[#D3FD50] transition-all absolute top-0 h-0 w-full overflow-hidden "
        >
          <div className="h-10 w-full flex justify-end items-center pr-2">
            <svg
              viewBox="0 0 24 24"
              width="105"
              height="64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="2"
                y1="10"
                x2="22"
                y2="10"
                stroke="#2e2e2e"
                strokeWidth="0.8"
                strokeLinecap="butt"
              />
              <line
                x1="8"
                y1="12"
                x2="22"
                y2="12"
                stroke="#2e2e2e"
                strokeWidth="0.8"
                strokeLinecap="butt"
              />
              <line
                x1="13"
                y1="14"
                x2="22"
                y2="14"
                stroke="#2e2e2e"
                strokeWidth="0.8"
                strokeLinecap="butt"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
