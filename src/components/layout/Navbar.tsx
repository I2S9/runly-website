"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BRAND = "#4EA6F5";

const navLinks = [
  { href: "#features", label: "Fonctionnalités" },
  { href: "#rating", label: "Avis" },
  { href: "#contact", label: "Contact" },
  { href: "#about", label: "À propos" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 font-sans sm:px-6 lg:px-8">
      <nav
        aria-label="Principale"
        className="mx-auto flex max-w-6xl flex-col gap-3 rounded-3xl px-4 py-3 text-white sm:px-5 sm:py-3.5 md:rounded-full"
        style={{ backgroundColor: BRAND }}
      >
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4EA6F5]"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/branding/runly.svg"
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 object-contain"
              priority
              unoptimized
            />
            <span className="truncate text-lg font-bold tracking-tight text-white sm:text-xl">
              Runly
            </span>
          </Link>

          <ul className="hidden items-center gap-8 text-[15px] text-white/90 md:flex">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-white/90">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <a
              href="#"
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-white px-3 text-xs font-semibold text-zinc-900"
              aria-label="Télécharger sur l’App Store"
            >
              <AppleIcon className="size-4 shrink-0" />
              App Store
            </a>
            <a
              href="#"
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-white px-3 text-xs font-semibold text-zinc-900"
              aria-label="Télécharger sur Google Play"
            >
              <PlayIcon className="size-4 shrink-0" />
              Google Play
            </a>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/50 text-white md:hidden"
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
            <div className="flex flex-col gap-4 border-t border-white/25 pt-3">
              <ul className="flex flex-col gap-3 text-[15px] text-white/90">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block py-1 text-white/90"
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pb-1">
                <a
                  href="#"
                  className="inline-flex h-9 flex-1 min-w-[140px] items-center justify-center gap-1.5 rounded-md bg-white px-3 text-xs font-semibold text-zinc-900"
                >
                  <AppleIcon className="size-4 shrink-0" />
                  App Store
                </a>
                <a
                  href="#"
                  className="inline-flex h-9 flex-1 min-w-[140px] items-center justify-center gap-1.5 rounded-md bg-white px-3 text-xs font-semibold text-zinc-900"
                >
                  <PlayIcon className="size-4 shrink-0" />
                  Google Play
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

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 20.5v-17c0-.59.47-1.04 1.02-.99l15.97 8.5c.59.31.59 1.17 0 1.48L4.02 21.49A1.02 1.02 0 013 20.5z" />
    </svg>
  );
}
