import { Hero } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/AboutSection";
import { CtaButtons } from "@/components/landing/CtaButtons";
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
      <CtaButtons />
      <Footer />
    </main>
  );
}
