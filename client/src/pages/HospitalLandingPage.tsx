import { B2CPreview } from "../components/hospital/B2CPreview";
import { ComparisonSection } from "../components/hospital/ComparisonSection";
import { FaqSection } from "../components/hospital/FaqSection";
import { HeroSection } from "../components/hospital/HeroSection";
import { JourneySection } from "../components/hospital/JourneySection";
import { LandingNav } from "../components/hospital/LandingNav";
import { OperationSection } from "../components/hospital/OperationSection";
import { PackagesSection } from "../components/hospital/PackagesSection";
import { SolutionSection } from "../components/hospital/SolutionSection";
import { StickyCTA } from "../components/hospital/StickyCTA";
import { StoryIntroHero } from "../components/hospital/StoryIntroHero";

export function HospitalLandingPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        본문 바로가기
      </a>
      <LandingNav />
      <main id="main-content">
        <StoryIntroHero />
        <HeroSection />
        <SolutionSection />
        <JourneySection />
        <ComparisonSection />
        <OperationSection />
        <PackagesSection />
        <B2CPreview />
        <FaqSection />
      </main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <strong>창조트리문화센터</strong>
          <p className="site-footer-service">여성병원 | 산부인과 | 산후조리원 | 소아과 전용 컨설팅/마케팅 기업</p>
          <p className="site-footer-company">창조트리기획</p>
          <address className="site-footer-info">
            <span>사업자등록 : 105 - 68 - 00149</span>
            <span>이메일 : ct.createtree@createtree.ai.kr</span>
          </address>
        </div>
      </footer>
      <StickyCTA />
    </>
  );
}
