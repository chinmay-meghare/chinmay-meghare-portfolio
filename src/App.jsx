import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Navbar from "./components/Navigation/Navbar";
import FullScreenNav from "./components/Navigation/FullScreenNav";
import { TailwindIndicator } from "./components/tailwind-indicator";

function App() {
  return (
    <>
      <div className="overflow-x-hidden">
        <TailwindIndicator/>
        <Navbar/>
        <FullScreenNav/>
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