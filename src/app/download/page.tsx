import type { Metadata } from "next";
import Image from "next/image";
import { ForceStoreRedirect } from "@/components/ui/ForceStoreRedirect";
import { getLocale } from "@/lib/locale";

/**
 * Page de sortie vers l'App Store.
 *
 * Servie par le proxy à la place de l'accueil quand un iPhone ouvre `runly-app.com`
 * depuis un navigateur intégré (bio Instagram / TikTok) — l'URL affichée reste
 * `runly-app.com`. Utilisable aussi directement : `runly-app.com/download`.
 *
 * Le logo et la consigne sont tout ce qui est affiché : la page ne sert qu'à
 * faire sortir de la webview. `ForceStoreRedirect` tente l'App Store en
 * silence ; la consigne prend le relais quand la webview bloque.
 */
const content = {
  fr: "Touche les trois points en haut à droite, puis « Ouvrir dans le navigateur »",
  en: "Tap the three dots in the top right, then “Open in browser”",
} as const;

export const metadata: Metadata = {
  // Une page de transit n'a rien à faire dans les résultats de recherche.
  robots: { index: false, follow: false },
};

export default async function DownloadPage() {
  const locale = await getLocale();

  return (
    <main className="flex w-full flex-1 items-center justify-center bg-white px-8 py-16 font-sans">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <Image
          src="/branding/runly.svg"
          alt="Runly"
          width={112}
          height={112}
          className="h-24 w-24 select-none sm:h-28 sm:w-28"
          unoptimized
          priority
          draggable={false}
        />

        <p className="mt-10 text-2xl font-semibold leading-snug text-zinc-400 sm:text-3xl">
          {content[locale] ?? content.fr}
        </p>

        <ForceStoreRedirect />
      </div>
    </main>
  );
}
