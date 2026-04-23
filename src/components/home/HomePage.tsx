import { CommunityBanner, TestimonialBand } from "@/components/home/CommunityBanner";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HangoutsCarouselSection } from "@/components/home/HangoutsCarouselSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PreFooterSection } from "@/components/home/PreFooterSection";
import { getLocale } from "@/lib/locale";
import { t } from "@/i18n/translations";

export async function HomePage() {
  const locale = await getLocale();
  const tr = t(locale);

  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="flex w-full flex-1 flex-col">
        <HeroSection tr={tr.hero} />
        <FeaturesSection tr={tr.features} />
        <HangoutsCarouselSection tr={tr.carousel} />
        <CommunityBanner tr={tr.communityBanner} />
        <FaqSection tr={tr.faq} />
        <TestimonialBand tr={tr.communityBanner.testimonial} />
        <PreFooterSection tr={tr.stats} />
      </main>
    </div>
  );
}
