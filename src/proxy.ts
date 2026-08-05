import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Locale } from "@/i18n/translations";
import { readSupabaseEnv } from "@/lib/supabase/env";

const FRENCH_RE = /^fr\b/i;

const LOGIN_PATH = "/admin/login";

function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get("locale")?.value;
  if (cookie === "fr" || cookie === "en") return cookie;

  const acceptLang = request.headers.get("accept-language") ?? "";
  const primary = acceptLang.split(",")[0]?.split(";")[0]?.trim() ?? "en";
  return FRENCH_RE.test(primary) ? "fr" : "en";
}

/** Conserve les cookies déjà posés (locale, session rafraîchie) sur une redirection. */
function redirectKeepingCookies(request: NextRequest, path: string, from: NextResponse) {
  const redirect = NextResponse.redirect(new URL(path, request.url));
  for (const cookie of from.cookies.getAll()) redirect.cookies.set(cookie);
  return redirect;
}

export async function proxy(request: NextRequest) {
  const locale = detectLocale(request);
  const path = request.nextUrl.pathname;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  // Le layout racine s'en sert pour masquer navbar et footer sur le back-office.
  requestHeaders.set("x-pathname", path);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.cookies.set("locale", locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  if (!path.startsWith("/admin")) return response;

  const env = readSupabaseEnv();
  // Sans configuration Supabase, la page /admin affichera elle-même l'erreur —
  // il n'y a aucune donnée à protéger tant que la connexion n'existe pas.
  if (!env) return response;

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet, headers) => {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
        // `Cache-Control: no-store` & co : une réponse qui pose des cookies de
        // session ne doit jamais être mise en cache par un CDN.
        for (const [key, value] of Object.entries(headers)) {
          response.headers.set(key, value);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Vérification optimiste : « y a-t-il une session ? ». Savoir si ce compte est
  // bien un éditeur autorisé demande la base — c'est le rôle du DAL. La page de
  // connexion reste donc accessible même connecté, sinon un compte sans droits
  // rebondirait indéfiniment entre /admin et /admin/login.
  if (!user && path !== LOGIN_PATH) {
    return redirectKeepingCookies(request, LOGIN_PATH, response);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|branding|images).*)"],
};
