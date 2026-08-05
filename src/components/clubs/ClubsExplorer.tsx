"use client";

import { useCallback, useMemo, useState } from "react";
import { ClubFilters, type FilterCopy, type FilterGroup } from "@/components/clubs/ClubFilters";
import { ClubWorldMap, type WorldMapCopy } from "@/components/clubs/ClubWorldMap";
import { RUNNING_CLUBS, filterClubs, type RunningClub } from "@/data/runningClubs";

export type ExplorerCopy = {
  filters: FilterCopy;
  map: WorldMapCopy;
  /** `{n}` remplacé par le nombre de clubs affichés. */
  resultsOne: string;
  resultsMany: string;
  members: string;
  close: string;
  seeClub: string;
};

export function ClubsExplorer({
  groups,
  tr,
}: {
  groups: readonly FilterGroup[];
  tr: ExplorerCopy;
}) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

  const clubs = useMemo(() => filterClubs(RUNNING_CLUBS, selected), [selected]);
  const selectedClub = clubs.find((club) => club.id === selectedClubId) ?? null;

  const handleSelect = useCallback((club: RunningClub | null) => {
    setSelectedClubId(club?.id ?? null);
  }, []);

  // Un club masqué par un nouveau filtre ne doit pas rester sélectionné.
  if (selectedClubId && !selectedClub) setSelectedClubId(null);

  const labelOf = (groupKey: string, value: string) =>
    groups.find((g) => g.key === groupKey)?.options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <ClubFilters groups={groups} tr={tr.filters} selected={selected} onSelectedChange={setSelected} />

      <p className="text-sm font-semibold text-zinc-500">
        {(clubs.length === 1 ? tr.resultsOne : tr.resultsMany).replace("{n}", String(clubs.length))}
      </p>

      <div className="relative">
        <ClubWorldMap clubs={clubs} tr={tr.map} onSelect={handleSelect} selectedId={selectedClubId} />

        {selectedClub && (
          <aside className="mt-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-lg sm:p-6 lg:absolute lg:right-4 lg:top-4 lg:mt-0 lg:w-80">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-500">
                  {selectedClub.flag} {selectedClub.cityLabel}
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900">
                  {selectedClub.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClubId(null)}
                aria-label={tr.close}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-800"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <p className="mt-3 text-sm font-semibold text-[#4EA6F5]">
              {selectedClub.members} {tr.members}
            </p>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {[
                ...selectedClub.days.map((v) => labelOf("day", v)),
                ...selectedClub.moments.map((v) => labelOf("moment", v)),
                ...selectedClub.sessions.map((v) => labelOf("session", v)),
                ...selectedClub.audiences.map((v) => labelOf("audience", v)),
                ...selectedClub.vibes.map((v) => labelOf("vibe", v)),
              ].map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700"
                >
                  {label}
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}
