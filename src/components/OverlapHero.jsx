import { motion } from "framer-motion";

/**
 * OverlapHero — full-width banner image with a white card overlapping
 * the bottom-left corner. Card size/position is adjustable per page.
 *
 * size: "sm" | "md" | "lg" | "full"  (controls card width, padding & layout)
 */
export default function OverlapHero({
  icon: Icon,
  title,
  text,
  image,
  size = "md",
  imageHeight = "h-[420px] md:h-[520px]",
}) {
  const sizes = {
    sm: {
      card: "max-w-xs p-5 sm:p-6",
      rounded: "rounded-2xl",
      iconBox: "h-9 w-9 text-base",
      titleClass: "text-2xl sm:text-3xl",
      textClass: "text-xs mt-1.5",
      pos: "bottom-5 left-5 sm:bottom-7 sm:left-7",
    },
    md: {
      card: "max-w-sm p-6 sm:p-8",
      rounded: "rounded-2xl",
      iconBox: "h-11 w-11 text-xl",
      titleClass: "text-3xl sm:text-4xl",
      textClass: "text-sm mt-2",
      pos: "bottom-6 left-6 sm:bottom-10 sm:left-10",
    },
    lg: {
      card: "max-w-md p-7 sm:p-10",
      rounded: "rounded-2xl",
      iconBox: "h-12 w-12 text-2xl",
      titleClass: "text-4xl sm:text-5xl",
      textClass: "text-base mt-3",
      pos: "bottom-6 left-6 sm:bottom-12 sm:left-12",
    },
    full: {
      card: "inset-x-0 bottom-0 p-6 sm:p-8 md:px-12 md:py-8",
      rounded: "rounded-b-3xl",
      iconBox: "h-12 w-12 text-xl shrink-0",
      titleClass: "text-2xl sm:text-3xl",
      textClass: "text-sm sm:text-base",
      pos: "",
      split: true,
    },
  };

  const s = sizes[size] || sizes.md;

  return (
    <section className="pt-28 pb-4">
      <div className="container-pad">
        <div className="relative">
          <div className={`w-full overflow-hidden rounded-3xl ${imageHeight}`}>
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </div>

          {s.split ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute bg-white shadow-2xl ${s.rounded} ${s.card} ${s.pos} flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8`}
            >
              <div className="flex items-center gap-4 sm:shrink-0">
                {Icon && (
                  <div className={`grid place-items-center rounded-xl bg-sky-50 text-sky-600 ${s.iconBox}`}>
                    <Icon />
                  </div>
                )}
                <h1 className={`font-display font-bold text-ink ${s.titleClass}`}>{title}</h1>
              </div>
              {text && (
                <p className={`font-medium text-ink/55 ${s.textClass} sm:border-l sm:border-line sm:pl-8`}>
                  {text}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute bg-white shadow-2xl ${s.rounded} ${s.card} ${s.pos}`}
            >
              {Icon && (
                <div className={`mb-4 grid place-items-center rounded-xl bg-sky-50 text-sky-600 ${s.iconBox}`}>
                  <Icon />
                </div>
              )}
              <h1 className={`font-display font-bold text-ink ${s.titleClass}`}>{title}</h1>
              {text && <p className={`font-medium text-ink/55 ${s.textClass} mt-2`}>{text}</p>}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
