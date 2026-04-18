import Image from "next/image";

export function HeroSection() {
  return (
    <section
      className="w-full border-b border-zinc-100 bg-white px-3 pb-16 pt-6 sm:px-5 sm:pb-20 sm:pt-8 lg:px-8 lg:pb-28 lg:pt-10"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="max-w-2xl text-left">
          <p className="inline-flex flex-wrap items-center gap-x-1.5 rounded-full border border-[#4EA6F5]/25 bg-white px-4 py-2 text-sm leading-snug text-zinc-600 sm:text-[0.9375rem]">
            <span>Plébiscité par des coureurs</span>
            <span className="text-zinc-400" aria-hidden>
              ·
            </span>
            <span>
              note{" "}
              <span className="font-semibold text-[#4EA6F5]">4,9</span>
            </span>
          </p>

          <p className="mt-8 text-lg font-semibold text-[#4EA6F5] sm:mt-10 sm:text-xl">
            Découvrez Runly
          </p>

          <h1
            id="hero-heading"
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-zinc-900 sm:mt-4 sm:text-4xl sm:leading-[1.15] lg:text-5xl lg:leading-[1.1]"
          >
            Trouvez des partenaires de running à votre niveau pour progresser
            ensemble
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-600 sm:mt-8 sm:text-lg">
            Runly vous met en relation avec des coureurs qui partagent votre
            allure et vos objectifs, pour vous entraîner ensemble et vous
            dépasser en toute confiance.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#"
              className="inline-flex w-fit max-w-full justify-start leading-none"
              aria-label="Télécharger sur l’App Store"
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
              aria-label="Télécharger sur Google Play"
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
      </div>
    </section>
  );
}
