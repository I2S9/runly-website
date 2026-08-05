"use client";

import { useEffect, useRef, useState } from "react";

const BRAND = "#4EA6F5";

export type FilterGroup = {
  key: string;
  label: string;
  /** Affiche un champ de recherche dans le menu (listes longues, ex. villes). */
  searchable?: boolean;
  searchPlaceholder?: string;
  options: readonly { value: string; label: string; icon?: string }[];
};

export type FilterCopy = {
  reset: string;
  clearGroup: string;
  /** `{n}` est remplacé par le nombre de filtres actifs. */
  selectedCountOne: string;
  selectedCountMany: string;
  noResult: string;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ClubFilters({ groups, tr }: { groups: readonly FilterGroup[]; tr: FilterCopy }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [queries, setQueries] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Fermeture au clic extérieur / touche Échap
  useEffect(() => {
    if (openKey === null) return;
    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpenKey(null);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenKey(null);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openKey]);

  function toggle(groupKey: string, value: string) {
    setSelected((prev) => {
      const current = prev[groupKey] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [groupKey]: next };
    });
  }

  const totalSelected = Object.values(selected).reduce((sum, values) => sum + values.length, 0);

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {groups.map((group) => {
          const values = selected[group.key] ?? [];
          const isOpen = openKey === group.key;
          const isActive = values.length > 0;
          const query = (queries[group.key] ?? "").trim().toLowerCase();
          const options = group.searchable && query
            ? group.options.filter((o) => o.label.toLowerCase().includes(query))
            : group.options;

          return (
            <div key={group.key} className="relative">
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : group.key)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors sm:text-[0.9375rem]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4EA6F5]",
                  isActive
                    ? "border-transparent text-white"
                    : isOpen
                      ? "border-[#4EA6F5] bg-white text-zinc-900"
                      : "border-zinc-200 bg-white text-zinc-800 hover:border-[#4EA6F5] hover:text-zinc-900",
                ].join(" ")}
                style={isActive ? { backgroundColor: BRAND } : undefined}
              >
                <span className="whitespace-nowrap">{group.label}</span>
                {isActive && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold tabular-nums text-[#4EA6F5]">
                    {values.length}
                  </span>
                )}
                <ChevronIcon open={isOpen} />
              </button>

              {isOpen && (
                <div className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
                  {group.searchable && (
                    <div className="border-b border-zinc-100 p-2.5">
                      <input
                        type="search"
                        value={queries[group.key] ?? ""}
                        onChange={(e) => setQueries((prev) => ({ ...prev, [group.key]: e.target.value }))}
                        placeholder={group.searchPlaceholder}
                        className="w-full rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-[#4EA6F5]"
                      />
                    </div>
                  )}

                  <ul className="max-h-64 overflow-y-auto p-1.5">
                    {options.length === 0 && (
                      <li className="px-3 py-4 text-center text-sm text-zinc-500">{tr.noResult}</li>
                    )}
                    {options.map((option) => {
                      const checked = values.includes(option.value);
                      return (
                        <li key={option.value}>
                          <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-800 transition-colors hover:bg-zinc-50">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => toggle(group.key, option.value)}
                            />
                            <span
                              className={[
                                "inline-flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                                checked ? "border-transparent text-white" : "border-zinc-300 text-transparent",
                              ].join(" ")}
                              style={checked ? { backgroundColor: BRAND } : undefined}
                              aria-hidden
                            >
                              <CheckIcon />
                            </span>
                            {option.icon && <span aria-hidden>{option.icon}</span>}
                            <span className="min-w-0 flex-1">{option.label}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>

                  {values.length > 0 && (
                    <div className="border-t border-zinc-100 px-3 py-2.5">
                      <button
                        type="button"
                        onClick={() => setSelected((prev) => ({ ...prev, [group.key]: [] }))}
                        className="text-sm font-semibold text-[#4EA6F5] hover:underline"
                      >
                        {tr.clearGroup}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalSelected > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-zinc-500">
            {(totalSelected > 1 ? tr.selectedCountMany : tr.selectedCountOne).replace(
              "{n}",
              String(totalSelected),
            )}
          </span>
          {groups.flatMap((group) =>
            (selected[group.key] ?? []).map((value) => {
              const option = group.options.find((o) => o.value === value);
              if (!option) return null;
              return (
                <button
                  key={`${group.key}:${value}`}
                  type="button"
                  onClick={() => toggle(group.key, value)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
                >
                  {option.label}
                  <CloseIcon />
                </button>
              );
            }),
          )}
          <button
            type="button"
            onClick={() => setSelected({})}
            className="text-sm font-semibold text-[#4EA6F5] hover:underline"
          >
            {tr.reset}
          </button>
        </div>
      )}
    </div>
  );
}
