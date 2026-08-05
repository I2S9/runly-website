"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const BRAND = "#4EA6F5";

export function LoginForm({
  linkError,
  accessError,
}: {
  linkError: boolean;
  accessError: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();

      if (useMagicLink) {
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
            // Aucune inscription libre : les comptes rédaction sont créés à la main.
            shouldCreateUser: false,
          },
        });
        if (otpError) {
          setError("Envoi impossible. Vérifie l'adresse, ou contacte Runly.");
          return;
        }
        setSent(true);
        return;
      }

      const { error: passwordError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (passwordError) {
        setError("Adresse ou mot de passe incorrect.");
        return;
      }

      // Rechargement complet plutôt que router.push : le serveur doit relire
      // les cookies de session que le client vient d'écrire.
      window.location.assign("/admin");
    } finally {
      // Sans ce finally, un échec réseau laisserait le bouton bloqué.
      setSending(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <div className="inline-block self-start">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Espace rédaction</h1>
        <div
          className="mt-3 h-1 w-full rounded-full"
          style={{ backgroundColor: BRAND }}
          aria-hidden
        />
      </div>

      <p className="mt-5 text-sm leading-relaxed text-zinc-600">
        {useMagicLink
          ? "Reçois un lien de connexion par e-mail."
          : "Connecte-toi avec les identifiants fournis par Runly."}{" "}
        Les accès sont ouverts par Runly : pas d&apos;inscription depuis cette page.
      </p>

      {linkError && (
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Ce lien a expiré ou a déjà servi. Demandes-en un nouveau.
        </p>
      )}
      {accessError && (
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Session expirée. Reconnecte-toi pour reprendre.
        </p>
      )}

      {sent ? (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-medium text-zinc-900">Lien envoyé</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Ouvre l&apos;e-mail envoyé à {email} depuis cet appareil. Le lien est valable une
            seule fois.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
              placeholder="redaction@monmedia.fr"
            />
          </div>

          {!useMagicLink && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
              />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={sending || email.trim().length === 0}
            className="w-full rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
            style={{ backgroundColor: BRAND }}
          >
            {sending ? "…" : useMagicLink ? "Recevoir le lien" : "Se connecter"}
          </button>

          <button
            type="button"
            onClick={() => {
              setUseMagicLink((value) => !value);
              setError(null);
            }}
            className="w-full text-center text-xs text-zinc-500 underline"
          >
            {useMagicLink
              ? "Utiliser plutôt un mot de passe"
              : "Recevoir plutôt un lien par e-mail"}
          </button>
        </form>
      )}
    </main>
  );
}
