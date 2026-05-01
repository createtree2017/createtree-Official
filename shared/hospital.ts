export const hospitalStatuses = [
  "new",
  "contacted",
  "proposal_sent",
  "negotiating",
  "closed",
  "rejected",
  "spam"
] as const;

export type HospitalLeadStatus = (typeof hospitalStatuses)[number];

export const hospitalTypes = [
  "obgyn",
  "postpartum_center",
  "pediatrics",
  "women_hospital",
  "other"
] as const;

export type HospitalType = (typeof hospitalTypes)[number];

export const desiredServiceValues = [
  "ai_image",
  "offline_class",
  "gift_mission",
  "full_package",
  "unknown"
] as const;

export type DesiredService = (typeof desiredServiceValues)[number];

export type CreateHospitalLeadInput = {
  hospitalName: string;
  region: string;
  contactName: string;
  phone: string;
  email?: string;
  hospitalType: HospitalType;
  monthlyMaternityRange?: string;
  hasPostpartumCenter?: string;
  desiredServices: DesiredService[];
  message?: string;
  privacyAgreed: boolean;
  landingPath?: string;
  referrer?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
  website?: string;
};

export type HospitalLeadSummary = {
  id: string;
  hospitalName: string;
  region: string;
  contactName: string;
  phone: string;
  email: string | null;
  hospitalType: HospitalType;
  monthlyMaternityRange: string | null;
  hasPostpartumCenter: string | null;
  desiredServices: DesiredService[];
  message: string | null;
  status: HospitalLeadStatus;
  landingPath: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  privacyAgreed: boolean;
  privacyAgreedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateHospitalLeadResponse =
  | {
      ok: true;
      leadId: string;
      message: string;
    }
  | {
      ok: false;
      code: "VALIDATION_ERROR" | "SERVER_ERROR" | "RATE_LIMITED";
      message: string;
      fields?: Record<string, string>;
    };

export type AdminLoginResponse =
  | {
      ok: true;
      token: string;
      username: string;
    }
  | {
      ok: false;
      message: string;
    };

export type AdminLeadListResponse = {
  ok: true;
  leads: HospitalLeadSummary[];
  total: number;
};

export type AdminLeadDetailResponse = {
  ok: true;
  lead: HospitalLeadSummary;
};

export const hospitalStatusLabels: Record<HospitalLeadStatus, string> = {
  new: "신규",
  contacted: "1차 연락",
  proposal_sent: "제안서 발송",
  negotiating: "협의 중",
  closed: "도입 확정",
  rejected: "미진행",
  spam: "스팸"
};

export const hospitalTypeLabels: Record<HospitalType, string> = {
  obgyn: "산부인과",
  postpartum_center: "산후조리원",
  pediatrics: "소아과",
  women_hospital: "여성병원",
  other: "기타"
};

export const desiredServiceLabels: Record<DesiredService, string> = {
  ai_image: "AI 이미지",
  offline_class: "오프라인 문화센터",
  gift_mission: "선물 미션",
  full_package: "전체 패키지",
  unknown: "아직 모르겠음"
};

