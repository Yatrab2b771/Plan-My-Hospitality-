import Reveal from "./Reveal.jsx";
import { stats } from "../data/siteData.js";

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-12">
      <Reveal className="container-pad card p-6 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-line bg-paper px-5 py-6 text-center">
              <p className="font-display text-3xl font-semibold text-sky-600 md:text-4xl">{item.value}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-ink/50">{item.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
