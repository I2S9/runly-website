"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/translations";

/** Bleu uni (identique au CTA footer, pas d’overlay sombre) */
const TRACK = "#4EA6F5";

/** Padding horizontal pour le curseur (% du rail selon locale : p-1.5 ou p-2). */
const TRACK_PAD_FR = { x: 16, insetClass: "top-2 bottom-2 left-2" };
const TRACK_PAD_EN = { x: 12, insetClass: "top-1.5 bottom-1.5 left-1.5" };

type Segment = "club" | "influencer";

function pathLooksLikeInfluencer(pathname: string) {
  return pathname === "/influencer" || pathname.startsWith("/influencer/");
}

function pathLooksLikeClub(pathname: string) {
  return pathname === "/running-club" || pathname.startsWith("/running-club/");
}

function segmentFromPath(pathname: string): Segment {
  if (pathLooksLikeInfluencer(pathname) && !pathLooksLikeClub(pathname)) return "influencer";
  return "club";
}

export function FooterAudienceSegment({
  locale,
  ariaLabel,
  labelClub,
  labelInfluencer,
}: {
  locale: Locale;
  ariaLabel: string;
  labelClub: string;
  labelInfluencer: string;
}) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const [visual, setVisual] = useState<Segment>(() => segmentFromPath(pathname));

  useEffect(() => {
    setVisual(segmentFromPath(pathname));
  }, [pathname]);

  useEffect(() => {
    router.prefetch("/running-club");
    router.prefetch("/influencer");
  }, [router]);

  const clubIsPage = pathLooksLikeClub(pathname);
  const influencerIsPage = pathLooksLikeInfluencer(pathname) && !pathLooksLikeClub(pathname);

  const handleClub = () => {
    if (visual !== "club") {
      setVisual("club");
      return;
    }
    router.push("/running-club");
  };

  const handleInfluencer = () => {
    if (visual !== "influencer") {
      setVisual("influencer");
      return;
    }
    router.push("/influencer");
  };

  const influencerThumbRight = visual === "influencer";

  const buttonBase =
    locale === "fr"
      ? "relative z-10 flex min-h-[3.25rem] min-w-0 cursor-pointer touch-manipulation items-center justify-center rounded-full border-0 px-2.5 py-4 text-center text-[10px] font-semibold leading-none tracking-tight whitespace-nowrap transition-colors duration-200 sm:min-h-[3.75rem] sm:px-4 sm:py-[1.15rem] sm:text-xs md:px-4 md:text-sm lg:text-base"
      : "relative z-10 flex min-h-12 min-w-0 cursor-pointer touch-manipulation items-center justify-center rounded-full border-0 px-1.5 py-3.5 text-center text-[10px] font-semibold leading-none tracking-tight whitespace-nowrap transition-colors duration-200 sm:min-h-14 sm:px-2.5 sm:py-4 sm:text-xs md:px-3 md:text-sm lg:text-base";

  const clubClass =
    `${buttonBase} ` + (visual === "club" ? "text-zinc-900" : "text-white hover:text-white");
  const influencerClass =
    `${buttonBase} ` + (visual === "influencer" ? "text-zinc-900" : "text-white hover:text-white");

  const trackMaxClass =
    locale === "fr"
      ? "max-w-[min(calc(100vw-2rem),26.5rem)] sm:max-w-[28rem]"
      : "max-w-[min(calc(100vw-2rem),22rem)] sm:max-w-[24rem]";

  const trackPadClass = locale === "fr" ? "p-2" : "p-1.5";
  const pad = locale === "fr" ? TRACK_PAD_FR : TRACK_PAD_EN;

  return (
    <div className="flex justify-center" role="group" aria-label={ariaLabel}>
      <div
        className={`relative isolate inline-grid w-max grid-cols-2 rounded-full ${trackPadClass} ${trackMaxClass}`}
        style={{ backgroundColor: TRACK, gap: 0 }}
      >
        <button
          type="button"
          className={clubClass}
          aria-pressed={visual === "club"}
          aria-current={clubIsPage ? "page" : undefined}
          onClick={handleClub}
        >
          {labelClub}
        </button>
        <button
          type="button"
          className={influencerClass}
          aria-pressed={visual === "influencer"}
          aria-current={influencerIsPage ? "page" : undefined}
          onClick={handleInfluencer}
        >
          {labelInfluencer}
        </button>
        <div
          aria-hidden
          className={`pointer-events-none absolute z-0 rounded-full bg-white shadow-md transition-transform duration-300 ease-out ${pad.insetClass}`}
          style={{
            width: `calc((100% - ${pad.x}px) / 2)`,
            transform: influencerThumbRight ? "translateX(100%)" : "translateX(0)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
