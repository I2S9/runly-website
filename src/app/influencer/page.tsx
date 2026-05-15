import { getLocale } from "@/lib/locale";

const BRAND = "#4EA6F5";

/** Même bande latérale que `<header>` de la Navbar. */
const PAGE_GUTTERS = "px-3 sm:px-5 lg:px-8";
/** Largeur maximale comme la `<nav>` (même bord gauche que la barre bleue). */
const NAV_WIDTH = "mx-auto w-full min-w-0 max-w-[82rem]";

const copy = {
  fr: {
    title: "Influenceurs Runly",
    lead: "Parle de Runly sur TikTok et Instagram : ta voix, ton énergie.",
    visionParagraphs: [
      "Chez Runly, on croit au plaisir avant tout: sortir, bouger, retrouver des copains et des copines, et avancer à son rythme sans se mettre la pression. Le mouvement et le bien-être, ce n'est pas une performance à exhiber, c'est un cadre de vie plus doux où chacun peut progresser, se sentir accueilli et fêter les petites victoires.",
      "La communauté, pour nous, ce n'est pas qu'un mot: c'est l'idée qu'on gagne tous à se motiver, se donner des idées de sorties et célébrer les efforts des autres. Partager la bonne humeur, inviter quelqu'un à nous rejoindre, expliquer une appli avec le sourire: tout ça fait partie de ce qu'on a envie de refléter dans les contenus qu'on imagine avec toi.",
      "On recherche des influenceurs et influenceuses fitness, lifestyle ou running, présents sur TikTok et Instagram. Il n'y a pas de palier d'abonnés imposé: si tu as envie de créer, d'expérimenter et de représenter des valeurs de respect, d'entraide et de progression accessible, tu es déjà dans l'esprit qu'on cherche.",
      "Dans tes vidéos ou carrousels, on aimerait voir transparaître cette idée simple: Runly aide à organiser la vie sportive entre amis, à garder le lien autour du sport, et à rendre la régularité plus naturelle. Tu peux raconter ça avec de l'humour, une mise en scène, une mini danse, un avant-après drôle et assumé, un tuto express ou un carrousel pédagogique: tout ce qui peut toucher, expliquer vite, et donner envie d'essayer.",
      "La progression, chez Runly, c'est aussi montrer qu'on peut avancer sans se comparer en permanence aux autres. Tes contenus peuvent parler d'objectifs réalistes, de reprise après une pause, de fierté d'avoir tenu une sortie entre potes, ou de la joie de découvrir un nouveau lieu pour courir. L'authenticité et la bienveillance face caméra comptent autant qu'un super montage.",
      "Côté formats, on est ouverts: formats courts verticaux, transitions dynamiques, voix off, texte à l'écran, trends dansées adaptées à ton style, carrousels avec captures d'écran ou anecdotes. L'important, c'est que ce soit lisible pour quelqu'un qui ne connaît pas encore Runly, que ça reste honnête sur ce que fait l'app, et que le ton reste positif et inclusif.",
      "Si tu te reconnais dans ce projet, envoie-nous un message avec des extraits de ce que tu proposes déjà ou des liens vers tes fichiers: on lira tout avec attention et on reviendra vers toi pour échanger sur une collaboration qui respecte ton univers et le nôtre.",
    ],
    ctaLead: "Tu souhaites avoir la chance de collaborer avec nous ?",
    ctaButton: "Rejoindre le programme Runly partner",
    partnerEmailSubject: "Programme Runly partner (influenceurs)",
  },
  en: {
    title: "Runly influencers",
    lead: "Talk about Runly on TikTok and Instagram: your voice, your energy.",
    visionParagraphs: [
      "At Runly, fun comes first: getting outside, moving, meeting friends, and pacing yourself without needless pressure. Movement and wellbeing are not a flex, they are a softer frame for life where everyone can progress, feel welcome, and celebrate small wins.",
      "Community is more than a buzzword for us: it is the belief that we all win when we cheer each other on, swap ideas for outings, and celebrate effort. Spreading good energy, inviting someone to join, or explaining an app with a smile is exactly the spirit we want to see in the content we create with you.",
      "We are looking for fitness, lifestyle, or running creators on TikTok and Instagram. There is no follower minimum: if you love to create, experiment, and stand for respect, mutual support, and approachable progress, you already match what we are after.",
      "In your videos or carousels, we want that simple idea to shine: Runly helps organize sporty life with friends, stay connected through sport, and make consistency feel more natural. You can tell the story with humor, a skit, a short dance, a candid before or after, a quick tutorial, or an educational carousel: anything that engages fast and makes people want to try.",
      "Progress at Runly also means showing you can move forward without constantly comparing yourself to others. Your content can talk about realistic goals, coming back after a break, pride in finishing a group run, or joy in discovering a new route. Authenticity and kindness on camera matter as much as slick editing.",
      "On formats, we are open: vertical shorts, dynamic transitions, voiceover, on-screen text, dance trends adapted to your style, carousels with app screenshots or stories. The key is that someone new to Runly understands what the app does, that claims stay truthful, and the tone stays positive and inclusive.",
      "If this resonates, send us a note with samples or links to your files: we read everything carefully and will follow up to talk about a collaboration that respects your world and ours.",
    ],
    ctaLead: "Hoping to collaborate with us?",
    ctaButton: "Join the Runly partner program",
    partnerEmailSubject: "Runly partner program (influencers)",
  },
} as const;

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 12h14m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function InfluencerPage() {
  const locale = await getLocale();
  const c = copy[locale];
  const partnerHref = `mailto:support@runly-app.com?subject=${encodeURIComponent(c.partnerEmailSubject)}`;

  return (
    <main
      lang={locale === "fr" ? "fr" : "en"}
      className="min-h-[50vh] bg-white pb-4 pt-8 font-sans sm:pb-6 sm:pt-10 lg:pb-8 lg:pt-12"
    >
      <div className={PAGE_GUTTERS}>
        <div className={NAV_WIDTH}>
          <header className="mt-10 flex flex-col items-start text-left sm:mt-12">
            <div className="inline-block max-w-full text-left">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
                {c.title}
              </h1>
              <div
                className="mt-3 h-1 w-full rounded-full"
                style={{ backgroundColor: BRAND }}
                aria-hidden
              />
            </div>
            <p className="mt-6 max-w-2xl hyphens-auto text-justify text-base leading-relaxed text-zinc-600 sm:mt-8 sm:text-lg">
              {c.lead}
            </p>
          </header>

          <article className="mt-10 space-y-6 sm:mt-12 sm:space-y-7">
            {c.visionParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="hyphens-auto text-justify text-base leading-relaxed text-zinc-600 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-4 text-left sm:pt-5">
              <div className="min-w-0 max-w-full overflow-x-auto pb-1 sm:overflow-x-visible">
                <p className="whitespace-nowrap text-base font-medium text-zinc-900 sm:text-lg md:text-xl">
                  {c.ctaLead}
                </p>
              </div>
              <div className="mt-3 flex justify-center sm:mt-4">
                <a
                  href={partnerHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4EA6F5] sm:px-8 sm:py-4 sm:text-lg"
                  style={{ backgroundColor: BRAND }}
                >
                  {c.ctaButton}
                  <ArrowRightIcon className="shrink-0" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
