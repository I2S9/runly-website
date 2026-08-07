import Image from "next/image";
import Link from "next/link";
import { APP_SCHEME, APP_STORE_URL } from "@/lib/app-links";
import { getLocale } from "@/lib/locale";

const BRAND = "#4EA6F5";

export type AppLinkKind = "profile" | "post" | "group";

/**
 * Page d'atterrissage des liens partagés (QR d'invitation, partage de post…).
 *
 * Sur iOS avec Runly installée, l'Universal Link ouvre l'app et cette page
 * n'est jamais affichée. Elle sert donc uniquement à qui n'a pas l'app — d'où
 * le téléchargement en action principale.
 */
const content = {
  fr: {
    eyebrow: "Invitation Runly",
    titles: {
      profile: "Rejoins ce coureur sur Runly",
      post: "Ce post t'attend sur Runly",
      group: "Rejoins ce groupe sur Runly",
    },
    bodies: {
      profile:
        "Télécharge Runly pour ouvrir ce profil, envoyer une demande d'ami et organiser votre prochaine sortie ensemble.",
      post: "Télécharge Runly pour voir ce post, réagir et suivre les sorties de la communauté.",
      group: "Télécharge Runly pour rejoindre ce groupe et courir avec ses membres.",
    },
    openApp: "J'ai déjà l'app — ouvrir dans Runly",
    androidNote: "Runly arrive très bientôt sur Android.",
    downloadAppStore: "Télécharger sur l'App Store",
    home: "Découvrir Runly",
  },
  en: {
    eyebrow: "Runly invite",
    titles: {
      profile: "Join this runner on Runly",
      post: "This post is waiting for you on Runly",
      group: "Join this group on Runly",
    },
    bodies: {
      profile:
        "Download Runly to open this profile, send a friend request and plan your next run together.",
      post: "Download Runly to see this post, react and follow the community's runs.",
      group: "Download Runly to join this group and run with its members.",
    },
    openApp: "Already have the app — open in Runly",
    androidNote: "Runly is coming to Android very soon.",
    downloadAppStore: "Download on the App Store",
    home: "Discover Runly",
  },
} as const;

type Props = {
  kind: AppLinkKind;
  /** Chemin de l'app à rouvrir, ex. `u/<uuid>`. */
  appPath: string;
};

export async function AppLinkLanding({ kind, appPath }: Props) {
  const locale = await getLocale();
  const tr = content[locale] ?? content.fr;

  return (
    <main className="flex w-full flex-1 items-center justify-center bg-white px-4 py-16 font-sans sm:py-24">
      <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-zinc-100 bg-white p-8 text-center shadow-xl sm:p-10">
        <Image
          src="/branding/runly.svg"
          alt="Runly"
          width={72}
          height={72}
          className="h-16 w-16 select-none sm:h-18 sm:w-18"
          unoptimized
          draggable={false}
        />

        <p
          className="mt-6 text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: BRAND }}
        >
          {tr.eyebrow}
        </p>

        <h1 className="mt-2 text-2xl font-bold text-zinc-900 sm:text-3xl">
          {tr.titles[kind]}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
          {tr.bodies[kind]}
        </p>

        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex shrink-0 leading-none"
          aria-label={tr.downloadAppStore}
        >
          <Image
            src="/branding/app-store.png"
            alt=""
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
            unoptimized
          />
        </a>

        {/*
          Secours pour les navigateurs intégrés (Instagram, WhatsApp…) où
          l'Universal Link ne se déclenche pas : le scheme privé, lui, passe.
        */}
        <a
          href={`${APP_SCHEME}://${appPath}`}
          className="mt-5 text-sm font-semibold underline underline-offset-4"
          style={{ color: BRAND }}
        >
          {tr.openApp}
        </a>

        <p className="mt-6 text-xs text-zinc-400">{tr.androidNote}</p>

        <Link
          href="/"
          className="mt-2 text-xs text-zinc-400 underline underline-offset-4 hover:text-zinc-600"
        >
          {tr.home}
        </Link>
      </div>
    </main>
  );
}
