import { Hero } from "@/components/landing/Hero";
import { IntroCard } from "@/components/landing/IntroCard";
import { AboutSection } from "@/components/landing/AboutSection";
import { ReassuranceSection } from "@/components/landing/ReassuranceSection";
import { QuoteCard } from "@/components/landing/QuoteCard";
import { PartyCalendar } from "@/components/landing/PartyCalendar";
import { ApplyCta } from "@/components/landing/ApplyCta";
import { Footer } from "@/components/landing/Footer";
import { FloatingAssets } from "@/components/landing/FloatingAssets";
import { SmokeVideo } from "@/components/landing/SmokeVideo";

export default function Home() {
  return (
    <>
      <FloatingAssets />
      <main className="relative z-10 min-h-screen">
        <Hero />
        <QuoteCard />
        <PartyCalendar />
        <ApplyCta />
        <div className="container-page">
          <div className="divider-fade" />
        </div>
        <IntroCard />
        <AboutSection />
        <div className="container-page">
          <div className="divider-fade" />
        </div>
        <ReassuranceSection />
        <ApplyCta variant="final" />
        <SmokeVideo />
        <Footer /> 
      </main>
    </>
  );
}
