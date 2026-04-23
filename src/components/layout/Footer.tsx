import Image from "next/image";
import Link from "next/link";
import type { Translations } from "@/i18n/translations";

const BRAND = "#4EA6F5";

export function Footer({ tr }: { tr: Translations["footer"] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto px-3 pb-3 pt-2 font-sans sm:px-5 sm:pb-4 sm:pt-3 lg:px-8">
      <div
        className="mx-auto w-full max-w-[82rem] rounded-2xl px-3 pb-6 pt-9 text-white sm:rounded-3xl sm:px-5 sm:pb-7 sm:pt-11 lg:px-8"
        style={{ backgroundColor: BRAND }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-10 xl:gap-12">
          <div className="flex w-full max-w-md shrink-0 flex-col gap-6 text-left lg:max-w-sm">
            <div>
              <Link
                href="/"
                className="inline-flex min-w-0 max-w-full items-center gap-2.5 sm:gap-3"
              >
                <Image
                  src="/branding/runly.svg"
                  alt=""
                  width={48}
                  height={48}
                  className="size-9 shrink-0 object-contain sm:size-10"
                  unoptimized
                />
                <span className="text-base font-bold leading-none tracking-tight sm:text-lg">
                  Runly
                </span>
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-[0.9375rem]">
                {tr.tagline}
              </p>
            </div>
          </div>

          <div className="grid w-full min-w-0 max-w-2xl flex-1 grid-cols-1 gap-10 min-[400px]:grid-cols-2 min-[400px]:gap-x-4 min-[400px]:gap-y-0 sm:gap-x-5 md:gap-x-6 lg:ml-auto lg:pl-8 xl:pl-12">
            <nav aria-labelledby="footer-about">
              <h2
                id="footer-about"
                className="text-base font-bold leading-none tracking-tight sm:text-lg"
              >
                {tr.aboutTitle}
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm sm:mt-5 sm:text-[0.9375rem]">
                {tr.aboutLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-white/90 transition hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-info">
              <h2
                id="footer-info"
                className="text-base font-bold leading-none tracking-tight sm:text-lg"
              >
                {tr.infoTitle}
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm sm:mt-5 sm:text-[0.9375rem]">
                {tr.infoLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-white/90 transition hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <p className="mt-8 text-xs leading-none text-white/85 sm:mt-6 sm:text-sm">
          {tr.copyright(year)}
        </p>
      </div>
    </footer>
  );
}
