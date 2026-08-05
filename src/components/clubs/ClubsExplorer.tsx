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

  const groups = useMemo<FilterGroup[]>(() => {
    // Villes : issues des clubs publiés, elles ne sont pas énumérables à l'avance.
    const cities = [...new Set(clubs.map((club) => club.city).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({ value, label: titleCase(value) }));

    // Niveau, type et badge : valeurs fixes du modèle de l'app, affichées en entier
    // pour que la barre de filtres reste stable quel que soit le nombre de clubs.
    const fixed = (labels: Record<string, string>) =>
      Object.entries(labels).map(([value, label]) => ({ value, label }));

    return [
      {
        key: "city",
        label: tr.cityGroup,
        searchable: true,
        searchPlaceholder: tr.citySearch,
        options: cities,
      },
      { key: "level", label: tr.levelGroup, options: fixed(tr.levels) },
      { key: "focus", label: tr.focusGroup, options: fixed(tr.focuses) },
      { key: "badge", label: tr.badgeGroup, options: fixed(tr.badges) },
    ];
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
      <ClubFilters
        groups={groups}
        tr={tr.filters}
        selected={selected}
        onSelectedChange={setSelected}
      />

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
