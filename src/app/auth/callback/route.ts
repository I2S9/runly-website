import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Retour du lien magique : échange le code PKCE contre une session.
 *
 * Cette route vit hors de /admin, sinon le proxy renverrait vers la page de
 * connexion avant même que la session existe.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next");

  // Une destination fournie dans l'URL est une redirection ouverte en puissance.
  const next = nextParam && nextParam.startsWith("/admin") ? nextParam : "/admin";

  if (!code) {
    return NextResponse.redirect(`${origin}/admin/login?erreur=lien`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[admin] exchangeCodeForSession", error.message);
    return NextResponse.redirect(`${origin}/admin/login?erreur=lien`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
