import Header from "./components/Header";
import Hero from "./components/Hero";
import WhoWeAreSection from "./components/WhoWeAreSection";
import BenefitsSection from "./components/BenefitsSection";
import ChallengeSection from "./components/ChallengeSection";
import PhilosophySection from "./components/PhilosophySection";
import ServicesSection from "./components/ServicesSection";
import WhyUsSection from "./components/WhyUsSection";
import ClientsSection from "./components/ClientsSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSection from "./components/TestimonialsSection";
import BlogSection from "./components/BlogSection";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhoWeAreSection />
        <BenefitsSection />
        <ServicesSection />
        <ChallengeSection />
        <PhilosophySection />
        <WhyUsSection />
        <ClientsSection />
        <ProcessSection />
        <TestimonialsSection />
        <BlogSection />
        <CTASection />
      </main>
    </>
  );
}
