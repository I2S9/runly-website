"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Retour à l'écran précédent.
 *
 * Rendu comme un vrai lien vers `fallback` : le clic milieu, le Ctrl+clic et
 * l'arrivée par URL directe continuent de fonctionner. Au clic simple, on
 * revient réellement en arrière quand on vient du back-office — sinon on
 * atterrirait sur /admin depuis la file de relecture.
 */
export function BackLink({
  fallback = "/admin",
  label = "Retour",
}: {
  fallback?: string;
  label?: string;
}) {
  const router = useRouter();

  return (
    <Link
      href={fallback}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

        const cameFromAdmin =
          typeof document !== "undefined" &&
          document.referrer.startsWith(window.location.origin) &&
          new URL(document.referrer).pathname.startsWith("/admin");

        if (cameFromAdmin) {
          event.preventDefault();
          router.back();
        }
      }}
      className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M10 12.5 5.5 8 10 3.5" />
      </svg>
      {label}
    </Link>
  );
}
