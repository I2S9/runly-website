import type { NextRequest } from "next/server";

/**
 * Renvoi automatique des visiteurs iPhone vers la fiche App Store.
 *
 * Cible d'usage : le lien en bio Instagram / TikTok. Le renvoi est donc
 * systématique — aucun quota, aucune mémoire d'un passage précédent.
 *
 * Volontairement limité à la page d'accueil : les pages légales, les pages
 * d'atterrissage des liens partagés (`/u`, `/p`, `/join`) et le back-office
 * doivent rester consultables au téléphone — Apple exige d'ailleurs que la
 * politique de confidentialité soit accessible depuis un navigateur.
 *
 * Android n'est pas concerné tant que l'app n'y est pas publiée : envoyer un
 * mobile Android sur l'App Store iOS serait une impasse. Le jour de la sortie
 * Play Store, il suffira d'ajouter la regex Android et l'URL correspondante.
 */

const IOS_RE = /iPhone|iPod|iPad/i;

/**
 * Navigateurs intégrés aux réseaux sociaux. Un lien en bio s'ouvre là-dedans,
 * jamais dans Safari — et ces webviews suivent mal une redirection vers
 * l'App Store. On leur sert `/download`, qui force la sortie en JavaScript et
 * garde un bouton visible si la webview bloque quand même.
 *
 * `FBAN`/`FBAV` = Facebook, `Instagram` = feed et bio, `BytedanceWebview`
 * et `musical_ly` = TikTok, `Line`/`MicroMessenger` = messageries asiatiques.
 */
const IN_APP_BROWSER_RE =
  /Instagram|FBAN|FBAV|FB_IAB|BytedanceWebview|musical_ly|TikTok|Snapchat|Twitter|Pinterest|LinkedInApp|Line\/|MicroMessenger|GSA\//i;

/**
 * Crawlers et générateurs d'aperçu. Googlebot explore aussi avec un
 * User-Agent iPhone : le rediriger reviendrait à désindexer l'accueil.
 * Instagram et TikTok récupèrent également la vignette du lien via ces robots.
 */
const BOT_RE =
  /bot\b|bot\/|crawler|spider|slurp|facebookexternalhit|whatsapp|slackbot|telegram|discord|embedly|pinterest\/|applebot|lighthouse|headlesschrome|preview/i;

/** Page de sortie forcée — aussi utilisable telle quelle comme lien en bio. */
export const DOWNLOAD_PATH = "/download";

/** Posé uniquement par `?stay=1` : marque un visiteur qui veut voir le site. */
export const STORE_REDIRECT_COOKIE = "store_redirect_off";

export const STORE_REDIRECT_COOKIE_OPTIONS = {
  /** 1 jour : le temps d'une session de navigation, pas plus. */
  maxAge: 60 * 60 * 24,
  path: "/",
  sameSite: "lax",
} as const;

/** `?stay=1` : échappatoire pour consulter le site depuis un iPhone (recette, support). */
export function isStoreRedirectOptOut(request: NextRequest): boolean {
  return request.nextUrl.searchParams.has("stay");
}

export type StoreRedirectMode =
  /** Navigateur classique : redirection HTTP, instantanée et sans page affichée. */
  | "http"
  /** Navigateur intégré : page `/download` qui force la sortie en JavaScript. */
  | "interstitial"
  | "none";

export function storeRedirectMode(request: NextRequest): StoreRedirectMode {
  if (request.method !== "GET") return "none";
  if (request.nextUrl.pathname !== "/") return "none";
  if (isStoreRedirectOptOut(request)) return "none";
  if (request.cookies.has(STORE_REDIRECT_COOKIE)) return "none";

  // Navigations React (`RSC`) et préchargements : ce ne sont pas des ouvertures
  // de page, les rediriger ne ferait que casser le routeur.
  if (request.headers.get("rsc") || request.headers.get("next-router-prefetch")) {
    return "none";
  }
  const dest = request.headers.get("sec-fetch-dest");
  if (dest && dest !== "document") return "none";

  const ua = request.headers.get("user-agent") ?? "";
  if (!IOS_RE.test(ua) || BOT_RE.test(ua)) return "none";

  return IN_APP_BROWSER_RE.test(ua) ? "interstitial" : "http";
}
