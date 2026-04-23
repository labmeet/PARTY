import { Hero } from "@/components/landing/Hero";
import { IntroCard } from "@/components/landing/IntroCard";
import { AboutSection, HospitalityShowcaseSection } from "@/components/landing/AboutSection";
import { DressCodeSection } from "@/components/landing/DressCodeSection";
import { EntryNoticeSection } from "@/components/landing/EntryNoticeSection";
import { ProgramSection } from "@/components/landing/ProgramSection";
import { ReassuranceSection } from "@/components/landing/ReassuranceSection";
import { QuoteCard } from "@/components/landing/QuoteCard";
import { PartyCalendar } from "@/components/landing/PartyCalendar";
import { ApplyCta } from "@/components/landing/ApplyCta";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/landing/Footer";
import { FloatingAssets } from "@/components/landing/FloatingAssets";

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
        <DressCodeSection />
        <ProgramSection />
        <HospitalityShowcaseSection />
        <div className="container-page">
          <div className="divider-fade" />
        </div>
        <ReassuranceSection />
        <ApplyCta variant="final" />
        <FaqSection />
        <EntryNoticeSection />
        <Footer />
      </main>
    </>
  );
}
