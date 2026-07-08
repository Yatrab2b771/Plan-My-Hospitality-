import { Check } from "@phosphor-icons/react";
import AboutHero from "../components/AboutHero.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function About() {
  const values = ["Strict SLA Compliance", "Vendor Accountability", "Premium Hospitality", "Global Protocol Standards", "Real-time Command Centers", "Audit-Ready Budgeting"];

  return (
    <>
      <AboutHero title="About PMH" text="We are a corporate hospitality and strategic event agency serving global enterprises, providing seamless planning and high-security delegate coordination." image="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=85" />
      <section className="section-band">
        <div className="container-pad grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionTitle align="left" eyebrow="Our Methodology" title="Unmatched protocol at the front, solid security and planning behind." text="Every project is managed through rigorous milestones, venue intelligence audits, VIP guest logistics, international standard catering, and on-site operation centers." />
            <div className="grid gap-3 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value} className="flex items-center gap-3 card p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-50 text-sky-600"><Check weight="bold" /></span>
                  <span className="font-semibold text-ink/75">{value}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <img className="aspect-[4/5] rounded-2xl object-cover shadow-soft" src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=85" alt="Corporate event audience" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
