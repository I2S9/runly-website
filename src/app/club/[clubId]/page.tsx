import type { Metadata } from "next";
import { AppLinkLanding } from "@/components/ui/AppLinkLanding";
import { appLinkMetadata } from "@/lib/app-link-metadata";

/**
 * Cible du bouton « Partager » d'une fiche running club (`lib/club-share.ts`
 * côté app). Avec Runly installée, iOS ouvre l'app avant même de charger cette
 * page ; sinon le visiteur atterrit sur le téléchargement.
 */
type Params = { params: Promise<{ clubId: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { clubId } = await params;
  return appLinkMetadata("club", `club/${encodeURIComponent(clubId)}`);
}

export default async function ClubLinkPage({ params }: Params) {
  const { clubId } = await params;
  return <AppLinkLanding kind="club" appPath={`club/${encodeURIComponent(clubId)}`} />;
}
