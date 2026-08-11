import type { Metadata } from "next";
import type { AppLinkKind } from "@/components/ui/AppLinkLanding";
import { SITE_ORIGIN } from "@/lib/app-links";
import { getLocale } from "@/lib/locale";

/**
 * Aperçu des liens partagés dans les messageries. Sans `openGraph`, un lien
 * d'invitation collé dans WhatsApp ou iMessage n'affiche qu'une URL nue.
 */
const meta = {
  fr: {
    profile: {
      title: "Rejoins ce coureur sur Runly",
      description: "Ouvre ce profil dans Runly pour l'ajouter et courir ensemble.",
    },
    post: {
      title: "Ce post t'attend sur Runly",
      description: "Ouvre ce post dans Runly pour le voir et réagir.",
    },
    group: {
      title: "Rejoins ce groupe sur Runly",
      description: "Ouvre ce groupe dans Runly pour courir avec ses membres.",
    },
    club: {
      title: "Rejoins ce running club sur Runly",
      description: "Ouvre ce club dans Runly pour voir ses sorties et le rejoindre.",
    },
  },
  en: {
    profile: {
      title: "Join this runner on Runly",
      description: "Open this profile in Runly to add them and run together.",
    },
    post: {
      title: "This post is waiting for you on Runly",
      description: "Open this post in Runly to see it and react.",
    },
    group: {
      title: "Join this group on Runly",
      description: "Open this group in Runly to run with its members.",
    },
    club: {
      title: "Join this running club on Runly",
      description: "Open this club in Runly to see its runs and join it.",
    },
  },
} as const;

export async function appLinkMetadata(kind: AppLinkKind, path: string): Promise<Metadata> {
  const locale = await getLocale();
  const { title, description } = (meta[locale] ?? meta.fr)[kind];
  const url = `${SITE_ORIGIN}/${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Runly",
      images: [{ url: `${SITE_ORIGIN}/branding/runly-icon-1024.png`, width: 1024, height: 1024 }],
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
