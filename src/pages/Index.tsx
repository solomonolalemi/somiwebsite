import SomiHeader from "@/components/SomiHeader";
import HeroSection from "@/components/HeroSection";
import CrisisSection from "@/components/CrisisSection";
import ImpactMapSection from "@/components/ImpactMapSection";
import ActionCardsSection from "@/components/ActionCardsSection";
import ResearchPublicationsSection from "@/components/ResearchPublicationsSection";
import PatientPortalSection from "@/components/PatientPortalSection";
import SomiFooter from "@/components/SomiFooter";
import CancerWalkBanner from "@/components/CancerWalkBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SomiHeader />
      <CancerWalkBanner />
      <main>
        <HeroSection />
        <CrisisSection />
        <ImpactMapSection />
        <ActionCardsSection />
        <ResearchPublicationsSection />
        <PatientPortalSection />
        
      </main>
      <SomiFooter />
    </div>
  );
};

export default Index;
