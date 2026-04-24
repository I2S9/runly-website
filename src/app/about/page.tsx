import { getLocale } from "@/lib/locale";

const BRAND = "#4EA6F5";

const STRAVA_LINK = "https://press.strava.com/articles/strava-releases-12th-annual-year-in-sport-trend-report-2025";

const content = {
  fr: {
    title: "À propos de Runly",
    mission: "Notre mission",
    missionText:
      "Runly est née d'une idée simple : courir est bien plus agréable quand on le fait avec les bonnes personnes. On a créé une application qui connecte les coureurs selon leur allure, leur niveau et leurs objectifs, pour que chaque sortie soit une expérience partagée.",
    context: "Le running, sport numéro 1 : mais souvent solitaire",
    contextPara1Before: "La course à pied est le sport le plus pratiqué en France et dans le monde. Le ",
    contextPara1Link: "rapport Strava Year in Sport 2025",
    contextPara1After: " recense plus de 135 millions d'utilisateurs actifs qui loggent leurs courses, avec une progression de 17 % de la participation aux courses sur route en un an. En France, l'enquête nationale sur les pratiques sportives recense plus de 13 millions de coureurs réguliers, devant le football et le cyclisme.",
    contextParas: [
      "Pourtant, 65 % des débutants abandonnent dans les six premiers mois, faute de structure, de motivation ou tout simplement de quelqu'un avec qui courir. Le running est perçu comme le sport le plus accessible : pas de licence, pas d'équipement coûteux, pas d'horaire imposé. Mais c'est aussi l'un des plus solitaires. On chausse ses baskets, on sort seul, et quand ça devient dur, personne n'est là pour pousser.",
      "Les études sont claires : courir en groupe réduit la perception de l'effort, augmente la régularité de 40 % et divise par deux le taux d'abandon. Trouver le bon partenaire, même allure, mêmes disponibilités, même quartier, change tout. C'est exactement ce que Runly rend possible.",
    ],
    story: "Notre histoire",
    storyText:
      "Fondée par des passionnés de running, Runly est partie d'un constat : trouver un partenaire de course correspondant vraiment à ton niveau et tes disponibilités, c'est plus compliqué qu'il n'y paraît. Les forums, les groupes Facebook, les applications généralistes... rien n'était vraiment fait pour ça. Alors on l'a créé.",
    contact: "Une question ?",
    contactText: "On est disponibles à",
  },
  en: {
    title: "About Runly",
    mission: "Our mission",
    missionText:
      "Runly was born from a simple idea: running is so much better when you do it with the right people. We built an app that connects runners by pace, level and goals, so every run becomes a shared experience.",
    context: "Running, the #1 sport: but often a lonely one",
    contextPara1Before: "Running is the most practised sport in the world. ",
    contextPara1Link: "Strava's 2025 Year in Sport report",
    contextPara1After: " recorded over 135 million active users logging runs globally, with race participation up 17% year on year. In France alone, the national sports survey counts more than 13 million regular runners, ahead of football and cycling.",
    contextParas: [
      "Yet 65% of beginners quit within the first six months, for lack of structure, motivation, or simply someone to run with. Running is seen as the most accessible sport: no club membership, no expensive gear, no fixed schedule. But it is also one of the loneliest. You lace up, head out alone, and when it gets hard, no one is there to push you.",
      "The research is clear: running with others reduces perceived effort, increases training consistency by 40%, and cuts dropout rates in half. Finding the right partner, same pace, same availability, same neighbourhood, changes everything. That is exactly what Runly makes possible.",
    ],
    story: "Our story",
    storyText:
      "Founded by running enthusiasts, Runly started from a simple observation: finding a running partner who truly matches your level and availability is harder than it sounds. Forums, Facebook groups, general apps... nothing was really built for this. So we built it.",
    contact: "Any questions?",
    contactText: "Reach us at",
  },
};

export default async function AboutPage() {
  const locale = await getLocale();
  const tr = content[locale as "fr" | "en"] ?? content.fr;

  const INNER = "mx-auto w-full max-w-[82rem] px-3 sm:px-5 lg:px-8";

  return (
    <main className="flex w-full flex-1 flex-col font-sans">
      <div className="w-full bg-white px-3 pt-8 pb-12 sm:px-5 sm:pt-10 sm:pb-16 lg:px-8 lg:pt-12 lg:pb-20">
        <div className={`${INNER} space-y-8 sm:space-y-10`}>

          {/* Hero */}
          <div className="inline-block">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
              {tr.title}
            </h1>
            <div
              className="mt-4 h-1 w-full rounded-full"
              style={{ backgroundColor: BRAND }}
              aria-hidden
            />
          </div>

          {/* Mission */}
          <div>
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
              {tr.mission}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 sm:text-lg">
              {tr.missionText}
            </p>
          </div>

          {/* Context */}
          <div>
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
              {tr.context}
            </h2>
            <div className="mt-3 space-y-3">
              <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
                {tr.contextPara1Before}
                <a
                  href={STRAVA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-2 transition-colors hover:text-zinc-900"
                  style={{ color: BRAND }}
                >
                  {tr.contextPara1Link}
                </a>
                {tr.contextPara1After}
              </p>
              {tr.contextParas.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-zinc-600 sm:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Story */}
          <div>
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
              {tr.story}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 sm:text-lg">
              {tr.storyText}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">{tr.contact}</h2>
            <p className="mt-3 text-base text-zinc-600 sm:text-lg">
              {tr.contactText}{" "}
              <a
                href="mailto:support@runly-app.com"
                className="font-semibold transition-colors hover:underline"
                style={{ color: BRAND }}
              >
                support@runly-app.com
              </a>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
