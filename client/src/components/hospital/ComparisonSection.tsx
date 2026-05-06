import { CheckCircle2, MinusCircle } from "lucide-react";
import { comparisonRows } from "../../data/hospitalLanding";

export function ComparisonSection() {
  return (
    <section className="section comparison-section" id="difference">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">차별화</p>
          <h2>기존 문화센터와 다릅니다. AI와 오프라인 경험이 연결됩니다.</h2>
          <p>
            창조트리문화센터는 단순한 강좌 운영이 아니라, 산모가 병원 혜택을 앱에서 경험하고 오프라인에서
            직접 참여하는 구조입니다.
          </p>
        </div>
        <div className="comparison-table" role="table" aria-label="기존 문화센터와 창조트리문화센터 비교">
          <div className="comparison-row comparison-head" role="row">
            <span>구분</span>
            <span>기존 병원 문화센터</span>
            <span>창조트리문화센터</span>
          </div>
          {comparisonRows.map((row) => (
            <div className="comparison-row" role="row" key={row.label}>
              <strong>{row.label}</strong>
              <span className="comparison-legacy">
                <span className="comparison-mobile-label">
                  <MinusCircle size={16} aria-hidden="true" /> 기존
                </span>
                <span>{row.legacy}</span>
              </span>
              <span className="comparison-positive">
                <span className="comparison-mobile-label">
                  <CheckCircle2 size={16} aria-hidden="true" /> 창조
                </span>
                <span className="comparison-positive-value">
                  <CheckCircle2 className="comparison-desktop-icon" size={18} aria-hidden="true" /> {row.createtree}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
