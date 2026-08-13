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
/** La consigne est coupée en deux : le bouton ⋯ s'insère entre les deux moitiés. */
const content = {
  fr: {
    before: "Touche les trois points en haut à droite",
    after: ", puis « Ouvrir dans le navigateur »",
  },
  en: {
    before: "Tap the three dots in the top right",
    after: ", then “Open in browser”",
  },
} as const;

/** Reproduction du bouton « ⋯ » des navigateurs intégrés, au fil du texte. */
function DotsButton() {
  return (
    <span
      aria-hidden
      className="ml-2 inline-flex h-7 w-7 items-center justify-center gap-0.75 rounded-full bg-zinc-400 align-middle"
    >
      <span className="h-1 w-1 rounded-full bg-white" />
      <span className="h-1 w-1 rounded-full bg-white" />
      <span className="h-1 w-1 rounded-full bg-white" />
    </span>
  );
}

export const metadata: Metadata = {
  // Une page de transit n'a rien à faire dans les résultats de recherche.
  robots: { index: false, follow: false },
};

export default async function DownloadPage() {
  const locale = await getLocale();
  const tr = content[locale] ?? content.fr;

  return (
    <main className="flex w-full flex-1 items-center justify-center bg-white px-8 py-16 font-sans">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <Image
          src="/branding/runly.svg"
          alt=""
          width={200}
          height={200}
          className="h-40 w-40 select-none sm:h-44 sm:w-44"
          unoptimized
          priority
          draggable={false}
        />

        {/* `font-sans` = Bricolage Grotesque, la police du site. */}
        <p className="mt-2 font-sans text-4xl font-bold tracking-tight text-zinc-900">Runly</p>

        <p className="mt-10 text-2xl font-semibold leading-snug text-zinc-400 sm:text-3xl">
          {tr.before}
          <DotsButton />
          {tr.after}
        </p>

        <ForceStoreRedirect />
      </div>
    </main>
  );
}
