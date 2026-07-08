import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLocationDot, FaUsers, FaCheck, FaArrowRight, FaArrowLeft,
  FaCalendarDays, FaBriefcase, FaCrown, FaGem, FaChevronLeft,
  FaChevronRight, FaCircleCheck
} from "react-icons/fa6";
import { venues } from "../data/siteData.js";
import { showToast } from "../components/Toast.jsx";

// ─── Tiers ───────────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "standard", name: "Standard Business", pricePerDelegate: 1200,
    icon: FaBriefcase,
    features: ["Business buffet", "Standard AV", "Digital check-in", "Standard lounge"]
  },
  {
    id: "executive", name: "Executive VIP", pricePerDelegate: 3500,
    icon: FaCrown,
    features: ["Plated dining", "VIP liaisons", "Airport transfers", "Gift hampers"]
  },
  {
    id: "elite", name: "Elite VIP Reserve", pricePerDelegate: 9000,
    icon: FaGem,
    features: ["Master chef menus", "Personal concierge", "Private jet logistics", "5-star buyout"]
  }
];

const ADDONS = [
  { id: "av",           name: "High-End AV & Stage",         cost: 150000 },
  { id: "branding",     name: "Custom Venue Branding",        cost: 85000  },
  { id: "interpreters", name: "Multi-lingual Interpretation", cost: 60000  },
  { id: "security",     name: "VIP Security Protocol",        cost: 110000 }
];

const EVENT_TYPES = [
  "Conference / Summit", "Annual General Meeting", "Executive Retreat",
  "Product Launch", "Team Building", "Awards Ceremony", "Corporate Gala", "Other"
];

const STEPS = ["Venue", "Event Details", "Package", "Your Details"];

// ─── Mini Calendar ────────────────────────────────────────────────────────────
function MiniCalendar({ value, onChange }) {
  const today = new Date();
  const [view, setView] = useState(
    value ? new Date(value) : new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year  = view.getFullYear();
  const month = view.getMonth();

  const MONTHS = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
  const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selected = value ? new Date(value) : null;

  const prev = () => setView(new Date(year, month - 1, 1));
  const next = () => setView(new Date(year, month + 1, 1));

  const isPast = (d) => new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isSelected = (d) => selected && selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === d;

  const pick = (d) => {
    if (!d || isPast(d)) return;
    const picked = new Date(year, month, d);
    onChange(picked.toISOString().split("T")[0]);
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={prev} className="grid h-8 w-8 place-items-center rounded-full hover:bg-mist">
          <FaChevronLeft className="text-xs" />
        </button>
        <span className="font-display font-semibold text-ink">{MONTHS[month]} {year}</span>
        <button onClick={next} className="grid h-8 w-8 place-items-center rounded-full hover:bg-mist">
          <FaChevronRight className="text-xs" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAYS.map(d => (
          <span key={d} className="py-1 text-[10px] font-extrabold uppercase tracking-widest text-ink/35">{d}</span>
        ))}
        {cells.map((d, i) => (
          <button
            key={i}
            onClick={() => pick(d)}
            disabled={!d || isPast(d)}
            className={`aspect-square w-full rounded-lg text-sm font-semibold transition
              ${!d ? "invisible" : ""}
              ${isPast(d) ? "cursor-not-allowed text-ink/20" : "hover:bg-sky-50 hover:text-sky-600"}
              ${isSelected(d) ? "bg-sky-600 !text-white shadow-glow" : "text-ink"}
            `}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step components ──────────────────────────────────────────────────────────

function StepVenue({ data, set }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-1">Choose a Venue</h2>
      <p className="text-ink/50 text-sm mb-8">Pick a preferred venue or skip to let us recommend one.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* No preference card */}
        <div
          onClick={() => set("venue", null)}
          className={`cursor-pointer rounded-2xl border p-5 transition ${
            data.venue === null ? "border-sky-500 bg-sky-50/50" : "border-line hover:border-sky-200"
          }`}
        >
          <div className={`mb-3 grid h-11 w-11 place-items-center rounded-xl text-xl ${
            data.venue === null ? "bg-sky-600 text-white" : "bg-mist text-ink/50"
          }`}>
            <FaLocationDot />
          </div>
          <h3 className="font-display text-lg font-semibold text-ink">No Preference</h3>
          <p className="mt-1 text-xs text-ink/50">Let PMH recommend the best venue for your event.</p>
          {data.venue === null && <FaCircleCheck className="mt-3 text-sky-600" />}
        </div>

        {venues.map((v) => (
          <div
            key={v.id}
            onClick={() => set("venue", v)}
            className={`cursor-pointer rounded-2xl border transition overflow-hidden ${
              data.venue?.id === v.id ? "border-sky-500 bg-sky-50/50" : "border-line hover:border-sky-200"
            }`}
          >
            <img src={v.image} alt={v.name} className="h-32 w-full object-cover" />
            <div className="p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-sky-600">{v.type}</p>
              <h3 className="mt-1 font-display text-base font-semibold text-ink">{v.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/50">
                <FaLocationDot className="text-sky-400" /> {v.city} · <FaUsers className="text-sky-400" /> Up to {v.guests}
              </p>
              {data.venue?.id === v.id && <FaCircleCheck className="mt-2 text-sky-600" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepEventDetails({ data, set }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-1">Event Details</h2>
      <p className="text-ink/50 text-sm mb-8">Tell us about your event and pick your preferred date.</p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="grid gap-5">
          {/* Event type */}
          <div>
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-ink/45">Event Type</label>
            <select
              value={data.eventType}
              onChange={(e) => set("eventType", e.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-sky-400"
            >
              <option value="">Select event type...</option>
              {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Guests slider */}
          <div>
            <label className="mb-2 flex items-center justify-between text-xs font-extrabold uppercase tracking-widest text-ink/45">
              <span>Number of Delegates</span>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">{data.delegates} guests</span>
            </label>
            <input
              type="range" min="50" max="1000" step="10"
              value={data.delegates}
              onChange={(e) => set("delegates", parseInt(e.target.value))}
              className="w-full h-2 rounded-lg bg-sky-100 appearance-none cursor-pointer accent-sky-600"
            />
            <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-ink/35">
              <span>50</span><span>500</span><span>1000</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-ink/45">Event Duration</label>
            <div className="grid grid-cols-3 gap-2">
              {["Half Day", "Full Day", "2–3 Days", "4–5 Days", "1 Week", "Custom"].map(d => (
                <button
                  key={d} type="button"
                  onClick={() => set("duration", d)}
                  className={`rounded-xl border py-2.5 text-xs font-bold transition ${
                    data.duration === d
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-line text-ink/55 hover:border-sky-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div>
          <label className="mb-3 block text-xs font-extrabold uppercase tracking-widest text-ink/45">
            <FaCalendarDays className="inline mr-2 text-sky-500" />
            Preferred Event Date
          </label>
          <MiniCalendar value={data.date} onChange={(v) => set("date", v)} />
          {data.date && (
            <p className="mt-3 text-sm font-semibold text-sky-700">
              ✓ Selected: {new Date(data.date).toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StepPackage({ data, set }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-1">Choose Your Package</h2>
      <p className="text-ink/50 text-sm mb-8">Select a hospitality tier and any structural add-ons you need.</p>

      <div className="grid gap-10">
        <div className="grid gap-8">
          {/* Tiers */}
          <div>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-sky-700">Hospitality Tier</p>
            <div className="grid gap-3">
              {TIERS.map(tier => {
                const Icon = tier.icon;
                const sel = data.tier === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => set("tier", tier.id)}
                    className={`cursor-pointer rounded-2xl border p-5 flex items-start gap-4 transition ${
                      sel ? "border-sky-500 bg-sky-50/50" : "border-line hover:border-sky-200"
                    }`}
                  >
                    <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-xl ${
                      sel ? "bg-sky-600 text-white" : "bg-mist text-ink/50"
                    }`}>
                      <Icon />
                    </div>
                    <div className="grow">
                      <h3 className="font-display font-semibold text-ink">{tier.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-3">
                        {tier.features.map(f => (
                          <span key={f} className="flex items-center gap-1 text-[11px] font-semibold text-ink/55">
                            <FaCheck className="text-sky-500" /> {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-sky-700">Structural Add-ons</p>
            <div className="grid gap-3">
              {ADDONS.map(addon => {
                const checked = data.addons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => {
                      const next = checked
                        ? data.addons.filter(a => a !== addon.id)
                        : [...data.addons, addon.id];
                      set("addons", next);
                    }}
                    className={`cursor-pointer rounded-2xl border p-4 flex items-center justify-between gap-4 transition ${
                      checked ? "border-sky-500 bg-sky-50/50" : "border-line hover:border-sky-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="checkbox" readOnly checked={checked}
                        className="h-4 w-4 rounded border-line text-sky-600" />
                      <span className="font-bold text-sm text-ink">{addon.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepDetails({ data, set, onSubmit }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-1">Your Details</h2>
      <p className="text-ink/50 text-sm mb-8">Almost done — fill in your contact info and we'll send a formal proposal.</p>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-ink/45">Full Name *</label>
              <input value={data.name} onChange={e => set("name", e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-sky-400" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-ink/45">Company *</label>
              <input value={data.company} onChange={e => set("company", e.target.value)}
                placeholder="Company or organisation"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-sky-400" />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-ink/45">Email *</label>
              <input type="email" value={data.email} onChange={e => set("email", e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-sky-400" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-ink/45">Phone *</label>
              <input value={data.phone} onChange={e => set("phone", e.target.value)}
                placeholder="+91 00000 00000"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-sky-400" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-ink/45">Special Requests / Notes</label>
            <textarea value={data.notes} onChange={e => set("notes", e.target.value)}
              rows={4} placeholder="Any specific requirements, themes, dietary needs, security protocols..."
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-sky-400 resize-none" />
          </div>
          <button onClick={onSubmit} className="btn-primary w-full justify-center mt-2">
            Submit Proposal Request <FaArrowRight />
          </button>
        </div>

        {/* Summary card */}
        <div className="h-fit rounded-2xl border border-line bg-white p-6 shadow-card">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-sky-600">Proposal Summary</p>
          <div className="grid gap-3 text-sm">
            {data.venue && (
              <div className="flex justify-between">
                <span className="text-ink/50">Venue</span>
                <span className="font-semibold text-ink text-right max-w-[140px]">{data.venue.name}</span>
              </div>
            )}
            {data.eventType && (
              <div className="flex justify-between">
                <span className="text-ink/50">Event Type</span>
                <span className="font-semibold text-ink">{data.eventType}</span>
              </div>
            )}
            {data.date && (
              <div className="flex justify-between">
                <span className="text-ink/50">Date</span>
                <span className="font-semibold text-ink">{new Date(data.date).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-ink/50">Delegates</span>
              <span className="font-semibold text-ink">{data.delegates}</span>
            </div>
            {data.duration && (
              <div className="flex justify-between">
                <span className="text-ink/50">Duration</span>
                <span className="font-semibold text-ink">{data.duration}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-ink/50">Tier</span>
              <span className="font-semibold text-ink">
                {TIERS.find(t => t.id === data.tier)?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────
export default function ProposalWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    venue: null,
    eventType: "",
    date: "",
    delegates: 150,
    duration: "",
    tier: "standard",
    addons: [],
    name: "", company: "", email: "", phone: "", notes: ""
  });

  const setField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const validate = () => {
    if (step === 1 && !form.eventType) { showToast("Please select an event type.", "error"); return false; }
    if (step === 1 && !form.date) { showToast("Please pick a preferred date.", "error"); return false; }
    if (step === 3) {
      if (!form.name.trim()) { showToast("Name is required.", "error"); return false; }
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) { showToast("Valid email is required.", "error"); return false; }
      if (!form.phone.trim()) { showToast("Phone number is required.", "error"); return false; }
    }
    return true;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const submit = () => {
    if (!validate()) return;
    const tier = TIERS.find(t => t.id === form.tier);
    const enquiry = {
      id: "proposal_" + Date.now(),
      type: "Contact Inquiry",
      name: form.name,
      email: form.email,
      phone: form.phone,
      venueName: form.venue ? form.venue.name : "No Preference (PMH to Recommend)",
      eventType: `${form.eventType} · ${form.delegates} delegates · ${form.duration}`,
      message:
        `Event Date: ${form.date ? new Date(form.date).toLocaleDateString("en-IN") : "TBD"}\n` +
        `Hospitality Tier: ${tier?.name}\n` +
        `Add-ons: ${form.addons.length ? form.addons.join(", ") : "None"}\n` +
        `Company: ${form.company}\n` +
        `Notes: ${form.notes || "None"}`,
      date: new Date().toLocaleDateString()
    };
    const existing = JSON.parse(localStorage.getItem("pmh_enquiries") || "[]");
    localStorage.setItem("pmh_enquiries", JSON.stringify([enquiry, ...existing]));
    showToast("Proposal submitted! We'll be in touch shortly.");
    setTimeout(() => navigate("/"), 1800);
  };

  return (
    <div className="min-h-screen bg-paper pt-24 pb-16">
      <div className="container-pad max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="eyebrow mb-3 justify-center">Plan My Hospitality</p>
          <h1 className="font-display text-4xl font-semibold text-ink">Request a Proposal</h1>
          <p className="mt-3 text-ink/50">Complete the steps below and we'll send you a tailored event proposal.</p>
        </div>

        {/* Step indicator */}
        <div className="mb-10 flex items-center justify-center gap-0">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold transition-all ${
                  i < step ? "bg-sky-600 text-white" :
                  i === step ? "bg-sky-600 text-white shadow-glow" :
                  "bg-mist text-ink/40"
                }`}>
                  {i < step ? <FaCheck className="text-xs" /> : i + 1}
                </div>
                <span className={`mt-1.5 hidden text-[10px] font-bold uppercase tracking-widest sm:block ${
                  i === step ? "text-sky-600" : "text-ink/35"
                }`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 mb-5 h-[2px] w-12 sm:w-20 transition-all ${i < step ? "bg-sky-500" : "bg-line"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="card p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
            >
              {step === 0 && <StepVenue data={form} set={setField} />}
              {step === 1 && <StepEventDetails data={form} set={setField} />}
              {step === 2 && <StepPackage data={form} set={setField} />}
              {step === 3 && <StepDetails data={form} set={setField} onSubmit={submit} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav buttons */}
        <div className="mt-6 flex justify-between">
          {step > 0 ? (
            <button onClick={back} className="btn-light flex items-center gap-2">
              <FaArrowLeft /> Back
            </button>
          ) : <div />}
          {step < STEPS.length - 1 && (
            <button onClick={next} className="btn-primary flex items-center gap-2">
              Continue <FaArrowRight />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
