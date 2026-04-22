import { FaqSection } from "@/components/home/FaqSection";
import { HangoutsCarouselSection } from "@/components/home/HangoutsCarouselSection";
import { HeroSection } from "@/components/home/HeroSection";

export function HomePage() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="flex w-full flex-1 flex-col">
        <HeroSection />
        <HangoutsCarouselSection />
        <FaqSection />
      </main>
    </div>
  );
}
