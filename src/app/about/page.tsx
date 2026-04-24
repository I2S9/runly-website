import { getLocale } from "@/lib/locale";

const BRAND = "#4EA6F5";

const content = {
  fr: {
    title: "À propos de Runly",
    mission: "Notre mission",
    missionText:
      "Runly est née d'une idée simple : courir est bien plus agréable quand on le fait avec les bonnes personnes. On a créé une application qui connecte les coureurs selon leur allure, leur niveau et leurs objectifs — pour que chaque sortie soit une expérience partagée.",
    story: "Notre histoire",
    storyText:
      "Fondée par des passionnés de running, Runly est partie d'un constat : trouver un partenaire de course correspondant vraiment à ton niveau et tes disponibilités, c'est plus compliqué qu'il n'y paraît. Les forums, les groupes Facebook, les applications généralistes… rien n'était vraiment fait pour ça. Alors on l'a créé.",
    values: "Nos valeurs",
    valuesList: [
      { title: "Communauté", body: "On croit que le running est un sport collectif. Chaque runner mérite de trouver sa tribu." },
      { title: "Inclusivité", body: "Débutants comme confirmés, lents comme rapides — tout le monde a sa place sur Runly." },
      { title: "Sécurité", body: "Profils vérifiés, zones floues, signalement facile. Ta sécurité, c'est notre priorité." },
      { title: "Simplicité", body: "Trouver une session ou la créer doit tenir en quelques secondes. Pas plus." },
    ],
    contact: "Une question ?",
    contactText: "On est disponibles à",
  },
  en: {
    title: "About Runly",
    mission: "Our mission",
    missionText:
      "Runly was born from a simple idea: running is so much better when you do it with the right people. We built an app that connects runners by pace, level and goals — so every run becomes a shared experience.",
    story: "Our story",
    storyText:
      "Founded by running enthusiasts, Runly started from a simple observation: finding a running partner who truly matches your level and availability is harder than it sounds. Forums, Facebook groups, general apps — nothing was really built for this. So we built it.",
    values: "Our values",
    valuesList: [
      { title: "Community", body: "We believe running is a team sport. Every runner deserves to find their tribe." },
      { title: "Inclusivity", body: "Beginners and seasoned runners, slow and fast — everyone has a place on Runly." },
      { title: "Safety", body: "Verified profiles, fuzzy zones, easy reporting. Your safety is our top priority." },
      { title: "Simplicity", body: "Finding or creating a session should take seconds. Nothing more." },
    ],
    contact: "Any questions?",
    contactText: "Reach us at",
  },
};

export default async function AboutPage() {
  const locale = await getLocale();
  const tr = content[locale as "fr" | "en"] ?? content.fr;

  return (
    <main className="flex w-full flex-1 flex-col font-sans">
      {/* Hero */}
      <section className="w-full bg-white px-3 pb-12 pt-12 sm:px-5 sm:pb-16 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            {tr.title}
          </h1>
          <div
            className="mx-auto mt-4 h-1 w-12 rounded-full"
            style={{ backgroundColor: BRAND }}
            aria-hidden
          />
        </div>
      </section>

      {/* Mission + Story */}
      <section className="w-full bg-zinc-50 px-3 py-12 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-3xl space-y-12">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl" style={{ color: BRAND }}>
              {tr.mission}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
              {tr.missionText}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold sm:text-2xl" style={{ color: BRAND }}>
              {tr.story}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
              {tr.storyText}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-white px-3 py-12 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="text-xl font-bold sm:text-2xl" style={{ color: BRAND }}>
            {tr.values}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {tr.valuesList.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6"
              >
                <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500 sm:text-[0.9375rem]">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="w-full bg-zinc-50 px-3 pb-16 pt-12 sm:px-5 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="mx-auto w-full max-w-3xl text-center">
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
      </section>
    </main>
  );
}
