import type { WebRunningClub } from "@/lib/clubs";

const BRAND = "#4EA6F5";

export type ClubCardCopy = {
  /** `{n}` remplacé par le nombre de membres. */
  membersOne: string;
  membersMany: string;
  /** `{pace}` remplacé par l'allure du club. */
  pace: string;
};

/** Visuel de couverture : bannière du club, sinon première photo d'aperçu. */
function coverUrl(club: WebRunningClub) {
  return club.bannerUrl ?? club.previewPhotoUrls[0] ?? null;
}

export function ClubCard({ club, tr }: { club: WebRunningClub; tr: ClubCardCopy }) {
  const cover = coverUrl(club);
  const membersLabel = (club.members === 1 ? tr.membersOne : tr.membersMany).replace(
    "{n}",
    String(club.members),
  );
  const subtitle = [membersLabel, club.district].filter(Boolean).join(" · ");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Couverture : même composition que la carte de l'app (logo à gauche, badge à droite) */}
      <div className="relative h-36 w-full overflow-hidden bg-[#EAF4FE]">
        {cover ? (
          // Photos hébergées sur Supabase Storage : balise native, pas d'optimisation Next.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" className="size-full object-cover" loading="lazy" />
        ) : (
          <div
            className="size-full"
            style={{ background: `linear-gradient(135deg, ${BRAND} 0%, #7FC2F8 100%)` }}
          />
        )}
        <div
          className="absolute inset-x-0 top-0 h-1/2"
          style={{ background: "linear-gradient(to bottom, rgba(15,23,42,0.35), transparent)" }}
          aria-hidden
        />

        <div className="absolute left-2.5 top-2.5">
          {club.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={club.logoUrl}
              alt=""
              className="size-11 rounded-2xl border-2 border-white object-cover shadow-sm"
              loading="lazy"
            />
          ) : (
            <span
              className="inline-flex size-11 items-center justify-center rounded-2xl border-2 border-white text-sm font-bold text-white shadow-sm"
              style={{ backgroundColor: BRAND }}
              aria-hidden
            >
              {club.logoLabel}
            </span>
          )}
        </div>

        {club.badgeLabel && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-white/85 px-2.5 py-1 text-[0.6875rem] font-semibold text-zinc-800 shadow-sm backdrop-blur-sm">
            {club.badgeLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 py-3.5">
        <h3 className="text-pretty text-base font-bold leading-snug tracking-tight text-zinc-900 sm:text-[1.0625rem]">
          {club.name}
        </h3>
        {subtitle && <p className="mt-0.5 text-sm text-zinc-500">{subtitle}</p>}
        {club.paceLabel && (
          <p className="mt-0.5 text-xs font-medium text-zinc-800">
            {tr.pace.replace("{pace}", club.paceLabel)}
          </p>
        )}
      </div>
    </article>
  );
}
