import HeroSection from '@/components/home-page/HeroSection';
import GameFeaturesSection from '@/components/home-page/GameFeaturesSection';
import MarineCreaturesSection from '@/components/home-page/MarineCreaturesSection';
import ArsenalSection from '@/components/home-page/ArsenalSection';
import NewsSection from '@/components/home-page/NewsSection';
import GameStorySection from '@/components/home-page/GameStorySection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <GameStorySection />
      <GameFeaturesSection />
      <MarineCreaturesSection />
      <ArsenalSection />
      <NewsSection />
    </main>
  );
}
