import { PiBuildings } from "react-icons/pi";

export default function PageHeader({ title, text, image }) {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="container-pad grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Plan My Hospitality</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-ink md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-ink/65 md:text-lg">
            {text}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <img
              className="h-[300px] w-full object-cover md:h-[380px]"
              src={image}
              alt=""
            />
          </div>

          <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl sm:flex">
            <PiBuildings className="h-4 w-4 text-sky-600" />
            <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">
              Corporate Trusted
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
