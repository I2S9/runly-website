import { FaqSection } from "@/components/home/FaqSection";
import { HangoutsCarouselSection } from "@/components/home/HangoutsCarouselSection";
import { HeroSection } from "@/components/home/HeroSection";
import { getLocale } from "@/lib/locale";
import { t } from "@/i18n/translations";

export async function HomePage() {
  const locale = await getLocale();
  const tr = t(locale);

  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="flex w-full flex-1 flex-col">
        <HeroSection tr={tr.hero} />
        <HangoutsCarouselSection tr={tr.carousel} />
        <FaqSection tr={tr.faq} />
      </main>
    </div>
  );
}
