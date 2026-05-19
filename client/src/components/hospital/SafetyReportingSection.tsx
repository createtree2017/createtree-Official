import { reportPreviewItems, safetyPrinciples } from "../../data/hospitalLanding";

export function SafetyReportingSection() {
  return (
    <section className="section safety-section" id="safety">
      <div className="section-inner safety-layout">
        <div className="section-heading safety-heading">
          <p className="eyebrow">안전 운영 · 리포트</p>
          <h2>의료광고 리스크를 피하는 운영 기준까지 함께 설계합니다.</h2>
          <p>
            창조트리문화센터는 진료 후기나 치료경험담을 조건으로 한 혜택 운영을 피하고, 문화센터 프로그램
            만족도와 작품 후기, 클래스 참여 인증처럼 비의료 영역의 반응을 중심으로 병원별 운영 가이드를
            제안합니다.
          </p>
        </div>

        <div className="safety-columns">
          <div className="safety-column">
            <p className="column-label">운영 기준</p>
            <div className="safety-card-list">
              {safetyPrinciples.map((item) => (
                <article className="safety-card" key={item.title}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="safety-column report-column">
            <p className="column-label">병원 리포트 예시</p>
            <div className="report-preview" aria-label="병원별 문화센터 운영 리포트 예시">
              <div className="report-header">
                <span>Monthly report</span>
                <strong>OO여성병원 문화센터 운영 요약</strong>
              </div>
              <div className="report-list">
                {reportPreviewItems.map((item) => (
                  <article className="report-row" key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
              <p className="report-note">
                리포트는 진료 성과가 아니라 산모 고객의 문화센터 참여 흐름과 다음 운영 제안을 확인하는 자료로
                구성합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
