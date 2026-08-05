"use client";

import { useActionState, useState } from "react";
import { saveProfile, type ProfileState } from "@/app/admin/actions";
import { BackLink } from "@/components/admin/BackLink";
import { PublisherAvatar } from "@/components/admin/PublisherAvatar";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { Publisher } from "@/lib/admin/types";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const BRAND = "#4EA6F5";

const FIELD =
  "w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900";

export function ProfileForm({
  publisher,
  articleCount,
}: {
  publisher: Publisher;
  articleCount: number;
}) {
  const [state, formAction] = useActionState<ProfileState, FormData>(saveProfile, {});

  const [displayName, setDisplayName] = useState(publisher.display_name);
  const [siteUrl, setSiteUrl] = useState(publisher.site_url ?? "");
  const [logoUrl, setLogoUrl] = useState(publisher.logo_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleLogoUpload(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "png";
      const path = `${publisher.user_id}/logo-${crypto.randomUUID()}.${extension}`;

      const { error } = await supabase.storage
        .from("news-media")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (error) {
        setUploadError("Envoi impossible. JPG, PNG, WebP ou AVIF, 5 Mo maximum.");
        return;
      }

      const { data } = supabase.storage.from("news-media").getPublicUrl(path);
      setLogoUrl(data.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <BackLink label="Articles" />

      <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">Profil</h1>
      <p className="mt-1.5 text-sm text-zinc-500">
        C&apos;est sous cette identité que paraissent tes articles dans l&apos;application.
      </p>

      {state.error && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}
      {state.savedAt && !state.error && (
        <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Profil enregistré{articleCount > 0 && ` — ${articleCount} article${articleCount > 1 ? "s" : ""} resigné${articleCount > 1 ? "s" : ""}`}.
        </p>
      )}

      <form action={formAction} className="mt-6 space-y-6">
        <input type="hidden" name="logoUrl" value={logoUrl} />

        {/* Aperçu de la signature telle qu'elle apparaît sous un article */}
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
          <PublisherAvatar name={displayName || "?"} logoUrl={logoUrl || null} size={44} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-900">
              {displayName || "Nom du média"}
            </p>
            <p className="truncate text-xs text-zinc-500">
              {siteUrl || "Aucun site renseigné"}
            </p>
          </div>
          {publisher.is_admin && (
            <span className="ml-auto shrink-0 rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-white">
              Rédaction
            </span>
          )}
        </div>

        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-zinc-700">
            Nom affiché
          </label>
          <input
            id="displayName"
            name="displayName"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            maxLength={60}
            required
            className={`mt-2 ${FIELD}`}
          />
          <p className="mt-1.5 text-xs text-zinc-500">
            Signature affichée sous chaque article. La modifier resigne aussi les articles
            déjà en ligne.
          </p>
        </div>

        <div>
          <label htmlFor="siteUrl" className="block text-sm font-medium text-zinc-700">
            Site
          </label>
          <input
            id="siteUrl"
            name="siteUrl"
            type="url"
            value={siteUrl}
            onChange={(event) => setSiteUrl(event.target.value)}
            placeholder="https://…"
            className={`mt-2 ${FIELD}`}
          />
          <p className="mt-1.5 text-xs text-zinc-500">
            Lien proposé aux lecteurs depuis l&apos;article.
          </p>
        </div>

        <div>
          <p className="block text-sm font-medium text-zinc-700">Logo</p>
          <div className="mt-2 flex items-center gap-4">
            <PublisherAvatar name={displayName || "?"} logoUrl={logoUrl || null} size={56} />
            <div className="min-w-0 flex-1">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                disabled={uploading}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void handleLogoUpload(file);
                }}
                className="block w-full text-xs text-zinc-600 file:mr-3 file:rounded-full file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-zinc-700"
              />
              {uploading && <p className="mt-1.5 text-xs text-zinc-500">Envoi en cours…</p>}
              {uploadError && <p className="mt-1.5 text-xs text-red-600">{uploadError}</p>}
              {logoUrl && !uploading && (
                <button
                  type="button"
                  onClick={() => setLogoUrl("")}
                  className="mt-1.5 text-xs text-zinc-500 underline"
                >
                  Retirer le logo
                </button>
              )}
            </div>
          </div>
        </div>

        <SubmitButton
          pendingLabel="Enregistrement…"
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: BRAND }}
        >
          Enregistrer le profil
        </SubmitButton>
      </form>
    </main>
  );
}
