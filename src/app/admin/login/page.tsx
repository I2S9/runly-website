import { redirect } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import { LoginForm } from "@/components/admin/LoginForm";
import { getCurrentUser, getPublisher } from "@/lib/admin/dal";
import { readSupabaseEnv } from "@/lib/supabase/env";

export const metadata = { title: "Runly — Espace rédaction" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  if (!readSupabaseEnv()) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <h1 className="text-xl font-bold text-zinc-900">Configuration manquante</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Définis <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> et{" "}
          <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> dans{" "}
          <code className="font-mono text-xs">.env.local</code>, puis relance le serveur.
        </p>
      </main>
    );
  }

  const publisher = await getPublisher();
  if (publisher) redirect("/admin");

  const user = await getCurrentUser();
  const { erreur } = await searchParams;

  // Connecté mais absent de news_publishers : compte app ordinaire, pas éditeur.
  if (user) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <h1 className="text-xl font-bold text-zinc-900">Accès non autorisé</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Le compte <span className="font-medium text-zinc-900">{user.email}</span> n&apos;a pas
          d&apos;accès rédaction. Écris à{" "}
          <a href="mailto:support@runly-app.com" className="font-medium underline">
            support@runly-app.com
          </a>{" "}
          pour en demander un.
        </p>
        <form action={signOut} className="mt-6">
          <button
            type="submit"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Se déconnecter
          </button>
        </form>
      </main>
    );
  }

  return <LoginForm linkError={erreur === "lien"} accessError={erreur === "acces"} />;
}
