"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { Translations } from "@/i18n/translations";

const BRAND = "#4EA6F5";

type Props = {
  tr: {
    downloadAppStore: string;
    downloadGooglePlay: string;
    downloadModal: Translations["downloadModal"];
  };
  /** visual size: "sm" for navbar badges, "lg" for hero badges */
  size?: "sm" | "lg";
  /** layout: "row" (default) or "col" */
  layout?: "row" | "col";
};

export function DownloadButtons({ tr, size = "lg", layout = "row" }: Props) {
  const [open, setOpen] = useState(false);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const imgClass =
    size === "sm"
      ? "h-7 w-auto object-contain sm:h-8"
      : "h-10 w-auto object-contain object-left sm:h-12";

  const wrapClass =
    layout === "col"
      ? "flex flex-col items-center gap-3"
      : "flex flex-wrap items-center gap-3";

  return (
    <>
      {/* Trigger buttons */}
      <div className={wrapClass}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex shrink-0 cursor-pointer leading-none"
          aria-label={tr.downloadAppStore}
        >
          <Image
            src="/branding/app-store.png"
            alt=""
            width={200}
            height={60}
            className={imgClass}
            unoptimized
          />
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex shrink-0 cursor-pointer leading-none"
          aria-label={tr.downloadGooglePlay}
        >
          <Image
            src="/branding/google-play.webp"
            alt=""
            width={220}
            height={66}
            className={imgClass}
            unoptimized
          />
        </button>
      </div>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={() => setOpen(false)}
          aria-modal="true"
          role="dialog"
          aria-label={tr.downloadModal.title}
        >
          <div
            className="relative flex w-80 flex-col items-center rounded-2xl bg-white p-8 text-center shadow-2xl"
            style={{ aspectRatio: "1 / 1" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
              aria-label={tr.downloadModal.close}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>

            {/* Title — above the logo */}
            <h2 className="text-2xl font-bold" style={{ color: BRAND }}>
              {tr.downloadModal.title}
            </h2>

            {/* Runly logo — bare, no container */}
            <Image
              src="/branding/runly.svg"
              alt="Runly"
              width={80}
              height={80}
              className="my-5 h-20 w-20 pointer-events-none select-none"
              unoptimized
              draggable={false}
            />

            {/* App name */}
            <p className="text-xl font-bold text-zinc-900">Runly</p>

            {/* Message */}
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {tr.downloadModal.message}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
