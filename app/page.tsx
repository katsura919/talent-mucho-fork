import Hero from "../components/Hero";
import ClientsSection from "../components/ClientsSection";
import ChallengeSection from "../components/ChallengeSection";
import EducateBuildOperate from "../components/EducateBuildOperate";
import WhoWeAreSection from "../components/WhoWeAreSection";
import WebsiteServiceSection from "../components/WebsiteServiceSection";
import ServicesSection from "../components/ServicesSection";
import EventPromoStrip from "../components/EventPromoStrip";
import BenefitsSection from "../components/BenefitsSection";
import ProcessSection from "../components/ProcessSection";
import WhyUsSection from "../components/WhyUsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import BlogSection from "../components/BlogSection";
import CTASection from "../components/CTASection";
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ClientsSection />
        <ChallengeSection />
        <EducateBuildOperate />
        <WhoWeAreSection />
        <WebsiteServiceSection />
        <ServicesSection />
        <EventPromoStrip />
        <BenefitsSection />
        <ProcessSection />
        <WhyUsSection />
        <TestimonialsSection />
        <BlogSection />
      </main>
    </>
  );
}
