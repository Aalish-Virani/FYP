import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AudioProvider } from "../src/context/AudioContext.tsx"; // Adjust path if AudioContext is elsewhere

createRoot(document.getElementById("root")!).render(
  <AudioProvider>
    <App />
  </AudioProvider>
);
