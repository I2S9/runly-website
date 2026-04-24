import { getLocale } from "@/lib/locale";

const BRAND = "#4EA6F5";
const INNER = "mx-auto w-full max-w-[82rem] px-3 sm:px-5 lg:px-8";

const content = {
  fr: {
    title: "Charte de la communauté",
    lastUpdated: "Dernière mise à jour : 24 avril 2026",
    intro:
      "Runly est une communauté de coureurs bienveillante, inclusive et respectueuse. Cette charte définit les règles qui permettent à chacun de courir en bonne compagnie et dans un environnement sain.",
    sections: [
      {
        title: "Respect et bienveillance",
        icon: "respect",
        body: "Chaque membre de la communauté Runly mérite d'être traité avec respect, quelle que soit son allure, son niveau ou son parcours. Nous ne tolérons aucune forme de discrimination, de harcèlement ou d'intimidation.",
        items: [
          "Soyez encourageant envers les débutants.",
          "Respectez les différences de rythme, d'objectif et de style de course.",
          "Aucun commentaire désobligeant sur l'apparence physique ou les performances.",
          "Adoptez un langage respectueux dans les messages et commentaires.",
        ],
      },
      {
        title: "Honnêteté et authenticité",
        icon: "honesty",
        body: "La confiance est au coeur de Runly. Pour que les mises en relation fonctionnent vraiment, chacun doit représenter fidèlement son niveau et ses intentions.",
        items: [
          "Renseignez votre allure et votre niveau de manière honnête.",
          "N'utilisez pas de faux profils ou de photos trompeuses.",
          "Respectez les sessions que vous avez acceptées : annulez à l'avance si vous ne pouvez pas venir.",
          "Ne vous faites pas passer pour quelqu'un d'autre.",
        ],
      },
      {
        title: "Sécurité et responsabilité",
        icon: "safety",
        body: "Vous êtes responsable de votre propre sécurité et de celle des autres. Runly met à votre disposition des outils pour courir en sécurité, à vous de les utiliser.",
        items: [
          "Consultez nos conseils de sécurité avant chaque première rencontre.",
          "Signalez immédiatement tout comportement problématique.",
          "Ne partagez jamais d'informations personnelles sensibles (adresse, lieu de travail).",
          "N'organisez pas de sessions dans des lieux isolés ou dangereux.",
        ],
      },
      {
        title: "Comportements interdits",
        icon: "forbidden",
        body: "Les comportements suivants entrainent une suspension ou une suppression immédiate du compte :",
        items: [
          "Harcèlement, intimidation ou menaces envers un autre utilisateur.",
          "Contenu à caractère sexuel, violent ou offensant.",
          "Usurpation d'identité.",
          "Spam, publicité non sollicitée ou escroqueries.",
          "Utilisation de Runly à des fins autres que le running.",
          "Violation des lois applicables.",
        ],
      },
      {
        title: "Signalement et modération",
        icon: "report",
        body: "Vous avez un rôle clé dans la qualité de la communauté. Si vous êtes témoin d'un comportement qui enfreint cette charte :",
        items: [
          "Utilisez la fonction de signalement dans l'application.",
          "Contactez notre équipe à support@runly-app.com.",
          "Tous les signalements sont traités de manière confidentielle.",
          "Toute fausse déclaration malveillante peut elle-même être sanctionnée.",
        ],
      },
      {
        title: "Esprit Runly",
        icon: "spirit",
        body: "Au-delà des règles, Runly c'est avant tout une communauté de gens qui aiment courir et partager. Encouragez-vous, célébrez vos progrès mutuels, et faites de chaque sortie un moment positif.",
      },
    ],
  },
  en: {
    title: "Community Guidelines",
    lastUpdated: "Last updated: April 24, 2026",
    intro:
      "Runly is a kind, inclusive, and respectful running community. These guidelines set the standards that allow everyone to run in good company and in a healthy environment.",
    sections: [
      {
        title: "Respect and Kindness",
        icon: "respect",
        body: "Every Runly member deserves to be treated with respect, regardless of their pace, level, or background. We do not tolerate any form of discrimination, harassment, or intimidation.",
        items: [
          "Be encouraging towards beginners.",
          "Respect differences in pace, goals, and running style.",
          "No derogatory comments about physical appearance or performance.",
          "Use respectful language in messages and comments.",
        ],
      },
      {
        title: "Honesty and Authenticity",
        icon: "honesty",
        body: "Trust is at the heart of Runly. For connections to truly work, everyone must represent their level and intentions accurately.",
        items: [
          "Enter your pace and level honestly.",
          "Do not use fake profiles or misleading photos.",
          "Honour sessions you have accepted: cancel in advance if you cannot make it.",
          "Do not impersonate someone else.",
        ],
      },
      {
        title: "Safety and Responsibility",
        icon: "safety",
        body: "You are responsible for your own safety and that of others. Runly provides tools to help you run safely — make use of them.",
        items: [
          "Check our Safety Tips before any first meeting.",
          "Report any problematic behaviour immediately.",
          "Never share sensitive personal information (address, workplace).",
          "Do not organise sessions in isolated or dangerous locations.",
        ],
      },
      {
        title: "Prohibited Behaviour",
        icon: "forbidden",
        body: "The following behaviours will result in an immediate suspension or permanent ban:",
        items: [
          "Harassment, intimidation, or threats towards another user.",
          "Sexual, violent, or offensive content.",
          "Impersonation.",
          "Spam, unsolicited advertising, or scams.",
          "Using Runly for purposes other than running.",
          "Violation of applicable laws.",
        ],
      },
      {
        title: "Reporting and Moderation",
        icon: "report",
        body: "You play a key role in maintaining community quality. If you witness behaviour that breaks these guidelines:",
        items: [
          "Use the report feature in the app.",
          "Contact our team at support@runly-app.com.",
          "All reports are handled confidentially.",
          "Malicious false reports may themselves be subject to action.",
        ],
      },
      {
        title: "The Runly Spirit",
        icon: "spirit",
        body: "Beyond the rules, Runly is first and foremost a community of people who love running and sharing. Encourage each other, celebrate your mutual progress, and make every run a positive moment.",
      },
    ],
  },
};

const ICONS: Record<string, React.ReactNode> = {
  respect: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  honesty: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  safety: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  forbidden: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
  report: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  spirit: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
};

export default async function CommunityGuidelinesPage() {
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
              {section.body && (
                <p className="mt-3 text-base leading-relaxed text-zinc-600 sm:text-lg">{section.body}</p>
              )}
              {section.items && (
                <ul className="mt-3 space-y-2.5 text-base text-zinc-600 sm:text-lg">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}
