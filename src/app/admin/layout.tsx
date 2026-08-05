import Link from "next/link";
import { signOut } from "@/app/admin/actions";
import { getPublisher } from "@/lib/admin/dal";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const publisher = await getPublisher();

  return (
    <div className="flex w-full flex-1 flex-col bg-zinc-50">
      {/* Pas de barre sur la page de connexion : il n'y a encore rien à naviguer. */}
      {publisher && (
        <header className="border-b border-zinc-200 bg-white">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-4 py-3 sm:px-6">
            <Link href="/admin" className="text-sm font-bold tracking-tight text-zinc-900">
              Rédaction Runly
            </Link>

            <nav className="flex items-center gap-3 text-sm">
              <Link href="/admin" className="text-zinc-600 transition-colors hover:text-zinc-900">
                Articles
              </Link>
              {publisher.is_admin && (
                <Link
                  href="/admin/relecture"
                  className="text-zinc-600 transition-colors hover:text-zinc-900"
                >
                  Relecture
                </Link>
              )}
            </nav>

            <div className="ml-auto flex items-center gap-3">
              <span className="hidden text-sm text-zinc-500 sm:inline">
                {publisher.display_name}
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                  Déconnexion
                </button>
              </form>
            </div>
          </div>
        </header>
      )}

      {children}
    </div>
  );
}
