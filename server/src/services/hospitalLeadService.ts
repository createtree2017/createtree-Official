import type {
  CreateHospitalLeadInput,
  DesiredService,
  HospitalLeadStatus,
  HospitalLeadSummary,
  HospitalType
} from "../../../shared/hospital.js";
import { query } from "../db.js";

type LeadRow = {
  id: string;
  hospital_name: string;
  region: string;
  contact_name: string;
  phone: string;
  email: string | null;
  hospital_type: HospitalType;
  monthly_maternity_range: string | null;
  has_postpartum_center: string | null;
  desired_services: DesiredService[];
  message: string | null;
  status: HospitalLeadStatus;
  landing_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  privacy_agreed: boolean;
  privacy_agreed_at: string | null;
  created_at: string;
  updated_at: string;
};

type RequestContext = {
  ipAddress?: string;
  userAgent?: string;
};

function mapLead(row: LeadRow): HospitalLeadSummary {
  return {
    id: row.id,
    hospitalName: row.hospital_name,
    region: row.region,
    contactName: row.contact_name,
    phone: row.phone,
    email: row.email,
    hospitalType: row.hospital_type,
    monthlyMaternityRange: row.monthly_maternity_range,
    hasPostpartumCenter: row.has_postpartum_center,
    desiredServices: row.desired_services ?? [],
    message: row.message,
    status: row.status,
    landingPath: row.landing_path,
    referrer: row.referrer,
    utmSource: row.utm_source,
    utmMedium: row.utm_medium,
    utmCampaign: row.utm_campaign,
    privacyAgreed: row.privacy_agreed,
    privacyAgreedAt: row.privacy_agreed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function createLead(input: CreateHospitalLeadInput, context: RequestContext) {
  const result = await query<LeadRow>(
    `
      INSERT INTO hospital_leads (
        hospital_name,
        region,
        contact_name,
        phone,
        email,
        hospital_type,
        monthly_maternity_range,
        has_postpartum_center,
        desired_services,
        message,
        landing_path,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        privacy_agreed,
        privacy_agreed_at,
        ip_address,
        user_agent
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11, $12, $13, $14, $15, $16, $17,
        true, now(), NULLIF($18, '')::inet, $19
      )
      RETURNING *
    `,
    [
      input.hospitalName,
      input.region,
      input.contactName,
      input.phone,
      input.email || null,
      input.hospitalType,
      input.monthlyMaternityRange || null,
      input.hasPostpartumCenter || null,
      JSON.stringify(input.desiredServices),
      input.message || null,
      input.landingPath || null,
      input.referrer || null,
      input.utm?.source || null,
      input.utm?.medium || null,
      input.utm?.campaign || null,
      input.utm?.content || null,
      input.utm?.term || null,
      context.ipAddress || "",
      context.userAgent || null
    ]
  );

  return mapLead(result.rows[0]);
}

export async function listLeads(options: {
  status?: HospitalLeadStatus;
  search?: string;
  page: number;
  limit: number;
}) {
  const where: string[] = [];
  const params: unknown[] = [];

  if (options.status) {
    params.push(options.status);
    where.push(`status = $${params.length}`);
  }

  if (options.search?.trim()) {
    params.push(`%${options.search.trim()}%`);
    where.push(
      `(hospital_name ILIKE $${params.length} OR region ILIKE $${params.length} OR contact_name ILIKE $${params.length} OR phone ILIKE $${params.length})`
    );
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
  const countResult = await query<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM hospital_leads ${whereSql}`,
    params
  );

  const limit = Math.min(Math.max(options.limit, 1), 100);
  const page = Math.max(options.page, 1);
  const offset = (page - 1) * limit;
  const listParams = [...params, limit, offset];

  const result = await query<LeadRow>(
    `
      SELECT *
      FROM hospital_leads
      ${whereSql}
      ORDER BY created_at DESC
      LIMIT $${listParams.length - 1}
      OFFSET $${listParams.length}
    `,
    listParams
  );

  return {
    leads: result.rows.map(mapLead),
    total: Number(countResult.rows[0]?.count ?? 0)
  };
}

export async function getLeadById(id: string) {
  const result = await query<LeadRow>("SELECT * FROM hospital_leads WHERE id = $1", [id]);
  return result.rows[0] ? mapLead(result.rows[0]) : null;
}

export async function updateLeadStatus(id: string, status: HospitalLeadStatus) {
  const result = await query<LeadRow>(
    `
      UPDATE hospital_leads
      SET
        status = $2,
        contacted_at = CASE WHEN $2 = 'contacted' AND contacted_at IS NULL THEN now() ELSE contacted_at END,
        proposal_sent_at = CASE WHEN $2 = 'proposal_sent' AND proposal_sent_at IS NULL THEN now() ELSE proposal_sent_at END,
        closed_at = CASE WHEN $2 = 'closed' AND closed_at IS NULL THEN now() ELSE closed_at END,
        updated_at = now()
      WHERE id = $1
      RETURNING *
    `,
    [id, status]
  );

  return result.rows[0] ? mapLead(result.rows[0]) : null;
}
