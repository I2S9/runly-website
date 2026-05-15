import { getLocale } from "@/lib/locale";
import { GrainRotatingGallery } from "@/components/running-club/GrainRotatingGallery";

const BRAND = "#4EA6F5";

/** Même bande latérale que `<header>` de la Navbar. */
const PAGE_GUTTERS = "px-3 sm:px-5 lg:px-8";
/** Largeur maximale comme la `<nav>` (même bord gauche que la barre bleue et que la galerie). */
const NAV_WIDTH = "mx-auto w-full min-w-0 max-w-[82rem]";

const GALLERY_IMAGES = [
  "/images/running-club-g1.jpg",
  "/images/running-club-hero.jpg",
  "/images/running-club-g2.jpg",
  "/images/running-club-g3.jpg",
  "/images/running-club-g4.jpg",
  "/images/running-club-g5.jpg",
  "/images/running-club-g6.jpg",
] as const;

const copy = {
  fr: {
    title: "Running club",
    lead: "Fais grandir ton running club et fais-le connaître grâce à Runly.",
    galleryAlts: [
      "Coach et coureuses sur la séance Nike Puissance.",
      "Deux coureurs en pleine foulée devant une balustrade.",
      "Groupe pendant l'échauffement ou la préparation séance.",
      "Séance Nike Runly : équipe et ambiance sur le terrain.",
      "Run collectif Pegasus x SRC, ambiance sur la route.",
      "Coureurs et coureuses pendant le run Pegasus, esprit de groupe.",
      "Séance Nike puissance avec les coachs, groupe SRC sur le terrain.",
    ] as const,
    visionParagraphs: [
      "Pour nous, Runly, c'est avant tout rassembler des personnes motivées et curieuses du running pour progresser ensemble. Quand on partage la route, la régularité devient plus simple, les conseils circulent et chaque sortie donne un peu plus envie d'enchaîner la suivante.",
      "Être à plusieurs, ce n'est pas un gadget: c'est souvent ce qui transforme une bonne intention en habitude. On s'encourage, on s'aligne sur un rythme commun, on fête les petits paliers. Notre vision, c'est d'offrir un cadre où cette dynamique de groupe reste au centre et où la communauté Runly peut grandir de façon ouverte et respectueuse.",
      "Les running clubs pourront s'enregistrer sur Runly et publier leurs événements dans l'application. La création et les mises à jour se font via notre espace web partenaire: tu gardes la main sur les infos, les lieux, les horaires et le ton de ton collectif.",
      "Tu peux aussi indiquer un public cible pour que les coureurs comprennent tout de suite l'esprit du groupe, par exemple une section liée à un établissement scolaire ou universitaire, une séance annoncée comme réservée aux femmes ou aux personnes non binaires selon la charte de votre club, ou un créneau pensé pour les seniors. L'objectif est la clarté et l'accueil maîtrisé, pas l'arbitraire.",
      "En contrepartie, avec ton accord et dans le respect de la vie privée et des personnes visibles à l'écran, Runly pourra diffuser des photos ou de courts moments vidéo de vos sorties sur ses réseaux pour faire connaître ton club au plus grand nombre de coureuses et coureurs.",
    ],
    ctaLead: "Toi aussi, tu diriges un running club et tu souhaites agrandir ta commu ?",
    ctaButton: "Rejoindre le programme Runly partner",
    partnerEmailSubject: "Programme Runly partner (running club)",
  },
  en: {
    title: "Running club",
    lead: "Grow your club and help more runners find you, Runly makes it easy and fun.",
    galleryAlts: [
      "Coaches and athletes during the Nike power session.",
      "Two runners sprinting outdoors near a stone balustrade.",
      "Group during warm-up ahead of the training session.",
      "Nike Runly session atmosphere on the track.",
      "Group energy at the Pegasus SRC road run.",
      "Runners mid-stride during the Pegasus group outing.",
      "Nike power session with the coaching crew on the field.",
    ] as const,
    visionParagraphs: [
      "At Runly, we care first about bringing motivated, curious runners together so everyone can progress as a group. When you share the road, consistency gets easier, advice travels faster and every outing makes the next one a little more likely to happen.",
      "Running together is more than a nice extra: it is often what turns a good intention into a habit. You cheer each other on, settle into a shared rhythm and celebrate small wins. Our vision is to keep that group energy central and grow the Runly community in an open, respectful way.",
      "Running clubs can register with Runly and publish their sessions in the app. Setup and edits go through our web partner portal: you stay in control of details, venues, timings and how your collective shows up.",
      "You can also describe who the session is for so runners instantly understand the spirit of the group: for instance a cohort tied to a school or university, a session framed for women or non-binary people according to your club charter, or a slot focused on seniors. The goal is clarity and thoughtful hospitality, not random exclusion.",
      "With your agreement and with respect for privacy and everyone featured on camera, Runly may share photos or short clips from your runs on social channels to introduce your club to more runners.",
    ],
    ctaLead: "Do you lead a running club and want to grow your community?",
    ctaButton: "Join the Runly partner program",
    partnerEmailSubject: "Runly partner program (running club)",
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

export default async function RunningClubPage() {
  const locale = await getLocale();
  const c = copy[locale];
  const partnerHref = `mailto:support@runly-app.com?subject=${encodeURIComponent(c.partnerEmailSubject)}`;

  return (
    <main className="min-h-[50vh] bg-white pb-4 pt-8 font-sans sm:pb-6 sm:pt-10 lg:pb-8 lg:pt-12">
      {/* Même géométrie que la Navbar : gutters viewport puis zone max-w-[82rem], sans padding interne sous le bandeau bleu. */}
      <div className={PAGE_GUTTERS}>
        <GrainRotatingGallery
          sources={GALLERY_IMAGES}
          alts={Array.from(c.galleryAlts)}
          columnStaggerMs={15_000}
          flexRowClassName={`flex min-w-0 items-stretch gap-3 ${NAV_WIDTH} sm:gap-5 md:gap-7 lg:gap-8 xl:gap-10`}
          figureClassName="m-0 flex min-h-0 min-w-0 flex-1 basis-0 flex-col overflow-hidden rounded-xl sm:rounded-2xl"
          imageSizes="(max-width: 640px) calc((100vw - 24px - 36px) / 4), (max-width: 1024px) calc((min(82rem,100vw - 40px) - 80px)/4), calc((min(82rem,100vw - 64px) - 112px)/4)"
        />

        {/* Texte : même cadre que la galerie (gouttières + max-w), sans padding interne en plus : aligné sur le bord gauche de la barre de nav. */}
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
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:mt-8 sm:text-lg">
              {c.lead}
            </p>
          </header>

          <article className="mt-10 space-y-6 sm:mt-12 sm:space-y-7">
            {c.visionParagraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-zinc-600 sm:text-lg">
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
