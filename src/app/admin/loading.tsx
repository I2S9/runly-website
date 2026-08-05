/**
 * Squelette affiché pendant le rendu serveur des pages du back-office.
 *
 * Sans ça, un clic sur un article laisse l'écran figé sur la page précédente :
 * on croit que rien ne s'est passé.
 */
export default function AdminLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-zinc-200" />
      <div className="mt-2 h-4 w-72 animate-pulse rounded bg-zinc-200" />

      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="flex items-center gap-4 border-b border-zinc-100 px-4 py-3.5 last:border-b-0 sm:px-5"
          >
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-zinc-200" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-100" />
            </div>
            <div className="h-6 w-20 shrink-0 animate-pulse rounded-full bg-zinc-100" />
          </div>
        ))}
      </div>
    </main>
  );
}
