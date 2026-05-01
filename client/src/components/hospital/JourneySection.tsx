import { journeySteps } from "../../data/hospitalLanding";

export function JourneySection() {
  return (
    <section className="section journey-section" id="journey">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">1년 고객 접점</p>
          <h2>임신부터 출산 후까지, 산모의 모든 순간에 병원이 함께합니다.</h2>
          <p>단 한 번의 이벤트가 아니라, 산모가 병원을 기억하는 1년의 경험을 설계합니다.</p>
        </div>
        <div className="timeline">
          {journeySteps.map((step, index) => (
            <article className="timeline-item" key={step.stage}>
              <span className="timeline-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.stage}</h3>
              <p>{step.mother}</p>
              <strong>{step.hospital}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

