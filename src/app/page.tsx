import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import {
  NightPlusSection,
  CharterMarketplaceSection,
  TeamSection,
  SiteFooter,
} from "@/components/ui/feature-sections";
import { SiteNav } from "@/components/ui/site-nav";

export default function Home() {
  return (
    <div className="overflow-x-hidden w-full min-h-screen">
      <SiteNav />
      <CinematicHero />
      <NightPlusSection />
      <CharterMarketplaceSection />
      <TeamSection />
      <SiteFooter />
    </div>
  );
}
