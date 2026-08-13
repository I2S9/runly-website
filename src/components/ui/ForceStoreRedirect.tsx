"use client";

import { useEffect } from "react";
import { APP_STORE_SCHEME_URL, APP_STORE_URL } from "@/lib/app-links";

/**
 * Tentative silencieuse de sortie vers l'App Store — aucun rendu.
 *
 * Sur iOS, la tentative passe par `itms-apps://` : c'est le scheme de
 * l'App Store, donc une app externe que la webview doit passer au système.
 * Une URL `https://apps.apple.com` s'afficherait souvent *dans* la webview —
 * exactement ce qu'on cherche à éviter.
 *
 * Si la webview bloque la navigation (Instagram et TikTok le font selon les
 * versions), rien ne se produit et la consigne affichée par la page prend le
 * relais : ouvrir le lien dans le navigateur, où le renvoi fonctionne.
 */
export function ForceStoreRedirect() {
  useEffect(() => {
    // Hors iOS, `itms-apps://` ne mène nulle part (et ouvre une boîte de dialogue
    // système sur macOS) : on envoie sur la fiche web de l'App Store.
    const isIos = /iPhone|iPod|iPad/i.test(navigator.userAgent);
    window.location.href = isIos ? APP_STORE_SCHEME_URL : APP_STORE_URL;
  }, []);

  return null;
}
