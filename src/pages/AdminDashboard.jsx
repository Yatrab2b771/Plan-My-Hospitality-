import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { showToast } from "../components/Toast.jsx";
import Reveal from "../components/Reveal.jsx";
import logo from "../assets/logo.svg";
import {
  FaTrashCan, FaInbox, FaEnvelope, FaPhone, FaCalendarDay,
  FaBuilding, FaChartLine, FaCalculator, FaRightFromBracket,
  FaUsers, FaMagnifyingGlass, FaFileArrowDown, FaFlag,
  FaEye, FaEyeSlash, FaCircleCheck, FaCircleXmark,
  FaCircleHalfStroke, FaClock, FaNoteSticky, FaXmark
} from "react-icons/fa6";

// ── Constants ────────────────────────────────────────────────────────────────
const TYPES      = ["Contact Inquiry", "Venue Sourcing", "Quote Estimate"];
const STATUSES   = ["Pending", "In Progress", "Completed", "Rejected"];
const PRIORITIES = ["Low", "Medium", "High"];

const STATUS_STYLES = {
  "Pending":     "bg-amber-50  text-amber-700  border-amber-200",
  "In Progress": "bg-blue-50   text-blue-700   border-blue-200",
  "Completed":   "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Rejected":    "bg-sky-50   text-sky-700   border-sky-200",
};

const PRIORITY_STYLES = {
  "Low":    "bg-slate-50  text-slate-500",
  "Medium": "bg-amber-50  text-amber-600",
  "High":   "bg-sky-50   text-sky-600",
};

const STATUS_ICONS = {
  "Pending":     <FaClock />,
  "In Progress": <FaCircleHalfStroke />,
  "Completed":   <FaCircleCheck />,
  "Rejected":    <FaCircleXmark />,
};

const TYPE_STYLES = {
  "Venue Sourcing":  "bg-emerald-50 text-emerald-700",
  "Quote Estimate":  "bg-amber-50   text-amber-700",
  "Contact Inquiry": "bg-sky-50    text-sky-700",
};

// ── Safe localStorage helpers ───────────────────────────────────────────────
// Never let a corrupted/malformed value in localStorage crash the page.
function safeLoadArray(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error(`Failed to load "${key}" from localStorage:`, err);
    return [];
  }
}

function safeSaveArray(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(Array.isArray(value) ? value : []));
    return true;
  } catch (err) {
    console.error(`Failed to save "${key}" to localStorage:`, err);
    showToast("Couldn't save changes. Storage may be full or unavailable.");
    return false;
  }
}

// ── CSV Export ───────────────────────────────────────────────────────────────
function exportCSV(enquiries) {
  try {
    const headers = ["ID","Type","Name","Email","Phone","Venue","Event Type","Message","Status","Priority","Date"];
    const rows = (enquiries || []).map(e => [
      e?.id ?? "", e?.type ?? "", e?.name ?? "", e?.email ?? "", e?.phone ?? "",
      e?.venueName ?? "", e?.eventType ?? "",
      `"${(e?.message || "").replace(/"/g, "'")}"`,
      e?.status || "Pending",
      e?.priority || "Medium",
      e?.date ?? ""
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `PMH_Enquiries_${new Date().toLocaleDateString("en-IN").replace(/\//g,"-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("CSV export failed:", err);
    showToast("Export failed. Please try again.");
  }
}

// ── Note Modal ───────────────────────────────────────────────────────────────
function NoteModal({ enquiry, onSave, onClose }) {
  const [note, setNote] = useState(enquiry?.adminNote || "");
  if (!enquiry) return null;
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold text-ink">Admin Note</h3>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-mist text-ink hover:bg-sky-50 hover:text-sky-600">
            <FaXmark />
          </button>
        </div>
        <p className="mb-3 text-sm text-ink/50">Enquiry from <strong>{enquiry.name || "Unknown"}</strong></p>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={5}
          maxLength={2000}
          placeholder="Add internal notes, follow-up reminders, or action items..."
          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-sky-400 resize-none"
        />
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="btn-light">Cancel</button>
          <button onClick={() => onSave(note)} className="btn-primary">Save Note</button>
        </div>
      </div>
    </div>
  );
}

// ── Users Tab ────────────────────────────────────────────────────────────────
function UsersTab({ enquiries }) {
  const consumers = safeLoadArray("pmh_consumers");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold text-ink">Registered Users</h2>
        <span className="rounded-full bg-sky-50 px-4 py-1.5 text-sm font-bold text-sky-700">
          {consumers.length} total
        </span>
      </div>

      {consumers.length > 0 ? (
        <div className="grid gap-4">
          {consumers.map((c, i) => {
            const userEnq = (enquiries || []).filter(e => e?.email && c?.email && e.email === c.email);
            return (
              <div key={c?.email || i} className="card p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-sky-50 text-sky-600 font-display text-lg font-bold">
                    {c?.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{c?.name || "Unnamed"}</h3>
                    <p className="text-sm text-ink/50">{c?.email || "No email"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-ink/60">
                    {userEnq.length} enquirie{userEnq.length !== 1 ? "s" : ""}
                  </span>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-600">
                    Consumer
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card py-20 text-center">
          <FaUsers className="mx-auto text-5xl text-sky-200 mb-4" />
          <p className="text-lg font-bold text-ink/55">No registered users yet.</p>
          <p className="text-sm text-ink/40 mt-1">Users who sign up will appear here.</p>
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [enquiries,  setEnquiries]  = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search,     setSearch]     = useState("");
  const [tab,        setTab]        = useState("enquiries"); // "enquiries" | "users"
  const [noteModal,  setNoteModal]  = useState(null);

  const { logout } = useAuth();
  const navigate   = useNavigate();

  useEffect(() => {
    const data = safeLoadArray("pmh_enquiries");
    // Ensure defaults so a partially-formed record never breaks a render
    const enriched = data
      .filter(e => e && typeof e === "object")
      .map(e => ({
        ...e,
        id:        e.id ?? crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
        name:      e.name || "Unknown",
        email:     e.email || "",
        phone:     e.phone || "",
        type:      TYPES.includes(e.type) ? e.type : "Contact Inquiry",
        status:    STATUSES.includes(e.status) ? e.status : "Pending",
        priority:  PRIORITIES.includes(e.priority) ? e.priority : "Medium",
        read:      Boolean(e.read),
        adminNote: e.adminNote || ""
      }));
    setEnquiries(enriched);
  }, []);

  const save = (updated) => {
    const safeUpdated = Array.isArray(updated) ? updated : [];
    setEnquiries(safeUpdated);
    safeSaveArray("pmh_enquiries", safeUpdated);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this enquiry? This can't be undone.")) return;
    save(enquiries.filter(e => e.id !== id));
    showToast("Enquiry deleted.");
  };

  const clearAll = () => {
    if (window.confirm("This will permanently remove ALL enquiries. Are you sure?")) {
      safeSaveArray("pmh_enquiries", []);
      setEnquiries([]);
      showToast("All enquiries cleared.");
    }
  };

  const handleLogout = () => {
    try {
      logout();
    } finally {
      navigate("/");
    }
  };

  const updateField = (id, field, value) => {
    save(enquiries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const toggleRead = (id) => {
    const enq = enquiries.find(e => e.id === id);
    if (!enq) return;
    updateField(id, "read", !enq.read);
  };

  const saveNote = (id, note) => {
    updateField(id, "adminNote", (note || "").slice(0, 2000));
    setNoteModal(null);
    showToast("Note saved.");
  };

  // Stats
  const counts = useMemo(() => {
    const today = new Date().toLocaleDateString();
    return {
      total:   enquiries.length,
      today:   enquiries.filter(e => e.date === today).length,
      venue:   enquiries.filter(e => e.type === "Venue Sourcing").length,
      quote:   enquiries.filter(e => e.type === "Quote Estimate").length,
      unread:  enquiries.filter(e => !e.read).length,
      pending: enquiries.filter(e => e.status === "Pending").length,
    };
  }, [enquiries]);

  // Filtered list
  const filtered = useMemo(() => {
    return enquiries.filter(e => {
      const matchType   = filterType === "All"   || e.type === filterType;
      const matchStatus = filterStatus === "All" || e.status === filterStatus;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        e.name?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.venueName?.toLowerCase().includes(q) ||
        e.eventType?.toLowerCase().includes(q);
      return matchType && matchStatus && matchSearch;
    });
  }, [enquiries, filterType, filterStatus, search]);

  return (
    <div className="min-h-screen bg-paper">

      {/* Header */}
      <section className="border-b border-line bg-cream pb-8 pt-28">
        <div className="container-pad flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="PMH" className="h-12 w-12" />
            <div>
              <p className="eyebrow mb-1">Internal Console</p>
              <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-ink/50">Full control over enquiries, users and proposal records.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => exportCSV(enquiries)} className="btn-light flex items-center gap-2 text-ink/70">
              <FaFileArrowDown /> Export CSV
            </button>
            {enquiries.length > 0 && (
              <button onClick={clearAll} className="btn-light flex items-center gap-2 text-sky-700 border-sky-200 hover:bg-sky-50">
                <FaTrashCan /> Clear All
              </button>
            )}
            <button onClick={handleLogout} className="btn-light flex items-center gap-2 text-ink/70 hover:text-sky-700">
              <FaRightFromBracket /> Sign Out
            </button>
          </div>
        </div>
      </section>

      <section className="section-band !pt-10">
        <div className="container-pad">

          {/* Stat cards */}
          <div className="mb-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Total",    value: counts.total,   icon: <FaChartLine />,        bg: "bg-sky-50",    text: "text-sky-600"    },
              { label: "Today",    value: counts.today,   icon: <FaCalendarDay />,       bg: "bg-amber-50",   text: "text-amber-600"   },
              { label: "Unread",   value: counts.unread,  icon: <FaEye />,              bg: "bg-blue-50",    text: "text-blue-600"    },
              { label: "Pending",  value: counts.pending, icon: <FaClock />,            bg: "bg-orange-50",  text: "text-orange-600"  },
              { label: "Venues",   value: counts.venue,   icon: <FaBuilding />,         bg: "bg-emerald-50", text: "text-emerald-700" },
              { label: "Quotes",   value: counts.quote,   icon: <FaCalculator />,       bg: "bg-sky-50",    text: "text-sky-600"    },
            ].map(s => (
              <div key={s.label} className="card p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink/45">{s.label}</p>
                  <span className={`grid h-8 w-8 place-items-center rounded-full ${s.bg} ${s.text}`}>{s.icon}</span>
                </div>
                <p className={`mt-3 font-display text-3xl font-semibold ${s.text}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Main tabs */}
          <div className="mb-8 flex gap-1 rounded-xl bg-mist p-1 w-fit">
            {[
              { key: "enquiries", label: "Enquiries", icon: <FaInbox /> },
              { key: "users",     label: "Users",     icon: <FaUsers /> },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition ${
                  tab === t.key ? "bg-white text-sky-700 shadow-card" : "text-ink/50 hover:text-ink"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {tab === "users" ? (
            <UsersTab enquiries={enquiries} />
          ) : (
            <>
              {/* Search + Filters */}
              <div className="mb-6 grid gap-4 sm:grid-cols-[1fr_auto_auto]">
                {/* Search */}
                <div className="relative">
                  <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, email, venue..."
                    className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-sky-400"
                  />
                </div>

                {/* Type filter */}
                <select
                  value={filterType}
                  onChange={e => setFilterType(e.target.value)}
                  className="rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-sky-400"
                >
                  <option value="All">All Types</option>
                  {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                {/* Status filter */}
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-sky-400"
                >
                  <option value="All">All Statuses</option>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Type pill filters */}
              <div className="mb-6 flex flex-wrap gap-2">
                {["All", ...TYPES].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                      filterType === type
                        ? "border-sky-600 bg-sky-600 text-white shadow-glow"
                        : "border-line bg-white text-ink/55 hover:border-sky-300"
                    }`}
                  >
                    {type === "All" ? `All (${enquiries.length})` : type}
                  </button>
                ))}
              </div>

              {/* Enquiry cards */}
              {filtered.length > 0 ? (
                <div className="grid gap-5">
                  {filtered.map((enq, index) => (
                    <Reveal key={enq.id} delay={index * 0.03}>
                      <div className={`relative card p-6 transition ${!enq.read ? "border-sky-200 bg-sky-50/20" : ""}`}>

                        {/* Unread dot */}
                        {!enq.read && (
                          <span className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full bg-sky-500" />
                        )}

                        {/* Top row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pl-4">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Type badge */}
                            <span className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${TYPE_STYLES[enq.type] || "bg-mist text-ink/60"}`}>
                              {enq.type}
                            </span>

                            {/* Status dropdown */}
                            <select
                              value={enq.status || "Pending"}
                              onChange={e => updateField(enq.id, "status", e.target.value)}
                              className={`rounded-full border px-3 py-1 text-xs font-bold outline-none cursor-pointer ${STATUS_STYLES[enq.status] || STATUS_STYLES["Pending"]}`}
                            >
                              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>

                            {/* Priority dropdown */}
                            <select
                              value={enq.priority || "Medium"}
                              onChange={e => updateField(enq.id, "priority", e.target.value)}
                              className={`rounded-full px-3 py-1 text-xs font-bold outline-none cursor-pointer border border-transparent ${PRIORITY_STYLES[enq.priority] || PRIORITY_STYLES["Medium"]}`}
                            >
                              {PRIORITIES.map(p => (
                                <option key={p} value={p}>⚑ {p}</option>
                              ))}
                            </select>

                            <span className="flex items-center gap-1.5 text-xs text-ink/40">
                              <FaCalendarDay /> {enq.date || "Unknown date"}
                            </span>
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleRead(enq.id)}
                              title={enq.read ? "Mark unread" : "Mark read"}
                              className="grid h-9 w-9 place-items-center rounded-full bg-mist text-ink/60 hover:bg-blue-50 hover:text-blue-600 transition"
                            >
                              {enq.read ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <button
                              onClick={() => setNoteModal(enq)}
                              title="Add note"
                              className={`grid h-9 w-9 place-items-center rounded-full transition ${
                                enq.adminNote
                                  ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                                  : "bg-mist text-ink/60 hover:bg-amber-50 hover:text-amber-600"
                              }`}
                            >
                              <FaNoteSticky />
                            </button>
                            <button
                              onClick={() => handleDelete(enq.id)}
                              title="Delete"
                              className="grid h-9 w-9 place-items-center rounded-full bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white transition"
                            >
                              <FaTrashCan />
                            </button>
                          </div>
                        </div>

                        {/* Name + contacts */}
                        <h3 className="mt-4 font-display text-2xl font-semibold text-ink pl-4">{enq.name}</h3>
                        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink/55 pl-4">
                          <span className="flex items-center gap-2"><FaEnvelope className="text-sky-500" />{enq.email}</span>
                          <span className="flex items-center gap-2"><FaPhone className="text-sky-500" />{enq.phone}</span>
                          {enq.venueName && enq.venueName !== "N/A" && (
                            <span className="flex items-center gap-2"><FaBuilding className="text-sky-500" />{enq.venueName}</span>
                          )}
                        </div>

                        {/* Message */}
                        <div className="mt-4 rounded-xl bg-paper p-4 text-sm leading-7 text-ink/70 whitespace-pre-wrap ml-4">
                          {enq.message}
                        </div>

                        {/* Admin note */}
                        {enq.adminNote && (
                          <div className="mt-3 ml-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                            <span className="font-bold">📝 Admin Note: </span>{enq.adminNote}
                          </div>
                        )}
                      </div>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="card py-20 text-center">
                  <FaInbox className="mx-auto text-5xl text-sky-200 mb-4" />
                  <p className="text-lg font-bold text-ink/55">No enquiries found.</p>
                  <p className="text-sm text-ink/40 mt-1">Try adjusting your search or filters.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Note modal */}
      {noteModal && (
        <NoteModal
          enquiry={noteModal}
          onSave={(note) => saveNote(noteModal.id, note)}
          onClose={() => setNoteModal(null)}
        />
      )}
    </div>
  );
}
