import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import GalleryHero from "../components/GalleryHero.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { galleryImages } from "../data/siteData.js";

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <GalleryHero />
      <section id="archive" className="section-band scroll-mt-24">
        <div className="container-pad">
          <SectionTitle eyebrow="Portfolio Archive" title="Precision execution across key milestones." />
          <div className="masonry">
            {galleryImages.map((item, index) => (
              <motion.article key={item.title} className="group cursor-pointer overflow-hidden card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 3) * 0.05 }} onClick={() => setSelected(item)}>
                <img className={`w-full object-cover transition duration-500 group-hover:scale-105 ${index % 3 === 0 ? "h-80" : "h-60"}`} src={item.image} alt={item.title} />
                <div className="p-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-600">{item.category}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">{item.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-ink/55 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} onClick={(event) => event.stopPropagation()}>
              <button className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-soft" aria-label="Close lightbox" onClick={() => setSelected(null)}><X weight="bold" /></button>
              <img className="max-h-[78vh] w-full object-cover" src={selected.image} alt={selected.title} />
              <div className="p-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">{selected.category}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{selected.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
