import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Footer } from "./landingPage/Footer";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-gradient-to-br from-blue-700 via-black to-blue-800 min-h-screen overflow-hidden">
      <App />
      <Footer />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  </StrictMode>
);
