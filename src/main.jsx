import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ControlsProvider } from "./context/ControlsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ControlsProvider>
    <App />
  </ControlsProvider>
);
