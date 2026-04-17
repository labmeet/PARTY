import { Hero } from "@/components/landing/Hero";
import { IntroCard } from "@/components/landing/IntroCard";
import { AboutSection } from "@/components/landing/AboutSection";
import { ReassuranceSection } from "@/components/landing/ReassuranceSection";
import { QuoteCard } from "@/components/landing/QuoteCard";
import { PartyCalendar } from "@/components/landing/PartyCalendar";
import { Footer } from "@/components/landing/Footer";
import { FloatingAssets } from "@/components/landing/FloatingAssets";

export default function Home() {
  return (
    <>
      <FloatingAssets />
      <main className="relative z-10 min-h-screen">
        <Hero />
        <IntroCard />
        <div className="container-page">
          <div className="divider-fade" />
        </div>
        <AboutSection />
        <div className="container-page">
          <div className="divider-fade" />
        </div>
        <ReassuranceSection />
        <PartyCalendar />
        <QuoteCard />
        <Footer />
      </main>
    </>
  );
}
