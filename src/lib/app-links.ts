/**
 * Liens vers l'app mobile Runly — source unique pour le site.
 *
 * `IOS_APP_ID` (Team ID + bundle identifier) est ce que le fichier
 * `apple-app-site-association` déclare : c'est lui qui autorise iOS à ouvrir
 * l'app quand on scanne un QR pointant sur runly-app.com.
 */

/** Team ID Apple + bundle identifier (voir `expo/app.json`). */
export const IOS_APP_ID = "AW36T64L67.app.rork.qyqds7t9p0490dc6vlyfq";

/** Identifiant numérique de la fiche App Store. */
export const IOS_APP_STORE_ID = "6781136588";

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/runly-partenaires-de-running/id6781136588?l=fr-FR";

/**
 * Même fiche, en scheme App Store. C'est le seul lien qui fasse sortir d'un
 * navigateur intégré (Instagram, TikTok…) : une URL `https://apps.apple.com`
 * y reste souvent affichée dans la webview au lieu d'ouvrir l'App Store.
 */
export const APP_STORE_SCHEME_URL = `itms-apps://apps.apple.com/app/id${IOS_APP_STORE_ID}`;

/** Scheme privé de l'app — secours quand l'Universal Link n'a pas pris. */
export const APP_SCHEME = "runly";

/**
 * Origine canonique du site — celle qui sert réellement les pages.
 *
 * `www` et pas l'apex : `runly-app.com` renvoie en 307 vers `www`, or Apple
 * refuse toute redirection pour aller chercher `apple-app-site-association`.
 * Le domaine `runly.app` n'appartient pas au projet, ne pas le remettre ici.
 */
export const SITE_ORIGIN = "https://www.runly-app.com";

/**
 * Chemins que l'app sait résoudre (`expo/app/u`, `app/p`, `app/join`,
 * `app/club`). Toute entrée ajoutée ici doit aussi exister sur le site : sans
 * ça, un visiteur sans l'app tombe sur un 404 au lieu d'une page de
 * téléchargement.
 */
export const UNIVERSAL_LINK_PATHS = ["/u/*", "/p/*", "/join/*", "/club/*"] as const;
