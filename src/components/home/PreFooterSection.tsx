import Image from "next/image";
import type { Translations } from "@/i18n/translations";
import { AnimatedStat } from "@/components/ui/AnimatedStat";

const BRAND = "#4EA6F5";

const StatIcons = [
  <svg key="runners" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <Image key="sessions" src="/branding/calendar.svg" alt="" width={40} height={40} aria-hidden />,
  <Image key="clubs" src="/branding/shoes.svg" alt="" width={40} height={40} aria-hidden />,
  <svg key="cities" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,
];

export function PreFooterSection({ tr }: { tr: Translations["stats"] }) {
  return (
    <section className="w-full bg-white px-3 pb-10 pt-2 sm:px-5 sm:pb-12 sm:pt-3 lg:px-8 lg:pb-14 lg:pt-4">
      <div className="mx-auto w-full max-w-[82rem]">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {tr.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4 p-5 sm:p-6 lg:p-8">
              <div className="shrink-0">
                {StatIcons[i]}
              </div>
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-zinc-900 tabular-nums sm:text-3xl">
                  <AnimatedStat value={stat.value} />
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
