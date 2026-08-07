import { IOS_APP_ID, UNIVERSAL_LINK_PATHS } from "@/lib/app-links";

/**
 * Universal Links iOS — servi sur `/.well-known/apple-app-site-association`
 * via une réécriture (voir `next.config.ts`), parce qu'un dossier commençant
 * par un point n'est pas routé de façon fiable par l'App Router.
 *
 * Apple exige du JSON servi en `application/json`, SANS extension de fichier
 * et sans redirection. Le CDN d'Apple met le fichier en cache : après une
 * modification, il faut réinstaller l'app (ou attendre) pour la voir prise en
 * compte sur un appareil déjà équipé.
 */
export const dynamic = "force-static";

const PAYLOAD = {
  applinks: {
    details: [
      {
        appIDs: [IOS_APP_ID],
        components: UNIVERSAL_LINK_PATHS.map((path) => ({ "/": path })),
      },
    ],
  },
};

export function GET() {
  return new Response(JSON.stringify(PAYLOAD), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
}
