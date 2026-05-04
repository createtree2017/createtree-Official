import { ArrowRight, BadgeCheck, BarChart3, ImagePlus, Sparkles } from "lucide-react";
import { scrollToConsult } from "../../utils/scroll";
import { PhoneMockup } from "./PhoneMockup";

export function HeroSection() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-wordmark" aria-hidden="true">
        <span>CREATE</span>
        <span>TREE</span>
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-label">전국 산부인과 · 산후조리원 · 소아과 전용</p>
          <h2>
            산모가 우리 병원을 선택한 이유를,
            <br />
            출산 후에도 계속 기억하게 합니다.
          </h2>
          <p className="hero-description">
            창조트리문화센터는 산모 고객에게 차별화된 고품격 문화혜택을 제공하고, 병원에는 진료 이후에도 다시
            떠오르는 고객 접점을 설계합니다.
          </p>

          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={scrollToConsult}>
              도입 상담 신청하기 <ArrowRight size={18} />
            </button>
            <a className="secondary-button" href="#solution">
              서비스 구성 보기 <ImagePlus size={18} />
            </a>
          </div>
          <div className="hero-trust" aria-label="핵심 제공 가치">
            <span>
              <BadgeCheck size={16} /> 비의료 참여 인증 운영
            </span>
            <span>오프라인 문화센터 운영</span>
            <span>선물 미션 시스템</span>
            <span>병원별 맞춤 리포트</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="창조트리문화센터 문화혜택 화면 미리보기">
          <PhoneMockup variant="ai" />
          <PhoneMockup variant="class" />
          <PhoneMockup variant="mission" />
          <div className="floating-stat stat-one">
            <Sparkles size={18} />
            <strong>1년 문화혜택</strong>
            <span>임신부터 출산 후까지</span>
          </div>
          <div className="floating-stat stat-two">
            <BarChart3 size={18} />
            <strong>운영 부담 감소</strong>
            <span>안내, 참여, 리포트 구조화</span>
          </div>
        </div>
      </div>
    </section>
  );
}
