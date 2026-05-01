import { Gift, QrCode, Smartphone } from "lucide-react";

export function B2CPreview() {
  return (
    <section className="section b2c-section" id="preview">
      <div className="section-inner b2c-grid">
        <div>
          <p className="eyebrow">산모 안내 미리보기</p>
          <h2>산모 고객에게는 이렇게 안내됩니다.</h2>
          <p className="section-lead">
            병원 로고와 안내 문구, QR 코드, 프로그램 신청 버튼을 병원별로 조정해 산모 고객이 바로 이해할 수
            있는 혜택 페이지로 제공합니다.
          </p>
        </div>
        <div className="b2c-preview-card" aria-label="산모 고객 안내 페이지 미리보기">
          <div className="preview-topbar">
            <span>OO여성병원 산모님 전용</span>
            <strong>창조트리문화센터</strong>
          </div>
          <h3>임신부터 출산 후까지 이어지는 AI 문화혜택</h3>
          <p>AI 이미지 만들고, 문화센터 참여하고, 출산 준비 선물까지 만나보세요.</p>
          <div className="preview-actions">
            <button type="button">
              <Smartphone size={16} /> 앱 설치
            </button>
            <button type="button">
              <QrCode size={16} /> QR 안내
            </button>
          </div>
          <div className="preview-benefits">
            <span>AI 이미지 1년 이용권</span>
            <span>태교 클래스</span>
            <span>
              <Gift size={14} /> 출산 준비 혜택
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

