import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Supports weights 200-800
import "@fontsource-variable/bricolage-grotesque";
import "./styles/globals.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
