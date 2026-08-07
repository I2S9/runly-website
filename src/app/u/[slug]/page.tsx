import type { Metadata } from "next";
import { AppLinkLanding } from "@/components/ui/AppLinkLanding";
import { appLinkMetadata } from "@/lib/app-link-metadata";

/**
 * Cible du QR code d'invitation généré dans l'app (`lib/profile-share.ts`).
 * Avec Runly installée, iOS ouvre l'app avant même de charger cette page.
 */
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return appLinkMetadata("profile", `u/${encodeURIComponent(slug)}`);
}

export default async function ProfileLinkPage({ params }: Params) {
  const { slug } = await params;
  return <AppLinkLanding kind="profile" appPath={`u/${encodeURIComponent(slug)}`} />;
}
