"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Translations } from "@/i18n/translations";

const BRAND = "#4EA6F5";

type ModalContent = {
  title: string;
  message: string;
  close: string;
};

function Modal({ content, onClose }: { content: ModalContent; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-300 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={content.title}
    >
      <div
        className="relative flex w-80 flex-col items-center rounded-2xl bg-white p-8 text-center shadow-2xl"
        style={{ aspectRatio: "1 / 1" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          aria-label={content.close}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold" style={{ color: BRAND }}>
          {content.title}
        </h2>

        <Image
          src="/branding/runly.svg"
          alt="Runly"
          width={80}
          height={80}
          className="my-5 h-20 w-20 pointer-events-none select-none"
          unoptimized
          draggable={false}
        />

        <p className="text-xl font-bold text-zinc-900">Runly</p>

        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          {content.message}
        </p>
      </div>
    </div>
  );
}

type Props = {
  links: readonly { href: string; label: string }[];
  downloadModal: Translations["downloadModal"];
  blogModal: Translations["blogModal"];
  ariaLabelledBy: string;
  heading: string;
};

export function FooterInteractiveLinks({ links, downloadModal, blogModal, ariaLabelledBy, heading }: Props) {
  const [modal, setModal] = useState<"download" | "blog" | null>(null);

  const handleClick = (href: string) => {
    if (href === "#blog") { setModal("blog"); return; }
    if (href === "#download-ios" || href === "#download-android") { setModal("download"); return; }
  };

  return (
    <>
      <nav aria-labelledby={ariaLabelledBy}>
        <h2 id={ariaLabelledBy} className="text-base font-bold leading-none tracking-tight text-zinc-900 sm:text-lg">
          {heading}
        </h2>
        <ul className="mt-4 flex flex-col gap-3 text-sm sm:mt-5 sm:text-[0.9375rem]">
          {links.map(({ href, label }) => {
            const isModal = href === "#blog" || href === "#download-ios" || href === "#download-android";
            if (isModal) {
              return (
                <li key={href}>
                  <button
                    type="button"
                    onClick={() => handleClick(href)}
                    className="cursor-pointer text-zinc-500 transition hover:text-zinc-900"
                  >
                    {label}
                  </button>
                </li>
              );
            }
            if (href.startsWith("mailto:")) {
              return (
                <li key={href}>
                  <a href={href} className="text-zinc-500 transition hover:text-zinc-900">{label}</a>
                </li>
              );
            }
            return (
              <li key={href}>
                <Link href={href} className="text-zinc-500 transition hover:text-zinc-900">{label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {modal === "download" && (
        <Modal content={downloadModal} onClose={() => setModal(null)} />
      )}
      {modal === "blog" && (
        <Modal content={blogModal} onClose={() => setModal(null)} />
      )}
    </>
  );
}
