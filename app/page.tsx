import { Hero } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/AboutSection";
import { ReassuranceSection } from "@/components/landing/ReassuranceSection";
import { QuoteCard } from "@/components/landing/QuoteCard";
import { PartyCalendar } from "@/components/landing/PartyCalendar";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="container-page">
        <div className="divider-fade" />
      </div>
      <AboutSection />
      <div className="container-page">
        <div className="divider-fade" />
      </div>
      <ReassuranceSection />
      <QuoteCard />
      <PartyCalendar />
      <Footer />
    </main>
  );
}
