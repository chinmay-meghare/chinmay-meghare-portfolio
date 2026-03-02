import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Navbar from "./components/Navigation/Navbar";
import FullScreenNav from "./components/Navigation/FullScreenNav";
// import { TailwindIndicator } from "./components/tailwind-indicator";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";

function App() {
  const lenisRef = useRef();
  const location = useLocation();

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      {/* <TailwindIndicator/> */}
      <Navbar />
      <FullScreenNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </ReactLenis>
  );
}

export default App;
