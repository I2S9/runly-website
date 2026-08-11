import type { Metadata } from "next";
import Image from "next/image";
import { ForceStoreRedirect } from "@/components/ui/ForceStoreRedirect";
import { getLocale } from "@/lib/locale";

/**
 * Page de sortie vers l'App Store.
 *
 * Servie par le proxy à la place de l'accueil quand un iPhone ouvre `runly.app`
 * depuis un navigateur intégré (bio Instagram / TikTok) — l'URL affichée reste
 * `runly.app`. Utilisable aussi directement : `runly.app/download`.
 */
const content = {
  fr: {
    title: "Runly",
    subtitle: "Trouve ton partenaire de running.",
    opening: "Ouverture de l'App Store…",
    stuckTitle: "L'App Store ne s'est pas ouvert ?",
    openStore: "Ouvrir dans l'App Store",
    stuckHint:
      "Si rien ne se passe, touche « ⋯ » en haut de l'écran puis « Ouvrir dans le navigateur ».",
  },
  en: {
    title: "Runly",
    subtitle: "Find your running partner.",
    opening: "Opening the App Store…",
    stuckTitle: "App Store didn't open?",
    openStore: "Open in the App Store",
    stuckHint:
      "If nothing happens, tap “⋯” at the top of the screen, then “Open in browser”.",
  },
} as const;

export const metadata: Metadata = {
  // Une page de transit n'a rien à faire dans les résultats de recherche.
  robots: { index: false, follow: false },
};

export default async function DownloadPage() {
  const locale = await getLocale();
  const tr = content[locale] ?? content.fr;

  return (
    <main className="flex w-full flex-1 items-center justify-center bg-white px-6 py-16 font-sans">
      <div className="flex w-full max-w-xs flex-col items-center text-center">
        <Image
          src="/branding/runly.svg"
          alt="Runly"
          width={80}
          height={80}
          className="h-20 w-20 select-none"
          unoptimized
          priority
          draggable={false}
        />
        <p className="mt-5 text-2xl font-bold text-zinc-900">{tr.title}</p>
        <p className="mt-1 text-sm text-zinc-500">{tr.subtitle}</p>

        <ForceStoreRedirect tr={tr} />
      </div>
    </main>
  );
}
