"use client";

import { usePathname } from "next/navigation";
import type { Locale, Translations } from "@/i18n/translations";
import { DownloadButtons } from "@/components/ui/DownloadButtons";
import { FooterAudienceSegment } from "@/components/layout/FooterAudienceSegment";

const BRAND = "#4EA6F5";

function isHome(pathname: string) {
  return pathname === "/" || pathname === "";
}

/** Bandeau bleu téléchargement sur toutes les pages. Bloc « Devenir partenaire » + sélecteur : accueil uniquement. */
export function FooterPromoBlocks({
  locale,
  ctaPartnerAbove,
  ctaAudienceAria,
  ctaAudienceClub,
  ctaAudienceInfluencer,
  ctaHeading,
  ctaSubtitle,
  downloadAppStore,
  downloadGooglePlay,
  trModal,
}: {
  locale: Locale;
  ctaPartnerAbove: string;
  ctaAudienceAria: string;
  ctaAudienceClub: string;
  ctaAudienceInfluencer: string;
  ctaHeading: string;
  ctaSubtitle: string;
  downloadAppStore: string;
  downloadGooglePlay: string;
  trModal: Translations["downloadModal"];
}) {
  const pathname = usePathname() ?? "";

  return (
    <>
      {isHome(pathname) ? (
        <div className="mx-auto mb-6 flex w-full max-w-328 flex-col items-center gap-4 sm:mb-8 sm:gap-5 md:mb-10 md:gap-6">
          <h2 className="text-balance text-center text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            {ctaPartnerAbove}
          </h2>
          <FooterAudienceSegment
            locale={locale}
            ariaLabel={ctaAudienceAria}
            labelClub={ctaAudienceClub}
            labelInfluencer={ctaAudienceInfluencer}
          />
        </div>
      ) : null}

      <div
        className="mx-auto w-full max-w-328 rounded-2xl px-3 pb-12 pt-8 text-white sm:rounded-3xl sm:px-5 sm:pb-14 sm:pt-10 lg:px-8"
        style={{ backgroundColor: BRAND }}
      >
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">{ctaHeading}</h2>
        <p className="mt-3 text-base leading-relaxed text-white/85 sm:text-lg">{ctaSubtitle}</p>
        <div className="mt-6">
          <DownloadButtons
            tr={{
              downloadAppStore,
              downloadGooglePlay,
              downloadModal: trModal,
            }}
            size="lg"
            layout="row"
          />
        </div>
      </div>
    </>
  );
}
