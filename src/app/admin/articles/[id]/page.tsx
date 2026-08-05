import { notFound } from "next/navigation";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { getArticle, requirePublisher } from "@/lib/admin/dal";

export const metadata = { title: "Runly — Modifier l'article" };

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const publisher = await requirePublisher();
  const { id } = await params;

  const article = await getArticle(id);
  if (!article) notFound();

  // Les articles en ligne restent lisibles par tout compte authentifié (c'est
  // du contenu public dans l'app) : le back-office, lui, ne montre à un
  // partenaire que ses propres articles.
  if (!publisher.is_admin && article.author_id !== publisher.user_id) notFound();

  return <ArticleEditor publisher={publisher} article={article} />;
}
