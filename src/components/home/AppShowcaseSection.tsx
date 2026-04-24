import type { Translations } from "@/i18n/translations";

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

/* Placeholder phones — replaced by a real screenshot image later */
function PhoneMockups() {
  return (
    <div
      className="relative mx-auto flex w-full max-w-xs items-end justify-center sm:max-w-sm lg:mx-0 lg:max-w-md"
      style={{ height: "clamp(320px, 60vw, 480px)" }}
      aria-hidden
    >
      {/* Phone back-right */}
      <div
        className="absolute bottom-0 right-0 w-[42%] overflow-hidden rounded-4xl border-4 border-zinc-200/60 bg-white shadow-lg"
        style={{ height: "88%", transform: "rotate(5deg) translateX(12px) translateY(8px)", zIndex: 1 }}
      >
        <div className="h-full w-full bg-linear-to-b from-[#e8f4ff] to-[#c8e4ff]">
          <div className="mt-4 px-3 space-y-2">
            <div className="h-2 w-16 rounded-full bg-zinc-300/70" />
            <div className="h-2 w-10 rounded-full bg-zinc-200/70" />
          </div>
          <div className="mx-3 mt-4 h-24 rounded-xl bg-[#4EA6F5]/20" />
          <div className="mt-3 px-3 space-y-1.5">
            <div className="h-2 w-full rounded-full bg-zinc-200/60" />
            <div className="h-2 w-3/4 rounded-full bg-zinc-200/60" />
          </div>
        </div>
      </div>

      {/* Phone back-left */}
      <div
        className="absolute bottom-0 left-0 w-[42%] overflow-hidden rounded-4xl border-4 border-zinc-200/60 bg-white shadow-lg"
        style={{ height: "82%", transform: "rotate(-5deg) translateX(-12px) translateY(16px)", zIndex: 1 }}
      >
        <div className="h-full w-full bg-linear-to-b from-[#f0f8ff] to-[#daeeff]">
          <div className="mx-3 mt-4 h-28 rounded-xl bg-[#4EA6F5]/15">
            {/* Map dots */}
            <div className="relative h-full">
              {[
                { top: "20%", left: "30%" },
                { top: "50%", left: "60%" },
                { top: "65%", left: "25%" },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute size-2.5 rounded-full bg-[#4EA6F5] ring-2 ring-white"
                  style={{ top: pos.top, left: pos.left }}
                />
              ))}
            </div>
          </div>
          <div className="mt-3 px-3 space-y-1.5">
            <div className="h-2 w-full rounded-full bg-zinc-200/60" />
            <div className="h-2 w-2/3 rounded-full bg-zinc-200/60" />
          </div>
        </div>
      </div>

      {/* Phone center-front */}
      <div
        className="relative w-[46%] overflow-hidden rounded-4xl border-4 border-zinc-200/70 bg-white shadow-xl"
        style={{ height: "96%", zIndex: 2 }}
      >
        <div className="h-full w-full bg-linear-to-b from-white to-[#f0f8ff]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 pt-3">
            <div className="h-1.5 w-8 rounded-full bg-zinc-300/70" />
            <div className="h-3 w-3 rounded-full bg-zinc-200" />
          </div>
          {/* Map area */}
          <div className="mx-3 mt-2 h-32 overflow-hidden rounded-xl bg-[#4EA6F5]/10">
            <div className="relative h-full">
              {/* Route line */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points="20,80 35,55 50,60 65,35 80,20"
                  fill="none"
                  stroke="#4EA6F5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {[
                { top: "18%", left: "76%" },
                { top: "56%", left: "46%"},
                { top: "74%", left: "17%" },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute size-3 rounded-full bg-[#4EA6F5] ring-2 ring-white shadow"
                  style={{ top: pos.top, left: pos.left }}
                />
              ))}
            </div>
          </div>
          {/* Content rows */}
          <div className="mt-3 px-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-[#4EA6F5]/20" />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-full rounded-full bg-zinc-200/80" />
                <div className="h-1.5 w-2/3 rounded-full bg-zinc-200/60" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-[#4EA6F5]/20" />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-3/4 rounded-full bg-zinc-200/80" />
                <div className="h-1.5 w-1/2 rounded-full bg-zinc-200/60" />
              </div>
            </div>
          </div>
          {/* CTA button */}
          <div className="mx-3 mt-4">
            <div
              className="h-8 w-full rounded-full"
              style={{ backgroundColor: BRAND }}
            />
          </div>
        </div>
      </div>

      {/* Glow blob */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(78,166,245,0.18) 0%, transparent 70%)" }}
      />
    </div>
  );
}

export function AppShowcaseSection({ tr }: { tr: Translations["showcase"] }) {
  return (
    <section className="w-full bg-white px-3 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto flex w-full max-w-328 flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">

        {/* Phone mockups */}
        <div className="w-full shrink-0 lg:w-[48%]">
          <PhoneMockups />
        </div>

        {/* Text */}
        <div className="w-full min-w-0 lg:w-[52%]">
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
