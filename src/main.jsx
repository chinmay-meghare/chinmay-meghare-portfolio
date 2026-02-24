import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StairsLoading from "./components/common/StairsLoading.jsx";
import NavContext from "./context/NavContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <StairsLoading>
        <NavContext>
        <App />
        </NavContext>
      </StairsLoading>
    </BrowserRouter>
  </StrictMode>,
);
