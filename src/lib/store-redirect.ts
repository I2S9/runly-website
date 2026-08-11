import type { NextRequest } from "next/server";

/**
 * Renvoi automatique des visiteurs iPhone vers la fiche App Store.
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
 * Crawlers et générateurs d'aperçu. Googlebot explore aussi avec un
 * User-Agent iPhone : le rediriger reviendrait à désindexer l'accueil.
 */
const BOT_RE =
  /bot\b|bot\/|crawler|spider|slurp|facebookexternalhit|whatsapp|slackbot|telegram|discord|embedly|pinterest|applebot|lighthouse|headlesschrome|preview/i;

/** Marque un visiteur déjà renvoyé — sans ça, revenir de l'App Store reboucle. */
export const STORE_REDIRECT_COOKIE = "store_redirect";

/** 1 jour : assez pour laisser visiter le site, assez court pour re-proposer l'app. */
const STORE_REDIRECT_MAX_AGE = 60 * 60 * 24;

export const STORE_REDIRECT_COOKIE_OPTIONS = {
  maxAge: STORE_REDIRECT_MAX_AGE,
  path: "/",
  sameSite: "lax",
} as const;

/** `?stay=1` : échappatoire pour consulter le site depuis un iPhone (recette, support). */
export function isStoreRedirectOptOut(request: NextRequest): boolean {
  return request.nextUrl.searchParams.has("stay");
}

export function shouldRedirectToStore(request: NextRequest): boolean {
  if (request.method !== "GET") return false;
  if (request.nextUrl.pathname !== "/") return false;
  if (request.cookies.has(STORE_REDIRECT_COOKIE)) return false;
  if (isStoreRedirectOptOut(request)) return false;

  // Navigations React (`RSC`) et préchargements : ce ne sont pas des ouvertures
  // de page, les rediriger ne ferait que casser le routeur.
  if (request.headers.get("rsc") || request.headers.get("next-router-prefetch")) {
    return false;
  }
  const dest = request.headers.get("sec-fetch-dest");
  if (dest && dest !== "document") return false;

  const ua = request.headers.get("user-agent") ?? "";
  return IOS_RE.test(ua) && !BOT_RE.test(ua);
}
