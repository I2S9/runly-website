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
    title: "Politique de confidentialite",
    lastUpdated: "Dernière mise à jour : 24 avril 2026",
    intro:
      "Chez Runly, nous respectons votre vie privee et nous nous engageons a proteger vos donnees personnelles. Cette Politique de confidentialite explique comment nous collectons, utilisons et protegeon vos informations lorsque vous utilisez notre site web et notre application mobile (le « Service »).",
    sections: [
      {
        title: "1. Qui sommes-nous",
        body: "Runly est une plateforme qui met en relation des coureurs en fonction de leur niveau, de leurs objectifs et de leur localisation.",
        note: "Responsable du traitement : Runly. Contact : support@runly-app.com",
      },
      {
        title: "2. Informations que nous collectons",
        subsections: [
          {
            subtitle: "a. Informations que vous fournissez",
            body: "Lorsque vous utilisez Runly, nous pouvons collecter :",
            list: [
              "Nom et nom d'utilisateur",
              "Adresse e-mail",
              "Photo de profil",
              "Preferences de course (niveau, allure, objectifs)",
              "Messages et interactions avec d'autres utilisateurs",
            ],
          },
          {
            subtitle: "b. Donnees de localisation",
            body: "Pour fournir les fonctionnalites principales, nous pouvons collecter votre localisation approximative ou precise ainsi que vos itineraires de course. Cela vous permet de trouver des coureurs a proximite et de rejoindre des sessions locales. Vous pouvez desactiver l'acces a la localisation a tout moment dans les parametres de votre appareil.",
          },
          {
            subtitle: "c. Donnees d'activite et de performance",
            list: [
              "Distance parcourue",
              "Allure",
              "Duree",
              "Historique de course",
            ],
          },
          {
            subtitle: "d. Donnees techniques",
            list: [
              "Type d'appareil",
              "Systeme d'exploitation",
              "Adresse IP",
              "Donnees d'utilisation de l'application",
            ],
          },
        ],
      },
      {
        title: "3. Comment nous utilisons vos donnees",
        body: "Nous utilisons vos informations pour :",
        list: [
          "Fournir et ameliorer le Service",
          "Vous mettre en relation avec des partenaires de course pertinents",
          "Activer les fonctionnalites sociales (messagerie, sessions, clubs)",
          "Suivre vos performances et votre progression",
          "Assurer la securite et prevenir les abus",
          "Communiquer avec vous (notifications, mises a jour)",
        ],
      },
      {
        title: "4. Base legale (RGPD)",
        body: "Si vous etes dans l'UE, nous traitons vos donnees sur la base :",
        list: [
          "Contrat : pour fournir le Service",
          "Consentement : pour la localisation et les donnees optionnelles",
          "Interet legitime : pour ameliorer et securiser la plateforme",
        ],
      },
      {
        title: "5. Partage des donnees",
        body: "Nous ne vendons pas vos donnees personnelles. Nous pouvons partager des donnees avec :",
        list: [
          "D'autres utilisateurs (votre profil, activite, sessions)",
          "Prestataires de services (hebergement, analyses, infrastructure)",
          "Les autorites si la loi l'exige",
        ],
      },
      {
        title: "6. Conservation des donnees",
        body: "Nous conservons vos donnees aussi longtemps que votre compte est actif ou que necessaire pour respecter nos obligations legales. Vous pouvez demander la suppression a tout moment.",
      },
      {
        title: "7. Vos droits (RGPD)",
        body: "Vous avez le droit de :",
        list: [
          "Acceder a vos donnees",
          "Corriger des donnees inexactes",
          "Supprimer vos donnees (droit a l'oubli)",
          "Restreindre ou vous opposer au traitement",
          "Demander la portabilite des donnees",
        ],
        note: "Contact : support@runly-app.com",
      },
      {
        title: "8. Securite",
        body: "Nous mettons en oeuvre des mesures techniques et organisationnelles appropriees pour proteger vos donnees. Aucun systeme n'est cependant infaillible a 100 %.",
      },
      {
        title: "9. Localisation et securite",
        body: "Runly utilise la localisation pour connecter les coureurs. Vous controlez qui voit votre activite et si votre localisation est partagee. Nous encourageons une utilisation responsable des fonctionnalites de localisation.",
      },
      {
        title: "10. Cookies (site web uniquement)",
        body: "Nous pouvons utiliser des cookies pour ameliorer l'experience utilisateur, analyser le trafic et memoriser les preferences. Vous pouvez gerer les cookies dans les parametres de votre navigateur.",
      },
      {
        title: "11. Services tiers",
        body: "Runly peut utiliser des services tiers tels que des outils d'analyse et des fournisseurs d'hebergement cloud. Ces prestataires traitent les donnees en notre nom.",
      },
      {
        title: "12. Protection des mineurs",
        body: "Runly n'est pas destine aux utilisateurs de moins de 18 ans sans le consentement parental.",
      },
      {
        title: "13. Modifications de cette politique",
        body: "Nous pouvons mettre a jour cette Politique de confidentialite periodiquement. Vous serez informe des modifications importantes.",
      },
    ],
    contact: "14. Contact",
    contactBody: "Pour toute question :",
    contactEmail: "support@runly-app.com",
    contactSite: "runly-app.com",
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: April 24, 2026",
    intro:
      "At Runly, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information when you use our website and mobile application (the \"Service\").",
    sections: [
      {
        title: "1. Who We Are",
        body: "Runly is a platform that connects runners based on their level, goals, and location.",
        note: "Data Controller: Runly. Contact: support@runly-app.com",
      },
      {
        title: "2. Information We Collect",
        subsections: [
          {
            subtitle: "a. Information you provide",
            body: "When you use Runly, we may collect:",
            list: [
              "Name and username",
              "Email address",
              "Profile photo",
              "Running preferences (level, pace, goals)",
              "Messages and interactions with other users",
            ],
          },
          {
            subtitle: "b. Location Data",
            body: "To provide core features, we may collect your approximate or precise location and running routes. This allows you to find runners nearby and join local sessions. You can disable location access at any time in your device settings.",
          },
          {
            subtitle: "c. Activity and Performance Data",
            list: [
              "Distance run",
              "Pace",
              "Duration",
              "Running history",
            ],
          },
          {
            subtitle: "d. Technical Data",
            list: [
              "Device type",
              "Operating system",
              "IP address",
              "App usage data",
            ],
          },
        ],
      },
      {
        title: "3. How We Use Your Data",
        body: "We use your information to:",
        list: [
          "Provide and improve the Service",
          "Match you with relevant running partners",
          "Enable social features (chat, sessions, clubs)",
          "Track your performance and progress",
          "Ensure safety and prevent misuse",
          "Communicate with you (notifications, updates)",
        ],
      },
      {
        title: "4. Legal Basis (GDPR)",
        body: "If you are in the EU, we process your data based on:",
        list: [
          "Contract: to provide the Service",
          "Consent: for location and optional data",
          "Legitimate interest: to improve and secure the platform",
        ],
      },
      {
        title: "5. Sharing of Data",
        body: "We do not sell your personal data. We may share data with:",
        list: [
          "Other users (your profile, activity, sessions)",
          "Service providers (hosting, analytics, infrastructure)",
          "Authorities if required by law",
        ],
      },
      {
        title: "6. Data Retention",
        body: "We keep your data as long as your account is active or as needed to comply with legal obligations. You can request deletion at any time.",
      },
      {
        title: "7. Your Rights (GDPR)",
        body: "You have the right to:",
        list: [
          "Access your data",
          "Correct inaccurate data",
          "Delete your data (right to be forgotten)",
          "Restrict or object to processing",
          "Request data portability",
        ],
        note: "Contact: support@runly-app.com",
      },
      {
        title: "8. Security",
        body: "We implement appropriate technical and organizational measures to protect your data. However, no system is 100% secure.",
      },
      {
        title: "9. Location and Safety",
        body: "Runly uses location to connect runners. You control who sees your activity and whether your location is shared. We encourage responsible use of location features.",
      },
      {
        title: "10. Cookies (Website Only)",
        body: "We may use cookies to improve user experience, analyze traffic, and remember preferences. You can manage cookies in your browser settings.",
      },
      {
        title: "11. Third-Party Services",
        body: "Runly may use third-party services such as analytics tools and cloud hosting providers. These providers process data on our behalf.",
      },
      {
        title: "12. Children's Privacy",
        body: "Runly is not intended for users under 18 years old without parental consent.",
      },
      {
        title: "13. Changes to this Policy",
        body: "We may update this Privacy Policy from time to time. You will be notified of significant changes.",
      },
    ],
    contact: "14. Contact",
    contactBody: "If you have any questions:",
    contactEmail: "support@runly-app.com",
    contactSite: "runly-app.com",
  },
};

type Subsection = {
  subtitle: string;
  body?: string;
  list?: string[];
};

type Section = {
  title: string;
  body?: string;
  list?: string[];
  note?: string;
  subsections?: Subsection[];
};

export default async function PrivacyPage() {
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
          {(tr.sections as Section[]).map((section) => (
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
              {section.subsections && (
                <div className="mt-4 space-y-5">
                  {section.subsections.map((sub) => (
                    <div key={sub.subtitle}>
                      <h3 className="text-base font-semibold text-zinc-800 sm:text-lg">{sub.subtitle}</h3>
                      {sub.body && (
                        <p className="mt-2 text-base leading-relaxed text-zinc-600 sm:text-lg">{sub.body}</p>
                      )}
                      {sub.list && (
                        <ul className="mt-2 space-y-1.5 text-base text-zinc-600 sm:text-lg">
                          {sub.list.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4EA6F5]" aria-hidden />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
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
