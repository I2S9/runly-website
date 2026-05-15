import { getLocale } from "@/lib/locale";

const BRAND = "#4EA6F5";
const INNER = "mx-auto w-full max-w-[82rem] px-3 sm:px-5 lg:px-8";

const copy = {
  fr: {
    title: "Running club",
    lead: "Fais grandir ton running club et fais-le connaître grâce à Runly.",
  },
  en: {
    title: "Running club",
    lead: "Grow your club and help more runners find you, Runly makes it easy and fun.",
  },
} as const;

export default async function RunningClubPage() {
  const locale = await getLocale();
  const c = copy[locale];

  return (
    <main className="min-h-[50vh] bg-white pb-16 pt-8 font-sans sm:pb-20 sm:pt-10 lg:pt-12">
      <div className={`${INNER} space-y-6 sm:space-y-8`}>
        <header>
          <div className="inline-block">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
              {c.title}
            </h1>
            <div
              className="mt-3 h-1 w-full rounded-full"
              style={{ backgroundColor: BRAND }}
              aria-hidden
            />
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">{c.lead}</p>
        </header>
      </div>
    </main>
  );
}
