import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LevaProvider } from "./context/LevaContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LevaProvider>
    <App />
  </LevaProvider>
);
