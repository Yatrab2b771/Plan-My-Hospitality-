import React from "react";
import { AuthProvider } from "../context/AuthContext.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import ToastContainer from "./Toast.jsx";

export default function PageLayout({ children }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-cream text-ink">
        <Navbar />
        <ScrollToTop />
        <ToastContainer />
        <main>{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
