import { useMemo, useState } from "react";
import ServicesHero from "../components/ServicesHero.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { services } from "../data/siteData.js";

const tabs = ["All", "Corporate", "Retreats", "Venues", "Logistics", "Celebrations"];

export default function Services() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => active === "All" ? services : services.filter((service) => service.category === active), [active]);

  return (
    <>
      <ServicesHero />
      <section className="section-band">
        <div className="container-pad">
          <SectionTitle eyebrow="Capabilities" title="High-end service models built for global organizations." />
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <button key={tab} type="button" onClick={() => setActive(tab)} className={`rounded-full border px-5 py-2.5 text-sm font-bold transition ${active === tab ? "border-sky-600 bg-sky-600 text-white shadow-glow" : "border-line bg-white text-ink/60 hover:border-sky-300"}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.04}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
