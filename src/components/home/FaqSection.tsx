const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "C’est dangereux de retrouver des gens via Runly pour aller courir ?",
    a: "On te propose de matcher avec des profils vérifiés, de partir sur des parcours fréquentés, et surtout de ne jamais partager d’adresse perso en premier message. T’as l’esprit tranquille, les mollets serrés à part.",
  },
  {
    q: "Runly, c’est gratuit ou je vais claquer le PEL ?",
    a: "L’appli, le matching et le petit planning de sorties, c’est sans sous. Certains brols premium peuvent arriver plus tard, mais l’idée, c’est que tout le monde puisse s’enjailler un minimum sans cliquer sur « Payer 9,99 € ».",
  },
  {
    q: "Runly, ça marche dans ma cambrousse / ma grande ville ?",
    a: "On s’agrandit doucement. Tant qu’y a assez de coureurs inscrits près de chez toi, t’as des propositions. Sinon, refile le lien autour de toi : le réseau, ça s’bâtit en foulées.",
  },
  {
    q: "L’appli balance ma position béton en temps réel ?",
    a: "Non, on n’envoie pas un GPS mètre par mètre sur la place publique. Tu partages seulement ce que tu valides, et les zones c’est volontairement flou. On est là pour t’aligner, pas pour streamer ton canapé.",
  },
];

function FaqItem({ item }: { item: (typeof FAQ_ITEMS)[0] }) {
  return (
    <details className="group border-b border-zinc-200 py-4 first:pt-0 last:border-b-0 sm:py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium text-zinc-900 outline-offset-2 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 pr-2 sm:text-lg">{item.q}</span>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4EA6F5] text-2xl font-light leading-none text-white transition-transform duration-200 group-open:rotate-45 sm:h-11 sm:w-11 sm:text-3xl"
          aria-hidden
        >
          +
        </span>
      </summary>
      <p className="pt-1 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
        {item.a}
      </p>
    </details>
  );
}

export function FaqSection() {
  return (
    <section
      id="faq"
      className="w-full border-b border-zinc-100 bg-white px-3 pb-6 pt-14 sm:px-5 sm:pb-7 sm:pt-16 lg:px-8 lg:pb-8 lg:pt-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid w-full max-w-[71rem] gap-10 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
        <div className="max-w-md lg:pt-0">
          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl"
          >
            FAQ
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed text-zinc-600 sm:mt-4 sm:text-lg">
            Tout ce qu’il faut savoir (ou presque) sur Runly. T’as pas la réponse
            ? Écris-nous, on en discute en mode humain, pas en bot qui récite la
            doc.
          </p>
        </div>

        <div>
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
