import Link from "next/link";
import { listArticles, requirePublisher } from "@/lib/admin/dal";
import { STATUS_LABELS, type ArticleRow, type ArticleStatus } from "@/lib/admin/types";

export const metadata = { title: "Runly — Articles" };

const BRAND = "#4EA6F5";

const STATUS_STYLES: Record<ArticleStatus, string> = {
  draft: "bg-zinc-100 text-zinc-600",
  pending: "bg-amber-100 text-amber-800",
  published: "bg-emerald-100 text-emerald-800",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ArticleLine({ article, showAuthor }: { article: ArticleRow; showAuthor: boolean }) {
  return (
    <Link
      href={`/admin/articles/${article.id}`}
      className="flex items-center gap-4 border-b border-zinc-100 px-4 py-3.5 transition-colors last:border-b-0 hover:bg-zinc-50 sm:px-5"
    >
      <div
        className="h-10 w-10 shrink-0 rounded-lg"
        style={{
          backgroundImage: `linear-gradient(135deg, ${article.color_start}, ${article.color_end})`,
        }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-900">{article.title}</p>
        <p className="mt-0.5 truncate text-xs text-zinc-500">
          {article.tag} · {article.locale.toUpperCase()} · {formatDate(article.updated_at)}
          {showAuthor && ` · ${article.source}`}
        </p>
      </div>
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[article.status]}`}
      >
        {STATUS_LABELS[article.status]}
      </span>
    </Link>
  );
}

export default async function AdminArticlesPage() {
  const publisher = await requirePublisher();
  const articles = await listArticles(publisher);

  const pendingCount = articles.filter((a) => a.status === "pending").length;
  const rejected = articles.filter((a) => a.status === "draft" && a.rejection_note);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Articles</h1>
          <p className="mt-1.5 text-sm text-zinc-500">
            {publisher.is_admin
              ? `Toute la rédaction · ${pendingCount} en attente de relecture`
              : `Publiés sous la signature « ${publisher.display_name} »`}
          </p>
        </div>
        <Link
          href="/admin/articles/nouveau"
          className="rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: BRAND }}
        >
          Nouvel article
        </Link>
      </div>

      {rejected.length > 0 && !publisher.is_admin && (
        <div className="mt-6 rounded-2xl bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-900">
            {rejected.length === 1
              ? "Un article t'est revenu de relecture"
              : `${rejected.length} articles te sont revenus de relecture`}
          </p>
          <ul className="mt-2 space-y-1">
            {rejected.map((article) => (
              <li key={article.id} className="text-sm text-amber-800">
                <Link href={`/admin/articles/${article.id}`} className="underline">
                  {article.title}
                </Link>{" "}
                — {article.rejection_note}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        {articles.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-zinc-500">
            Aucun article pour l&apos;instant.
          </p>
        ) : (
          articles.map((article) => (
            <ArticleLine key={article.id} article={article} showAuthor={publisher.is_admin} />
          ))
        )}
      </div>
    </main>
  );
}
