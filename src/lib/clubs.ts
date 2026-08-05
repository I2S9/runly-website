import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Club tel qu'affiché sur le site, calqué sur la carte « Découvrir » de l'app. */
export type WebRunningClub = {
  id: string;
  name: string;
  district: string;
  city: string;
  members: number;
  paceLabel: string;
  paceLevel: string;
  focus: string;
  badgeKind: string;
  badgeLabel: string;
  logoUrl: string | null;
  logoLabel: string;
  bannerUrl: string | null;
  previewPhotoUrls: string[];
};

type RunningClubRow = {
  id: string;
  name: string;
  district: string | null;
  city: string | null;
  member_count: number | null;
  pace_label: string | null;
  pace_level: string | null;
  focus: string | null;
  badge_kind: string | null;
  badge_label: string | null;
  logo_url: string | null;
  logo_label: string | null;
  banner_url: string | null;
  preview_photo_urls: string[] | string | null;
};

/** `preview_photo_urls` est stocké tantôt en tableau, tantôt en JSON texte. */
function parseUrlList(value: string[] | string | null): string[] {
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string");
  if (typeof value !== "string" || value.trim() === "") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

/** Initiales de repli quand le club n'a pas défini de logo. */
function deriveLogoLabel(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

const CLUB_COLUMNS =
  "id, name, district, city, member_count, pace_label, pace_level, focus, badge_kind, badge_label, logo_url, logo_label, banner_url, preview_photo_urls";

/**
 * Clubs publiés depuis l'app (même projet Supabase que l'application mobile).
 *
 * Lecture via la vue `running_clubs_public`, seule visible sans compte : la RLS
 * de la table `running_clubs` est réservée au rôle `authenticated`. Repli sur la
 * table pour les environnements où la migration n'est pas encore appliquée.
 */
export async function fetchRunningClubs(): Promise<WebRunningClub[]> {
  try {
    const supabase = await createSupabaseServerClient();

    const fromView = await supabase
      .from("running_clubs_public")
      .select(CLUB_COLUMNS)
      .order("member_count", { ascending: false });

    const { data, error } = fromView.error
      ? await supabase
          .from("running_clubs")
          .select(CLUB_COLUMNS)
          .order("member_count", { ascending: false })
      : fromView;

    if (error || !data) return [];

    return (data as RunningClubRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      district: row.district?.trim() ?? "",
      city: row.city?.trim() ?? "",
      members: row.member_count ?? 0,
      paceLabel: row.pace_label?.trim() ?? "",
      paceLevel: row.pace_level?.trim() ?? "",
      focus: row.focus?.trim() ?? "",
      badgeKind: row.badge_kind?.trim() ?? "",
      badgeLabel: row.badge_label?.trim() ?? "",
      logoUrl: row.logo_url ?? null,
      logoLabel: row.logo_label?.trim() || deriveLogoLabel(row.name),
      bannerUrl: row.banner_url ?? null,
      previewPhotoUrls: parseUrlList(row.preview_photo_urls),
    }));
  } catch {
    return [];
  }
}
