import { HeroSection } from "@/components/home/HeroSection";

export function HomePage() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="flex w-full flex-1 flex-col">
        <HeroSection />
      </main>
    </div>
  );
}
