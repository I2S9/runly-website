import { getLocale } from "@/lib/locale";
import { ClubFilters, type FilterGroup } from "@/components/clubs/ClubFilters";

const BRAND = "#4EA6F5";

/** Mêmes gouttières et largeur max que la Navbar. */
const PAGE_GUTTERS = "px-3 sm:px-5 lg:px-8";
const NAV_WIDTH = "mx-auto w-full min-w-0 max-w-[82rem]";

const copy = {
  fr: {
    title: "Découvre tous les running clubs autour de toi",
    lead: "Filtre par ville, jour, allure ou ambiance pour trouver le collectif qui te correspond.",
    filters: {
      reset: "Tout effacer",
      clearGroup: "Effacer ce filtre",
      selectedCountOne: "1 filtre actif",
      selectedCountMany: "{n} filtres actifs",
      noResult: "Aucun résultat",
    },
    groups: [
      {
        key: "city",
        label: "Ville",
        searchable: true,
        searchPlaceholder: "Rechercher une ville",
        options: [
          { value: "paris", label: "Paris" },
          { value: "lyon", label: "Lyon" },
          { value: "marseille", label: "Marseille" },
          { value: "toulouse", label: "Toulouse" },
          { value: "bordeaux", label: "Bordeaux" },
          { value: "lille", label: "Lille" },
          { value: "nantes", label: "Nantes" },
          { value: "nice", label: "Nice" },
          { value: "rennes", label: "Rennes" },
          { value: "strasbourg", label: "Strasbourg" },
          { value: "montpellier", label: "Montpellier" },
          { value: "grenoble", label: "Grenoble" },
          { value: "chambery", label: "Chambéry" },
          { value: "lausanne", label: "Lausanne" },
          { value: "geneve", label: "Genève" },
          { value: "bruxelles", label: "Bruxelles" },
        ],
      },
      {
        key: "day",
        label: "Jour de sortie",
        options: [
          { value: "mon", label: "Lundi" },
          { value: "tue", label: "Mardi" },
          { value: "wed", label: "Mercredi" },
          { value: "thu", label: "Jeudi" },
          { value: "fri", label: "Vendredi" },
          { value: "sat", label: "Samedi" },
          { value: "sun", label: "Dimanche" },
        ],
      },
      {
        key: "moment",
        label: "Moment",
        options: [
          { value: "morning", label: "Matin", icon: "🌅" },
          { value: "noon", label: "Pause déj", icon: "🥪" },
          { value: "evening", label: "Soirée", icon: "🌙" },
          { value: "weekend", label: "Week-end", icon: "🗓️" },
        ],
      },
      {
        key: "session",
        label: "Type de séance",
        options: [
          { value: "road", label: "Route", icon: "🛣️" },
          { value: "trail", label: "Trail", icon: "⛰️" },
          { value: "track", label: "Piste / fractionné", icon: "🏟️" },
          { value: "long-run", label: "Sortie longue", icon: "🕒" },
          { value: "easy", label: "Endurance fondamentale", icon: "🌿" },
          { value: "strength", label: "Renfo & mobilité", icon: "💪" },
        ],
      },
      {
        key: "level",
        label: "Niveau & allure",
        options: [
          { value: "beginner", label: "Débutant" },
          { value: "all", label: "Tous niveaux" },
          { value: "intermediate", label: "Intermédiaire" },
          { value: "advanced", label: "Confirmé" },
          { value: "pace-slow", label: "Plus de 6:30 min/km" },
          { value: "pace-mid", label: "5:30 – 6:30 min/km" },
          { value: "pace-fast", label: "4:30 – 5:30 min/km" },
          { value: "pace-elite", label: "Moins de 4:30 min/km" },
        ],
      },
      {
        key: "distance",
        label: "Distance",
        options: [
          { value: "5k", label: "5 km" },
          { value: "10k", label: "10 km" },
          { value: "half", label: "Semi-marathon" },
          { value: "marathon", label: "Marathon" },
          { value: "ultra", label: "Ultra" },
        ],
      },
      {
        key: "audience",
        label: "Public",
        options: [
          { value: "mixed", label: "Mixte" },
          { value: "women", label: "Femmes" },
          { value: "non-binary", label: "Personnes non binaires" },
          { value: "students", label: "Étudiants" },
          { value: "seniors", label: "Seniors" },
          { value: "juniors", label: "Enfants & juniors" },
          { value: "parents", label: "Parents" },
        ],
      },
      {
        key: "vibe",
        label: "Ambiance",
        options: [
          { value: "chill", label: "Cool & sociale", icon: "😄" },
          { value: "perf", label: "Performance", icon: "🎯" },
          { value: "coached", label: "Encadrée par un coach", icon: "📣" },
          { value: "afterwork", label: "Afterwork / verre après", icon: "🍹" },
          { value: "charity", label: "Cause caritative", icon: "🤝" },
          { value: "free", label: "Gratuit", icon: "🎟️" },
        ],
      },
    ] satisfies readonly FilterGroup[],
  },
  en: {
    title: "Discover every running club around you",
    lead: "Filter by city, day, pace or vibe to find the crew that fits you.",
    filters: {
      reset: "Clear all",
      clearGroup: "Clear this filter",
      selectedCountOne: "1 active filter",
      selectedCountMany: "{n} active filters",
      noResult: "No result",
    },
    groups: [
      {
        key: "city",
        label: "City",
        searchable: true,
        searchPlaceholder: "Search a city",
        options: [
          { value: "paris", label: "Paris" },
          { value: "lyon", label: "Lyon" },
          { value: "marseille", label: "Marseille" },
          { value: "toulouse", label: "Toulouse" },
          { value: "bordeaux", label: "Bordeaux" },
          { value: "lille", label: "Lille" },
          { value: "nantes", label: "Nantes" },
          { value: "nice", label: "Nice" },
          { value: "rennes", label: "Rennes" },
          { value: "strasbourg", label: "Strasbourg" },
          { value: "montpellier", label: "Montpellier" },
          { value: "grenoble", label: "Grenoble" },
          { value: "chambery", label: "Chambéry" },
          { value: "lausanne", label: "Lausanne" },
          { value: "geneve", label: "Geneva" },
          { value: "bruxelles", label: "Brussels" },
        ],
      },
      {
        key: "day",
        label: "Run day",
        options: [
          { value: "mon", label: "Monday" },
          { value: "tue", label: "Tuesday" },
          { value: "wed", label: "Wednesday" },
          { value: "thu", label: "Thursday" },
          { value: "fri", label: "Friday" },
          { value: "sat", label: "Saturday" },
          { value: "sun", label: "Sunday" },
        ],
      },
      {
        key: "moment",
        label: "Time of day",
        options: [
          { value: "morning", label: "Morning", icon: "🌅" },
          { value: "noon", label: "Lunch break", icon: "🥪" },
          { value: "evening", label: "Evening", icon: "🌙" },
          { value: "weekend", label: "Weekend", icon: "🗓️" },
        ],
      },
      {
        key: "session",
        label: "Session type",
        options: [
          { value: "road", label: "Road", icon: "🛣️" },
          { value: "trail", label: "Trail", icon: "⛰️" },
          { value: "track", label: "Track / intervals", icon: "🏟️" },
          { value: "long-run", label: "Long run", icon: "🕒" },
          { value: "easy", label: "Easy run", icon: "🌿" },
          { value: "strength", label: "Strength & mobility", icon: "💪" },
        ],
      },
      {
        key: "level",
        label: "Level & pace",
        options: [
          { value: "beginner", label: "Beginner" },
          { value: "all", label: "All levels" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
          { value: "pace-slow", label: "Over 6:30 min/km" },
          { value: "pace-mid", label: "5:30 – 6:30 min/km" },
          { value: "pace-fast", label: "4:30 – 5:30 min/km" },
          { value: "pace-elite", label: "Under 4:30 min/km" },
        ],
      },
      {
        key: "distance",
        label: "Distance",
        options: [
          { value: "5k", label: "5 km" },
          { value: "10k", label: "10 km" },
          { value: "half", label: "Half marathon" },
          { value: "marathon", label: "Marathon" },
          { value: "ultra", label: "Ultra" },
        ],
      },
      {
        key: "audience",
        label: "Who it's for",
        options: [
          { value: "mixed", label: "Everyone" },
          { value: "women", label: "Women" },
          { value: "non-binary", label: "Non-binary people" },
          { value: "students", label: "Students" },
          { value: "seniors", label: "Seniors" },
          { value: "juniors", label: "Kids & juniors" },
          { value: "parents", label: "Parents" },
        ],
      },
      {
        key: "vibe",
        label: "Vibe",
        options: [
          { value: "chill", label: "Chill & social", icon: "😄" },
          { value: "perf", label: "Performance", icon: "🎯" },
          { value: "coached", label: "Coach-led", icon: "📣" },
          { value: "afterwork", label: "Afterwork drinks", icon: "🍹" },
          { value: "charity", label: "Charity cause", icon: "🤝" },
          { value: "free", label: "Free", icon: "🎟️" },
        ],
      },
    ] satisfies readonly FilterGroup[],
  },
} as const;

export default async function ClubsPage() {
  const locale = await getLocale();
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
            <ClubFilters groups={c.groups} tr={c.filters} />
          </section>
        </div>
      </div>
    </main>
  );
}
