"use client";

import { useActionState, useMemo, useState } from "react";
import {
  deleteArticle,
  saveArticle,
  unpublishArticle,
  type SaveState,
} from "@/app/admin/actions";
import { BackLink } from "@/components/admin/BackLink";
import { PublisherAvatar } from "@/components/admin/PublisherAvatar";
import { SubmitButton } from "@/components/admin/SubmitButton";
import {
  FALLBACK_IMAGE_COUNT,
  GRADIENT_PRESETS,
  bodyToParagraphs,
  estimateReadMinutes,
  paragraphsToBody,
  parseParagraphs,
  type ArticleRow,
  type Publisher,
} from "@/lib/admin/types";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const BRAND = "#4EA6F5";

const TAGS = [
  "Plan entraînement",
  "Nutrition",
  "Matos",
  "Santé",
  "Course",
  "Motivation",
] as const;

const FIELD =
  "w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500";

const LABEL = "block text-sm font-medium text-zinc-700";

export function ArticleEditor({
  publisher,
  article,
}: {
  publisher: Publisher;
  article: ArticleRow | null;
}) {
  // L'état d'attente est géré bouton par bouton via <SubmitButton>.
  const [state, formAction] = useActionState<SaveState, FormData>(saveArticle, {});

  const [title, setTitle] = useState(article?.title ?? "");
  const [tag, setTag] = useState<string>(article?.tag ?? TAGS[0]);
  const [body, setBody] = useState(
    article ? paragraphsToBody(parseParagraphs(article.paragraphs)) : "",
  );
  const [locale, setLocale] = useState(article?.locale ?? "fr");
  const [colorStart, setColorStart] = useState(article?.color_start ?? GRADIENT_PRESETS[0].start);
  const [colorEnd, setColorEnd] = useState(article?.color_end ?? GRADIENT_PRESETS[0].end);
  const [imageIdx, setImageIdx] = useState(article?.image_idx ?? 0);
  const [coverImageUrl, setCoverImageUrl] = useState(article?.cover_image_url ?? "");
  const [readMin, setReadMin] = useState<string>(article ? String(article.read_min) : "");
  const [source, setSource] = useState(article?.source ?? publisher.display_name);
  const [sourceUrl, setSourceUrl] = useState(article?.source_url ?? publisher.site_url ?? "");

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const paragraphs = useMemo(() => bodyToParagraphs(body), [body]);
  const autoReadMin = useMemo(() => estimateReadMinutes(paragraphs), [paragraphs]);

  const isLive = article?.status === "published";
  // Un partenaire ne retouche pas un article déjà devant les lecteurs.
  const locked = isLive && !publisher.is_admin;

  async function handleCoverUpload(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      // Un dossier par éditeur : la policy Storage interdit d'écrire ailleurs.
      const path = `${publisher.user_id}/${crypto.randomUUID()}.${extension}`;

      const { error } = await supabase.storage
        .from("news-media")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (error) {
        setUploadError("Envoi impossible. Formats acceptés : JPG, PNG, WebP, AVIF (5 Mo max).");
        return;
      }

      const { data } = supabase.storage.from("news-media").getPublicUrl(path);
      setCoverImageUrl(data.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <BackLink label="Articles" />

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          {article ? "Modifier l'article" : "Nouvel article"}
        </h1>
        {/* Hors du formulaire d'édition : un <form> ne s'imbrique pas. */}
        {article && (
          <div className="flex items-center gap-2">
            {isLive && publisher.is_admin && (
              <form action={unpublishArticle}>
                <input type="hidden" name="id" value={article.id} />
                <SubmitButton
                  pendingLabel="Retrait…"
                  className="rounded-full border border-zinc-300 px-3.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-40"
                >
                  Retirer de l&apos;app
                </SubmitButton>
              </form>
            )}
            <form action={deleteArticle}>
              <input type="hidden" name="id" value={article.id} />
              <SubmitButton
                pendingLabel="Suppression…"
                disabled={locked}
                className="rounded-full border border-zinc-300 px-3.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-40"
              >
                Supprimer
              </SubmitButton>
            </form>
          </div>
        )}
      </div>

      {locked && (
        <p className="mt-5 rounded-xl bg-zinc-100 px-4 py-3 text-sm text-zinc-700">
          Cet article est en ligne dans l&apos;application. Pour une correction, écris à{" "}
          <a href="mailto:support@runly-app.com" className="font-medium underline">
            support@runly-app.com
          </a>
          .
        </p>
      )}

      {article?.rejection_note && (
        <div className="mt-5 rounded-xl bg-amber-50 px-4 py-3">
          <p className="text-sm font-medium text-amber-900">Retour de la rédaction</p>
          <p className="mt-1 text-sm text-amber-800">{article.rejection_note}</p>
        </div>
      )}

      {state.error && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}
      {state.savedAt && !state.error && (
        <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Modifications enregistrées.
        </p>
      )}

      <form action={formAction} className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          {article && <input type="hidden" name="id" value={article.id} />}
          <input type="hidden" name="coverImageUrl" value={coverImageUrl} />
          <input type="hidden" name="colorStart" value={colorStart} />
          <input type="hidden" name="colorEnd" value={colorEnd} />
          <input type="hidden" name="imageIdx" value={imageIdx} />

          <div>
            <label htmlFor="title" className={LABEL}>
              Titre
            </label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={locked}
              maxLength={120}
              className={`mt-2 ${FIELD}`}
              placeholder="Préparer un semi en 10 semaines sans te cramer"
            />
            {state.fieldErrors?.title && (
              <p className="mt-1.5 text-sm text-red-600">{state.fieldErrors.title}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="tag" className={LABEL}>
                Rubrique
              </label>
              <select
                id="tag"
                name="tag"
                value={tag}
                onChange={(event) => setTag(event.target.value)}
                disabled={locked}
                className={`mt-2 ${FIELD}`}
              >
                {TAGS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                {!TAGS.includes(tag as (typeof TAGS)[number]) && <option value={tag}>{tag}</option>}
              </select>
            </div>

            <div>
              <label htmlFor="locale" className={LABEL}>
                Langue
              </label>
              <select
                id="locale"
                name="locale"
                value={locale}
                onChange={(event) => setLocale(event.target.value as "fr" | "en")}
                disabled={locked}
                className={`mt-2 ${FIELD}`}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="body" className={LABEL}>
              Article
            </label>
            <p className="mt-1 text-xs text-zinc-500">
              Une ligne vide sépare deux paragraphes. L&apos;application affiche du texte simple :
              ni gras, ni liens, ni images dans le corps.
            </p>
            <textarea
              id="body"
              name="body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              disabled={locked}
              rows={18}
              className={`mt-2 ${FIELD} leading-relaxed`}
              placeholder={"Premier paragraphe.\n\nDeuxième paragraphe."}
            />
            <p className="mt-1.5 text-xs text-zinc-500">
              {paragraphs.length} paragraphe{paragraphs.length > 1 ? "s" : ""} · ~{autoReadMin} min
              de lecture
            </p>
            {state.fieldErrors?.body && (
              <p className="mt-1.5 text-sm text-red-600">{state.fieldErrors.body}</p>
            )}
          </div>

          {publisher.is_admin && (
            <div className="grid gap-4 rounded-2xl bg-white p-4 ring-1 ring-zinc-200 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-zinc-900">Signature</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Réservé à la rédaction Runly. Pour un média partenaire, la signature vient
                  automatiquement de son compte.
                </p>
              </div>
              <div>
                <label htmlFor="source" className={LABEL}>
                  Auteur affiché
                </label>
                <input
                  id="source"
                  name="source"
                  value={source}
                  onChange={(event) => setSource(event.target.value)}
                  className={`mt-2 ${FIELD}`}
                />
              </div>
              <div>
                <label htmlFor="sourceUrl" className={LABEL}>
                  Lien vers l&apos;article d&apos;origine
                </label>
                <input
                  id="sourceUrl"
                  name="sourceUrl"
                  type="url"
                  value={sourceUrl}
                  onChange={(event) => setSourceUrl(event.target.value)}
                  className={`mt-2 ${FIELD}`}
                  placeholder="https://…"
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {isLive && publisher.is_admin ? (
              <SubmitButton
                name="intent"
                value="published"
                intent="published"
                pendingLabel="Enregistrement…"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: BRAND }}
              >
                Enregistrer — reste en ligne
              </SubmitButton>
            ) : (
              <>
                <SubmitButton
                  name="intent"
                  value="draft"
                  intent="draft"
                  pendingLabel="Enregistrement…"
                  disabled={locked}
                  className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 disabled:opacity-50"
                >
                  Enregistrer le brouillon
                </SubmitButton>
                <SubmitButton
                  name="intent"
                  value={publisher.is_admin ? "published" : "pending"}
                  intent={publisher.is_admin ? "published" : "pending"}
                  pendingLabel={publisher.is_admin ? "Publication…" : "Envoi…"}
                  disabled={locked}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: BRAND }}
                >
                  {publisher.is_admin ? "Publier dans l'app" : "Soumettre à Runly"}
                </SubmitButton>
              </>
            )}
          </div>
        </div>

        {/* ─── Colonne latérale : apparence et aperçu ─── */}
        <aside className="space-y-5">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
            <p className="text-sm font-medium text-zinc-900">Aperçu dans l&apos;app</p>
            <div className="mt-3 overflow-hidden rounded-2xl">
              <div
                className="relative flex h-36 flex-col justify-end p-4"
                style={{
                  backgroundImage: coverImageUrl
                    ? `linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.1)), url(${coverImageUrl})`
                    : `linear-gradient(135deg, ${colorStart}, ${colorEnd})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="w-fit rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                  {tag}
                </span>
                <p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-white">
                  {title || "Titre de l'article"}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-zinc-50 px-3 py-2 text-[11px] text-zinc-500">
                <PublisherAvatar
                  name={publisher.is_admin ? source || publisher.display_name : publisher.display_name}
                  logoUrl={publisher.logo_url}
                  size={18}
                />
                <span className="min-w-0 truncate font-medium text-zinc-700">
                  {publisher.is_admin ? source || publisher.display_name : publisher.display_name}
                </span>
                <span className="ml-auto shrink-0">{readMin || autoReadMin} min</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
            <p className={LABEL}>Dégradé de la carte</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {GRADIENT_PRESETS.map((preset) => {
                const active = preset.start === colorStart && preset.end === colorEnd;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    disabled={locked}
                    onClick={() => {
                      setColorStart(preset.start);
                      setColorEnd(preset.end);
                    }}
                    title={preset.name}
                    aria-label={preset.name}
                    aria-pressed={active}
                    className={`h-9 w-9 rounded-lg transition-transform hover:scale-105 ${
                      active ? "ring-2 ring-zinc-900 ring-offset-2" : ""
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${preset.start}, ${preset.end})`,
                    }}
                  />
                );
              })}
            </div>
            {state.fieldErrors?.colors && (
              <p className="mt-1.5 text-sm text-red-600">{state.fieldErrors.colors}</p>
            )}
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
            <p className={LABEL}>Image de couverture</p>
            <p className="mt-1 text-xs text-zinc-500">
              Optionnelle. Sans image, la carte utilise le dégradé et une photo de secours.
            </p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              disabled={locked || uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleCoverUpload(file);
              }}
              className="mt-2.5 block w-full text-xs text-zinc-600 file:mr-3 file:rounded-full file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-zinc-700"
            />
            {uploading && <p className="mt-2 text-xs text-zinc-500">Envoi en cours…</p>}
            {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}
            {coverImageUrl && !uploading && (
              <button
                type="button"
                onClick={() => setCoverImageUrl("")}
                disabled={locked}
                className="mt-2 text-xs text-zinc-500 underline"
              >
                Retirer l&apos;image
              </button>
            )}

            {!coverImageUrl && (
              <div className="mt-4">
                <label htmlFor="imageIdx" className="text-xs font-medium text-zinc-700">
                  Photo de secours
                </label>
                <div className="mt-1.5 flex gap-1.5">
                  {Array.from({ length: FALLBACK_IMAGE_COUNT }, (_, index) => (
                    <button
                      key={index}
                      type="button"
                      disabled={locked}
                      onClick={() => setImageIdx(index)}
                      aria-pressed={imageIdx === index}
                      className={`h-7 w-7 rounded-md text-xs font-medium transition-colors ${
                        imageIdx === index
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
            <label htmlFor="readMin" className={LABEL}>
              Temps de lecture
            </label>
            <div className="mt-2 flex items-center gap-2">
              <input
                id="readMin"
                name="readMin"
                type="number"
                min={1}
                max={60}
                value={readMin}
                onChange={(event) => setReadMin(event.target.value)}
                disabled={locked}
                placeholder={String(autoReadMin)}
                className={FIELD}
              />
              <span className="text-sm text-zinc-500">min</span>
            </div>
            <p className="mt-1.5 text-xs text-zinc-500">
              Laissé vide, il est calculé depuis le texte.
            </p>
          </div>
        </aside>
      </form>
    </main>
  );
}
