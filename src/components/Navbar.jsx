import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X, User } from "@phosphor-icons/react";
import logo from "../assets/logo.svg";
import { navLinks } from "../data/siteData.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
  const isLinkActive = (path) => {
    if (path === "/index.html" || path === "/") {
      return currentPath === "/" || currentPath === "/index.html" || currentPath.endsWith("/index.html") || currentPath === "";
    }
    return currentPath === path || currentPath.endsWith(path);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? "bg-cream/90 shadow-card backdrop-blur-xl" : "bg-cream/55 backdrop-blur-md"}`}
      >
        <nav className="container-pad flex h-20 items-center justify-between gap-6">
          <a
            href="/index.html"
            className="flex items-center gap-3 text-ink"
            onClick={() => setOpen(false)}
          >
            <img
              src={logo}
              alt="Plan My Hospitality crest"
              className="h-11 w-11"
            />
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold tracking-wide whitespace-nowrap">
                Plan My Hospitality
              </span>
              <span className="block text-[9px] uppercase tracking-[0.22em] text-sky-600/80">
                Private Limited
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full bg-mist p-1.5 lg:flex">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    active ? "bg-white text-sky-600 shadow-sm" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Desktop right buttons */}
          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <a
                href={user.role === "admin" ? "/admin.html" : "/account.html"}
                className="btn-secondary flex items-center gap-2 whitespace-nowrap"
              >
                <User weight="bold" />
                {user.role === "admin" ? "Dashboard" : user.name}
              </a>
            ) : (
              <a href="/login.html" className="btn-secondary whitespace-nowrap">
                Sign In
              </a>
            )}
            <a
              href="/request-proposal.html"
              className="rounded-full bg-sky-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-700 whitespace-nowrap"
            >
              Request Proposal
            </a>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <List weight="bold" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/25 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              className="ml-auto h-full w-[min(86vw,380px)] bg-cream p-6 shadow-soft"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <a
                  href="/index.html"
                  className="flex items-center gap-3 font-display text-lg font-semibold text-ink"
                  onClick={() => setOpen(false)}
                >
                  <img
                    src={logo}
                    alt="Plan My Hospitality crest"
                    className="h-9 w-9"
                  />
                  <span>Plan My Hospitality</span>
                </a>
                <button
                  className="grid h-10 w-10 place-items-center rounded-full bg-mist text-ink"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X weight="bold" />
                </button>
              </div>

              <div className="grid gap-2">
                {navLinks.map((link) => {
                  const active = isLinkActive(link.path);
                  return (
                    <a
                      key={link.path}
                      href={link.path}
                      onClick={() => setOpen(false)}
                      className={`rounded-xl px-4 py-3 text-base font-semibold ${
                        active ? "bg-sky-50 text-sky-600" : "text-ink/75 hover:bg-mist"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              {/* Mobile auth button */}
              {user ? (
                <a
                  href={user.role === "admin" ? "/admin.html" : "/account.html"}
                  onClick={() => setOpen(false)}
                  className="btn-secondary mt-4 flex w-full items-center justify-center gap-2"
                >
                  <User weight="bold" />
                  {user.role === "admin" ? "Dashboard" : user.name}
                </a>
              ) : (
                <a
                  href="/login.html"
                  onClick={() => setOpen(false)}
                  className="btn-secondary mt-4 w-full justify-center flex items-center"
                >
                  Sign In
                </a>
              )}

              <a
                href="/request-proposal.html"
                onClick={() => setOpen(false)}
                className="rounded-full bg-sky-600 mt-3 w-full justify-center flex items-center py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                Request Proposal
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
