import Link from "next/link";

const BRAND = "#4EA6F5";

const footerLinks = [
  { href: "#features", label: "Fonctionnalités" },
  { href: "#rating", label: "Avis" },
  { href: "#contact", label: "Contact" },
  { href: "#about", label: "À propos" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto px-3 pb-3 pt-2 font-sans sm:px-5 sm:pb-4 sm:pt-3 lg:px-8">
      <div
        className="mx-auto w-full max-w-[71rem] rounded-2xl px-3 py-10 text-white sm:rounded-3xl sm:px-5 sm:py-12 lg:px-8"
        style={{ backgroundColor: BRAND }}
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="max-w-md">
            <p className="text-base font-semibold tracking-tight sm:text-lg">
              Runly
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-[0.9375rem]">
              Trouvez des partenaires de course au même niveau que vous et
              progressez ensemble.
            </p>
          </div>

          <nav aria-label="Pied de page">
            <ul className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3 sm:text-[0.9375rem]">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/90">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-white/25 pt-8 text-xs text-white/85 sm:text-sm">
          © {year} Runly. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
