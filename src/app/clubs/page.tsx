import { getLocale } from "@/lib/locale";
import { fetchRunningClubs } from "@/lib/clubs";
import { ClubsExplorer } from "@/components/clubs/ClubsExplorer";

const BRAND = "#4EA6F5";

/** Mêmes gouttières et largeur max que la Navbar. */
const PAGE_GUTTERS = "px-3 sm:px-5 lg:px-8";
const NAV_WIDTH = "mx-auto w-full min-w-0 max-w-[82rem]";

const copy = {
  fr: {
    title: "Découvre tous les running clubs autour de toi",
    lead: "Les clubs publiés depuis l'application Runly, avec leur allure, leur quartier et leur communauté.",
    empty: "Aucun club n'est encore publié. Les clubs créés depuis l'application apparaîtront ici.",
    explorer: {
      filters: {
        reset: "Tout effacer",
        clearGroup: "Effacer ce filtre",
        selectedCountOne: "1 filtre actif",
        selectedCountMany: "{n} filtres actifs",
        noResult: "Aucun résultat",
      },
      card: {
        membersOne: "{n} membre",
        membersMany: "{n} membres",
        pace: "Allure {pace}",
      },
      cityGroup: "Ville",
      citySearch: "Rechercher une ville",
      levelGroup: "Niveau",
      focusGroup: "Type de course",
      badgeGroup: "Badge",
      levels: {
        beginner: "Débutant",
        mixed: "Tous niveaux",
        performance: "Performance",
      },
      focuses: {
        road: "Route",
        trail: "Trail",
      },
      badges: {
        active: "Actif",
        new: "Nouveau",
        nearby: "À proximité",
      },
      resultsOne: "1 club",
      resultsMany: "{n} clubs",
      noMatch: "Aucun club ne correspond à ces filtres.",
    },
  },
  en: {
    title: "Discover every running club around you",
    lead: "Clubs published from the Runly app, with their pace, neighbourhood and community.",
    empty: "No club has been published yet. Clubs created in the app will show up here.",
    explorer: {
      filters: {
        reset: "Clear all",
        clearGroup: "Clear this filter",
        selectedCountOne: "1 active filter",
        selectedCountMany: "{n} active filters",
        noResult: "No result",
      },
      card: {
        membersOne: "{n} member",
        membersMany: "{n} members",
        pace: "{pace} pace",
      },
      cityGroup: "City",
      citySearch: "Search a city",
      levelGroup: "Level",
      focusGroup: "Run type",
      badgeGroup: "Badge",
      levels: {
        beginner: "Beginner",
        mixed: "All levels",
        performance: "Performance",
      },
      focuses: {
        road: "Road",
        trail: "Trail",
      },
      badges: {
        active: "Active",
        new: "New",
        nearby: "Nearby",
      },
      resultsOne: "1 club",
      resultsMany: "{n} clubs",
      noMatch: "No club matches these filters.",
    },
  },
} as const;

export default async function ClubsPage() {
  const [locale, clubs] = await Promise.all([getLocale(), fetchRunningClubs()]);
  const c = copy[locale];

  return (
    <main className="min-h-[60vh] bg-white pb-16 pt-8 font-sans sm:pt-10 lg:pt-12">
      <div className={PAGE_GUTTERS}>
        <div className={NAV_WIDTH}>
          <header className="flex flex-col items-start text-left">
            <div className="inline-block max-w-full text-left">
              <h1 className="text-balance text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
                {c.title}
              </h1>
              <div
                className="mt-3 h-1 w-full rounded-full"
                style={{ backgroundColor: BRAND }}
                aria-hidden
              />
            </div>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 sm:mt-6 sm:text-lg">
              {c.lead}
            </p>
          </header>

          <section className="mt-8 sm:mt-10" aria-label={c.title}>
            {clubs.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-zinc-300 px-6 py-14 text-center text-sm font-medium text-zinc-500">
                {c.empty}
              </p>
            ) : (
              <ClubsExplorer clubs={clubs} tr={c.explorer} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
