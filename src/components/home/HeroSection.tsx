import Image from "next/image";
import type { Translations } from "@/i18n/translations";

export function HeroSection({ tr }: { tr: Translations["hero"] }) {
  return (
    <section
      className="w-full border-b border-zinc-100 bg-white px-3 pb-14 pt-5 sm:px-5 sm:pb-20 sm:pt-7 lg:px-8 lg:pb-28 lg:pt-8"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto flex w-full max-w-[82rem] flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 xl:gap-14">
        {/* Texte */}
        <div className="min-w-0 flex-1 text-left">
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm leading-snug text-zinc-800 sm:text-[0.9375rem]">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <span className="text-base leading-none sm:text-lg" aria-hidden>⭐</span>
              <span className="whitespace-nowrap font-semibold tabular-nums text-zinc-900">
                {tr.rating}
              </span>
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-400" aria-hidden />
            <span className="min-w-0 text-zinc-600">{tr.badge}</span>
          </p>

          <p className="mt-3 text-base font-semibold text-[#4EA6F5] sm:mt-4 sm:text-lg lg:text-xl">
            {tr.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="mt-2 text-balance text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl sm:leading-[1.15] lg:text-5xl lg:leading-[1.1]"
          >
            {tr.h1[0]}{" "}{tr.h1[1]}
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-600 sm:mt-5 sm:text-lg">
            {tr.body}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
            <a href="#" className="inline-flex shrink-0 leading-none" aria-label={tr.downloadAppStore}>
              <Image
                src="/branding/app-store.png"
                alt=""
                width={200}
                height={60}
                className="h-10 w-auto object-contain object-left sm:h-12"
                priority
                unoptimized
              />
            </a>
            <a href="#" className="inline-flex shrink-0 leading-none" aria-label={tr.downloadGooglePlay}>
              <Image
                src="/branding/google-play.webp"
                alt=""
                width={220}
                height={66}
                className="h-10 w-auto object-contain object-left sm:h-12"
                priority
                unoptimized
              />
            </a>
          </div>
        </div>

        {/* Image : paysage sur mobile/tablette, portrait sur desktop */}
        <div className="relative w-full shrink-0 self-center sm:max-w-sm lg:max-w-[26rem] xl:max-w-[30rem]">
          <div className="relative w-full overflow-hidden rounded-2xl ring-1 ring-zinc-100/80 aspect-4/3 lg:aspect-3/4">
            <Image
              src="/images/home/running-friends.jpg"
              alt={tr.imageAlt}
              fill
              className="object-cover object-[50%_68%]"
              priority
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 24rem, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
