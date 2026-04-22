import Image from "next/image";
import type { Translations } from "@/i18n/translations";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function HeroSection({ tr }: { tr: Translations["hero"] }) {
  return (
    <section
      className="w-full border-b border-zinc-100 bg-white px-3 pb-16 pt-9 sm:px-5 sm:pb-20 sm:pt-11 lg:px-8 lg:pb-28 lg:pt-12"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto flex w-full max-w-[71rem] flex-col gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-14">
        <div className="min-w-0 max-w-2xl flex-1 text-left">
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm leading-snug text-zinc-800 sm:text-[0.9375rem]">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <span className="text-base leading-none sm:text-lg" aria-hidden>⭐</span>
              <span className="whitespace-nowrap font-semibold tabular-nums text-zinc-900">
                {tr.rating}
              </span>
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-[#4EA6F5]/45" aria-hidden />
            <span className="min-w-0 text-zinc-600">{tr.badge}</span>
          </p>

          <p className="mt-2 text-lg font-semibold text-[#4EA6F5] sm:mt-2.5 sm:text-xl">
            {tr.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="mt-2 text-balance text-3xl font-bold tracking-tight text-zinc-900 sm:mt-2.5 sm:text-4xl sm:leading-[1.15] lg:text-5xl lg:leading-[1.1]"
          >
            {tr.h1[0]}{" "}
            {tr.h1[1]}
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-600 sm:mt-5 sm:text-lg">
            {tr.body}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#"
              className="inline-flex w-fit max-w-full justify-start leading-none"
              aria-label={tr.downloadAppStore}
            >
              <Image
                src="/branding/get-it-on-apple.png"
                alt=""
                width={200}
                height={60}
                className="h-11 w-auto object-contain object-left sm:h-12 lg:h-13"
                priority
                unoptimized
              />
            </a>
            <a
              href="#"
              className="inline-flex w-fit max-w-full justify-start leading-none"
              aria-label={tr.downloadGooglePlay}
            >
              <Image
                src="/branding/google-play-store-logo-png.webp"
                alt=""
                width={220}
                height={66}
                className="h-11 w-auto object-contain object-left sm:h-12 lg:h-13"
                priority
                unoptimized
              />
            </a>
          </div>
        </div>

        <div className="relative w-full shrink-0 self-center sm:max-w-md lg:max-w-[min(100%,20rem)] xl:max-w-sm">
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-zinc-100/80">
            <Image
              src="/images/home/running-friends.jpg"
              alt={tr.imageAlt}
              fill
              className="object-cover object-[50%_68%]"
              priority
              sizes="(min-width: 1280px) 24rem, (min-width: 1024px) 20rem, (min-width: 640px) 28rem, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
