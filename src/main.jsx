import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import { startOpeningSound } from "./audio/sounds";
import "./styles/global.css";
import "./styles/cookbook.css";

const navigationEntry = performance.getEntriesByType("navigation")[0];

if (navigationEntry?.type === "reload" && window.location.pathname !== "/") {
  window.history.replaceState(window.history.state, "", "/");
}

startOpeningSound();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
