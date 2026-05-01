import type { CreateHospitalLeadInput, DesiredService, HospitalType } from "../../../shared/hospital.js";
import { desiredServiceValues, hospitalTypes } from "../../../shared/hospital.js";

type ValidationResult =
  | {
      ok: true;
      value: CreateHospitalLeadInput;
      honeypotTriggered?: false;
    }
  | {
      ok: false;
      fields: Record<string, string>;
      honeypotTriggered?: false;
    }
  | {
      ok: false;
      fields: Record<string, string>;
      honeypotTriggered: true;
    };

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function optionalString(value: unknown) {
  const text = asString(value);
  return text.length > 0 ? text : undefined;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateLeadInput(body: unknown): ValidationResult {
  const source = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const fields: Record<string, string> = {};

  if (asString(source.website)) {
    return { ok: false, fields, honeypotTriggered: true };
  }

  const hospitalName = asString(source.hospitalName);
  const region = asString(source.region);
  const contactName = asString(source.contactName);
  const phone = asString(source.phone);
  const email = optionalString(source.email);
  const hospitalType = asString(source.hospitalType) as HospitalType;
  const monthlyMaternityRange = optionalString(source.monthlyMaternityRange);
  const hasPostpartumCenter = optionalString(source.hasPostpartumCenter);
  const message = optionalString(source.message);
  const landingPath = optionalString(source.landingPath);
  const referrer = optionalString(source.referrer);
  const privacyAgreed = source.privacyAgreed === true;
  const desiredServices = Array.isArray(source.desiredServices)
    ? source.desiredServices.filter((service): service is DesiredService =>
        desiredServiceValues.includes(service as DesiredService)
      )
    : [];

  if (hospitalName.length < 2) {
    fields.hospitalName = "병원명을 2자 이상 입력해주세요.";
  }

  if (!region) {
    fields.region = "지역을 입력해주세요.";
  }

  if (!contactName) {
    fields.contactName = "담당자명을 입력해주세요.";
  }

  if (!phone) {
    fields.phone = "연락처를 입력해주세요.";
  }

  if (!hospitalTypes.includes(hospitalType)) {
    fields.hospitalType = "병원 유형을 선택해주세요.";
  }

  if (desiredServices.length < 1) {
    fields.desiredServices = "희망 서비스를 1개 이상 선택해주세요.";
  }

  if (email && !isEmail(email)) {
    fields.email = "이메일 형식을 확인해주세요.";
  }

  if (!privacyAgreed) {
    fields.privacyAgreed = "개인정보 수집 및 이용 동의가 필요합니다.";
  }

  if (Object.keys(fields).length > 0) {
    return { ok: false, fields };
  }

  const utmSource = typeof source.utm === "object" && source.utm !== null ? (source.utm as Record<string, unknown>) : {};

  return {
    ok: true,
    value: {
      hospitalName,
      region,
      contactName,
      phone,
      email,
      hospitalType,
      monthlyMaternityRange,
      hasPostpartumCenter,
      desiredServices,
      message,
      privacyAgreed,
      landingPath,
      referrer,
      utm: {
        source: optionalString(utmSource.source),
        medium: optionalString(utmSource.medium),
        campaign: optionalString(utmSource.campaign),
        content: optionalString(utmSource.content),
        term: optionalString(utmSource.term)
      }
    }
  };
}
