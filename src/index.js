import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CanvasProvider } from "./context/CanvasContext";

// Keeping strict mode off for simplicity
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CanvasProvider>
    <App />
  </CanvasProvider>
);
