"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const BRAND = "#4EA6F5";
const INTERVAL_MS = 4000;

const SCREENSHOTS = [
  { src: "/images/showcase/home-screen.png", label: "Home" },
  { src: "/images/showcase/map.png", label: "Map" },
  { src: "/images/showcase/run-screen.png", label: "Run" },
  { src: "/images/showcase/discover.png", label: "Discover" },
  { src: "/images/showcase/profile.png", label: "Profile" },
  { src: "/images/showcase/paywall.png", label: "Pro" },
] as const;

export function ShowcaseCarousel({ imageAlt }: { imageAlt: string }) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const goTo = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (activeRef.current + 1) % SCREENSHOTS.length;
      activeRef.current = next;
      setActive(next);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto w-full max-w-sm sm:max-w-md lg:mx-0 lg:ml-auto lg:max-w-lg xl:max-w-xl">
      <div
        className="relative mx-auto w-full overflow-hidden lg:mx-0"
        style={{ height: "clamp(380px, 72vw, 640px)" }}
        aria-live="polite"
        aria-roledescription="carousel"
        aria-label={imageAlt}
      >
        {SCREENSHOTS.map((shot, i) => (
          <div
            key={shot.src}
            className={[
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              i === active ? "z-10 opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            aria-hidden={i !== active}
          >
            <Image
              src={shot.src}
              alt={`${imageAlt}: ${shot.label}`}
              fill
              unoptimized
              className="object-contain object-center"
              sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 32rem, (min-width: 640px) 28rem, 90vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2.5">
        {SCREENSHOTS.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={shot.label}
            aria-current={i === active ? "true" : undefined}
            className="cursor-pointer rounded-full transition-colors duration-300"
            style={{
              width: i === active ? 10 : 8,
              height: i === active ? 10 : 8,
              backgroundColor: i === active ? BRAND : "#d4d4d8",
            }}
          />
        ))}
      </div>
    </div>
  );
}
