import { useEffect, useState } from "react";
import { LogOut, RefreshCcw, Search } from "lucide-react";
import type { HospitalLeadStatus, HospitalLeadSummary } from "../../../shared/hospital";
import { hospitalStatusLabels, hospitalStatuses } from "../../../shared/hospital";
import {
  clearAdminToken,
  fetchAdminLead,
  fetchAdminLeads,
  getAdminToken,
  loginAdmin,
  setAdminToken,
  updateAdminLeadStatus
} from "../api/admin";
import { AdminLeadDetail } from "../components/admin/AdminLeadDetail";
import { AdminLeadList } from "../components/admin/AdminLeadList";

export function AdminApp() {
  const [isAuthed, setIsAuthed] = useState(Boolean(getAdminToken()));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [leads, setLeads] = useState<HospitalLeadSummary[]>([]);
  const [selectedLead, setSelectedLead] = useState<HospitalLeadSummary | null>(null);
  const [selectedId, setSelectedId] = useState<string>();
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  async function loadLeads() {
    if (!isAuthed) return;
    setIsLoading(true);
    const result = await fetchAdminLeads({ status: statusFilter, search });
    setLeads(result.leads);
    setTotal(result.total);
    setIsLoading(false);
  }

  async function selectLead(id: string) {
    setSelectedId(id);
    setIsDetailLoading(true);
    const result = await fetchAdminLead(id);
    setSelectedLead(result.lead);
    setIsDetailLoading(false);
  }

  async function handleStatusChange(status: HospitalLeadStatus) {
    if (!selectedLead) return;
    const result = await updateAdminLeadStatus(selectedLead.id, status);
    setSelectedLead(result.lead);
    setLeads((current) => current.map((lead) => (lead.id === result.lead.id ? result.lead : lead)));
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    const result = await loginAdmin(username, password);

    if (!result.ok) {
      setLoginError(result.message);
      return;
    }

    setAdminToken(result.token);
    setIsAuthed(true);
  }

  function logout() {
    clearAdminToken();
    setIsAuthed(false);
    setSelectedLead(null);
    setLeads([]);
  }

  useEffect(() => {
    void loadLeads();
  }, [isAuthed, statusFilter]);

  if (!isAuthed) {
    return (
      <main className="admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <p className="eyebrow">Admin</p>
          <h1>병원 상담 리드 관리자</h1>
          <label>
            아이디
            <input value={username} onChange={(event) => setUsername(event.target.value)} />
          </label>
          <label>
            비밀번호
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button className="primary-button" type="submit">
            로그인
          </button>
          {loginError && <p className="form-message error">{loginError}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow">창조트리문화센터</p>
          <h1>병원 상담 리드</h1>
          <span>총 {total.toLocaleString("ko-KR")}건</span>
        </div>
        <button type="button" onClick={logout}>
          <LogOut size={18} /> 로그아웃
        </button>
      </header>

      <section className="admin-toolbar">
        <label>
          상태
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="">전체</option>
            {hospitalStatuses.map((status) => (
              <option key={status} value={status}>
                {hospitalStatusLabels[status]}
              </option>
            ))}
          </select>
        </label>
        <label className="admin-search">
          검색
          <span>
            <Search size={16} />
            <input
              placeholder="병원명, 지역, 담당자, 연락처"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void loadLeads();
              }}
            />
          </span>
        </label>
        <button type="button" onClick={loadLeads}>
          <RefreshCcw size={17} /> 새로고침
        </button>
      </section>

      <div className="admin-layout">
        <section className="admin-list">
          {isLoading ? (
            <p className="admin-empty">목록을 불러오는 중입니다.</p>
          ) : (
            <AdminLeadList leads={leads} selectedId={selectedId} onSelect={selectLead} />
          )}
        </section>
        <AdminLeadDetail lead={selectedLead} isLoading={isDetailLoading} onStatusChange={handleStatusChange} />
      </div>
    </main>
  );
}

