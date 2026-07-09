import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

/**
 * OverlapHero — full-width banner image with a white card overlapping
 * the corner. Card size/position is adjustable per page.
 *
 * size: "sm" | "md" | "lg" | "full"  (controls card width, padding & layout)
 * align: "bottom" (default) | "top"  (controls whether the card sits at the
 *        bottom-left or top-left of the image)
 * cta: optional { label, onClick } — renders a pill button with a circular
 *      arrow icon inside the card, underneath the title/text.
 */
export default function OverlapHero({
  icon: Icon,
  title,
  text,
  image,
  size = "md",
  imageHeight = "h-[420px] md:h-[520px]",
  align = "bottom",
  cta,
  transparent = false,
}) {
  const sizes = {
    sm: {
      card: "max-w-xs p-5 sm:p-6",
      rounded: "rounded-2xl",
      iconBox: "h-9 w-9 text-base",
      titleClass: "text-2xl sm:text-3xl",
      textClass: "text-xs mt-1.5",
      pos: "bottom-5 left-5 sm:bottom-7 sm:left-7",
      posTop: "top-5 left-5 sm:top-7 sm:left-7",
    },
    md: {
      card: "max-w-sm p-6 sm:p-8",
      rounded: "rounded-2xl",
      iconBox: "h-11 w-11 text-xl",
      titleClass: "text-3xl sm:text-4xl",
      textClass: "text-sm mt-2",
      pos: "bottom-6 left-6 sm:bottom-10 sm:left-10",
      posTop: "top-6 left-6 sm:top-10 sm:left-10",
    },
    lg: {
      card: "max-w-md p-7 sm:p-10",
      rounded: "rounded-2xl",
      iconBox: "h-12 w-12 text-2xl",
      titleClass: "text-4xl sm:text-5xl",
      textClass: "text-base mt-3",
      pos: "bottom-6 left-6 sm:bottom-12 sm:left-12",
      posTop: "top-6 left-6 sm:top-12 sm:left-12",
    },
    full: {
      card: "inset-x-0 bottom-0 p-6 sm:p-8 md:px-12 md:py-8",
      rounded: "rounded-b-3xl",
      iconBox: "h-12 w-12 text-xl shrink-0",
      titleClass: "text-2xl sm:text-3xl",
      textClass: "text-sm sm:text-base",
      pos: "",
      posTop: "",
      split: true,
    },
  };

  const s = sizes[size] || sizes.md;
  const position = align === "top" ? s.posTop : s.pos;

  return (
    <section className="pt-28 pb-4">
      <div className="container-pad">
        <div className="relative">
          <div className={`w-full overflow-hidden rounded-3xl ${imageHeight}`}>
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </div>

          {transparent ? (
            <>
              <div className={`pointer-events-none absolute inset-y-0 left-0 w-full sm:w-2/3 rounded-l-3xl bg-gradient-to-r from-black/70 via-black/40 to-transparent`} />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-y-0 left-0 flex w-full max-w-md flex-col justify-center px-7 py-10 sm:px-10`}
              >
                {Icon && (
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-2xl text-white backdrop-blur">
                    <Icon />
                  </div>
                )}
                <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">{title}</h1>
                {text && <p className="mt-3 text-base font-medium text-white/80">{text}</p>}

                {cta && (
                  <button
                    type="button"
                    onClick={cta.onClick}
                    className="mt-6 inline-flex w-fit items-center gap-3 rounded-full border border-line bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold text-ink transition hover:border-sky-300"
                  >
                    {cta.label}
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky-600 text-white">
                      <FaArrowRight className="text-xs" />
                    </span>
                  </button>
                )}
              </motion.div>
            </>
          ) : s.split ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute bg-white shadow-2xl ${s.rounded} ${s.card} ${position} flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8`}
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
              className={`absolute bg-white shadow-2xl ${s.rounded} ${s.card} ${position}`}
            >
              {Icon && (
                <div className={`mb-4 grid place-items-center rounded-xl bg-sky-50 text-sky-600 ${s.iconBox}`}>
                  <Icon />
                </div>
              )}
              <h1 className={`font-display font-bold text-ink ${s.titleClass}`}>{title}</h1>
              {text && <p className={`font-medium text-ink/55 ${s.textClass} mt-2`}>{text}</p>}

              {cta && (
                <button
                  type="button"
                  onClick={cta.onClick}
                  className="mt-6 inline-flex items-center gap-3 rounded-full border border-line bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold text-ink transition hover:border-sky-300"
                >
                  {cta.label}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky-600 text-white">
                    <FaArrowRight className="text-xs" />
                  </span>
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}