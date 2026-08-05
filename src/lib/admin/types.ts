export const ARTICLE_STATUSES = ["draft", "pending", "published"] as const;
export type ArticleStatus = (typeof ARTICLE_STATUSES)[number];

export const ARTICLE_LOCALES = ["fr", "en"] as const;
export type ArticleLocale = (typeof ARTICLE_LOCALES)[number];

/** Colonnes de public.running_news utilisées par le back-office. */
export const ARTICLE_COLUMNS =
  "id, tag, title, source, source_logo_url, source_url, published_at, read_min, color_start, color_end, image_idx, cover_image_url, paragraphs, sort_order, is_published, status, locale, author_id, rejection_note, updated_at";

export type ArticleRow = {
  id: string;
  tag: string;
  title: string;
  source: string;
  source_logo_url: string | null;
  source_url: string | null;
  published_at: string;
  read_min: number;
  color_start: string;
  color_end: string;
  image_idx: number;
  cover_image_url: string | null;
  paragraphs: unknown;
  sort_order: number;
  is_published: boolean;
  status: ArticleStatus;
  locale: ArticleLocale;
  author_id: string | null;
  rejection_note: string | null;
  updated_at: string;
};

export type Publisher = {
  user_id: string;
  display_name: string;
  logo_url: string | null;
  site_url: string | null;
  is_admin: boolean;
};

/** Dégradés des cartes, repris des articles déjà en ligne dans l'app. */
export const GRADIENT_PRESETS = [
  { name: "Bleu", start: "#2563EB", end: "#38BDF8" },
  { name: "Vert", start: "#0D9488", end: "#34D399" },
  { name: "Violet", start: "#7C3AED", end: "#A78BFA" },
  { name: "Orange", start: "#EA580C", end: "#FB923C" },
  { name: "Rose", start: "#DB2777", end: "#F472B6" },
] as const;

/** L'app ne dispose que de quatre visuels de secours (RUNNING_NEWS_THUMBS). */
export const FALLBACK_IMAGE_COUNT = 4;

export const STATUS_LABELS: Record<ArticleStatus, string> = {
  draft: "Brouillon",
  pending: "En relecture",
  published: "En ligne",
};

export function parseParagraphs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );
}

/** Un paragraphe par bloc séparé d'une ligne vide — comme le rendu de l'app. */
export function bodyToParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s+/g, " ").trim())
    .filter((block) => block.length > 0);
}

export function paragraphsToBody(paragraphs: string[]): string {
  return paragraphs.join("\n\n");
}

/** ~200 mots/minute, arrondi à la minute supérieure. */
export function estimateReadMinutes(paragraphs: string[]): number {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
