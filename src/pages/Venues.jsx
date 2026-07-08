import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaLocationDot, FaUsers, FaXmark, FaMagnifyingGlass } from "react-icons/fa6";
import SectionTitle from "../components/SectionTitle.jsx";
import { venues } from "../data/siteData.js";
import { showToast } from "../components/Toast.jsx";

export default function Venues() {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Modal Form State
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    eventDate: "",
    message: ""
  });
  const [errors, setErrors] = useState({});

  // Unique cities & types for filtering
  const cities = useMemo(() => ["All", ...new Set(venues.map((v) => v.city))], []);
  const types = useMemo(() => ["All", ...new Set(venues.map((v) => v.type))], []);

  // Filtered venues list
  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            venue.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === "All" || venue.city === selectedCity;
      const matchesType = selectedType === "All" || venue.type === selectedType;
      return matchesSearch && matchesCity && matchesType;
    });
  }, [searchQuery, selectedCity, selectedType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleOpenModal = (venue) => {
    setSelectedVenue(venue);
    setFormData({ name: "", contactInfo: "", eventDate: "", message: "" });
    setErrors({});
  };

  const handleCloseModal = () => {
    setSelectedVenue(null);
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.contactInfo.trim()) {
      tempErrors.contactInfo = "Email or Phone is required";
    }
    if (!formData.eventDate.trim()) {
      tempErrors.eventDate = "Event date is required";
    }
    if (!formData.message.trim()) {
      tempErrors.message = "Details are required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please check the form fields.", "error");
      return;
    }

    const newEnquiry = {
      id: "enq_" + Date.now(),
      type: "Venue Sourcing",
      venueName: selectedVenue.name,
      name: formData.name,
      email: formData.contactInfo.includes("@") ? formData.contactInfo : "N/A",
      phone: !formData.contactInfo.includes("@") ? formData.contactInfo : "N/A",
      eventType: selectedVenue.type,
      message: `Enquiry for Date: ${formData.eventDate}. Notes: ${formData.message}`,
      date: new Date().toLocaleDateString()
    };

    const existing = JSON.parse(localStorage.getItem("pmh_enquiries") || "[]");
    localStorage.setItem("pmh_enquiries", JSON.stringify([newEnquiry, ...existing]));

    showToast(`Enquiry for ${selectedVenue.name} submitted successfully!`);
    handleCloseModal();
  };

  return (
    <>
      {/* Hero Section - Suitehop style */}
      <section className="pt-28 pb-4">
        <div className="container-pad">
          <div className="relative">
            <div className="h-[420px] w-full overflow-hidden rounded-3xl md:h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1800&q=85"
                alt="Venues"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Overlapping card */}
            <div className="absolute bottom-6 left-6 max-w-sm rounded-2xl bg-white p-6 shadow-2xl sm:bottom-10 sm:left-10 sm:p-8">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-sky-50 text-sky-600">
                <FaLocationDot size={20} />
              </div>
              <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
                Venues
              </h1>
              <p className="mt-2 text-sm font-medium text-ink/55">
                Lawns, banquets, resorts, rooftops & convention spaces
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-pad">
          <SectionTitle eyebrow="Curated Spaces" title="Venue cards built for quick shortlisting." />

          {/* Search & Filters Controls */}
          <div className="mb-10 grid gap-4 rounded-2xl bg-white border border-line p-5 shadow-card md:grid-cols-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-4 grid place-items-center text-ink/35">
                <FaMagnifyingGlass />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-line py-3 pl-11 pr-4 outline-none focus:border-sky-400 text-sm"
                placeholder="Search venue or city..."
              />
            </div>

            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-sky-400 text-sm"
              >
                <option value="All">All Cities</option>
                {cities.slice(1).map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-sky-400 text-sm"
              >
                <option value="All">All Types</option>
                {types.slice(1).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Venues Grid */}
          {filteredVenues.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVenues.map((item) => (
                <motion.article key={item.name} className="overflow-hidden card flex flex-col justify-between" whileHover={{ y: -7 }}>
                  <div>
                    <img className="h-64 w-full object-cover" src={item.image} alt={item.name} />
                    <div className="p-6">
                      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-600">{item.type}</p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-ink">{item.name}</h3>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-ink/55">
                        <span className="flex items-center gap-2"><FaLocationDot className="text-sky-500" /> {item.city}</span>
                        <span className="flex items-center gap-2"><FaUsers className="text-sky-500" /> Up to {item.guests}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button type="button" className="btn-primary w-full" onClick={() => handleOpenModal(item)}>Enquire Now</button>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 card">
              <p className="text-lg font-bold text-ink/55">No venues matched your criteria.</p>
              <button onClick={() => { setSearchQuery(""); setSelectedCity("All"); setSelectedType("All"); }} className="mt-4 text-sky-600 font-extrabold hover:underline">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedVenue && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-ink/45 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal}>
            <motion.div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-soft" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-600">Venue Enquiry</p>
                  <h3 className="font-display text-2xl font-semibold text-ink">{selectedVenue.name}</h3>
                </div>
                <button className="grid h-10 w-10 place-items-center rounded-full bg-mist text-ink" aria-label="Close modal" onClick={handleCloseModal}><FaXmark /></button>
              </div>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-sky-400 ${errors.name ? "border-red-500" : "border-slate-200"}`}
                    placeholder="Your name"
                  />
                  {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                </div>
                <div>
                  <input
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-sky-400 ${errors.contactInfo ? "border-red-500" : "border-slate-200"}`}
                    placeholder="Email or phone"
                  />
                  {errors.contactInfo && <span className="text-xs text-red-500 mt-1 block">{errors.contactInfo}</span>}
                </div>
                <div>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-sky-400 ${errors.eventDate ? "border-red-500" : "border-slate-200"}`}
                  />
                  {errors.eventDate && <span className="text-xs text-red-500 mt-1 block">{errors.eventDate}</span>}
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full min-h-28 rounded-xl border px-4 py-3 outline-none focus:border-sky-400 ${errors.message ? "border-red-500" : "border-slate-200"}`}
                    placeholder="Guest count and event details"
                  />
                  {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message}</span>}
                </div>
                <button type="submit" className="btn-primary">Send Enquiry</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
