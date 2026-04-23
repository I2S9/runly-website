import type { Translations } from "@/i18n/translations";

const BRAND = "#4EA6F5";

const StatIcons = [
  <svg key="runners" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key="sessions" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>,
  <svg key="clubs" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key="cities" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,
];

export function PreFooterSection({ tr }: { tr: Translations["stats"] }) {
  return (
    <section className="w-full bg-white px-3 py-10 sm:px-5 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-[82rem]">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {tr.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4 p-5 sm:p-6 lg:p-8">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(78,166,245,0.12)" }}
                >
                  {StatIcons[i]}
                </div>
                <div>
                  <p className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-zinc-500 sm:text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
