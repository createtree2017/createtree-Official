import { B2CPreview } from "../components/hospital/B2CPreview";
import { ComparisonSection } from "../components/hospital/ComparisonSection";
import { FaqSection } from "../components/hospital/FaqSection";
import { HeroSection } from "../components/hospital/HeroSection";
import { JourneySection } from "../components/hospital/JourneySection";
import { OperationSection } from "../components/hospital/OperationSection";
import { PackagesSection } from "../components/hospital/PackagesSection";
import { SolutionSection } from "../components/hospital/SolutionSection";
import { StickyCTA } from "../components/hospital/StickyCTA";

export function HospitalLandingPage() {
  return (
    <>
      <HeroSection />
      <SolutionSection />
      <JourneySection />
      <ComparisonSection />
      <OperationSection />
      <PackagesSection />
      <B2CPreview />
      <FaqSection />
      <footer className="site-footer">
        <strong>창조트리문화센터</strong>
        <p>병원별 운영 방식과 혜택 구성은 관련 법령, 의료광고 기준, 내부 운영 정책에 따라 조정될 수 있습니다.</p>
      </footer>
      <StickyCTA />
    </>
  );
}

