"use client";

import { useMemo, useState } from "react";
import { ClubFilters, type FilterCopy, type FilterGroup } from "@/components/clubs/ClubFilters";
import { ClubCard, type ClubCardCopy } from "@/components/clubs/ClubCard";
import type { WebRunningClub } from "@/lib/clubs";

export type ExplorerCopy = {
  filters: FilterCopy;
  card: ClubCardCopy;
  /** Libellés des groupes de filtres. */
  cityGroup: string;
  citySearch: string;
  levelGroup: string;
  focusGroup: string;
  badgeGroup: string;
  /** Traduction des valeurs stockées en base. */
  levels: Record<string, string>;
  focuses: Record<string, string>;
  badges: Record<string, string>;
  /** `{n}` remplacé par le nombre de clubs affichés. */
  resultsOne: string;
  resultsMany: string;
  /** Aucun club ne passe les filtres. */
  noMatch: string;
};

/** Champ interrogé par chaque groupe de filtres. */
const FIELDS: Record<string, keyof WebRunningClub> = {
  city: "city",
  level: "paceLevel",
  focus: "focus",
  badge: "badgeKind",
};

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ClubsExplorer({ clubs, tr }: { clubs: WebRunningClub[]; tr: ExplorerCopy }) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  // Options construites depuis les clubs réellement publiés : jamais de filtre vide.
  const groups = useMemo<FilterGroup[]>(() => {
    const optionsFor = (field: keyof WebRunningClub, labels?: Record<string, string>) => {
      const values = [...new Set(clubs.map((club) => String(club[field])).filter(Boolean))];
      values.sort((a, b) => (labels?.[a] ?? a).localeCompare(labels?.[b] ?? b));
      return values.map((value) => ({ value, label: labels?.[value] ?? titleCase(value) }));
    };

    return [
      {
        key: "city",
        label: tr.cityGroup,
        searchable: true,
        searchPlaceholder: tr.citySearch,
        options: optionsFor("city"),
      },
      { key: "level", label: tr.levelGroup, options: optionsFor("paceLevel", tr.levels) },
      { key: "focus", label: tr.focusGroup, options: optionsFor("focus", tr.focuses) },
      { key: "badge", label: tr.badgeGroup, options: optionsFor("badgeKind", tr.badges) },
    ].filter((group) => group.options.length > 1);
  }, [clubs, tr]);

  const visible = useMemo(() => {
    const active = Object.entries(selected).filter(([, values]) => values.length > 0);
    if (active.length === 0) return clubs;
    return clubs.filter((club) =>
      active.every(([key, values]) => {
        const field = FIELDS[key];
        return field ? values.includes(String(club[field])) : true;
      }),
    );
  }, [clubs, selected]);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {groups.length > 0 && (
        <ClubFilters
          groups={groups}
          tr={tr.filters}
          selected={selected}
          onSelectedChange={setSelected}
        />
      )}

      <p className="text-sm font-semibold text-zinc-500">
        {(visible.length === 1 ? tr.resultsOne : tr.resultsMany).replace(
          "{n}",
          String(visible.length),
        )}
      </p>

      {visible.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-zinc-300 px-6 py-12 text-center text-sm font-medium text-zinc-500">
          {tr.noMatch}
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
          {visible.map((club) => (
            <li key={club.id}>
              <ClubCard club={club} tr={tr.card} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
