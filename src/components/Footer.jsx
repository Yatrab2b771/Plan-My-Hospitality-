import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaLocationDot, FaPhone, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import logo from "../assets/logo.svg";
import { navLinks } from "../data/siteData.js";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black pt-16 text-white">
      <div className="container-pad grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Plan My Hospitality crest" className="h-10 w-10" />
            <span className="font-display text-xl font-semibold tracking-wide text-white">Plan My Hospitality</span>
          </Link>
          <p className="mt-4 max-w-sm leading-7 text-white/60">
            Premium corporate event production, high-protocol hospitality, elite venue procurement, and custom delegate logistics for global enterprises.
          </p>
          <div className="mt-6 flex gap-3">
            {[FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter].map((Icon, index) => (
              <a key={index} className="grid h-10 w-10 place-items-center rounded-full bg-white border border-line text-ink/70 transition hover:bg-sky-600 hover:text-white hover:border-sky-600" href="#" aria-label="Social link">
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-5 text-sm font-extrabold uppercase tracking-[0.24em] text-sky-600">Navigation</h4>
          <div className="grid gap-3">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-white/60 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-5 text-sm font-extrabold uppercase tracking-[0.24em] text-sky-600">Our Services</h4>
          <div className="grid gap-3 text-white/60">
            <span>Conferences & Summits</span>
            <span>Executive Retreats</span>
            <span>Venue Procurement</span>
            <span>VIP Delegate Logistics</span>
            <span>Product Launches</span>
          </div>
        </div>
        <div>
          <h4 className="mb-5 text-sm font-extrabold uppercase tracking-[0.24em] text-sky-600">Headquarters</h4>
          <div className="grid gap-4 text-white/70">
            <p className="flex gap-3"><FaLocationDot className="mt-1 text-sky-500" /> Sector 62, Noida, India</p>
            <a href="tel:+919999999999" className="flex gap-3 transition hover:text-white"><FaPhone className="mt-1 text-sky-500" /> +91 99999 99999</a>
            <a href="mailto:contact@planmyhospitality.com" className="flex gap-3 transition hover:text-white"><FaEnvelope className="mt-1 text-sky-500" /> contact@planmyhospitality.com</a>
            <Link to="/request-proposal" className="btn-primary mt-2 w-fit">Request Proposal</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 bg-black">
        <div className="container-pad flex flex-col justify-between gap-3 text-sm text-white/55 md:flex-row">
          <span>© 2026 Plan My Hospitality Private Limited. All rights reserved.</span>
          <span>Corporate Grade Hospitality & Event Execution.</span>
        </div>
      </div>
    </footer>
  );
}
