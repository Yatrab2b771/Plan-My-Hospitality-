import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/logo.svg";

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === "login") {
      const result = login(form.email, form.password);
      if (result.success) {
        navigate(result.role === "admin" ? "/admin" : "/account");
      } else {
        setError(result.message);
      }
    } else {
      if (!form.name.trim()) return setError("Name is required.");
      const result = register(form.name, form.email, form.password);
      if (result.success) {
        navigate("/account");
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <img src={logo} alt="PMH crest" className="mx-auto h-16 w-16" />
          <h1 className="mt-4 font-display text-3xl font-semibold text-ink">Plan My Hospitality</h1>
          <p className="mt-1 text-sm text-ink/50">Private Limited</p>
        </div>

        {/* Card */}
        <div className="card p-8">
          {/* Tabs */}
          <div className="mb-7 flex rounded-xl bg-mist p-1">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 rounded-lg py-2.5 text-sm font-bold capitalize transition ${
                  tab === t ? "bg-white text-sky-700 shadow-card" : "text-ink/50"
                }`}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            {tab === "register" && (
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-ink/50">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-sky-400"
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-ink/50">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-ink/50">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-sky-400"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700">{error}</p>
            )}

            <button type="submit" className="btn-primary mt-2 w-full justify-center">
              {tab === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {tab === "login" && (
            <p className="mt-5 text-center text-xs text-ink/40">
              Admin? Use your admin credentials to access the dashboard.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}