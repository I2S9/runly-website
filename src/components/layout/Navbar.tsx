"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BRAND = "#4EA6F5";

/** Taille unique pour tout texte visible de la navbar */
const NAV_TEXT =
  "text-base font-medium leading-snug lg:text-lg xl:text-xl";

const navLinks = [
  { href: "#features", label: "Fonctionnalités" },
  { href: "#rating", label: "Avis" },
  { href: "#contact", label: "Contact" },
  { href: "#about", label: "À propos" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 font-sans sm:px-5 sm:pt-4 lg:px-8">
      <nav
        aria-label="Principale"
        className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-3 rounded-3xl px-3 py-3 text-white sm:px-4 sm:py-3.5 md:rounded-full md:px-4 md:py-4 lg:px-6 lg:py-4"
        style={{ backgroundColor: BRAND }}
      >
        <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-3 md:gap-4">
          <Link
            href="/"
            className="flex min-w-0 max-w-[min(100%,14rem)] items-center gap-2 sm:gap-3 rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4EA6F5] sm:max-w-none"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/branding/runly.svg"
              alt=""
              width={64}
              height={64}
              className="size-12 shrink-0 object-contain sm:size-14 md:size-16"
              priority
              unoptimized
            />
            <span className="truncate tracking-tight text-white text-lg font-semibold leading-snug lg:text-xl xl:text-2xl">
              Runly
            </span>
          </Link>

          <ul
            className={`hidden min-w-0 items-center justify-center gap-3 text-white/90 md:flex md:gap-4 lg:gap-6 xl:gap-8 ${NAV_TEXT}`}
          >
            {navLinks.map(({ href, label }) => (
              <li key={href} className="shrink-0">
                <Link href={href} className="text-white/90">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 items-center gap-2 md:flex md:gap-2 lg:gap-3">
            <a
              href="#"
              className="inline-flex leading-none"
              aria-label="Télécharger sur l’App Store"
            >
              <Image
                src="/branding/get-it-on-apple.png"
                alt=""
                width={180}
                height={54}
                className="h-9 w-auto object-contain object-left sm:h-10"
                unoptimized
              />
            </a>
            <a
              href="#"
              className="inline-flex leading-none"
              aria-label="Télécharger sur Google Play"
            >
              <Image
                src="/branding/google-play-store-logo-png.webp"
                alt=""
                width={202}
                height={60}
                className="h-9 w-auto object-contain object-left sm:h-10"
                unoptimized
              />
            </a>
          </div>

          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/50 text-white sm:size-12 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">
              {open ? "Fermer le menu" : "Ouvrir le menu"}
            </span>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div
          id="mobile-nav"
          className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out md:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <div className="flex flex-col gap-4 border-t border-white/25 pt-4">
              <ul className={`flex flex-col gap-1 text-white/90 ${NAV_TEXT}`}>
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex min-h-12 items-center py-2 text-white/90 sm:min-h-14 sm:py-2.5"
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-center gap-3 pb-1 sm:flex-row sm:flex-wrap sm:justify-center">
                <a
                  href="#"
                  className="inline-flex w-full max-w-[220px] justify-center leading-none sm:flex-1 sm:max-w-none"
                  aria-label="Télécharger sur l’App Store"
                >
                  <Image
                    src="/branding/get-it-on-apple.png"
                    alt=""
                    width={180}
                    height={54}
                    className="h-11 w-auto object-contain sm:h-10"
                    unoptimized
                  />
                </a>
                <a
                  href="#"
                  className="inline-flex w-full max-w-[220px] justify-center leading-none sm:flex-1 sm:max-w-none"
                  aria-label="Télécharger sur Google Play"
                >
                  <Image
                    src="/branding/google-play-store-logo-png.webp"
                    alt=""
                    width={202}
                    height={60}
                    className="h-11 w-auto object-contain sm:h-10"
                    unoptimized
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

