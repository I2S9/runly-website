"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const SLOT_COUNT = 4;
/** Délai entre le passage à l’image suivante d’une colonne et celui de la colonne suivante. */
const DEFAULT_COLUMN_STAGGER_MS = 15_000;
const CROSSFADE_MS = 340;
const CROSSFADE_EASE = "cubic-bezier(0.32, 0, 0.18, 1)";
const CROSSFADE_MS_REDUCED = 100;

/** Ratio portrait commun aux 4 cadres (même largeur de colonne → m même hauteur). */
const TILE_ASPECT = "aspect-[2/3]";

function initialSlotIndices(sourceCount: number): number[] {
  if (sourceCount <= 0) return Array.from({ length: SLOT_COUNT }, () => 0);
  if (sourceCount < SLOT_COUNT) {
    return Array.from({ length: SLOT_COUNT }, (_, s) => s % sourceCount);
  }
  return Array.from({ length: SLOT_COUNT }, (_, s) => s);
}

function uniqueFourOnScreen(prev: readonly number[], sourceCount: number): number[] {
  if (sourceCount <= 0) return Array.from({ length: SLOT_COUNT }, () => 0);
  const out = [...prev];
  const seen = new Set<number>();
  for (let i = 0; i < SLOT_COUNT; i++) {
    const v = out[i]!;
    if (v >= 0 && v < sourceCount && !seen.has(v)) {
      seen.add(v);
      continue;
    }
    let pick = -1;
    for (let c = 0; c < sourceCount; c++) {
      if (!seen.has(c)) {
        pick = c;
        break;
      }
    }
    if (pick === -1) pick = i % sourceCount;
    out[i] = pick;
    seen.add(pick);
  }
  return out;
}

function advanceSlotDistinct(
  prev: readonly number[],
  slot: number,
  sourceCount: number,
): number[] {
  const merged = [...prev];
  const usedByOthers = new Set<number>();
  for (let i = 0; i < SLOT_COUNT; i++) {
    if (i !== slot) usedByOthers.add(prev[i]!);
  }
  const cur = merged[slot]!;

  for (let step = 1; step <= sourceCount; step++) {
    const candidate = (cur + step) % sourceCount;
    if (!usedByOthers.has(candidate) && candidate !== cur) {
      merged[slot] = candidate;
      return uniqueFourOnScreen(merged, sourceCount);
    }
  }

  merged[slot] = (cur + 1) % sourceCount;
  return uniqueFourOnScreen(merged, sourceCount);
}

function preloadImageSrc(href: string): Promise<void> {
  return new Promise((resolve) => {
    if (!href) {
      resolve();
      return;
    }
    const img = document.createElement("img");
    img.onload = () => {
      void img.decode().then(resolve).catch(() => resolve());
    };
    img.onerror = () => resolve();
    img.src = href;
  });
}

type Slide = { readonly src: string; readonly alt: string };

function ImageCrossfadeLayer({
  slides,
  topIndex,
  topOpacity,
  crossfadeMs,
  imageSizes,
  fallbackPriority,
}: {
  slides: [Slide, Slide];
  topIndex: 0 | 1;
  topOpacity: number;
  crossfadeMs: number;
  imageSizes: string;
  fallbackPriority: boolean;
}) {
  return (
    <div
      style={
        {
          "--gallery-fade-ms": `${crossfadeMs}ms`,
          "--gallery-fade-ease": CROSSFADE_EASE,
        } as React.CSSProperties
      }
      className={`relative isolate w-full overflow-hidden bg-white ${TILE_ASPECT} max-h-[min(78vh,56rem)] shrink-0`}
    >
      {[0, 1].map((i) => {
        const slide = slides[i]!;
        const isTop = i === topIndex;
        const layerOpacity = isTop ? topOpacity : 1;
        return (
          <div
            key={i === 0 ? "a" : "b"}
            className={
              isTop
                ? `pointer-events-auto absolute inset-0 transition-[opacity] [transition-duration:var(--gallery-fade-ms)] [transition-timing-function:var(--gallery-fade-ease)] will-change-[opacity]`
                : `pointer-events-none absolute inset-0`
            }
            style={{
              opacity: layerOpacity,
              zIndex: isTop ? 2 : 1,
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes={imageSizes}
              priority={fallbackPriority && i === 0}
              className="object-cover object-center"
            />
          </div>
        );
      })}
    </div>
  );
}

function GallerySlot({
  src,
  alt,
  figureClassName,
  reduceMotion,
  imageSizes,
  fallbackPriority,
}: {
  src: string;
  alt: string;
  figureClassName: string;
  reduceMotion: boolean;
  imageSizes: string;
  fallbackPriority: boolean;
}) {
  const displayedRef = useRef<Slide>({ src, alt });
  const activeRef = useRef(0);
  const animGen = useRef(0);
  const pendingTimeouts = useRef<number[]>([]);

  const slidesRef = useRef<[Slide, Slide]>([
    { src, alt },
    { src, alt },
  ]);

  const [slides, setSlides] = useState<[Slide, Slide]>(() => [
    { src, alt },
    { src, alt },
  ]);
  const [topIndex, setTopIndex] = useState<0 | 1>(0);
  const [topOpacity, setTopOpacity] = useState(1);

  slidesRef.current = slides;

  const crossfadeMs = reduceMotion ? CROSSFADE_MS_REDUCED : CROSSFADE_MS;

  const clearAnimations = useCallback(() => {
    for (const id of pendingTimeouts.current) window.clearTimeout(id);
    pendingTimeouts.current = [];
  }, []);

  useLayoutEffect(() => {
    if (src === displayedRef.current.src && alt === displayedRef.current.alt) return;

    const previous = displayedRef.current;
    const next: Slide = { src, alt };
    clearAnimations();
    const gen = ++animGen.current;

    const front = activeRef.current as 0 | 1;
    const back = (1 - front) as 0 | 1;

    const finish = () => {
      if (animGen.current !== gen) return;
      activeRef.current = back;
      setTopIndex(back);
      setTopOpacity(1);
      displayedRef.current = next;
    };

    const afterPreload = () => {
      if (animGen.current !== gen) return;
      setTopOpacity(0);
      const t = window.setTimeout(finish, crossfadeMs + 48);
      pendingTimeouts.current.push(t);
    };

    setSlides(() => (front === 0 ? [previous, next] : [next, previous]));
    setTopIndex(front);
    setTopOpacity(1);

    if (reduceMotion) {
      void preloadImageSrc(next.src).then(() => {
        if (animGen.current !== gen) return;
        requestAnimationFrame(afterPreload);
      });
      return clearAnimations;
    }

    void preloadImageSrc(next.src).then(() => {
      if (animGen.current !== gen) return;
      requestAnimationFrame(afterPreload);
    });

    return clearAnimations;
  }, [src, alt, reduceMotion, clearAnimations, crossfadeMs]);

  return (
    <figure className={`${figureClassName} bg-white`}>
      <ImageCrossfadeLayer
        slides={slides}
        topIndex={topIndex}
        topOpacity={topOpacity}
        crossfadeMs={crossfadeMs}
        imageSizes={imageSizes}
        fallbackPriority={fallbackPriority}
      />
    </figure>
  );
}

export function GrainRotatingGallery({
  sources,
  alts,
  flexRowClassName,
  figureClassName,
  imageSizes,
  columnStaggerMs = DEFAULT_COLUMN_STAGGER_MS,
}: {
  sources: readonly string[];
  alts: readonly string[];
  flexRowClassName: string;
  figureClassName: string;
  imageSizes: string;
  columnStaggerMs?: number;
}) {
  const n = sources.length;
  const [slotIndices, setSlotIndices] = useState<number[]>(() =>
    uniqueFourOnScreen(initialSlotIndices(sources.length), sources.length),
  );
  const [reduceMotion, setReduceMotion] = useState(false);

  const indicesRef = useRef(slotIndices);
  const repeatIntervalsRef = useRef<number[]>([]);

  useEffect(() => {
    indicesRef.current = slotIndices;
  }, [slotIndices]);

  useEffect(() => {
    const next = uniqueFourOnScreen(initialSlotIndices(n), n);
    indicesRef.current = next;
    setSlotIndices(next);
  }, [n]);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const bootTimeouts: number[] = [];
    repeatIntervalsRef.current = [];
    const period = columnStaggerMs * SLOT_COUNT;

    for (let slot = 0; slot < SLOT_COUNT; slot++) {
      const advance = () => {
        const nextIx = advanceSlotDistinct(indicesRef.current, slot, n);
        indicesRef.current = nextIx;
        setSlotIndices(nextIx);
      };

      const firstDelay = columnStaggerMs * (slot + 1);
      const boot = window.setTimeout(() => {
        advance();
        const iv = window.setInterval(advance, period);
        repeatIntervalsRef.current.push(iv);
      }, firstDelay);
      bootTimeouts.push(boot);
    }

    return () => {
      for (const t of bootTimeouts) window.clearTimeout(t);
      for (const iv of repeatIntervalsRef.current) window.clearInterval(iv);
      repeatIntervalsRef.current = [];
    };
  }, [n, columnStaggerMs]);

  return (
    <div className={flexRowClassName}>
      {Array.from({ length: SLOT_COUNT }, (_, slot) => (
        <GallerySlot
          key={`slot-${slot}`}
          src={sources[slotIndices[slot]!]!}
          alt={alts[slotIndices[slot]!]!}
          figureClassName={figureClassName}
          reduceMotion={reduceMotion}
          imageSizes={imageSizes}
          fallbackPriority={slot === 0}
        />
      ))}
    </div>
  );
}
