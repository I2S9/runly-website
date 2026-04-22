"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

type HangoutCard = {
  title: string;
  place: string;
  flag: string;
  participants: string;
  placeholderClass: string;
  avatarTints: [string, string, string, string];
};

const HANGOUTS: HangoutCard[] = [
  {
    title: "Marathon du saucisson",
    place: "Chambéry, France",
    flag: "🇫🇷",
    participants: "86+",
    placeholderClass:
      "bg-gradient-to-br from-amber-900/90 via-stone-800 to-zinc-900",
    avatarTints: ["bg-rose-300", "bg-amber-200", "bg-cyan-200", "bg-lime-200"],
  },
  {
    title: "Courir pour oublier son ex",
    place: "Paris, France",
    flag: "🇫🇷",
    participants: "120+",
    placeholderClass:
      "bg-gradient-to-br from-violet-900/80 via-zinc-800 to-slate-950",
    avatarTints: ["bg-orange-200", "bg-sky-300", "bg-fuchsia-200", "bg-white"],
  },
  {
    title: "Jogging du lendemain de cuite",
    place: "Lille, France",
    flag: "🇫🇷",
    participants: "34+",
    placeholderClass:
      "bg-gradient-to-br from-lime-900/70 via-stone-800 to-neutral-900",
    avatarTints: ["bg-yellow-200", "bg-pink-300", "bg-emerald-200", "bg-zinc-200"],
  },
  {
    title: "Sprint vers la boulangerie",
    place: "Toulouse, France",
    flag: "🇫🇷",
    participants: "210+",
    placeholderClass:
      "bg-gradient-to-br from-orange-900/85 via-amber-950/80 to-zinc-950",
    avatarTints: ["bg-red-200", "bg-amber-100", "bg-stone-300", "bg-violet-200"],
  },
  {
    title: "Les mollets maudits d’aprem",
    place: "Rennes, France",
    flag: "🇫🇷",
    participants: "52+",
    placeholderClass:
      "bg-gradient-to-br from-teal-900/80 via-slate-800 to-zinc-900",
    avatarTints: ["bg-amber-100", "bg-rose-200", "bg-indigo-200", "bg-lime-100"],
  },
  {
    title: "La fuite des escargots (5 km de sieste)",
    place: "Lausanne, Suisse",
    flag: "🇨🇭",
    participants: "18+",
    placeholderClass:
      "bg-gradient-to-br from-emerald-900/75 via-slate-800 to-neutral-950",
    avatarTints: ["bg-stone-200", "bg-blue-200", "bg-green-200", "bg-amber-200"],
  },
];

const LOOP = [...HANGOUTS, ...HANGOUTS];

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

function HangoutCardItem({
  item,
  ariaHidden = false,
}: {
  item: HangoutCard;
  ariaHidden?: boolean;
}) {
  return (
    <article
      className="relative w-[min(15rem,70vw)] shrink-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/10 sm:w-[16.25rem] md:w-[17rem]"
      style={{ aspectRatio: "5 / 6" }}
      aria-hidden={ariaHidden}
    >
      <div
        className={`absolute inset-0 ${item.placeholderClass}`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-1.5 p-3 sm:p-3.5">
        <div className="min-w-0 pr-0.5">
          <h3 className="text-balance text-base font-bold leading-snug text-white sm:text-lg">
            {item.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-white/90 sm:text-sm">
            <span
              className="inline-flex items-center justify-center rounded bg-white/15 px-1 py-0.5 text-sm leading-none"
              aria-hidden
            >
              {item.flag}
            </span>
            <span className="truncate text-white/90">{item.place}</span>
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <AvatarStack tints={item.avatarTints} />
          <span className="rounded-full border border-white/20 bg-white/15 px-2 py-0.5 text-[0.7rem] font-semibold text-white shadow-sm backdrop-blur-sm sm:text-xs">
            {item.participants}
          </span>
        </div>
      </div>
    </article>
  );
}

export function HangoutsCarouselSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dx, setDx] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      if (track.children.length < HANGOUTS.length + 1) return;
      const a = track.children[0] as HTMLElement;
      const b = track.children[HANGOUTS.length] as HTMLElement;
      setDx(b.getBoundingClientRect().left - a.getBoundingClientRect().left);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      className="w-full border-b border-zinc-100 bg-zinc-50/80 py-12 sm:py-16 lg:py-20"
      aria-labelledby="hangouts-heading"
    >
      <div className="mx-auto w-full max-w-[71rem] px-3 text-center sm:px-5 lg:px-8">
        <h2
          id="hangouts-heading"
          className="text-balance text-2xl font-bold lowercase tracking-tight text-zinc-900 sm:text-3xl md:text-4xl"
        >
          des sessions de running à rejoindre tout de suite
        </h2>
      </div>
      <div
        className="mt-8 sm:mt-10"
        role="region"
        aria-label="Défilement de sessions de running"
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
            {LOOP.map((item, i) => (
              <HangoutCardItem
                key={`${item.title}-${i}`}
                item={item}
                ariaHidden={i >= HANGOUTS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
