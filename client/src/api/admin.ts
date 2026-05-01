import type {
  AdminLeadDetailResponse,
  AdminLeadListResponse,
  AdminLoginResponse,
  HospitalLeadStatus
} from "../../../shared/hospital";

const tokenKey = "ct_admin_token";

export function getAdminToken() {
  return window.localStorage.getItem(tokenKey);
}

export function setAdminToken(token: string) {
  window.localStorage.setItem(tokenKey, token);
}

export function clearAdminToken() {
  window.localStorage.removeItem(tokenKey);
}

async function adminFetch<T>(url: string, options: RequestInit = {}) {
  const token = getAdminToken();
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (response.status === 401) {
    clearAdminToken();
  }

  return (await response.json()) as T;
}

export async function loginAdmin(username: string, password: string) {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  return (await response.json()) as AdminLoginResponse;
}

export function fetchAdminLeads(params: { status?: string; search?: string; page?: number }) {
  const searchParams = new URLSearchParams();
  if (params.status) searchParams.set("status", params.status);
  if (params.search) searchParams.set("search", params.search);
  if (params.page) searchParams.set("page", String(params.page));
  searchParams.set("limit", "20");

  return adminFetch<AdminLeadListResponse>(`/api/admin/hospital-leads?${searchParams.toString()}`);
}

export function fetchAdminLead(id: string) {
  return adminFetch<AdminLeadDetailResponse>(`/api/admin/hospital-leads/${id}`);
}

export function updateAdminLeadStatus(id: string, status: HospitalLeadStatus) {
  return adminFetch<AdminLeadDetailResponse>(`/api/admin/hospital-leads/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
}

