import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutHero({ title, text, image }) {
  function scrollToNext() {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
      <img
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-white/15 backdrop-blur-sm" />

      <div className="container-pad relative">
        <motion.div
          className="grid overflow-hidden rounded-3xl border border-line shadow-2xl lg:grid-cols-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {/* left: text panel */}
          <div className="flex flex-col justify-center bg-white p-8 sm:p-12 lg:p-14">
            <span className="mb-5 inline-block w-fit rounded-full border border-line bg-sky-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700">
              About PMH
            </span>

            <h1 className="font-display text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              {title}
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-ink/60">
              {text}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/quote-builder"
                className="rounded-full bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:bg-sky-700"
              >
                Request Proposal
              </Link>
              <button
                type="button"
                onClick={scrollToNext}
                className="rounded-full border border-line px-6 py-3 text-sm font-bold text-ink/75 transition hover:border-sky-300 hover:text-sky-600"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* right: photo */}
          <div className="relative min-h-[280px] lg:min-h-[420px]">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
