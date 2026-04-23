import Image from "next/image";
import type { Translations } from "@/i18n/translations";

const BRAND   = "#4EA6F5";
const BG      = "#f8fafc";
const BAND_BG = "rgba(78,166,245,0.10)";

const PHOTO_SLOTS = [
  { src: "/images/home/men-run.png",      alt: "Two runners smiling together" },
  { src: "/images/home/running-club.png", alt: "Runly running club group photo" },
  { src: "/images/home/run-girls.png",    alt: "Women runners celebrating" },
];

const ROTATIONS = [-3, 1.5, -2];

const StatIcons = [
  <svg key="runners" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key="sessions" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>,
  <svg key="clubs" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
];

/* ── Main banner: image + text ── */
export function CommunityBanner({ tr }: { tr: Translations["communityBanner"] }) {
  return (
    <section className="w-full bg-white px-3 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-[82rem]">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl lg:flex" style={{ background: BG }}>

          {/* Photo */}
          <div className="relative min-h-64 sm:min-h-80 lg:min-h-0 lg:w-[52%]">
            <Image
              src="/images/home/friends-running-bridge.png"
              alt={tr.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(min-width:1024px) 52vw, 100vw"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(to right,
                  rgba(248,250,252,0)   0%,
                  rgba(248,250,252,0)   58%,
                  rgba(248,250,252,0.5) 74%,
                  rgba(248,250,252,0.9) 90%,
                  rgba(248,250,252,1)   100%)`,
              }}
              aria-hidden
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-start px-6 py-10 sm:px-10 sm:py-12 lg:w-[48%] lg:px-10 lg:py-14">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
              {tr.heading}
              <br />
              <span style={{ color: BRAND }}>{tr.headingAccent}</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-500 sm:text-lg">
              {tr.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
              {tr.stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(78,166,245,0.12)", color: BRAND }}
                  >
                    {StatIcons[i]}
                  </div>
                  <div>
                    <p className="text-xl font-extrabold leading-none tracking-tight text-zinc-900">{stat.value}</p>
                    <p className="mt-0.5 text-xs font-medium text-zinc-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonial band: quote + tilted photos ── */
export function TestimonialBand({ tr }: { tr: Translations["communityBanner"]["testimonial"] }) {
  return (
    <section className="w-full bg-white px-3 py-10 sm:px-5 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-[82rem]">
        <div
          className="overflow-visible rounded-2xl sm:rounded-3xl"
          style={{ background: BAND_BG }}
        >
          <div className="flex flex-col gap-6 px-7 py-8 sm:px-9 sm:py-10 lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:py-10">

            {/* Quote */}
            <div className="lg:w-[36%]">
              {/* SVG opening double-quote in brand blue */}
              <svg width="38" height="30" viewBox="0 0 38 30" fill={BRAND} aria-hidden>
                <path d="M0 18C0 24.627 5.373 30 12 30V22C9.791 22 8 20.209 8 18V14H16V0H0V18ZM22 18C22 24.627 27.373 30 34 30V22C31.791 22 30 20.209 30 18V14H38V0H22V18Z" />
              </svg>
              <blockquote className="mt-3 text-base leading-relaxed text-zinc-800 sm:text-lg lg:text-xl">
                {tr.quote}
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/images/home/lucas.png"
                    alt={tr.author}
                    fill
                    className="object-cover object-center"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{tr.author}</p>
                  <p className="text-xs text-zinc-500">{tr.meta}</p>
                </div>
              </div>
            </div>

            {/* Tilted photos */}
            <div className="flex flex-1 items-center gap-3 sm:gap-4">
              {PHOTO_SLOTS.map((slot, i) => (
                <div
                  key={i}
                  className="testimonial-photo relative flex-1 overflow-hidden rounded-xl sm:rounded-2xl"
                  style={{
                    aspectRatio: "4 / 3",
                    border: "3px solid white",
                    backgroundColor: BRAND,
                    transform: `rotate(${ROTATIONS[i]}deg)`,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  }}
                >
                  {slot && (
                    <Image
                      src={slot.src}
                      alt={slot.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width:1024px) 20vw, 30vw"
                    />
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
