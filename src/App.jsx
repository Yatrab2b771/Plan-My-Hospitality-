import ProposalWizard from "./pages/ProposalWizard.jsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ToastContainer from "./components/Toast.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Gallery from "./pages/Gallery.jsx";
import Venues from "./pages/Venues.jsx";

import Contact from "./pages/Contact.jsx";
import QuoteBuilder from "./pages/QuoteBuilder.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Login from "./pages/Login.jsx";
import ConsumerAccount from "./pages/ConsumerAccount.jsx";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-cream text-ink">
        <Navbar />
        <ScrollToTop />
        <ToastContainer />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/venues" element={<Venues />} />
        
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote-builder" element={<QuoteBuilder />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<ConsumerAccount />} />
            <Route path="/request-proposal" element={<ProposalWizard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}