import type { HospitalLeadSummary } from "../../../../shared/hospital";
import { desiredServiceLabels, hospitalStatusLabels, hospitalTypeLabels } from "../../../../shared/hospital";

type Props = {
  leads: HospitalLeadSummary[];
  selectedId?: string;
  onSelect: (leadId: string) => void;
};

export function AdminLeadList({ leads, selectedId, onSelect }: Props) {
  if (leads.length === 0) {
    return <p className="admin-empty">조건에 맞는 상담 신청이 없습니다.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>접수일</th>
            <th>병원</th>
            <th>담당자</th>
            <th>희망 서비스</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className={lead.id === selectedId ? "selected" : ""}
              onClick={() => onSelect(lead.id)}
            >
              <td>{new Date(lead.createdAt).toLocaleDateString("ko-KR")}</td>
              <td>
                <strong>{lead.hospitalName}</strong>
                <span>
                  {lead.region} · {hospitalTypeLabels[lead.hospitalType]}
                </span>
              </td>
              <td>
                <strong>{lead.contactName}</strong>
                <span>{lead.phone}</span>
              </td>
              <td>{lead.desiredServices.map((service) => desiredServiceLabels[service]).join(", ")}</td>
              <td>
                <span className={`status-badge status-${lead.status}`}>{hospitalStatusLabels[lead.status]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

