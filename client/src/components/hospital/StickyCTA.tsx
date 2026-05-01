import { MessageCircle, PhoneCall } from "lucide-react";
import { scrollToConsult } from "../../utils/scroll";

export function StickyCTA() {
  return (
    <div className="sticky-cta" aria-label="빠른 상담 메뉴">
      <span>병원별 맞춤 AI 문화센터 구성</span>
      <button type="button" onClick={scrollToConsult}>
        <MessageCircle size={17} /> 상담 신청
      </button>
      <a href="tel:">
        <PhoneCall size={17} /> 전화 상담
      </a>
    </div>
  );
}

