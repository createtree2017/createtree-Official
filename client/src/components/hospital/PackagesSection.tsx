import { ArrowRight } from "lucide-react";
import { packagePlans } from "../../data/hospitalLanding";
import { scrollToConsult } from "../../utils/scroll";

export function PackagesSection() {
  return (
    <section className="section packages-section" id="packages">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">패키지</p>
          <h2>병원 규모와 운영 목적에 맞춰 선택할 수 있습니다.</h2>
          <p>가격은 바로 노출하지 않고, 병원 규모와 도입 목적에 맞춘 상담형 구성으로 제안합니다.</p>
        </div>
        <div className="package-grid">
          {packagePlans.map((plan) => (
            <article className={`package-card ${plan.recommended ? "recommended" : ""}`} key={plan.title}>
              {plan.recommended && <span className="recommend-badge">추천</span>}
              <h3>{plan.title}</h3>
              <p>{plan.description}</p>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <strong>{plan.target}</strong>
            </article>
          ))}
        </div>
        <div className="package-cta">
          <p>병원 규모별 구성 가능 · 상담 후 맞춤 제안</p>
          <button className="primary-button" type="button" onClick={scrollToConsult}>
            우리 병원에 맞는 구성 상담받기 <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

