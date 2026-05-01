import { CalendarClock, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import type { HospitalLeadStatus, HospitalLeadSummary } from "../../../../shared/hospital";
import {
  desiredServiceLabels,
  hospitalStatusLabels,
  hospitalStatuses,
  hospitalTypeLabels
} from "../../../../shared/hospital";

type Props = {
  lead: HospitalLeadSummary | null;
  isLoading: boolean;
  onStatusChange: (status: HospitalLeadStatus) => void;
};

export function AdminLeadDetail({ lead, isLoading, onStatusChange }: Props) {
  if (isLoading) {
    return (
      <aside className="admin-detail">
        <p className="muted">리드 상세 정보를 불러오는 중입니다.</p>
      </aside>
    );
  }

  if (!lead) {
    return (
      <aside className="admin-detail">
        <h2>리드 상세</h2>
        <p className="muted">목록에서 상담 신청을 선택해주세요.</p>
      </aside>
    );
  }

  return (
    <aside className="admin-detail">
      <div className="admin-detail-head">
        <span className={`status-badge status-${lead.status}`}>{hospitalStatusLabels[lead.status]}</span>
        <select value={lead.status} onChange={(event) => onStatusChange(event.target.value as HospitalLeadStatus)}>
          {hospitalStatuses.map((status) => (
            <option key={status} value={status}>
              {hospitalStatusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      <h2>{lead.hospitalName}</h2>
      <p className="admin-detail-type">{hospitalTypeLabels[lead.hospitalType]}</p>

      <dl className="admin-info-grid">
        <div>
          <dt>
            <MapPin size={16} /> 지역
          </dt>
          <dd>{lead.region}</dd>
        </div>
        <div>
          <dt>
            <UserRound size={16} /> 담당자
          </dt>
          <dd>{lead.contactName}</dd>
        </div>
        <div>
          <dt>
            <Phone size={16} /> 연락처
          </dt>
          <dd>{lead.phone}</dd>
        </div>
        <div>
          <dt>
            <Mail size={16} /> 이메일
          </dt>
          <dd>{lead.email || "미입력"}</dd>
        </div>
        <div>
          <dt>
            <CalendarClock size={16} /> 접수일
          </dt>
          <dd>{new Date(lead.createdAt).toLocaleString("ko-KR")}</dd>
        </div>
        <div>
          <dt>
            <ShieldCheck size={16} /> 개인정보 동의
          </dt>
          <dd>{lead.privacyAgreedAt ? new Date(lead.privacyAgreedAt).toLocaleString("ko-KR") : "확인 필요"}</dd>
        </div>
      </dl>

      <section className="admin-detail-section">
        <h3>희망 서비스</h3>
        <div className="tag-list">
          {lead.desiredServices.map((service) => (
            <span key={service}>{desiredServiceLabels[service]}</span>
          ))}
        </div>
      </section>

      <section className="admin-detail-section">
        <h3>운영 정보</h3>
        <p>월평균 산모 고객 수: {lead.monthlyMaternityRange || "미입력"}</p>
        <p>산후조리원 운영 여부: {lead.hasPostpartumCenter || "미입력"}</p>
      </section>

      <section className="admin-detail-section">
        <h3>문의 내용</h3>
        <p>{lead.message || "문의 내용이 없습니다."}</p>
      </section>

      <section className="admin-detail-section">
        <h3>유입 정보</h3>
        <p>경로: {lead.landingPath || "미수집"}</p>
        <p>Referrer: {lead.referrer || "없음"}</p>
        <p>
          UTM: {[lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ") || "없음"}
        </p>
      </section>
    </aside>
  );
}

