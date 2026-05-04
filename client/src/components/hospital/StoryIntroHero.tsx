import { ArrowRight } from "lucide-react";
import { scrollToConsult } from "../../utils/scroll";

export function StoryIntroHero() {
  return (
    <section className="story-intro-hero" aria-labelledby="story-intro-title">
      <div className="story-intro-stage">
        <h1 className="story-intro-title" id="story-intro-title">
          <span>산모가</span>
          <span className="story-intro-title-line" aria-hidden="true" />
          <span>우리 병원을 선택할 이유</span>
        </h1>

        <p className="story-intro-brandline" aria-label="창조트리 문화센터">
          <span>창조트리</span>
          <span>문화센터</span>
        </p>

        <button className="story-intro-cta" type="button" onClick={scrollToConsult}>
          상담하기 <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
