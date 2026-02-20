import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function App() {
  const stairParentRef = useRef(null);

  useGSAP(function () {
    const tl = gsap.timeline();

    tl.to(stairParentRef.current, {
      display: "block",
    });

    tl.from(".stair", {
      height: 0,
      stagger: {
        amount: -0.25,
      },
    });

    tl.to(".stair", {
      y: "100%",
      stagger: {
        amount: -0.3,
      },
    });

    tl.to(stairParentRef.current, {
      display: "none",
    });

    tl.to(".stair", {
      y: "0%",
    });
  });

  return (
    <>
      <div>
        <div ref={stairParentRef} className="h-screen w-full fixed z-20 top-0">
          <div className="h-full w-full flex">
            <div className="stair h-full w-1/5 bg-black"></div>
            <div className="stair h-full w-1/5 bg-black"></div>
            <div className="stair h-full w-1/5 bg-black"></div>
            <div className="stair h-full w-1/5 bg-black"></div>
            <div className="stair h-full w-1/5 bg-black"></div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
