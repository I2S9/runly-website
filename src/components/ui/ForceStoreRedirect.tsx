"use client";

import { useEffect, useState } from "react";
import { APP_STORE_SCHEME_URL, APP_STORE_URL } from "@/lib/app-links";

/**
 * Délai avant d'afficher le secours manuel. Assez long pour laisser l'App Store
 * s'ouvrir, assez court pour ne pas laisser le visiteur devant un écran muet.
 */
const FALLBACK_DELAY_MS = 1500;

type Props = {
  tr: {
    opening: string;
    stuckTitle: string;
    stuckHint: string;
    openStore: string;
  };
};

/**
 * Sortie forcée d'un navigateur intégré (bio Instagram / TikTok) vers l'App Store.
 *
 * La tentative automatique passe par `itms-apps://` : c'est le scheme de
 * l'App Store, donc une app externe que la webview doit passer au système.
 * Une URL `https://apps.apple.com` s'afficherait souvent *dans* la webview —
 * exactement ce qu'on cherche à éviter.
 *
 * Si rien ne s'ouvre (webview qui bloque la navigation sans geste utilisateur),
 * le bouton de secours prend le relais : un vrai tap est bien plus rarement
 * refusé qu'une redirection programmatique.
 */
export function ForceStoreRedirect({ tr }: Props) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    // Hors iOS, `itms-apps://` ne mène nulle part (et ouvre une boîte de dialogue
    // système sur macOS) : on affiche tout de suite le lien classique.
    const isIos = /iPhone|iPod|iPad/i.test(navigator.userAgent);
    if (isIos) window.location.href = APP_STORE_SCHEME_URL;

    const timer = window.setTimeout(
      () => {
        // Page masquée = l'App Store a pris la main, inutile d'afficher un
        // secours que le visiteur ne découvrirait qu'en revenant.
        if (document.visibilityState === "visible") setStuck(true);
      },
      isIos ? FALLBACK_DELAY_MS : 0,
    );

    return () => window.clearTimeout(timer);
  }, []);

  if (!stuck) {
    return (
      <p className="mt-6 text-sm text-zinc-400" role="status">
        {tr.opening}
      </p>
    );
  }

  return (
    <div className="mt-6 flex w-full flex-col items-center">
      <p className="text-sm font-semibold text-zinc-900">{tr.stuckTitle}</p>
      <a
        href={APP_STORE_URL}
        className="mt-4 w-full rounded-full px-6 py-3.5 text-center text-base font-semibold text-white"
        style={{ backgroundColor: "#4EA6F5" }}
      >
        {tr.openStore}
      </a>
      <p className="mt-4 text-xs leading-relaxed text-zinc-400">{tr.stuckHint}</p>
    </div>
  );
}
