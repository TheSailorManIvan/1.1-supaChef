import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { App } from "./app/App";
import { startOpeningSound } from "./audio/sounds";
import "./styles/global.css";
import "./styles/cookbook.css";

startOpeningSound();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </StrictMode>,
);
