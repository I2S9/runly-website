import { redirect } from "next/navigation";
import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ARTICLE_COLUMNS, type ArticleRow, type Publisher } from "./types";

/**
 * Couche d'accès aux données du back-office.
 *
 * Le proxy fait une première vérification optimiste sur /admin ; c'est ici que
 * se fait la vraie, au plus près de la donnée. Toute page ou Server Action du
 * back-office doit passer par `requirePublisher()` / `requireAdmin()`.
 */

/** L'utilisateur connecté — pas encore forcément un éditeur autorisé. */
export const getCurrentUser = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getPublisher = cache(async (): Promise<Publisher | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("news_publishers")
    .select("user_id, display_name, logo_url, site_url, is_admin")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("[admin] lecture news_publishers", error.message);
    return null;
  }

  return (data as Publisher | null) ?? null;
});

export async function requirePublisher(): Promise<Publisher> {
  const publisher = await getPublisher();
  if (!publisher) redirect("/admin/login?erreur=acces");
  return publisher;
}

export async function requireAdmin(): Promise<Publisher> {
  const publisher = await requirePublisher();
  if (!publisher.is_admin) redirect("/admin");
  return publisher;
}

/** Les articles de l'éditeur ; pour un admin, ceux de toute la rédaction. */
export async function listArticles(publisher: Publisher): Promise<ArticleRow[]> {
  const supabase = await createSupabaseServerClient();

  let query = supabase.from("running_news").select(ARTICLE_COLUMNS);
  if (!publisher.is_admin) query = query.eq("author_id", publisher.user_id);

  const { data, error } = await query
    .order("status", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[admin] listArticles", error.message);
    return [];
  }
  return (data as ArticleRow[] | null) ?? [];
}

/** File de relecture : tout ce qui attend une décision de la rédaction. */
export async function listPendingArticles(): Promise<ArticleRow[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("running_news")
    .select(ARTICLE_COLUMNS)
    .eq("status", "pending")
    .order("updated_at", { ascending: true });

  if (error) {
    console.error("[admin] listPendingArticles", error.message);
    return [];
  }
  return (data as ArticleRow[] | null) ?? [];
}

export async function getArticle(id: string): Promise<ArticleRow | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("running_news")
    .select(ARTICLE_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[admin] getArticle", error.message);
    return null;
  }
  return (data as ArticleRow | null) ?? null;
}
