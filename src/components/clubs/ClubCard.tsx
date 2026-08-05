import type { RunningClub } from "@/data/runningClubs";

const BRAND = "#4EA6F5";

export type ClubCardCopy = {
  members: string;
  /** `{n}` remplacé par le nombre de tags non affichés. */
  moreTags: string;
};

/** Initiales du club, affichées dans la pastille de tête. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /[a-zA-ZÀ-ÿ0-9]/.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function ClubCard({
  club,
  tags,
  tr,
}: {
  club: RunningClub;
  tags: readonly string[];
  tr: ClubCardCopy;
}) {
  const visibleTags = tags.slice(0, 5);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <article className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-5 transition-colors duration-200 hover:border-[#4EA6F5] sm:p-6">
      <div className="flex items-start gap-3">
        <span
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white"
          style={{ backgroundColor: BRAND }}
          aria-hidden
        >
          {initials(club.name)}
        </span>
        <div className="min-w-0">
          <h3 className="text-pretty text-base font-bold leading-snug tracking-tight text-zinc-900 sm:text-lg">
            {club.name}
          </h3>
          <p className="mt-0.5 truncate text-sm text-zinc-500">
            <span aria-hidden>{club.flag}</span> {club.cityLabel}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-[#4EA6F5]">
        {club.members} {tr.members}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {visibleTags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700"
          >
            {tag}
          </li>
        ))}
        {hiddenCount > 0 && (
          <li className="rounded-full px-2.5 py-1 text-xs font-medium text-zinc-400">
            {tr.moreTags.replace("{n}", String(hiddenCount))}
          </li>
        )}
      </ul>
    </article>
  );
}
