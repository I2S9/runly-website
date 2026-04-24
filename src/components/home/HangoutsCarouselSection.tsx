"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import type { Translations } from "@/i18n/translations";

const PLACEHOLDER_CLASSES = [
  "bg-gradient-to-br from-amber-900/90 via-stone-800 to-zinc-900",
  "bg-gradient-to-br from-violet-900/80 via-zinc-800 to-slate-950",
  "bg-gradient-to-br from-lime-900/70 via-stone-800 to-neutral-900",
  "bg-gradient-to-br from-orange-900/85 via-amber-950/80 to-zinc-950",
  "bg-gradient-to-br from-teal-900/80 via-slate-800 to-zinc-900",
  "bg-gradient-to-br from-emerald-900/75 via-slate-800 to-neutral-950",
  "bg-gradient-to-br from-rose-900/70 via-zinc-800 to-stone-950",
  "bg-gradient-to-br from-cyan-900/75 via-slate-800 to-zinc-950",
  "bg-gradient-to-br from-slate-800 via-indigo-900/50 to-zinc-950",
  "bg-gradient-to-br from-sky-900/70 via-neutral-800 to-slate-950",
  "bg-gradient-to-br from-amber-900/70 via-stone-800 to-neutral-950",
  "bg-gradient-to-br from-fuchsia-900/65 via-zinc-800 to-neutral-900",
  "bg-gradient-to-br from-slate-700 via-cyan-900/50 to-zinc-950",
];

const AVATAR_TINTS: [string, string, string, string][] = [
  ["bg-rose-300", "bg-amber-200", "bg-cyan-200", "bg-lime-200"],
  ["bg-orange-200", "bg-sky-300", "bg-fuchsia-200", "bg-white"],
  ["bg-yellow-200", "bg-pink-300", "bg-emerald-200", "bg-zinc-200"],
  ["bg-red-200", "bg-amber-100", "bg-stone-300", "bg-violet-200"],
  ["bg-amber-100", "bg-rose-200", "bg-indigo-200", "bg-lime-100"],
  ["bg-stone-200", "bg-blue-200", "bg-green-200", "bg-amber-200"],
  ["bg-orange-200", "bg-rose-200", "bg-violet-200", "bg-zinc-100"],
  ["bg-amber-200", "bg-sky-200", "bg-lime-200", "bg-white"],
  ["bg-fuchsia-200", "bg-cyan-200", "bg-yellow-200", "bg-slate-200"],
  ["bg-pink-200", "bg-indigo-200", "bg-emerald-200", "bg-amber-100"],
  ["bg-rose-100", "bg-blue-200", "bg-orange-200", "bg-lime-100"],
  ["bg-cyan-200", "bg-amber-200", "bg-rose-300", "bg-white"],
  ["bg-amber-200", "bg-violet-200", "bg-green-200", "bg-zinc-200"],
];

function AvatarStack({ tints }: { tints: [string, string, string, string] }) {
  return (
    <div className="flex items-center" role="presentation">
      {tints.map((c, i) => (
        <div
          key={i}
          className={[
            "relative size-5 rounded-full border-2 border-white/90 shadow-sm sm:size-6",
            c,
            i > 0 ? "-ml-2" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ zIndex: i * 10 }}
        />
      ))}
    </div>
  );
}

type Card = Translations["carousel"]["cards"][number];

function HangoutCardItem({
  card,
  placeholderClass,
  avatarTints,
  imageSrc,
  ariaHidden = false,
}: {
  card: Card;
  placeholderClass: string;
  avatarTints: [string, string, string, string];
  imageSrc?: string;
  ariaHidden?: boolean;
}) {
  return (
    <article
      className="group relative w-[min(15rem,70vw)] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 shadow-md ring-1 ring-black/10 sm:w-[16.25rem] md:w-[17rem]"
      style={{ aspectRatio: "1 / 1" }}
      aria-hidden={ariaHidden}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover will-change-transform transform-gpu transition-transform duration-500 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 70vw, 272px"
          />
        ) : (
          <div
            className={`h-full w-full will-change-transform ${placeholderClass} transform-gpu transition-transform duration-500 ease-out group-hover:scale-110`}
          />
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-1.5 p-3 sm:p-3.5">
        <div className="min-w-0 pr-0.5">
          <h3 className="text-balance text-base font-bold leading-snug text-white sm:text-lg">
            {card.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-white/90 sm:text-sm">
            <span
              className="inline-flex items-center justify-center rounded bg-white/15 px-1 py-0.5 text-sm leading-none"
              aria-hidden
            >
              {card.flag}
            </span>
            <span className="truncate text-white/90">{card.place}</span>
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <AvatarStack tints={avatarTints} />
          <span className="rounded-full border border-white/20 bg-white/15 px-2 py-0.5 text-[0.7rem] font-semibold text-white shadow-sm backdrop-blur-sm sm:text-xs">
            {card.participants}
          </span>
        </div>
      </div>
    </article>
  );
}

/** Index de la carte → image (public/images/carousel/) */
const CARD_IMAGES: Record<number, string> = {
  0: "/images/carousel/carousel-2.webp",
  1: "/images/carousel/carousel-3.png",
  2: "/images/carousel/carousel-4.jpg",
  3: "/images/carousel/carousel-5.jpg",
  4: "/images/carousel/carousel-9.jpg",  // "Les mollets maudits d'aprem"
  5: "/images/carousel/carousel-6.jpg",
  6: "/images/carousel/carousel-7.jpg",
  7: "/images/carousel/carousel-8.jpg",
  8: "/images/carousel/carousel-10.jpg", // "Les quadriceps en PLS du lundi"
  9: "/images/carousel/carousel-1.png",  // "Run du désespoir avant la pesée"
  10: "/images/carousel/carousel-11.jpg", // "Grimpe ton escalier avant le 10 km"
};

export function HangoutsCarouselSection({
  tr,
}: {
  tr: Translations["carousel"];
}) {
  const cards = tr.cards;
  const LOOP = [...cards, ...cards];

  const trackRef = useRef<HTMLDivElement>(null);
  const [dx, setDx] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      if (track.children.length < cards.length + 1) return;
      const a = track.children[0] as HTMLElement;
      const b = track.children[cards.length] as HTMLElement;
      setDx(b.getBoundingClientRect().left - a.getBoundingClientRect().left);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [cards.length]);

  return (
    <section
      className="w-full bg-white pt-12 pb-2 sm:pt-16 sm:pb-3 lg:pt-20 lg:pb-3"
      aria-labelledby="hangouts-heading"
    >
      <div className="mx-auto w-full max-w-[71rem] px-3 text-center sm:px-5 lg:px-8">
        <h2
          id="hangouts-heading"
          className="text-balance text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl"
        >
          {tr.heading}
        </h2>
      </div>
      <div
        className="mt-8 sm:mt-10"
        role="region"
        aria-label={tr.ariaLabel}
      >
        <div className="w-full overflow-hidden py-1">
          <div
            ref={trackRef}
            className={[
              "flex w-max gap-3 pl-2 sm:gap-3.5 sm:pl-3 lg:pl-4",
              dx > 0 ? "hangouts-marquee" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={
              {
                ["--hangouts-dx" as string]: dx > 0 ? `${dx}px` : "0px",
              } as CSSProperties
            }
          >
            {LOOP.map((card, i) => (
              <HangoutCardItem
                key={`${card.title}-${i}`}
                card={card}
                placeholderClass={PLACEHOLDER_CLASSES[i % PLACEHOLDER_CLASSES.length]}
                avatarTints={AVATAR_TINTS[i % AVATAR_TINTS.length]}
                imageSrc={CARD_IMAGES[i % cards.length]}
                ariaHidden={i >= cards.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
