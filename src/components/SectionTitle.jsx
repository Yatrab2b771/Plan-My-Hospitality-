import Reveal from "./Reveal.jsx";

export default function SectionTitle({ eyebrow, title, text, align = "center" }) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "mx-auto mb-12 max-w-3xl text-center" : "mb-10 max-w-2xl"}>
      {eyebrow && <p className={`eyebrow mb-3 ${centered ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2 className="font-display text-3xl font-semibold leading-tight text-ink md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-8 text-ink/60 md:text-lg">{text}</p>}
    </Reveal>
  );
}
