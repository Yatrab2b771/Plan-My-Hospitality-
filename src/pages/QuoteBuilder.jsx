import { useState, useMemo } from "react";
import { FaCalculator, FaUsers, FaArrowRight, FaCrown, FaBriefcase, FaGem, FaCheck } from "react-icons/fa6";
import OverlapHero from "../components/OverlapHero.jsx";
import { showToast } from "../components/Toast.jsx";

const TIERS = [
  {
    id: "standard",
    name: "Standard Business",
    pricePerDelegate: 1200,
    icon: FaBriefcase,
    description: "Premium buffet, corporate meeting setup, coffee service, and coordinate logistics.",
    features: ["Business class buffet", "Standard audio/visual gear", "Digital check-in support", "Standard lounge booking"]
  },
  {
    id: "executive",
    name: "Executive VIP",
    pricePerDelegate: 3500,
    icon: FaCrown,
    description: "Plated dining, private VIP room, airport transfers, custom gifting, and protocol hosts.",
    features: ["Plated multi-cuisine dining", "Dedicated VIP liaison officers", "Executive airport transfers", "Premium customized gift hampers", "Extended evening networking cocktail"]
  },
  {
    id: "elite",
    name: "Elite VIP Reserve",
    pricePerDelegate: 9000,
    icon: FaGem,
    description: "Michelin-starred catering, private jet logistics, top-tier security detail, and luxury resort buyouts.",
    features: ["Michelin-starred master chef menus", "Personal concierge for all delegates", "Private jet & helicopter logistics", "Armed high-security detail", "5-star luxury resort exclusivity"]
  }
];

const ADDONS = [
  { id: "av", name: "High-End AV & Stage Production", cost: 150000, desc: "Immersive LED screens, stage design, professional audio arrays, and lighting operators." },
  { id: "branding", name: "Custom Venue Physical Branding", cost: 85000, desc: "Bespoke welcome archways, banner printings, step-and-repeats, and display stands." },
  { id: "interpreters", name: "Multi-lingual Interpretation Desk", cost: 60000, desc: "Real-time translator booths and wireless headphone setups for international delegates." },
  { id: "security", name: "VIP Security Guard Protocol", cost: 110000, desc: "Certified threat assessors, crowd managers, and private security guards." }
];

export default function QuoteBuilder() {
  const [delegates, setDelegates] = useState(150);
  const [selectedTier, setSelectedTier] = useState("standard");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState({});

  const handleAddonToggle = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const currentTier = useMemo(() => TIERS.find((t) => t.id === selectedTier), [selectedTier]);

  const calculations = useMemo(() => {
    const hospitalityCost = delegates * currentTier.pricePerDelegate;
    const addonsCost = selectedAddons.reduce((sum, id) => {
      const add = ADDONS.find((a) => a.id === id);
      return sum + (add ? add.cost : 0);
    }, 0);
    const subtotal = hospitalityCost + addonsCost;

    const taxes = Math.round(subtotal * 0.18);
    const serviceFee = Math.round(subtotal * 0.05);
    const total = subtotal + taxes + serviceFee;

    const staffCount = Math.ceil(delegates / 15) + (selectedTier === "elite" ? 20 : selectedTier === "executive" ? 10 : 4);
    const projectManagers = selectedTier === "elite" ? 3 : selectedTier === "executive" ? 2 : 1;

    return { hospitalityCost, addonsCost, subtotal, taxes, serviceFee, total, staffCount, projectManagers };
  }, [delegates, currentTier, selectedAddons]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const temp = {};
    if (!formData.name.trim()) temp.name = "Name or Company is required";
    if (!formData.email.trim()) {
      temp.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      temp.email = "Email is invalid";
    }
    if (!formData.phone.trim()) temp.phone = "Phone number is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please enter contact details.", "error");
      return;
    }

    const newEnquiry = {
      id: "quote_" + Date.now(),
      type: "Quote Estimate",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      venueName: `PMH Quote Builder (${currentTier.name})`,
      eventType: `Delegates: ${delegates} | Tier: ${currentTier.name}`,
      message: `Requested Staff: ${calculations.staffCount} crew, ${calculations.projectManagers} leads.\n` +
               `Client Notes: ${formData.notes || "None"}`,
      date: new Date().toLocaleDateString()
    };

    const existing = JSON.parse(localStorage.getItem("pmh_enquiries") || "[]");
    localStorage.setItem("pmh_enquiries", JSON.stringify([newEnquiry, ...existing]));

    showToast("Proposal quote request submitted successfully!");
    setFormData({ name: "", email: "", phone: "", notes: "" });
    setSelectedAddons([]);
    setDelegates(150);
    setSelectedTier("standard");
  };

  return (
    <>
      <OverlapHero
        icon={FaCalculator}
        title="Interactive Quote Builder"
        text="Adjust guest counts, select hospitality tiers, add structural services, and calculate budgets in real time."
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85"
        size="lg"
        align="top"
        transparent
        cta={{
          label: "Get a Free Quote",
          onClick: () => document.getElementById("delegate-count")?.scrollIntoView({ behavior: "smooth" }),
        }}
      />

      <section className="section-band">
        <div className="container-pad grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Inputs Panel */}
          <div className="grid gap-8">

            {/* Step 1: Guest Count */}
            <div id="delegate-count" className="card p-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2.5 text-sm font-extrabold uppercase tracking-wider text-sky-700">
                  <FaUsers className="text-lg" /> Step 1: Delegate Count
                </span>
                <span className="rounded-full bg-sky-50 px-3.5 py-1 text-lg font-bold text-sky-700">
                  {delegates} Delegates
                </span>
              </div>
              <p className="text-sm text-ink/50 mb-6">Drag the slider to adjust expected attendance for lodging and hosting services.</p>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={delegates}
                onChange={(e) => setDelegates(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-sky-100 appearance-none cursor-pointer accent-sky-600"
              />
              <div className="mt-2 flex justify-between text-xs font-semibold text-ink/40">
                <span>50 Guests</span>
                <span>500 Guests</span>
                <span>1000 Guests</span>
              </div>
            </div>

            {/* Step 2: Hospitality Tiers */}
            <div className="card p-7">
              <span className="mb-6 block text-sm font-extrabold uppercase tracking-wider text-sky-700">
                Step 2: Choose Hospitality Tier
              </span>
              <div className="grid gap-4">
                {TIERS.map((tier) => {
                  const Icon = tier.icon;
                  const isSelected = selectedTier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`relative cursor-pointer rounded-2xl border p-5 transition flex flex-col md:flex-row gap-5 items-start ${
                        isSelected
                          ? "border-sky-500 bg-sky-50/50"
                          : "border-line hover:border-sky-200"
                      }`}
                    >
                      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-xl ${
                        isSelected ? "bg-sky-600 text-white" : "bg-mist text-ink/60"
                      }`}>
                        <Icon />
                      </div>
                      <div className="grow">
                        <h3 className="font-display text-lg font-semibold text-ink">{tier.name}</h3>
                        <p className="mt-1.5 text-xs text-ink/50 leading-5">{tier.description}</p>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                          {tier.features.map((feat) => (
                            <span key={feat} className="flex items-center gap-1 text-[11px] font-semibold text-ink/60">
                              <FaCheck className="text-sky-600" /> {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div className="card p-7">
              <span className="mb-4 block text-sm font-extrabold uppercase tracking-wider text-sky-700">
                Step 3: Select Structural Add-ons
              </span>
              <p className="text-sm text-ink/50 mb-6">Enhance your retreat or conference with physical setups, security, or translations.</p>
              <div className="grid gap-4">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleAddonToggle(addon.id)}
                      className={`cursor-pointer rounded-2xl border p-4 transition flex items-center justify-between gap-4 ${
                        isChecked ? "border-sky-500 bg-sky-50/50" : "border-line hover:border-sky-200"
                      }`}
                    >
                      <div className="grow">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="h-4.5 w-4.5 rounded border-line text-sky-600 focus:ring-sky-400"
                          />
                          <h4 className="font-bold text-ink text-sm">{addon.name}</h4>
                        </div>
                        <p className="mt-1 text-xs text-ink/50 leading-5 pl-7.5">{addon.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Calculator Output & Proposal Panel */}
          <div>
            <div className="sticky top-28 rounded-2xl bg-white text-ink p-7 shadow-soft border border-line">
              <div className="flex items-center gap-3 border-b border-line pb-5 mb-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-600 text-white">
                  <FaCalculator />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">Proposal Summary</h3>
                  <p className="text-xs text-ink/45">Your selections at a glance</p>
                </div>
              </div>

              {/* PMH Staffing recommendation */}
              <div className="mb-6 grid grid-cols-2 gap-3.5 rounded-xl bg-paper p-4 text-xs">
                <div>
                  <p className="text-ink/45 font-semibold mb-0.5">Recommended Staffing</p>
                  <p className="font-bold text-ink/80">{calculations.staffCount} On-ground Crew</p>
                </div>
                <div>
                  <p className="text-ink/45 font-semibold mb-0.5">Dedicated Management</p>
                  <p className="font-bold text-ink/80">{calculations.projectManagers} PMH Directors</p>
                </div>
              </div>

              {/* Submit Quote form */}
              <form onSubmit={handleSubmit} className="grid gap-3.5 border-t border-line pt-5">
                <h4 className="text-sm font-bold text-ink/80">Request Formal PMH Pitch</h4>
                <div>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3 py-2 text-xs bg-paper border-line text-ink outline-none focus:border-sky-400 placeholder-ink/35 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    placeholder="Company or Contact Name"
                  />
                  {errors.name && <span className="text-[10px] text-red-500 mt-1 block">{errors.name}</span>}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-3 py-2 text-xs bg-paper border-line text-ink outline-none focus:border-sky-400 placeholder-ink/35 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="Corporate Email"
                    />
                    {errors.email && <span className="text-[10px] text-red-500 mt-1 block">{errors.email}</span>}
                  </div>
                  <div>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-3 py-2 text-xs bg-paper border-line text-ink outline-none focus:border-sky-400 placeholder-ink/35 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      placeholder="Corporate Phone"
                    />
                    {errors.phone && <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>}
                  </div>
                </div>
                <div>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2 text-xs bg-paper border-line text-ink outline-none focus:border-sky-400 placeholder-ink/35 min-h-18"
                    placeholder="Specific requests, target date or venue requirements..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full mt-2">
                  Submit Proposal Pitch <FaArrowRight />
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}