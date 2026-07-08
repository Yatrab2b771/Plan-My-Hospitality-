import { motion } from "framer-motion";
import { FaArrowRight, FaScrewdriverWrench } from "react-icons/fa6";

const CARDS = [
  {
    label: "Corporate summits",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Executive retreats",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Venue sourcing",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "VIP logistics",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Celebrations & galas",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
  },
];

export default function ServicesHero() {
  function scrollToServices() {
    document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="relative overflow-hidden bg-white pb-14 pt-32 md:pb-20 md:pt-40">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="container-pad relative">
        {/* eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-bold text-ink/70 shadow-sm"
        >
          <FaScrewdriverWrench className="text-sky-600" /> Our services
        </motion.span>

        {/* heading row */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display text-4xl italic leading-[1.15] text-ink sm:text-5xl md:text-6xl"
          >
            What we can do
            <br />
            for you
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:pb-2"
          >
            <p className="max-w-md text-base leading-7 text-ink/60">
              From planning to execution, we provide end-to-end hospitality solutions tailored to your organization's needs.
            </p>
            <button
              type="button"
              onClick={scrollToServices}
              className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-ink/85"
            >
              See our services
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                <FaArrowRight size={11} />
              </span>
            </button>
          </motion.div>
        </div>

        {/* photo row */}
        <div id="services-grid" className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-16 md:grid-cols-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
              className="group relative h-56 overflow-hidden rounded-2xl shadow-lg sm:h-64 md:h-72"
            >
              <img
                src={card.image}
                alt={card.label}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

              <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink transition group-hover:bg-white">
                <FaArrowRight size={12} className="-rotate-45" />
              </span>

              <p className="absolute bottom-4 left-4 right-4 text-sm font-bold leading-snug text-white">
                {card.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
