import { getLocale } from "@/lib/locale";
import Link from "next/link";

const BRAND = "#4EA6F5";
const INNER = "mx-auto w-full max-w-[82rem] px-3 sm:px-5 lg:px-8";

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="inline-block shrink-0 align-text-bottom">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="inline-block shrink-0 align-text-bottom">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

const content = {
  fr: {
    title: "Conditions d'utilisation",
    lastUpdated: "Dernière mise à jour : 24 avril 2026",
    intro:
      "Bienvenue sur Runly. Les presentes Conditions d'utilisation regissent votre acces et votre utilisation du site web et de l'application mobile Runly (le « Service »). En accedant ou en utilisant Runly, vous acceptez d'etre lie par ces Conditions.",
    sections: [
      {
        title: "1. A propos de Runly",
        body: "Runly est une plateforme qui met en relation des personnes souhaitant courir ensemble en fonction de leur niveau, de leurs objectifs et de leurs disponibilites. Elle permet aux utilisateurs de :",
        list: [
          "Decouvrir des coureurs a proximite",
          "Rejoindre ou creer des sessions de course",
          "Participer a des clubs et evenements communautaires",
          "Suivre leur progression en course a pied",
        ],
        note: "Runly est fourni par Runly.",
      },
      {
        title: "2. Eligibilite",
        body: "Pour utiliser Runly, vous devez :",
        list: [
          "Avoir au moins 18 ans (ou disposer du consentement parental le cas echeant)",
          "Fournir des informations exactes et veridiques",
          "Utiliser le Service conformement aux lois applicables",
        ],
      },
      {
        title: "3. Comptes utilisateurs",
        body: "Lors de la creation d'un compte, vous vous engagez a :",
        list: [
          "Proteger vos identifiants de connexion",
          "Ne pas partager votre compte avec d'autres personnes",
          "Nous notifier immediatement de toute utilisation non autorisee",
        ],
        note: "Runly se reserve le droit de suspendre ou de resilier les comptes qui enfreignent ces Conditions.",
      },
      {
        title: "4. Utilisation du Service",
        body: "Vous vous engagez a ne pas :",
        list: [
          "Utiliser Runly a des fins illegales ou prejudiciables",
          "Harceler, menacer ou nuire a d'autres utilisateurs",
          "Partager des informations fausses ou trompeuses",
          "Tenter d'acceder aux systemes de la plateforme ou de les perturber",
        ],
        note: "Runly est concu pour favoriser un environnement communautaire sur et positif.",
      },
      {
        title: "5. Avertissement concernant les activites sportives",
        body: "En utilisant Runly, vous reconnaissez que :",
        list: [
          "La course a pied implique une activite physique et des risques inherents",
          "Vous participez aux sessions a vos propres risques",
          "Runly n'organise pas et ne supervise pas directement les sessions de course",
        ],
        note: "Runly ne peut etre tenu responsable des blessures, accidents ou interactions entre utilisateurs. Vous etes responsable de votre propre securite et de votre sante.",
      },
      {
        title: "6. Contenu utilisateur",
        body: "Vous pouvez partager du contenu tel que des informations de profil, photos, messages et donnees d'activite. En publiant du contenu, vous accordez a Runly une licence non exclusive, mondiale et libre de redevances pour l'utiliser, l'afficher et le distribuer dans le cadre du Service. Vous restez proprietaire de votre contenu.",
      },
      {
        title: "7. Confidentialite",
        body: "Votre utilisation de Runly est egalement regie par notre Politique de confidentialite. Nous nous engageons a proteger vos donnees personnelles.",
      },
      {
        title: "8. Propriete intellectuelle",
        body: "Tout le contenu lie a Runly, notamment le logo, le design, l'interface et les fonctionnalites, est la propriete de Runly et protege par les lois sur la propriete intellectuelle. Vous ne pouvez pas copier, modifier ou distribuer une partie du Service sans autorisation.",
      },
      {
        title: "9. Limitation de responsabilite",
        body: "Dans toute la mesure permise par la loi, Runly ne peut etre tenu responsable des dommages indirects ou consecutifs, de la perte de donnees ou de benefices, ou des blessures corporelles resultant de l'utilisation du Service. Le Service est fourni « en l'etat », sans garantie d'aucune sorte.",
      },
      {
        title: "10. Resiliation",
        body: "Nous pouvons suspendre ou ressilier votre acces a Runly a tout moment en cas de violation de ces Conditions. Vous pouvez cesser d'utiliser le Service a tout moment.",
      },
      {
        title: "11. Modifications des Conditions",
        body: "Nous pouvons mettre a jour ces Conditions periodiquement. Vous serez informe des modifications importantes. La poursuite de l'utilisation du Service signifie que vous acceptez les Conditions mises a jour.",
      },
      {
        title: "12. Droit applicable",
        body: "Les presentes Conditions sont regies par les lois de France.",
      },
    ],
    contact: "13. Contact",
    contactBody: "Pour toute question concernant ces Conditions :",
    contactEmail: "support@runly-app.com",
    contactSite: "runly-app.com",
  },
  en: {
    title: "Terms of Use",
    lastUpdated: "Last updated: April 24, 2026",
    intro:
      "Welcome to Runly. These Terms of Use govern your access to and use of the Runly website and mobile application (the \"Service\"). By accessing or using Runly, you agree to be bound by these Terms.",
    sections: [
      {
        title: "1. About Runly",
        body: "Runly is a platform that connects individuals who wish to run together based on their level, goals, and availability. It allows users to:",
        list: [
          "Discover nearby runners",
          "Join or create running sessions",
          "Participate in clubs and community events",
          "Track their running progress",
        ],
        note: "Runly is provided by Runly.",
      },
      {
        title: "2. Eligibility",
        body: "To use Runly, you must:",
        list: [
          "Be at least 18 years old (or have parental consent if applicable)",
          "Provide accurate and truthful information",
          "Use the Service in compliance with applicable laws",
        ],
      },
      {
        title: "3. User Accounts",
        body: "When creating an account, you agree to:",
        list: [
          "Keep your login credentials secure",
          "Not share your account with others",
          "Notify us immediately of any unauthorized use",
        ],
        note: "Runly reserves the right to suspend or terminate accounts that violate these Terms.",
      },
      {
        title: "4. Use of the Service",
        body: "You agree not to:",
        list: [
          "Use Runly for illegal or harmful activities",
          "Harass, threaten, or harm other users",
          "Share false or misleading information",
          "Attempt to access or disrupt the platform's systems",
        ],
        note: "Runly is designed to promote a safe and positive community environment.",
      },
      {
        title: "5. Running Activities Disclaimer",
        body: "By using Runly, you acknowledge that:",
        list: [
          "Running involves physical activity and inherent risks",
          "You participate in sessions at your own risk",
          "Runly does not organize or supervise running sessions directly",
        ],
        note: "Runly is not responsible for injuries, accidents, or interactions between users. You are responsible for your own safety and health.",
      },
      {
        title: "6. User Content",
        body: "You may share content such as profile information, photos, messages, and activity data. By posting content, you grant Runly a non-exclusive, worldwide, royalty-free license to use, display, and distribute it within the Service. You remain the owner of your content.",
      },
      {
        title: "7. Privacy",
        body: "Your use of Runly is also governed by our Privacy Policy. We are committed to protecting your personal data.",
      },
      {
        title: "8. Intellectual Property",
        body: "All content related to Runly, including the logo, design, interface, and features, is the property of Runly and protected by intellectual property laws. You may not copy, modify, or distribute any part of the Service without permission.",
      },
      {
        title: "9. Limitation of Liability",
        body: "To the fullest extent permitted by law, Runly shall not be liable for indirect or consequential damages, loss of data or profits, or personal injury resulting from use of the Service. The Service is provided \"as is\" without warranties of any kind.",
      },
      {
        title: "10. Termination",
        body: "We may suspend or terminate your access to Runly at any time if you violate these Terms. You may stop using the Service at any time.",
      },
      {
        title: "11. Changes to the Terms",
        body: "We may update these Terms from time to time. You will be notified of significant changes. Continued use of the Service means you accept the updated Terms.",
      },
      {
        title: "12. Governing Law",
        body: "These Terms are governed by the laws of France.",
      },
    ],
    contact: "13. Contact",
    contactBody: "For any questions regarding these Terms:",
    contactEmail: "support@runly-app.com",
    contactSite: "runly-app.com",
  },
};

export default async function TermsPage() {
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
              <div
                className="mt-3 h-1 w-full rounded-full"
                style={{ backgroundColor: BRAND }}
                aria-hidden
              />
            </div>
            <p className="mt-4 text-sm text-zinc-400">{tr.lastUpdated}</p>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">{tr.intro}</p>
          </div>

          {/* Sections */}
          {tr.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-zinc-900 sm:text-xl">{section.title}</h2>
              {section.body && (
                <p className="mt-3 text-base leading-relaxed text-zinc-600 sm:text-lg">{section.body}</p>
              )}
              {section.list && (
                <ul className="mt-3 space-y-1.5 text-base text-zinc-600 sm:text-lg">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4EA6F5]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.note && (
                <p className="mt-3 text-base leading-relaxed text-zinc-500 sm:text-lg">{section.note}</p>
              )}
            </div>
          ))}

          {/* Contact */}
          <div>
            <h2 className="text-lg font-bold text-zinc-900 sm:text-xl">{tr.contact}</h2>
            <p className="mt-3 text-base text-zinc-600 sm:text-lg">{tr.contactBody}</p>
            <ul className="mt-3 space-y-2 text-base text-zinc-600 sm:text-lg">
              <li className="flex items-center gap-2" style={{ color: BRAND }}>
                <MailIcon />
                <a href={`mailto:${tr.contactEmail}`} className="hover:underline">
                  {tr.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2" style={{ color: BRAND }}>
                <GlobeIcon />
                <Link href="/" className="hover:underline">
                  {tr.contactSite}
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </main>
  );
}
