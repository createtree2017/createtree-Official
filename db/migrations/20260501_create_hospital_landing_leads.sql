CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS hospital_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_name TEXT NOT NULL,
  region TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  hospital_type TEXT NOT NULL,
  monthly_maternity_range TEXT,
  has_postpartum_center TEXT,
  desired_services JSONB NOT NULL DEFAULT '[]'::jsonb,
  message TEXT,

  status TEXT NOT NULL DEFAULT 'new',
  contacted_at TIMESTAMPTZ,
  proposal_sent_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,

  landing_path TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,

  privacy_agreed BOOLEAN NOT NULL DEFAULT false,
  privacy_agreed_at TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT hospital_leads_status_check
    CHECK (status IN ('new', 'contacted', 'proposal_sent', 'negotiating', 'closed', 'rejected', 'spam')),
  CONSTRAINT hospital_leads_hospital_type_check
    CHECK (hospital_type IN ('obgyn', 'postpartum_center', 'pediatrics', 'women_hospital', 'other'))
);

CREATE INDEX IF NOT EXISTS hospital_leads_status_idx ON hospital_leads(status);
CREATE INDEX IF NOT EXISTS hospital_leads_created_at_idx ON hospital_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS hospital_leads_hospital_type_idx ON hospital_leads(hospital_type);
CREATE INDEX IF NOT EXISTS hospital_leads_region_idx ON hospital_leads(region);
CREATE INDEX IF NOT EXISTS hospital_leads_phone_idx ON hospital_leads(phone);

