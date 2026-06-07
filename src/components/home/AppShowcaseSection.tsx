import type { Translations } from "@/i18n/translations";
import { ShowcaseCarousel } from "@/components/home/ShowcaseCarousel";

const BRAND = "#4EA6F5";

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0"
    >
      <circle cx="10" cy="10" r="10" fill={BRAND} />
      <path
        d="M6 10.5l2.5 2.5L14 8"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AppShowcaseSection({ tr }: { tr: Translations["showcase"] }) {
  return (
    <section id="features" className="w-full bg-white px-3 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20 scroll-mt-20 sm:scroll-mt-24">
      <div className="mx-auto flex w-full max-w-328 flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-6 xl:gap-8">

        <div className="w-full shrink-0 lg:w-[54%]">
          <ShowcaseCarousel imageAlt={tr.imageAlt} />
        </div>

        <div className="w-full min-w-0 lg:w-[46%]">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            {tr.heading}
            <br />
            <span style={{ color: BRAND }}>{tr.headingAccent}</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-zinc-500 sm:text-lg">
            {tr.body}
          </p>

          <ul className="mt-7 space-y-4">
            {tr.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-base leading-snug text-zinc-700 sm:text-lg">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 sm:text-lg"
              style={{ backgroundColor: BRAND }}
            >
              {tr.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
