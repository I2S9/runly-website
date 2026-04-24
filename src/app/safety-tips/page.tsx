import { getLocale } from "@/lib/locale";

const BRAND = "#4EA6F5";
const INNER = "mx-auto w-full max-w-[82rem] px-3 sm:px-5 lg:px-8";

const content = {
  fr: {
    title: "Conseils de sécurité",
    lastUpdated: "Dernière mise à jour : 24 avril 2026",
    intro:
      "La sécurité de notre communauté est notre priorité absolue. Que vous soyez débutant ou coureur confirmé, ces conseils vous aideront à profiter de chaque sortie en toute sérénité.",
    sections: [
      {
        title: "Avant votre sortie",
        icon: "before",
        items: [
          "Informez toujours un proche de votre itinéraire et de l'heure de retour prévue.",
          "Vérifiez la météo avant de partir et adaptez votre tenue en conséquence.",
          "Chargez votre téléphone et gardez-le avec vous.",
          "Consultez le profil et les avis des autres coureurs avant de rejoindre une session.",
          "Privilégiez les premières rencontres dans des lieux publics et fréquentés.",
        ],
      },
      {
        title: "Pendant la course",
        icon: "during",
        items: [
          "Restez sur des itinéraires balisés et connus, surtout lors des premières sessions avec un inconnu.",
          "Portez des vêtements réfléchissants ou une lampe frontale en cas de faible luminosité.",
          "Gardez un œil sur votre environnement : évitez les écouteurs à volume trop élevé.",
          "Hydratez-vous régulièrement, surtout par temps chaud.",
          "En cas de malaise, arrêtez-vous et contactez les secours (15, 18 ou 112).",
        ],
      },
      {
        title: "Rencontrer un coureur pour la première fois",
        icon: "meet",
        items: [
          "Rencontrez-vous dans un endroit public : parc, place centrale, entrée d'un club de sport.",
          "Partagez votre position en temps réel avec un ami ou un proche pendant la session.",
          "Faites confiance à votre instinct : si quelque chose vous semble anormal, vous avez le droit de partir.",
          "N'hésitez pas à signaler tout comportement suspect via l'application.",
        ],
      },
      {
        title: "Votre profil et vos données",
        icon: "privacy",
        items: [
          "Ne partagez pas votre adresse personnelle ou votre lieu de travail sur votre profil.",
          "Utilisez la fonction de zone floue pour masquer votre position exacte.",
          "Ne transmettez jamais vos identifiants Runly à qui que ce soit.",
          "Signalez immédiatement tout message ou comportement inapproprié.",
        ],
      },
      {
        title: "En cas de problème",
        icon: "emergency",
        items: [
          "Numéro d'urgence européen : 112",
          "SAMU : 15",
          "Pompiers : 18",
          "Police / Gendarmerie : 17",
          "Signalement sur Runly : utilisez l'icône de signalement dans l'application ou contactez support@runly-app.com",
        ],
      },
    ],
  },
  en: {
    title: "Safety Tips",
    lastUpdated: "Last updated: April 24, 2026",
    intro:
      "The safety of our community is our top priority. Whether you are a beginner or an experienced runner, these tips will help you enjoy every run with peace of mind.",
    sections: [
      {
        title: "Before Your Run",
        icon: "before",
        items: [
          "Always let someone know your route and expected return time.",
          "Check the weather before heading out and dress accordingly.",
          "Charge your phone and keep it with you.",
          "Review other runners' profiles and ratings before joining a session.",
          "For first meetings, choose busy, public locations.",
        ],
      },
      {
        title: "During Your Run",
        icon: "during",
        items: [
          "Stick to well-known, marked routes — especially on first sessions with someone new.",
          "Wear reflective clothing or a headlamp in low-light conditions.",
          "Stay aware of your surroundings: avoid listening to music at high volume.",
          "Stay hydrated, especially in warm weather.",
          "If you feel unwell, stop and call emergency services.",
        ],
      },
      {
        title: "Meeting a Runner for the First Time",
        icon: "meet",
        items: [
          "Meet in a public place: a park, central square, or gym entrance.",
          "Share your live location with a friend or family member during the session.",
          "Trust your instincts: if something feels off, you have every right to leave.",
          "Report any suspicious behaviour through the app.",
        ],
      },
      {
        title: "Your Profile and Data",
        icon: "privacy",
        items: [
          "Do not share your home address or workplace on your profile.",
          "Use the fuzzy zone feature to hide your exact location.",
          "Never share your Runly login credentials with anyone.",
          "Report any inappropriate messages or behaviour immediately.",
        ],
      },
      {
        title: "In Case of Emergency",
        icon: "emergency",
        items: [
          "European emergency number: 112",
          "Report on Runly: use the report icon in the app or contact support@runly-app.com",
        ],
      },
    ],
  },
};

const ICONS: Record<string, React.ReactNode> = {
  before: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  during: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  meet: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  privacy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  emergency: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

export default async function SafetyTipsPage() {
  const locale = await getLocale();
  const tr = content[locale as "fr" | "en"] ?? content.en;

  return (
    <main className="flex w-full flex-1 flex-col font-sans">
      <div className="w-full bg-white px-3 pt-8 pb-16 sm:px-5 sm:pt-10 sm:pb-20 lg:px-8 lg:pt-12 lg:pb-24">
        <div className={`${INNER} space-y-8 sm:space-y-10`}>

          {/* Hero */}
          <div>
            <div className="inline-block">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
                {tr.title}
              </h1>
              <div className="mt-3 h-1 w-full rounded-full" style={{ backgroundColor: BRAND }} aria-hidden />
            </div>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">{tr.intro}</p>
          </div>

          {/* Sections */}
          {tr.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-zinc-900 sm:text-xl">{section.title}</h2>
              <ul className="mt-4 space-y-2.5 text-base text-zinc-600 sm:text-lg">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}
