import { useState } from "react";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import OverlapHero from "../components/OverlapHero.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { showToast } from "../components/Toast.jsx";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    message: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = "Phone is invalid (8-15 digits)";
    }
    if (!formData.eventType) tempErrors.eventType = "Event type is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fix the validation errors.", "error");
      return;
    }

    // Save to localStorage
    const newEnquiry = {
      id: "enq_" + Date.now(),
      type: "Contact Inquiry",
      venueName: "N/A",
      date: new Date().toLocaleDateString(),
      ...formData
    };

    const existing = JSON.parse(localStorage.getItem("pmh_enquiries") || "[]");
    localStorage.setItem("pmh_enquiries", JSON.stringify([newEnquiry, ...existing]));

    showToast("Enquiry submitted successfully!");
    setFormData({
      name: "",
      phone: "",
      email: "",
      eventType: "",
      message: ""
    });
  };

  return (
    <>
      <OverlapHero
        icon={FaPhone}
        title="Contact PMH"
        text="Tell us what you are planning — we'll respond with a tailored proposal."
        image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85"
        size="full"
      />
      <section className="section-band">
        <div className="container-pad">
          <SectionTitle eyebrow="Request Proposal" title="Start your project consultation." />
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal className="card p-7">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-sky-400 ${errors.name ? "border-red-500" : "border-slate-200"}`}
                      placeholder="Your Name / Organization"
                    />
                    {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                  </div>
                  <div>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-sky-400 ${errors.phone ? "border-red-500" : "border-slate-200"}`}
                      placeholder="Phone"
                    />
                    {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone}</span>}
                  </div>
                </div>
                <div>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-sky-400 ${errors.email ? "border-red-500" : "border-slate-200"}`}
                    placeholder="Corporate Email"
                  />
                  {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                </div>
                <div>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-sky-400 ${errors.eventType ? "border-red-500" : "border-slate-200"}`}
                  >
                    <option value="" disabled>Requirement Type</option>
                    <option value="Corporate Summit / Conference">Corporate Summit / Conference</option>
                    <option value="Executive Board Retreat">Executive Board Retreat</option>
                    <option value="Premium Venue Sourcing">Premium Venue Sourcing</option>
                    <option value="VIP Logistics & Protocol">VIP Logistics & Protocol</option>
                    <option value="Brand Activation / Launch">Brand Activation / Launch</option>
                  </select>
                  {errors.eventType && <span className="text-xs text-red-500 mt-1 block">{errors.eventType}</span>}
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full min-h-36 rounded-xl border px-4 py-3 outline-none focus:border-sky-400 ${errors.message ? "border-red-500" : "border-slate-200"}`}
                    placeholder="Share target date, delegate count, destination details and expectations"
                  />
                  {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message}</span>}
                </div>
                <button type="submit" className="btn-primary w-full">Submit Request</button>
              </form>
            </Reveal>
            <Reveal delay={0.08} className="overflow-hidden card">
              <iframe
                title="Google Maps"
                className="h-80 w-full border-0"
                loading="lazy"
                src="https://www.google.com/maps?q=Sector%2062%20Noida&output=embed"
              />
              <div className="grid gap-4 p-6">
                <p className="flex items-center gap-3 text-ink/65"><FaLocationDot className="text-sky-500" /> Sector 62, Noida, India</p>
                <p className="flex items-center gap-3 text-ink/65"><FaPhone className="text-sky-500" /> +91 99999 99999</p>
                <p className="flex items-center gap-3 text-ink/65"><FaEnvelope className="text-sky-500" /> contact@planmyhospitality.com</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
