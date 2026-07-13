import { FaArrowRight, FaCheck, FaRegStar } from "react-icons/fa6";
import Hero from "../components/Hero.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import StatsBar from "../components/StatsBar.jsx";
import TestimonialCarousel from "../components/TestimonialCarousel.jsx";
import { partners, portfolio, services } from "../data/siteData.js";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />

      <section className="section-band">
        <div className="container-pad">
          <SectionTitle eyebrow="What We Do" title="Enterprise hospitality & event management." text="A premium planning partner for high-protocol corporate conferences, summits, executive retreats, and brand launches." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, index) => (
              <Reveal key={service.title} delay={index * 0.04}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="container-pad grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <img className="aspect-[4/4.2] w-full rounded-2xl object-cover shadow-soft" src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85" alt="Elegant event table setting" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow mb-3">About PMH</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink md:text-5xl">We make complex corporate events feel gracefully simple.</h2>
            <p className="mt-5 leading-8 text-ink/60">Plan My Hospitality Private Limited delivers premium event planning, production-ready venue networks, and end-to-end delegate logistics to help global companies execute seamless events.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {["Corporate Sourcing", "VIP Protocol Bench", "Audit-Ready Reporting", "Dedicated Event Directors"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white border border-line p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-50 text-sky-600"><FaCheck /></span>
                  <span className="font-semibold text-ink/80">{item}</span>
                </div>
              ))}
            </div>
            <a href="/about.html" className="btn-primary mt-8">Explore PMH <FaArrowRight /></a>
          </Reveal>
        </div>
      </section>

      <section className="section-band">
        <div className="container-pad">
          <SectionTitle eyebrow="Portfolio" title="Recent projects with distinct prestige." text="A showcase of corporate general meetings, brand reveals, and executive conferences designed for maximum impact." />
          <div className="grid gap-6 md:grid-cols-3">
            {portfolio.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} className="h-full">
                <a href="/gallery.html" className="group flex h-full flex-col overflow-hidden card">
                  <div className="overflow-hidden">
                    <img className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" src={item.image} alt={item.title} />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-5">
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-600">{item.tag}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">{item.title}</h3>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-pad">
          <SectionTitle eyebrow="Testimonials" title="Clients remember the feeling." />
          <TestimonialCarousel />
        </div>
      </section>

      <section className="bg-sky-50/60 py-16">
        <div className="container-pad text-center">
          <FaRegStar className="mx-auto text-3xl text-sky-500" />
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-semibold text-ink md:text-5xl">Deploy your next corporate event with precision hospitality.</h2>
          <a href="/request-proposal.html" className="btn-primary mt-8">Request Proposal</a>
        </div>
      </section>

      <section className="py-12">
        <div className="logo-marquee">
          <div className="logo-track">
            {[...partners, ...partners].map((partner, index) => (
              <span
                key={`${partner}-${index}`}
                className="mx-4 flex h-16 min-w-44 items-center justify-center whitespace-nowrap rounded-2xl border border-line bg-white px-6 font-display text-xl font-semibold text-ink/45"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}