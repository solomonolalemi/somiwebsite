import SomiHeader from "@/components/SomiHeader";
import HeroSection from "@/components/HeroSection";
import CrisisSection from "@/components/CrisisSection";
import ImpactMapSection from "@/components/ImpactMapSection";
import ActionCardsSection from "@/components/ActionCardsSection";
import PatientPortalSection from "@/components/PatientPortalSection";

import SomiFooter from "@/components/SomiFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SomiHeader />
      <main>
        <HeroSection />
        <CrisisSection />
        <ImpactMapSection />
        <ActionCardsSection />
        <PatientPortalSection />
        <TeamSection />
      </main>
      <SomiFooter />
    </div>
  );
};

export default Index;
