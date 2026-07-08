import { motion } from "framer-motion";

export default function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <motion.article
      className="group h-full overflow-hidden card transition hover:border-sky-200 hover:shadow-soft"
      whileHover={{ y: -6 }}
    >
      <div className="relative h-40">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </div>

        <div className="absolute -bottom-6 left-5 grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl text-sky-600 shadow-soft ring-4 ring-white transition group-hover:bg-sky-600 group-hover:text-white">
          <Icon />
        </div>
      </div>

      <div className="p-6 pt-10">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.22em] text-ink/35">{service.category}</p>
        <h3 className="font-display text-xl font-semibold text-ink">{service.title}</h3>
        <p className="mt-3 leading-7 text-ink/60">{service.text}</p>
      </div>
    </motion.article>
  );
}
