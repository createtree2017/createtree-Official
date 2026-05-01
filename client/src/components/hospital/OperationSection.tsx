import { operationSteps } from "../../data/hospitalLanding";

export function OperationSection() {
  return (
    <section className="section operation-section" id="operation">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">운영 방식</p>
          <h2>도입은 간단하게, 운영은 체계적으로 설계합니다.</h2>
          <p>병원은 산모에게 혜택을 안내하고, 창조트리문화센터는 운영 구조를 함께 만듭니다.</p>
        </div>
        <div className="step-grid">
          {operationSteps.map((step, index) => (
            <article className="step-card" key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

