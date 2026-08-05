"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PublisherAvatar } from "@/components/admin/PublisherAvatar";
import {
  STATUS_LABELS,
  parseParagraphs,
  type ArticleRow,
  type ArticleStatus,
} from "@/lib/admin/types";

const STATUS_STYLES: Record<ArticleStatus, string> = {
  draft: "bg-zinc-100 text-zinc-600",
  pending: "bg-amber-100 text-amber-800",
  published: "bg-emerald-100 text-emerald-800",
};

type Filter = "all" | ArticleStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "draft", label: "Brouillons" },
  { key: "pending", label: "En relecture" },
  { key: "published", label: "En ligne" },
];

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function ArticleRowItem({ article, showAuthor }: { article: ArticleRow; showAuthor: boolean }) {
  const paragraphs = parseParagraphs(article.paragraphs);
  const excerpt = paragraphs[0] ?? "Article vide";

  return (
    <Link
      href={`/admin/articles/${article.id}`}
      className="group flex items-start gap-4 border-b border-zinc-100 px-4 py-4 transition-colors last:border-b-0 hover:bg-zinc-50 sm:px-5"
    >
      <div
        className="h-14 w-14 shrink-0 rounded-xl ring-1 ring-black/5"
        style={{
          backgroundImage: article.cover_image_url
            ? `url(${article.cover_image_url})`
            : `linear-gradient(135deg, ${article.color_start}, ${article.color_end})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-3">
          <p className="min-w-0 flex-1 truncate text-sm font-semibold text-zinc-900">
            {article.title}
          </p>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLES[article.status]}`}
          >
            {STATUS_LABELS[article.status]}
          </span>
        </div>

        <p className="mt-1 line-clamp-1 text-xs text-zinc-500">{excerpt}</p>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-500">
          {showAuthor && (
            <span className="flex items-center gap-1.5">
              <PublisherAvatar name={article.source} logoUrl={article.source_logo_url} size={16} />
              <span className="font-medium text-zinc-700">{article.source}</span>
            </span>
          )}
          <span className="rounded-full bg-zinc-100 px-2 py-0.5">{article.tag}</span>
          <span className="uppercase">{article.locale}</span>
          <span>{article.read_min} min</span>
          <span>{dateFormat.format(new Date(article.updated_at))}</span>
          {article.rejection_note && (
            <span className="font-medium text-amber-700">À retravailler</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ArticleList({
  articles,
  showAuthor,
}: {
  articles: ArticleRow[];
  showAuthor: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      all: articles.length,
      draft: 0,
      pending: 0,
      published: 0,
    };
    for (const article of articles) base[article.status] += 1;
    return base;
  }, [articles]);

  const visible = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return articles.filter((article) => {
      if (filter !== "all" && article.status !== filter) return false;
      if (!needle) return true;
      return (
        article.title.toLowerCase().includes(needle) ||
        article.tag.toLowerCase().includes(needle) ||
        article.source.toLowerCase().includes(needle)
      );
    });
  }, [articles, filter, search]);

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((entry) => {
            const active = filter === entry.key;
            return (
              <button
                key={entry.key}
                type="button"
                onClick={() => setFilter(entry.key)}
                aria-pressed={active}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50"
                }`}
              >
                {entry.label}
                <span className={active ? "ml-1.5 text-white/60" : "ml-1.5 text-zinc-400"}>
                  {counts[entry.key]}
                </span>
              </button>
            );
          })}
        </div>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Rechercher un titre, une rubrique…"
          className="ml-auto w-full min-w-0 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm outline-none transition-colors focus:border-zinc-900 sm:w-64"
        />
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        {visible.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-zinc-500">
            {articles.length === 0
              ? "Aucun article pour l'instant. Commence par en créer un."
              : "Rien ne correspond à cette recherche."}
          </p>
        ) : (
          visible.map((article) => (
            <ArticleRowItem key={article.id} article={article} showAuthor={showAuthor} />
          ))
        )}
      </div>
    </>
  );
}
