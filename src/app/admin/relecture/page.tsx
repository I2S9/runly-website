import Link from "next/link";
import { publishArticle, rejectArticle } from "@/app/admin/actions";
import { listPendingArticles, requireAdmin } from "@/lib/admin/dal";
import { parseParagraphs, type ArticleRow } from "@/lib/admin/types";

export const metadata = { title: "Runly — Relecture" };

const BRAND = "#4EA6F5";

function ReviewCard({ article }: { article: ArticleRow }) {
  const paragraphs = parseParagraphs(article.paragraphs);

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex flex-wrap items-start gap-4">
        <div
          className="h-12 w-12 shrink-0 rounded-xl"
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
          <h2 className="text-base font-semibold leading-snug text-zinc-900">{article.title}</h2>
          <p className="mt-1 text-xs text-zinc-500">
            {article.source} · {article.tag} · {article.locale.toUpperCase()} ·{" "}
            {article.read_min} min · {paragraphs.length} paragraphes
          </p>
        </div>
        <Link
          href={`/admin/articles/${article.id}`}
          className="shrink-0 text-xs font-medium text-zinc-600 underline"
        >
          Ouvrir
        </Link>
      </div>

      <div className="mt-4 max-h-56 space-y-2.5 overflow-y-auto rounded-xl bg-zinc-50 p-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed text-zinc-700">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <form action={publishArticle}>
          <input type="hidden" name="id" value={article.id} />
          <button
            type="submit"
            className="rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            Publier dans l&apos;app
          </button>
        </form>

        <form action={rejectArticle} className="flex flex-1 items-center gap-2">
          <input type="hidden" name="id" value={article.id} />
          <input
            name="note"
            placeholder="Ce qui doit être revu…"
            className="min-w-0 flex-1 rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none transition-colors focus:border-zinc-900"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Renvoyer
          </button>
        </form>
      </div>
    </article>
  );
}

export default async function ReviewQueuePage() {
  await requireAdmin();
  const articles = await listPendingArticles();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Relecture</h1>
      <p className="mt-1.5 text-sm text-zinc-500">
        Rien n&apos;apparaît dans l&apos;application avant d&apos;être publié ici.
      </p>

      <div className="mt-6 space-y-5">
        {articles.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-white px-5 py-12 text-center text-sm text-zinc-500">
            Aucun article en attente.
          </p>
        ) : (
          articles.map((article) => <ReviewCard key={article.id} article={article} />)
        )}
      </div>
    </main>
  );
}
