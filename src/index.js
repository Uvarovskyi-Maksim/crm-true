import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { CurrentPosition } from "./services/currentPossition";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CurrentPosition>
      <App />
    </CurrentPosition>
  </React.StrictMode>
);