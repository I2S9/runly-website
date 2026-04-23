import type { Translations } from "@/i18n/translations";

const BRAND = "#4EA6F5";

const ICONS = [
  <svg key="match" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="8" cy="7" r="3.5" />
    <path d="M1.5 21v-2A3.5 3.5 0 0 1 5 15.5h6A3.5 3.5 0 0 1 14.5 19v2" />
    <path d="M16.5 3.5a3.5 3.5 0 0 1 0 7" />
    <path d="M22.5 21v-2a3.5 3.5 0 0 0-3.5-3.5h-.5" />
  </svg>,
  <svg key="sessions" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="12" y1="14" x2="12" y2="18" />
    <line x1="10" y1="16" x2="14" y2="16" />
  </svg>,
  <svg key="clubs" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key="progress" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="18" y1="20" x2="18" y2="9" />
    <line x1="12" y1="20" x2="12" y2="3" />
    <line x1="6" y1="20" x2="6" y2="13" />
    <line x1="2" y1="20" x2="22" y2="20" />
    <polyline points="14 7 12 3 10 7" />
  </svg>,
];

export function FeaturesSection({ tr }: { tr: Translations["features"] }) {
  return (
    <section className="w-full bg-white px-3 pt-3 pb-10 sm:px-5 sm:pt-4 sm:pb-12 lg:px-8 lg:pt-5 lg:pb-14">
      <div className="mx-auto w-full max-w-[82rem]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {tr.items.map((item, i) => (
            <div
              key={item.title}
              className="flex items-start gap-5 rounded-2xl bg-zinc-50 p-6 sm:p-7 lg:p-7"
            >
              <div
                className="mt-0.5 flex h-13 w-13 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(78,166,245,0.12)", color: BRAND }}
              >
                {ICONS[i]}
              </div>
              <div>
                <h3 className="text-base font-semibold leading-snug text-zinc-900 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500 sm:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
