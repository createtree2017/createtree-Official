import React from "react";
import { createRoot } from "react-dom/client";
import { AdminApp } from "./pages/AdminApp";
import { HospitalLandingPage } from "./pages/HospitalLandingPage";
import "./styles.css";

function App() {
  const path = window.location.pathname;

  if (path.startsWith("/admin")) {
    return <AdminApp />;
  }

  return <HospitalLandingPage />;
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

