import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CursorProvider } from "./context/CursorContext";
import "./styles/portfolio.css";

// Chargement des polices avec repli
const FONTS_TIMEOUT = 1200;
Promise.race([
  document.fonts.ready,
  new Promise((resolve) => setTimeout(resolve, FONTS_TIMEOUT)),
]).then(() => {
  document.documentElement.classList.add("fonts-ready");
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CursorProvider>
      <App />
    </CursorProvider>
  </StrictMode>,
);
