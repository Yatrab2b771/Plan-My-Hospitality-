import { useState } from "react";
import { Quotes, Play, Star, StarHalf } from "@phosphor-icons/react";

function StarRating({ rating = 0 }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const position = i + 1;
    if (rating >= position) return <Star key={i} weight="fill" />;
    if (rating >= position - 0.5) return <StarHalf key={i} weight="fill" />;
    return <Star key={i} weight="regular" />;
  });

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5 text-sm text-amber-400" aria-hidden="true">
        {stars}
      </div>
      <span className="text-xs font-bold text-ink/50">{rating.toFixed(1)}/5</span>
    </div>
  );
}

export default function TestimonialCard({ item }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="flex h-full flex-col card p-7">
      <div className="flex items-center justify-between gap-3">
        <Quotes weight="fill" className="text-3xl text-sky-300" />
        {typeof item.rating === "number" && <StarRating rating={item.rating} />}
      </div>
      <p className="mt-5 leading-8 text-ink/65">"{item.quote}"</p>

      <div className="mt-auto flex items-center gap-4 border-t border-line pt-5">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
          {playing && item.video ? (
            <video
              src={item.video}
              className="h-full w-full object-cover"
              autoPlay
              muted
              controls
              onEnded={() => setPlaying(false)}
            />
          ) : (
            <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
          )}

          {item.video && !playing && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video testimonial from ${item.name}`}
              className="absolute inset-0 grid place-items-center bg-ink/30 text-white transition hover:bg-ink/50"
            >
              <Play weight="fill" className="text-sm" />
            </button>
          )}
        </div>

        <div>
          <h4 className="font-bold text-ink">{item.name}</h4>
          <p className="mt-1 text-sm text-ink/50">{item.role}</p>
        </div>
      </div>
    </article>
  );
}
