import { ArrowRight, BadgeCheck, BarChart3, ImagePlus, Sparkles } from "lucide-react";
import logoDark from "../../assets/createtree-logo-dark.png";
import { scrollToConsult } from "../../utils/scroll";
import { PhoneMockup } from "./PhoneMockup";

export function HeroSection() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-brand" aria-label="창조트리문화센터">
            <img src={logoDark} alt="" />
            <div>
              <strong>창조트리문화센터</strong>
              <span>우리 병원 전용 AI 문화센터</span>
            </div>
          </div>

          <p className="hero-label">전국 산부인과 · 산후조리원 · 소아과 전용</p>
          <h1>
            산모가 우리 병원을 선택한 이유를,
            <br />
            출산 후에도 계속 기억하게 합니다.
          </h1>
          <p className="hero-description">
            창조트리문화센터는 AI 서비스, 오프라인 문화센터, 참여 미션을 하나로 연결해 산모 고객의 경험을
            병원 브랜드의 기억으로 바꾸는 B2B 문화혜택 플랫폼입니다.
          </p>

          <div className="hero-definition">
            <span>창조트리문화센터란?</span>
            <p>
              산모에게는 AI 서비스와 오프라인 문화 프로그램, 참여 미션을 제공하고, 병원에는 진료 이후에도
              다시 기억되는 고객 접점을 설계해주는 우리 병원 전용 AI 문화센터입니다.
            </p>
          </div>

          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={scrollToConsult}>
              도입 상담 신청하기 <ArrowRight size={18} />
            </button>
            <a className="secondary-button" href="#solution">
              서비스 화면 보기 <ImagePlus size={18} />
            </a>
          </div>
          <div className="hero-trust" aria-label="핵심 제공 가치">
            <span>
              <BadgeCheck size={16} /> 풍부한 참여 후기 보유
            </span>
            <span>오프라인 문화센터 운영</span>
            <span>선물 미션 시스템</span>
            <span>병원별 맞춤 리포트</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="창조트리문화센터 앱 화면 미리보기">
          <PhoneMockup variant="ai" />
          <PhoneMockup variant="class" />
          <PhoneMockup variant="mission" />
          <div className="floating-stat stat-one">
            <Sparkles size={18} />
            <strong>다양한 문화혜택</strong>
            <span>임신부터 출산 후까지</span>
          </div>
          <div className="floating-stat stat-two">
            <BarChart3 size={18} />
            <strong>운영 부담 감소</strong>
            <span>상담, 안내, 참여 관리 구조화</span>
          </div>
        </div>
      </div>
    </section>
  );
}
