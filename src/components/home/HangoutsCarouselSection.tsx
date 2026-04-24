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

const AVATARS = [
  "/images/avatars/women-1.png",
  "/images/avatars/men-1.png",
  "/images/avatars/women-2.png",
  "/images/avatars/men-2.png",
  "/images/avatars/women-3.png",
];

/** 4 avatars par carte, ordre décalé à chaque carte pour varier */
const AVATAR_SETS: [string, string, string, string][] = Array.from(
  { length: 13 },
  (_, i) => [
    AVATARS[(i + 0) % AVATARS.length],
    AVATARS[(i + 1) % AVATARS.length],
    AVATARS[(i + 2) % AVATARS.length],
    AVATARS[(i + 3) % AVATARS.length],
  ] as [string, string, string, string]
);

function AvatarStack({ srcs }: { srcs: [string, string, string, string] }) {
  return (
    <div className="flex items-center" role="presentation">
      {srcs.map((src, i) => (
        <div
          key={i}
          className={[
            "relative size-5 overflow-hidden rounded-full border-2 border-white/90 shadow-sm sm:size-6",
            i > 0 ? "-ml-2" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ zIndex: i * 10 }}
        >
          <Image src={src} alt="" fill className="object-cover" sizes="24px" />
        </div>
      ))}
    </div>
  );
}

type Card = Translations["carousel"]["cards"][number];

function HangoutCardItem({
  card,
  placeholderClass,
  avatarSrcs,
  imageSrc,
  ariaHidden = false,
}: {
  card: Card;
  placeholderClass: string;
  avatarSrcs: [string, string, string, string];
  imageSrc?: string;
  ariaHidden?: boolean;
}) {
  return (
    <article
      className="group relative isolate w-[min(15rem,70vw)] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 shadow-md ring-1 ring-black/10 sm:w-[16.25rem] md:w-[17rem]"
      style={{ aspectRatio: "1 / 1" }}
      aria-hidden={ariaHidden}
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 70vw, 272px"
          />
        ) : (
          <div
            className={`h-full w-full ${placeholderClass} transition-transform duration-500 ease-out group-hover:scale-110`}
          />
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-1.5 p-3 sm:p-3.5">
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
          <AvatarStack srcs={avatarSrcs} />
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
                avatarSrcs={AVATAR_SETS[i % AVATAR_SETS.length]}
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
