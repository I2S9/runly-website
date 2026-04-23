import Image from "next/image";
import type { Translations } from "@/i18n/translations";

const BRAND = "#4EA6F5";
const BG = "#f8fafc";

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

export function CommunityBanner({ tr }: { tr: Translations["communityBanner"] }) {
  return (
    <section className="w-full bg-white px-3 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-[82rem]">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl lg:flex" style={{ background: BG }}>

          {/* Photo — left on desktop, top on mobile */}
          <div className="relative min-h-64 sm:min-h-80 lg:min-h-0 lg:w-[52%]">
            <Image
              src="/images/home/friends-running-bridge.png"
              alt={tr.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(min-width:1024px) 52vw, 100vw"
            />
            {/* Right-edge fade — desktop only: wide multi-stop for a natural dissolve */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block"
              style={{
                width: 200,
                background: `linear-gradient(to right,
                  rgba(248,250,252,0)   0%,
                  rgba(248,250,252,0.15) 25%,
                  rgba(248,250,252,0.55) 55%,
                  rgba(248,250,252,0.85) 78%,
                  rgba(248,250,252,1)   100%)`,
              }}
              aria-hidden
            />
          </div>

          {/* Content — right on desktop, bottom on mobile */}
          <div className="flex flex-col justify-start px-6 py-10 sm:px-10 sm:py-12 lg:w-[48%] lg:px-10 lg:py-14">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
              {tr.heading}
              <br />
              <span style={{ color: BRAND }}>{tr.headingAccent}</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-zinc-500 sm:text-lg">
              {tr.body}
            </p>

            {/* Inline stats */}
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
                    <p className="text-xl font-extrabold leading-none tracking-tight text-zinc-900">
                      {stat.value}
                    </p>
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
