"use client";

import { useMemo, useState } from "react";
import { ClubFilters, type FilterCopy, type FilterGroup } from "@/components/clubs/ClubFilters";
import { ClubCard, type ClubCardCopy } from "@/components/clubs/ClubCard";
import { RUNNING_CLUBS, filterClubs } from "@/data/runningClubs";

export type ExplorerCopy = {
  filters: FilterCopy;
  card: ClubCardCopy;
  /** `{n}` remplacé par le nombre de clubs affichés. */
  resultsOne: string;
  resultsMany: string;
  empty: string;
};

export function ClubsExplorer({
  groups,
  tr,
}: {
  groups: readonly FilterGroup[];
  tr: ExplorerCopy;
}) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const clubs = useMemo(
    () => filterClubs(RUNNING_CLUBS, selected).sort((a, b) => b.members - a.members),
    [selected],
  );

  const labelOf = (groupKey: string, value: string) =>
    groups.find((g) => g.key === groupKey)?.options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <ClubFilters
        groups={groups}
        tr={tr.filters}
        selected={selected}
        onSelectedChange={setSelected}
      />

      <p className="text-sm font-semibold text-zinc-500">
        {(clubs.length === 1 ? tr.resultsOne : tr.resultsMany).replace("{n}", String(clubs.length))}
      </p>

      {clubs.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-zinc-300 px-6 py-12 text-center text-sm font-medium text-zinc-500">
          {tr.empty}
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
          {clubs.map((club) => (
            <li key={club.id}>
              <ClubCard
                club={club}
                tr={tr.card}
                tags={[
                  ...club.sessions.map((v) => labelOf("session", v)),
                  ...club.days.map((v) => labelOf("day", v)),
                  ...club.moments.map((v) => labelOf("moment", v)),
                  ...club.audiences.map((v) => labelOf("audience", v)),
                  ...club.vibes.map((v) => labelOf("vibe", v)),
                ]}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
