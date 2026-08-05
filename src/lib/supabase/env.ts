/**
 * Projet Supabase partagé avec l'application mobile Runly.
 *
 * Seule la clé `anon` est utilisée : toutes les écritures passent par la RLS et
 * le trigger `protect_running_news_editorial`. La clé `service_role` n'a rien à
 * faire ici — elle contourne la RLS et serait exposée au premier déploiement.
 */
export type SupabaseEnv = { url: string; anonKey: string };

export function readSupabaseEnv(): SupabaseEnv | null {
  // Références littérales : Next remplace ces expressions à la compilation.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export function requireSupabaseEnv(): SupabaseEnv {
  const env = readSupabaseEnv();
  if (!env) {
    throw new Error(
      "Supabase : définir NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY (voir .env.example).",
    );
  }
  return env;
}
