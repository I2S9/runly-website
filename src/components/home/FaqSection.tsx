import type { Translations } from "@/i18n/translations";

function FaqItem({ item }: { item: Translations["faq"]["items"][number] }) {
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

export function FaqSection({ tr }: { tr: Translations["faq"] }) {
  return (
    <section
      id="faq"
      className="w-full border-b border-zinc-100 bg-white px-3 pb-6 pt-14 sm:px-5 sm:pb-7 sm:pt-16 lg:px-8 lg:pb-8 lg:pt-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid w-full max-w-[82rem] gap-10 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
        <div className="max-w-md lg:pt-0">
          <h2
            id="faq-heading"
            className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl"
          >
            {tr.heading}
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed text-zinc-600 sm:mt-4 sm:text-lg">
            {tr.intro}
          </p>
        </div>

        <div>
          {tr.items.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
