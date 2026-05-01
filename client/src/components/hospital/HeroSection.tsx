import { ArrowRight, BadgeCheck, ImagePlus, Sparkles } from "lucide-react";
import { scrollToConsult } from "../../utils/scroll";
import { PhoneMockup } from "./PhoneMockup";

export function HeroSection() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-label">전국 산부인과 · 산후조리원 · 소아과 전용</p>
          <h1>
            산모가 병원을 선택한 이유를,
            <br />
            출산 후에도 계속 기억하게 합니다.
          </h1>
          <p className="hero-description">
            창조트리문화센터는 AI 이미지 생성, 오프라인 문화센터, 참여 선물, 미션 리워드를 하나로 연결한
            병원 전용 임산부 문화서비스입니다. 산모는 임신부터 출산 후까지 즐기고, 병원은 반복되는 고객 접점과
            차별화된 브랜드 경험을 얻습니다.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={scrollToConsult}>
              도입 상담 신청하기 <ArrowRight size={18} />
            </button>
            <a className="secondary-button" href="#solution">
              서비스 화면 보기 <ImagePlus size={18} />
            </a>
          </div>
          <div className="hero-trust">
            <span>
              <BadgeCheck size={16} /> AI 이미지 1년 이용권
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
            <strong>1년형 문화혜택</strong>
            <span>임신부터 출산 후까지</span>
          </div>
          <div className="floating-stat stat-two">
            <strong>운영 부담 감소</strong>
            <span>상담, 안내, 참여 관리 구조화</span>
          </div>
        </div>
      </div>
    </section>
  );
}

