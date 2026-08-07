/**
 * Liens vers l'app mobile Runly — source unique pour le site.
 *
 * `IOS_APP_ID` (Team ID + bundle identifier) est ce que le fichier
 * `apple-app-site-association` déclare : c'est lui qui autorise iOS à ouvrir
 * l'app quand on scanne un QR pointant sur runly.app.
 */

/** Team ID Apple + bundle identifier (voir `expo/app.json`). */
export const IOS_APP_ID = "AW36T64L67.app.rork.qyqds7t9p0490dc6vlyfq";

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/runly-partenaires-de-running/id6781136588?l=fr-FR";

/** Scheme privé de l'app — secours quand l'Universal Link n'a pas pris. */
export const APP_SCHEME = "runly";

export const SITE_ORIGIN = "https://runly.app";

/**
 * Chemins que l'app sait résoudre (`expo/app/u`, `app/p`, `app/join`).
 * Toute entrée ajoutée ici doit aussi exister sur le site : sans ça, un
 * visiteur sans l'app tombe sur un 404 au lieu d'une page de téléchargement.
 */
export const UNIVERSAL_LINK_PATHS = ["/u/*", "/p/*", "/join/*"] as const;
