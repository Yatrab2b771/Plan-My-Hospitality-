import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaImages, FaStar, FaBuilding, FaEarthAmericas } from "react-icons/fa6";
import { stats } from "../data/siteData.js";

const mainImage =
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85";
const secondaryImage =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=85";

export default function Hero() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/request-proposal${email ? `?email=${encodeURIComponent(email)}` : ""}`);
  }

  return (
    <section className="relative overflow-hidden bg-cream pb-20 pt-14 lg:pb-28 lg:pt-20">
      {/* decorative gradient blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-sky-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-[-140px] h-[460px] w-[460px] rounded-full bg-sky-300/40 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-10 h-40 w-40 rounded-full bg-slate-200/50 blur-2xl" />

      <div className="container-pad relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* left: content */}
        <div>
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Corporate Hospitality & Events
          </motion.p>

          <motion.h1
            className="max-w-xl text-balance font-display text-5xl font-semibold leading-[1.05] text-ink md:text-6xl lg:text-[4.2rem]"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            Elite Venues, <span className="text-sky-600">Seamless</span> Corporate Protocol
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-base leading-8 text-ink/60 md:text-lg"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
          >
            Curated destination spaces, executive logistics, delegate hosting, and premium dinner experiences managed with absolute precision.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="mt-9 flex max-w-md items-center gap-2 rounded-full border border-line bg-white p-1.5 pl-5 shadow-soft"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
            />
            <button type="submit" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky-600 text-white transition hover:bg-sky-700">
              <FaArrowRight />
            </button>
          </motion.form>

          <motion.div
            className="mt-4 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-sky-600">
              <FaImages /> View Projects
            </Link>
            <span className="h-4 w-px bg-line" />
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/70">
              <FaStar className="text-sky-500" /> {stats[1].value} Fortune 500 clients trust PMH
            </span>
          </motion.div>
        </div>

        {/* right: floating photo collage */}
        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[480px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-sky-400 to-sky-700 opacity-90" />

          <img
            src={mainImage}
            alt="Corporate event ballroom setup"
            className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)] rounded-[2rem] object-cover shadow-soft"
          />

          <motion.img
            src={secondaryImage}
            alt="Executive corporate meeting"
            className="absolute -bottom-6 -left-8 h-40 w-52 rounded-2xl border-4 border-white object-cover shadow-glow sm:h-48 sm:w-64"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute -top-6 -right-2 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-glow sm:-right-8"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky-50 text-sky-600">
              <FaBuilding />
            </span>
            <div>
              <p className="font-display text-lg font-semibold leading-none text-ink">{stats[0].value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/50">{stats[0].label}</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 right-[-10px] flex items-center gap-3 rounded-2xl bg-white p-4 shadow-glow sm:right-[-28px]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky-50 text-sky-600">
              <FaEarthAmericas />
            </span>
            <div>
              <p className="font-display text-lg font-semibold leading-none text-ink">{stats[2].value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/50">{stats[2].label}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
