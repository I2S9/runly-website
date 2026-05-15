"use client";

import Image from "next/image";
import {
  createElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const SLOT_COUNT = 4;
/** Délai entre le passage à l’image suivante d’une colonne et celui de la colonne suivante. */
const DEFAULT_COLUMN_STAGGER_MS = 15_000;
const GRAIN_RAMP_MS = 280;
const CROSSFADE_MS = 340;
const CROSSFADE_EASE = "cubic-bezier(0.32, 0, 0.18, 1)";
const CROSSFADE_MS_REDUCED = 100;

function initialSlotIndices(sourceCount: number): number[] {
  if (sourceCount <= 0) return Array.from({ length: SLOT_COUNT }, () => 0);
  if (sourceCount < SLOT_COUNT) {
    return Array.from({ length: SLOT_COUNT }, (_, s) => s % sourceCount);
  }
  return Array.from({ length: SLOT_COUNT }, (_, s) => s);
}

/** Force 4 indices différents (premiers entiers libres si collision ou hors bornes). */
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

/** Prochain index pour `slot`, jamais celui déjà affiché sur cette colonne, jamais pris par les 3 autres. */
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

function useMeasureBox() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [{ w, h }, setDims] = useState({ w: 640, h: 960 });

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const commit = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      const rawW = Math.floor(r.width * dpr);
      const rawH = Math.floor(r.height * dpr);
      const nextW = Math.max(120, Math.min(rawW, 960));
      const nextH = Math.max(160, Math.min(rawH, 1400));
      setDims((prev) => (prev.w === nextW && prev.h === nextH ? prev : { w: nextW, h: nextH }));
    };

    commit();
    const ro = new ResizeObserver(() => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        commit();
      });
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { wrapRef, w, h };
}

type Slide = { readonly src: string; readonly alt: string };

function syncGrainyAttrs(
  el: HTMLElement,
  opts: {
    src: string;
    alt: string;
    width: number;
    height: number;
    intensity: number;
    reduceMotion: boolean;
  },
) {
  el.setAttribute("src", opts.src);
  el.setAttribute("alt", opts.alt);
  el.setAttribute("method", "canvas");
  el.setAttribute("intensity", String(opts.intensity));
  el.setAttribute("animated", opts.reduceMotion ? "false" : "true");
  el.setAttribute("width", String(opts.width));
  el.setAttribute("height", String(opts.height));
}

function GrainyDualLayer({
  slides,
  topIndex,
  topOpacity,
  crossfadeMs,
  wrapRef,
  grainyReady,
  imageSizes,
  fallbackPriority,
  reduceMotion,
  grainRef0,
  grainRef1,
}: {
  slides: [Slide, Slide];
  topIndex: 0 | 1;
  topOpacity: number;
  crossfadeMs: number;
  wrapRef: React.RefObject<HTMLDivElement | null>;
  grainyReady: boolean;
  imageSizes: string;
  fallbackPriority: boolean;
  reduceMotion: boolean;
  grainRef0: React.RefObject<HTMLElement | null>;
  grainRef1: React.RefObject<HTMLElement | null>;
}) {
  const ease = CROSSFADE_EASE;

  return (
    <div
      ref={wrapRef}
      style={
        {
          "--gallery-fade-ms": `${crossfadeMs}ms`,
          "--gallery-fade-ease": ease,
        } as React.CSSProperties
      }
      className="relative isolate grid min-h-0 min-w-0 grid-cols-1 grid-rows-1 flex-1 bg-white"
    >
      {[0, 1].map((i) => {
        const slide = slides[i]!;
        const grainRef = i === 0 ? grainRef0 : grainRef1;
        const isTop = i === topIndex;
        const layerOpacity = isTop ? topOpacity : 1;
        return (
          <div
            key={i === 0 ? "a" : "b"}
            className={
              isTop
                ? "pointer-events-auto col-start-1 row-start-1 flex min-h-0 min-w-0 flex-col justify-end bg-white transition-[opacity] [transition-duration:var(--gallery-fade-ms)] [transition-timing-function:var(--gallery-fade-ease)] will-change-[opacity] [&>grainy-image]:block [&>grainy-image]:h-auto [&>grainy-image]:max-h-[min(78vh,56rem)] [&>grainy-image]:w-full [&>grainy-image]:align-bottom"
                : "pointer-events-none col-start-1 row-start-1 flex min-h-0 min-w-0 flex-col justify-end bg-white [&>grainy-image]:block [&>grainy-image]:h-auto [&>grainy-image]:max-h-[min(78vh,56rem)] [&>grainy-image]:w-full [&>grainy-image]:align-bottom"
            }
            style={{
              opacity: layerOpacity,
              zIndex: isTop ? 2 : 1,
            }}
          >
            {grainyReady
              ? createElement("grainy-image", { ref: grainRef })
              : (
              <Image
                src={slide.src}
                alt={slide.alt}
                width={900}
                height={1350}
                className="h-auto max-h-[min(78vh,56rem)] w-full object-contain object-bottom"
                sizes={imageSizes}
                priority={fallbackPriority && i === 0}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function GrainySlot({
  src,
  alt,
  figureClassName,
  reduceMotion,
  grainyReady,
  imageSizes,
  fallbackPriority,
}: {
  src: string;
  alt: string;
  figureClassName: string;
  reduceMotion: boolean;
  grainyReady: boolean;
  imageSizes: string;
  fallbackPriority: boolean;
}) {
  const { wrapRef, w, h } = useMeasureBox();
  const grainRef0 = useRef<HTMLElement | null>(null);
  const grainRef1 = useRef<HTMLElement | null>(null);

  const displayedRef = useRef<Slide>({ src, alt });
  const activeRef = useRef(0);
  const animGen = useRef(0);
  const rampRaf = useRef<number | null>(null);
  const pendingTimeouts = useRef<number[]>([]);
  const grainyInited = useRef(false);

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

  const targetIntensity = reduceMotion ? 0.2 : 0.3;

  const clearAnimations = useCallback(() => {
    if (rampRaf.current != null) {
      cancelAnimationFrame(rampRaf.current);
      rampRaf.current = null;
    }
    for (const id of pendingTimeouts.current) window.clearTimeout(id);
    pendingTimeouts.current = [];
  }, []);

  useLayoutEffect(() => {
    if (!grainyReady) return;
    for (const el of [grainRef0.current, grainRef1.current]) {
      if (el) {
        el.setAttribute("width", String(w));
        el.setAttribute("height", String(h));
      }
    }
  }, [grainyReady, w, h]);

  useLayoutEffect(() => {
    if (!grainyReady || grainyInited.current) return;
    grainyInited.current = true;
    const [s0, s1] = slidesRef.current;
    const el0 = grainRef0.current;
    const el1 = grainRef1.current;
    if (el0) {
      syncGrainyAttrs(el0, {
        src: s0.src,
        alt: s0.alt,
        width: w,
        height: h,
        intensity: 0,
        reduceMotion,
      });
    }
    if (el1) {
      syncGrainyAttrs(el1, {
        src: s1.src,
        alt: s1.alt,
        width: w,
        height: h,
        intensity: 0,
        reduceMotion,
      });
    }
  }, [grainyReady, w, h, reduceMotion]);

  useLayoutEffect(() => {
    if (src === displayedRef.current.src && alt === displayedRef.current.alt) return;

    const previous = displayedRef.current;
    const next: Slide = { src, alt };
    clearAnimations();
    const gen = ++animGen.current;

    const front = activeRef.current as 0 | 1;
    const back = (1 - front) as 0 | 1;

    if (reduceMotion) {
      setSlides(() => (front === 0 ? [previous, next] : [next, previous]));
      setTopIndex(front);
      setTopOpacity(1);

      void preloadImageSrc(next.src).then(() => {
        if (animGen.current !== gen) return;
        requestAnimationFrame(() => {
          if (!grainyReady) {
            setTopOpacity(0);
            const t = window.setTimeout(() => {
              if (animGen.current !== gen) return;
              activeRef.current = back;
              setTopIndex(back);
              setTopOpacity(1);
              displayedRef.current = next;
            }, crossfadeMs + 48);
            pendingTimeouts.current.push(t);
            return;
          }
          const elF = front === 0 ? grainRef0.current : grainRef1.current;
          const elB = back === 0 ? grainRef0.current : grainRef1.current;
          if (elF) {
            syncGrainyAttrs(elF, {
              src: previous.src,
              alt: previous.alt,
              width: w,
              height: h,
              intensity: 0,
              reduceMotion,
            });
          }
          if (elB) {
            syncGrainyAttrs(elB, {
              src: next.src,
              alt: next.alt,
              width: w,
              height: h,
              intensity: targetIntensity,
              reduceMotion,
            });
          }
          requestAnimationFrame(() => {
            if (animGen.current !== gen) return;
            setTopOpacity(0);
            const t = window.setTimeout(() => {
              if (animGen.current !== gen) return;
              activeRef.current = back;
              setTopIndex(back);
              setTopOpacity(1);
              displayedRef.current = next;
            }, crossfadeMs + 48);
            pendingTimeouts.current.push(t);
          });
        });
      });
      return clearAnimations;
    }

    setSlides(() => (front === 0 ? [previous, next] : [next, previous]));

    setTopIndex(front);
    setTopOpacity(1);

    const runAfterPaint = () => {
      if (animGen.current !== gen) return;

      const startFadeOut = () => {
        if (animGen.current !== gen) return;
        setTopOpacity(0);
        const t = window.setTimeout(() => {
          if (animGen.current !== gen) return;
          activeRef.current = back;
          setTopIndex(back);
          setTopOpacity(1);
          displayedRef.current = next;
          const elOldFront = front === 0 ? grainRef0.current : grainRef1.current;
          if (elOldFront) elOldFront.setAttribute("intensity", "0");
        }, crossfadeMs + 48);
        pendingTimeouts.current.push(t);
      };

      if (grainyReady) {
        const elFront = front === 0 ? grainRef0.current : grainRef1.current;
        const elBack = back === 0 ? grainRef0.current : grainRef1.current;
        if (elBack) {
          syncGrainyAttrs(elBack, {
            src: next.src,
            alt: next.alt,
            width: w,
            height: h,
            intensity: 0,
            reduceMotion,
          });
        }
        if (elFront) {
          syncGrainyAttrs(elFront, {
            src: previous.src,
            alt: previous.alt,
            width: w,
            height: h,
            intensity: 0,
            reduceMotion,
          });
        }

        void preloadImageSrc(next.src).then(() => {
          if (animGen.current !== gen) return;

          const t0 = performance.now();
          const ramp = (now: number) => {
            if (animGen.current !== gen) return;
            const el = front === 0 ? grainRef0.current : grainRef1.current;
            if (!el) return;
            const u = Math.min(1, (now - t0) / GRAIN_RAMP_MS);
            const s = u * u * (3 - 2 * u);
            el.setAttribute("intensity", String(targetIntensity * s));
            if (u < 1) {
              rampRaf.current = requestAnimationFrame(ramp);
            } else {
              rampRaf.current = null;
              startFadeOut();
            }
          };

          rampRaf.current = requestAnimationFrame(ramp);
        });
        return;
      }

      void preloadImageSrc(next.src).then(() => {
        if (animGen.current !== gen) return;
        startFadeOut();
      });
    };

    requestAnimationFrame(runAfterPaint);

    return clearAnimations;
  }, [src, alt, reduceMotion, grainyReady, clearAnimations, w, h, targetIntensity, crossfadeMs]);

  return (
    <figure className={`${figureClassName} bg-white`}>
      <GrainyDualLayer
        slides={slides}
        topIndex={topIndex}
        topOpacity={topOpacity}
        crossfadeMs={crossfadeMs}
        wrapRef={wrapRef}
        grainyReady={grainyReady}
        imageSizes={imageSizes}
        fallbackPriority={fallbackPriority}
        reduceMotion={reduceMotion}
        grainRef0={grainRef0}
        grainRef1={grainRef1}
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
  const [grainyReady, setGrainyReady] = useState(false);

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
    let cancelled = false;
    void import("grainy-image").then(() => {
      if (!cancelled) setGrainyReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const bootTimeouts: number[] = [];
    repeatIntervalsRef.current = [];
    const period = columnStaggerMs * SLOT_COUNT;

    for (let slot = 0; slot < SLOT_COUNT; slot++) {
      const advance = () => {
        const next = advanceSlotDistinct(indicesRef.current, slot, n);
        indicesRef.current = next;
        setSlotIndices(next);
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
        <GrainySlot
          key={`slot-${slot}`}
          src={sources[slotIndices[slot]!]!}
          alt={alts[slotIndices[slot]!]!}
          figureClassName={figureClassName}
          reduceMotion={reduceMotion}
          grainyReady={grainyReady}
          imageSizes={imageSizes}
          fallbackPriority={slot === 0}
        />
      ))}
    </div>
  );
}
