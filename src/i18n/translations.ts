export type Locale = "fr" | "en";

const translations = {
  fr: {
    navbar: {
      ariaLabel: "Principale",
      links: [
        { href: "#features", label: "Fonctionnalités" },
        { href: "#rating", label: "Avis" },
        { href: "#contact", label: "Contact" },
        { href: "#about", label: "À propos" },
      ],
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      downloadAppStore: "Télécharger sur l'App Store",
      downloadGooglePlay: "Télécharger sur Google Play",
    },
    hero: {
      badge: "Recommandé par des coureurs",
      rating: "4,9/5",
      eyebrow: "Découvrez Runly",
      h1: ["Trouvez des partenaires de running à votre niveau pour progresser", "ensemble"],
      body: "Runly vous met en relation avec des coureurs qui partagent votre allure et vos objectifs, pour vous entraîner ensemble et vous dépasser en toute confiance.",
      downloadAppStore: "Télécharger sur l'App Store",
      downloadGooglePlay: "Télécharger sur Google Play",
      imageAlt: "Groupe de coureuses en pleine course sur route, souriant.",
    },
    carousel: {
      heading: "des sessions de running à rejoindre tout de suite",
      ariaLabel: "Défilement de sessions de running",
      cards: [
        { title: "Marathon du saucisson", place: "Chambéry, France", flag: "🇫🇷", participants: "86+" },
        { title: "Courir pour oublier son ex", place: "Paris, France", flag: "🇫🇷", participants: "120+" },
        { title: "Jogging du lendemain de cuite", place: "Lille, France", flag: "🇫🇷", participants: "34+" },
        { title: "Sprint vers la boulangerie", place: "Toulouse, France", flag: "🇫🇷", participants: "210+" },
        { title: "Les mollets maudits d'aprem", place: "Rennes, France", flag: "🇫🇷", participants: "52+" },
        { title: "La fuite des escargots (5 km de sieste)", place: "Lausanne, Suisse", flag: "🇨🇭", participants: "18+" },
        { title: "Retour pépère après l'heure du dîner", place: "Bordeaux, France", flag: "🇫🇷", participants: "67+" },
        { title: "C'est pas l'Kms c'est l'Kiffe", place: "Marseille, France", flag: "🇫🇷", participants: "94+" },
        { title: "Les quadriceps en PLS du lundi", place: "Nantes, France", flag: "🇫🇷", participants: "41+" },
        { title: "Run du désespoir avant la pesée", place: "Nice, France", flag: "🇫🇷", participants: "28+" },
        { title: "Le club des ventres à l'ancienne", place: "Bruxelles, Belgique", flag: "🇧🇪", participants: "33+" },
        { title: "Trotinette en mode traque (interdit de voler l'eau)", place: "Strasbourg, France", flag: "🇫🇷", participants: "19+" },
        { title: "Grimpe ton escalier avant le 10 km (promis ça pique)", place: "Grenoble, France", flag: "🇫🇷", participants: "55+" },
      ],
    },
    faq: {
      heading: "FAQ",
      intro: "Les réponses aux questions qu'on nous pose le plus souvent sur Runly. Une info manque ? Écris-nous, on te répond dès qu'on peut.",
      items: [
        {
          q: "C'est dangereux de retrouver des gens via Runly pour aller courir ?",
          a: "On te propose de matcher avec des profils vérifiés, de partir sur des parcours fréquentés, et surtout de ne jamais partager d'adresse perso en premier message. T'as l'esprit tranquille, les mollets serrés à part.",
        },
        {
          q: "Runly, c'est gratuit ou je vais claquer le PEL ?",
          a: "L'appli, le matching et le petit planning de sorties, c'est sans sous. Certains brolls premium peuvent arriver plus tard, mais l'idée, c'est que tout le monde puisse s'enjailler un minimum sans cliquer sur « Payer 9,99 € ».",
        },
        {
          q: "Runly, ça marche dans ma cambrousse / ma grande ville ?",
          a: "On s'agrandit doucement. Tant qu'y a assez de coureurs inscrits près de chez toi, t'as des propositions. Sinon, refile le lien autour de toi : le réseau, ça s'bâtit en foulées.",
        },
        {
          q: "L'appli balance ma position béton en temps réel ?",
          a: "Non, on n'envoie pas un GPS mètre par mètre sur la place publique. Tu partages seulement ce que tu valides, et les zones c'est volontairement flou. On est là pour t'aligner, pas pour streamer ton canapé.",
        },
      ],
    },
    footer: {
      tagline: "Trouvez des partenaires de course au même niveau que vous et progressez ensemble.",
      aboutTitle: "À propos",
      aboutLinks: [
        { href: "#careers", label: "Carrières" },
        { href: "#blog", label: "Blog" },
        { href: "#download-ios", label: "Téléchargement iOS" },
        { href: "#download-android", label: "Téléchargement Android" },
      ],
      infoTitle: "Infos",
      infoLinks: [
        { href: "#cgu", label: "Conditions générales" },
        { href: "#confidentialite", label: "Politique de confidentialité" },
        { href: "#securite", label: "Conseils de sécurité" },
        { href: "#communaute", label: "Charte de la communauté" },
      ],
      copyright: (year: number) => `© ${year} Runly. Tous droits réservés.`,
      navAriaLabel: "Infos légales et communauté",
    },
  },

  en: {
    navbar: {
      ariaLabel: "Main",
      links: [
        { href: "#features", label: "Features" },
        { href: "#rating", label: "Reviews" },
        { href: "#contact", label: "Contact" },
        { href: "#about", label: "About" },
      ],
      openMenu: "Open menu",
      closeMenu: "Close menu",
      downloadAppStore: "Download on the App Store",
      downloadGooglePlay: "Get it on Google Play",
    },
    hero: {
      badge: "Recommended by runners",
      rating: "4.9/5",
      eyebrow: "Discover Runly",
      h1: ["Find running partners at your level to progress", "together"],
      body: "Runly connects you with runners who share your pace and goals, so you can train together and push each other with full confidence.",
      downloadAppStore: "Download on the App Store",
      downloadGooglePlay: "Get it on Google Play",
      imageAlt: "Group of female runners on a road, smiling.",
    },
    carousel: {
      heading: "running sessions to join right now",
      ariaLabel: "Running sessions carousel",
      cards: [
        { title: "Sausage Slugfest Marathon", place: "Chambéry, France", flag: "🇫🇷", participants: "86+" },
        { title: "Running to Forget Your Ex", place: "Paris, France", flag: "🇫🇷", participants: "120+" },
        { title: "Hangover Morning Jog", place: "Lille, France", flag: "🇫🇷", participants: "34+" },
        { title: "Sprint to the Bakery", place: "Toulouse, France", flag: "🇫🇷", participants: "210+" },
        { title: "The Cursed Calves of Afternoon", place: "Rennes, France", flag: "🇫🇷", participants: "52+" },
        { title: "The Snail Escape (5km Nap Run)", place: "Lausanne, Switzerland", flag: "🇨🇭", participants: "18+" },
        { title: "Easy Run After Dinner Time", place: "Bordeaux, France", flag: "🇫🇷", participants: "67+" },
        { title: "It's Not the Miles, It's the Vibes", place: "Marseille, France", flag: "🇫🇷", participants: "94+" },
        { title: "Monday Quad Meltdown", place: "Nantes, France", flag: "🇫🇷", participants: "41+" },
        { title: "Pre-Weigh-In Desperation Run", place: "Nice, France", flag: "🇫🇷", participants: "28+" },
        { title: "The Old School Beer Belly Club", place: "Brussels, Belgium", flag: "🇧🇪", participants: "33+" },
        { title: "Hunt Mode Jog (No Stealing Water)", place: "Strasbourg, France", flag: "🇫🇷", participants: "19+" },
        { title: "Stairway Warmup Before 10K (It Burns)", place: "Grenoble, France", flag: "🇫🇷", participants: "55+" },
      ],
    },
    faq: {
      heading: "FAQ",
      intro: "Everything you need to know about Runly. Can't find the answer? Reach out — we'll get back to you as soon as we can.",
      items: [
        {
          q: "Is it safe to meet people through Runly for a run?",
          a: "We only show verified profiles, recommend busy routes, and never encourage sharing a home address in a first message. Run with peace of mind — your calves are the only thing under pressure.",
        },
        {
          q: "Is Runly free, or is it going to cost me?",
          a: "The app, matching, and session planning are completely free. Some premium features may come later, but the goal is for everyone to enjoy the basics without hitting a paywall.",
        },
        {
          q: "Does Runly work in my city?",
          a: "We're growing steadily. As long as there are enough runners signed up near you, you'll get suggestions. If not, share the link — every great running crew starts somewhere.",
        },
        {
          q: "Does the app share my exact location?",
          a: "No — we don't broadcast your GPS position in real time. You only share what you choose to, and location zones are intentionally vague. We're here to connect runners, not track them.",
        },
      ],
    },
    footer: {
      tagline: "Find running partners at your level and progress together.",
      aboutTitle: "About",
      aboutLinks: [
        { href: "#careers", label: "Careers" },
        { href: "#blog", label: "Blog" },
        { href: "#download-ios", label: "iOS Download" },
        { href: "#download-android", label: "Android Download" },
      ],
      infoTitle: "Info",
      infoLinks: [
        { href: "#cgu", label: "Terms & Conditions" },
        { href: "#confidentialite", label: "Privacy Policy" },
        { href: "#securite", label: "Safety Tips" },
        { href: "#communaute", label: "Community Guidelines" },
      ],
      copyright: (year: number) => `© ${year} Runly. All rights reserved.`,
      navAriaLabel: "Legal and community info",
    },
  },
} as const;

export type Translations = typeof translations.fr;

export function t(locale: Locale): Translations {
  return translations[locale] as unknown as Translations;
}
