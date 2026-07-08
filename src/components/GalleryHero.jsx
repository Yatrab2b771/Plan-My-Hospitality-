import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, ArrowUpRight, List } from "@phosphor-icons/react";
import logo from "../assets/logo.svg";
import { galleryImages } from "../data/siteData.js";

const SLIDE_DURATION = 5000;
const slides = galleryImages.slice(0, 5);

export default function GalleryHero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [index, playing]);

  const active = slides[index];

  return (
    <section className="relative h-[560px] w-full overflow-hidden bg-ink md:h-[640px]">
      <AnimatePresence mode="sync">
        <motion.img
          key={active.image}
          src={active.image}
          alt={active.title}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/40" />

      <div className="container-pad relative flex h-full flex-col justify-between py-10">
        <div className="flex items-center justify-between">
          <img src={logo} alt="Plan My Hospitality" className="h-10 w-10" />
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur">
            <List weight="bold" />
          </span>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-sky-300">
              {active.category}
            </p>
            <AnimatePresence mode="wait">
              <motion.h1
                key={active.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl font-display text-4xl font-semibold leading-[1.1] text-white md:text-6xl"
              >
                {active.title}
              </motion.h1>
            </AnimatePresence>
          </div>

          <a
            href="#archive"
            className="flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white md:self-end"
          >
            View full archive
            <ArrowUpRight weight="bold" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink shadow-lg"
          >
            {playing ? <Pause weight="fill" /> : <Play weight="fill" />}
          </button>

          <div className="flex flex-1 gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setIndex(i)}
                className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"
                aria-label={`Go to ${slide.title}`}
              >
                <motion.span
                  key={`${slide.title}-${index}`}
                  className="block h-full bg-white"
                  initial={{ width: i < index ? "100%" : "0%" }}
                  animate={{ width: i <= index ? "100%" : "0%" }}
                  transition={{
                    duration: i === index && playing ? SLIDE_DURATION / 1000 : 0,
                    ease: "linear",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
