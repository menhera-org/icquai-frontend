import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import "./index.css";

import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}

if (visualViewport) {
  document.documentElement.style.setProperty("height", `${visualViewport.height}px`);
  document.documentElement.style.setProperty("width", `${visualViewport.width}px`);

  const update = () => {
    if (!visualViewport) return;
    document.documentElement.style.setProperty("height", `${visualViewport.height}px`);
    document.documentElement.style.setProperty("width", `${visualViewport.width}px`);
    document.documentElement.style.setProperty("top", `${visualViewport.offsetTop}px`);
  };
  visualViewport.addEventListener("resize", update);
  visualViewport.addEventListener("scroll", update);
}
