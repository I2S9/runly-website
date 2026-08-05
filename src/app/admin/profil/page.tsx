import { ProfileForm } from "@/components/admin/ProfileForm";
import { listArticles, requirePublisher } from "@/lib/admin/dal";

export const metadata = { title: "Runly — Profil" };

export default async function ProfilePage() {
  const publisher = await requirePublisher();

  // Sert à annoncer combien d'articles seront resignés par un changement d'identité.
  const articles = await listArticles(publisher);
  const owned = articles.filter((article) => article.author_id === publisher.user_id);

  return <ProfileForm publisher={publisher} articleCount={owned.length} />;
}
