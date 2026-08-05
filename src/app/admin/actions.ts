"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getArticle, requireAdmin, requirePublisher } from "@/lib/admin/dal";
import {
  ARTICLE_LOCALES,
  FALLBACK_IMAGE_COUNT,
  bodyToParagraphs,
  estimateReadMinutes,
  type ArticleLocale,
} from "@/lib/admin/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SaveState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  savedAt?: number;
};

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function refreshAdminViews(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/relecture");
  if (id) revalidatePath(`/admin/articles/${id}`);
}

/**
 * Crée ou met à jour un article.
 *
 * Rien ici ne décide de la mise en ligne : `status` est plafonné à 'pending'
 * pour un éditeur non-admin par le trigger `protect_running_news_editorial`,
 * qui réécrit aussi la signature à partir du compte.
 */
export async function saveArticle(
  _prevState: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const publisher = await requirePublisher();
  const supabase = await createSupabaseServerClient();

  const id = text(formData, "id");
  const intent = text(formData, "intent") === "pending" ? "pending" : "draft";

  const title = text(formData, "title");
  const tag = text(formData, "tag");
  const body = text(formData, "body");
  const localeInput = text(formData, "locale");
  const colorStart = text(formData, "colorStart");
  const colorEnd = text(formData, "colorEnd");
  const coverImageUrl = text(formData, "coverImageUrl");
  const sourceOverride = text(formData, "source");
  const sourceUrlOverride = text(formData, "sourceUrl");

  const fieldErrors: Record<string, string> = {};
  if (title.length < 8) fieldErrors.title = "Un titre d'au moins 8 caractères.";
  if (title.length > 120) fieldErrors.title = "120 caractères maximum.";
  if (!tag) fieldErrors.tag = "Une rubrique est nécessaire.";

  const paragraphs = bodyToParagraphs(body);
  if (paragraphs.length === 0) fieldErrors.body = "L'article est vide.";
  if (intent === "pending" && paragraphs.length < 3) {
    fieldErrors.body = "Au moins trois paragraphes avant de soumettre.";
  }

  if (!HEX_RE.test(colorStart) || !HEX_RE.test(colorEnd)) {
    fieldErrors.colors = "Couleurs invalides.";
  }

  const locale: ArticleLocale = (ARTICLE_LOCALES as readonly string[]).includes(localeInput)
    ? (localeInput as ArticleLocale)
    : "fr";

  const imageIdxRaw = Number.parseInt(text(formData, "imageIdx"), 10);
  const imageIdx =
    Number.isFinite(imageIdxRaw) && imageIdxRaw >= 0 ? imageIdxRaw % FALLBACK_IMAGE_COUNT : 0;

  const readMinRaw = Number.parseInt(text(formData, "readMin"), 10);
  const readMin =
    Number.isFinite(readMinRaw) && readMinRaw > 0 && readMinRaw <= 60
      ? readMinRaw
      : estimateReadMinutes(paragraphs);

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  const payload: Record<string, unknown> = {
    tag,
    title,
    paragraphs,
    locale,
    read_min: readMin,
    color_start: colorStart,
    color_end: colorEnd,
    image_idx: imageIdx,
    cover_image_url: coverImageUrl || null,
    status: intent,
  };

  // La signature d'un partenaire est imposée par le trigger ; seule la
  // rédaction Runly peut publier sous un autre nom (« Runix », « Dr. Sport »…).
  if (publisher.is_admin) {
    payload.source = sourceOverride || publisher.display_name;
    payload.source_url = sourceUrlOverride || publisher.site_url;
    payload.source_logo_url = publisher.logo_url;
  }

  if (id) {
    const existing = await getArticle(id);
    if (!existing) return { error: "Article introuvable." };
    if (existing.status === "published" && !publisher.is_admin) {
      return { error: "Article déjà en ligne — contacte la rédaction Runly pour une correction." };
    }
    // Une reprise après retour de relecture repart sans l'ancienne remarque.
    if (publisher.is_admin) payload.rejection_note = null;

    const { error } = await supabase.from("running_news").update(payload).eq("id", id);
    if (error) return { error: error.message };

    refreshAdminViews(id);
    return { savedAt: Date.now() };
  }

  payload.author_id = publisher.user_id;
  payload.published_at = new Date().toISOString();
  if (!publisher.is_admin) {
    payload.source = publisher.display_name;
    payload.source_url = publisher.site_url;
    payload.source_logo_url = publisher.logo_url;
  }

  const { data, error } = await supabase
    .from("running_news")
    .insert(payload)
    .select("id")
    .single();

  if (error) return { error: error.message };

  refreshAdminViews();
  redirect(`/admin/articles/${(data as { id: string }).id}`);
}

/** Publication — réservée à la rédaction Runly. */
export async function publishArticle(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) return;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("running_news")
    .update({
      status: "published",
      rejection_note: null,
      // Le feed de l'app trie par date : la mise en ligne fait foi.
      published_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) console.error("[admin] publishArticle", error.message);
  refreshAdminViews(id);
}

/** Retire un article de l'app sans le supprimer. */
export async function unpublishArticle(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) return;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("running_news")
    .update({ status: "draft" })
    .eq("id", id);

  if (error) console.error("[admin] unpublishArticle", error.message);
  refreshAdminViews(id);
}

/** Renvoie l'article à son auteur avec une remarque. */
export async function rejectArticle(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const note = text(formData, "note");
  if (!id) return;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("running_news")
    .update({
      status: "draft",
      rejection_note: note || "À retravailler avant publication.",
    })
    .eq("id", id);

  if (error) console.error("[admin] rejectArticle", error.message);
  refreshAdminViews(id);
}

export async function deleteArticle(formData: FormData) {
  const publisher = await requirePublisher();
  const id = text(formData, "id");
  if (!id) return;

  const article = await getArticle(id);
  if (!article) return;
  if (article.status === "published" && !publisher.is_admin) return;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("running_news").delete().eq("id", id);
  if (error) {
    console.error("[admin] deleteArticle", error.message);
    return;
  }

  refreshAdminViews();
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
