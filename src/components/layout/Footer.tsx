import Image from "next/image";
import Link from "next/link";
import type { Translations } from "@/i18n/translations";
import { DownloadButtons } from "@/components/ui/DownloadButtons";

const BRAND = "#4EA6F5";

export function Footer({
  tr,
  trModal,
}: {
  tr: Translations["footer"];
  trModal: Translations["downloadModal"];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto px-3 pb-3 pt-2 font-sans sm:px-5 sm:pb-4 sm:pt-3 lg:px-8">

      {/* ── CTA banner bleu ── */}
      <div
        className="mx-auto w-full max-w-328 rounded-2xl px-3 pb-12 pt-14 text-white sm:rounded-3xl sm:px-5 sm:pb-14 sm:pt-16 lg:px-8"
        style={{ backgroundColor: BRAND }}
      >
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
          {tr.ctaHeading}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-white/85 sm:text-lg">
          {tr.ctaSubtitle}
        </p>
        <div className="mt-6">
          <DownloadButtons
            tr={{
              downloadAppStore: tr.downloadAppStore,
              downloadGooglePlay: tr.downloadGooglePlay,
              downloadModal: trModal,
            }}
            size="lg"
            layout="row"
          />
        </div>
      </div>

      {/* ── Rectangle blanc (liens) ── */}
      <div className="mx-auto mt-3 w-full max-w-328 rounded-2xl border border-zinc-100 bg-white px-3 pb-6 pt-9 sm:rounded-3xl sm:px-5 sm:pb-7 sm:pt-11 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-10 xl:gap-12">
          <div className="flex w-full max-w-md shrink-0 flex-col justify-between text-left lg:max-w-sm">
            <div>
              <Link href="/" className="inline-flex min-w-0 max-w-full items-center gap-2.5 sm:gap-3">
                <Image src="/branding/runly.svg" alt="" width={48} height={48} className="size-9 shrink-0 object-contain sm:size-10" unoptimized />
                <span className="text-base font-bold leading-none tracking-tight text-zinc-900 sm:text-lg">Runly</span>
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-[0.9375rem]">
                {tr.tagline}
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="flex items-center gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-zinc-400 transition hover:text-zinc-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-zinc-400 transition hover:text-zinc-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-zinc-400 transition hover:text-zinc-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
              <p className="mt-3 text-xs leading-none text-zinc-400 sm:text-sm">
                {tr.copyright(year)}
              </p>
            </div>
          </div>

          <div className="grid w-full min-w-0 max-w-2xl flex-1 grid-cols-1 gap-10 min-[400px]:grid-cols-2 min-[400px]:gap-x-4 min-[400px]:gap-y-0 sm:gap-x-5 md:gap-x-6 lg:ml-auto lg:pl-8 xl:pl-12">
            <nav aria-labelledby="footer-about-2">
              <h2 id="footer-about-2" className="text-base font-bold leading-none tracking-tight text-zinc-900 sm:text-lg">
                {tr.aboutTitle}
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm sm:mt-5 sm:text-[0.9375rem]">
                {tr.aboutLinks.map(({ href, label }) => (
                  <li key={href}>
                    {href.startsWith("mailto:") ? (
                      <a href={href} className="text-zinc-500 transition hover:text-zinc-900">{label}</a>
                    ) : (
                      <Link href={href} className="text-zinc-500 transition hover:text-zinc-900">{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-info-2">
              <h2 id="footer-info-2" className="text-base font-bold leading-none tracking-tight text-zinc-900 sm:text-lg">
                {tr.infoTitle}
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm sm:mt-5 sm:text-[0.9375rem]">
                {tr.infoLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-zinc-500 transition hover:text-zinc-900">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

    </footer>
  );
}
