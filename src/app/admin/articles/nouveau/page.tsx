import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { requirePublisher } from "@/lib/admin/dal";

export const metadata = { title: "Runly — Nouvel article" };

export default async function NewArticlePage() {
  const publisher = await requirePublisher();
  return <ArticleEditor publisher={publisher} article={null} />;
}
