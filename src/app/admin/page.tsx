import Link from "next/link";
import { ArticleList } from "@/components/admin/ArticleList";
import { listArticles, requirePublisher } from "@/lib/admin/dal";

export const metadata = { title: "Runly — Articles" };

const BRAND = "#4EA6F5";

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

      <ArticleList articles={articles} showAuthor={publisher.is_admin} />
    </main>
  );
}
