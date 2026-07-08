import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FaUser, FaEnvelope, FaCalendarDay, FaBuilding, FaRightFromBracket, FaInbox } from "react-icons/fa6";

export default function ConsumerAccount() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const all = JSON.parse(localStorage.getItem("pmh_enquiries") || "[]");
    // Show only enquiries matching logged-in user email
    const mine = all.filter((e) => e.email === user.email);
    setEnquiries(mine);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <section className="border-b border-line bg-cream pb-10 pt-32">
        <div className="container-pad flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2">My Account</p>
            <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
              Welcome, {user.name}
            </h1>
            <p className="mt-1 text-sm text-ink/50">{user.email}</p>
          </div>
          <button onClick={handleLogout} className="btn-light w-fit flex items-center gap-2 text-sky-700 border-sky-200 hover:bg-sky-50">
            <FaRightFromBracket /> Sign Out
          </button>
        </div>
      </section>

      <section className="section-band !pt-12">
        <div className="container-pad">

          {/* Info cards */}
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <div className="card p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink/45">Name</p>
              <p className="mt-2 flex items-center gap-2 font-semibold text-ink"><FaUser className="text-sky-500" />{user.name}</p>
            </div>
            <div className="card p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink/45">Email</p>
              <p className="mt-2 flex items-center gap-2 font-semibold text-ink"><FaEnvelope className="text-sky-500" />{user.email}</p>
            </div>
            <div className="card p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink/45">Total Enquiries</p>
              <p className="mt-2 font-display text-3xl font-semibold text-sky-600">{enquiries.length}</p>
            </div>
          </div>

          {/* Enquiries */}
          <h2 className="mb-6 font-display text-2xl font-semibold text-ink">My Enquiries</h2>

          {enquiries.length > 0 ? (
            <div className="grid gap-5">
              {enquiries.map((enq) => (
                <div key={enq.id} className="card p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-sky-700">
                      {enq.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-ink/40">
                      <FaCalendarDay /> {enq.date}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">{enq.venueName}</h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-ink/55">
                    <FaBuilding className="text-sky-500" /> {enq.eventType}
                  </p>
                  <div className="mt-4 rounded-xl bg-paper p-4 text-sm leading-7 text-ink/70 whitespace-pre-wrap">
                    {enq.message}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card py-20 text-center">
              <FaInbox className="mx-auto text-5xl text-sky-200 mb-4" />
              <p className="text-lg font-bold text-ink/55">No enquiries yet.</p>
              <p className="mt-1 text-sm text-ink/40">Submit a contact, venue or quote request to see it here.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}