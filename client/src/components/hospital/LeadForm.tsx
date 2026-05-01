import { useMemo, useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import type { CreateHospitalLeadInput, CreateHospitalLeadResponse, DesiredService } from "../../../../shared/hospital";
import { desiredServiceLabels, desiredServiceValues, hospitalTypeLabels, hospitalTypes } from "../../../../shared/hospital";

type FormState = {
  hospitalName: string;
  region: string;
  contactName: string;
  phone: string;
  email: string;
  hospitalType: string;
  monthlyMaternityRange: string;
  hasPostpartumCenter: string;
  desiredServices: DesiredService[];
  message: string;
  privacyAgreed: boolean;
  website: string;
};

const initialState: FormState = {
  hospitalName: "",
  region: "",
  contactName: "",
  phone: "",
  email: "",
  hospitalType: "",
  monthlyMaternityRange: "",
  hasPostpartumCenter: "",
  desiredServices: [],
  message: "",
  privacyAgreed: false,
  website: ""
};

function getUtm() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    content: params.get("utm_content") ?? undefined,
    term: params.get("utm_term") ?? undefined
  };
}

export function LeadForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const utm = useMemo(getUtm, []);

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: "" }));
  }

  function toggleService(service: DesiredService) {
    setForm((current) => {
      const hasService = current.desiredServices.includes(service);
      return {
        ...current,
        desiredServices: hasService
          ? current.desiredServices.filter((item) => item !== service)
          : [...current.desiredServices, service]
      };
    });
    setFieldErrors((current) => ({ ...current, desiredServices: "" }));
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setMessage("");

    const payload: CreateHospitalLeadInput = {
      hospitalName: form.hospitalName,
      region: form.region,
      contactName: form.contactName,
      phone: form.phone,
      email: form.email,
      hospitalType: form.hospitalType as CreateHospitalLeadInput["hospitalType"],
      monthlyMaternityRange: form.monthlyMaternityRange,
      hasPostpartumCenter: form.hasPostpartumCenter,
      desiredServices: form.desiredServices,
      message: form.message,
      privacyAgreed: form.privacyAgreed,
      landingPath: window.location.pathname,
      referrer: document.referrer,
      utm,
      website: form.website
    };

    try {
      const response = await fetch("/api/hospital-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as CreateHospitalLeadResponse;

      if (!result.ok) {
        setFieldErrors(result.fields ?? {});
        setMessage(result.message);
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setMessage(result.message);
      setForm(initialState);
    } catch {
      setSubmitState("error");
      setMessage("상담 신청을 전송하지 못했습니다. 네트워크 상태를 확인해주세요.");
    }
  }

  return (
    <form className="lead-form" onSubmit={submitLead}>
      <div className="form-head">
        <p className="eyebrow">도입 상담 신청</p>
        <h2>병원별 맞춤 구성을 확인해드립니다.</h2>
        <p>상담 시 병원 규모, 산모 고객 수, 운영 목적에 맞춰 적합한 패키지를 제안합니다.</p>
      </div>

      <input
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(event) => updateField("website", event.target.value)}
        aria-hidden="true"
      />

      <div className="form-grid">
        <label>
          병원명 *
          <input value={form.hospitalName} onChange={(event) => updateField("hospitalName", event.target.value)} />
          {fieldErrors.hospitalName && <span>{fieldErrors.hospitalName}</span>}
        </label>
        <label>
          지역 *
          <input placeholder="예: 서울 강남구" value={form.region} onChange={(event) => updateField("region", event.target.value)} />
          {fieldErrors.region && <span>{fieldErrors.region}</span>}
        </label>
        <label>
          담당자명 *
          <input value={form.contactName} onChange={(event) => updateField("contactName", event.target.value)} />
          {fieldErrors.contactName && <span>{fieldErrors.contactName}</span>}
        </label>
        <label>
          연락처 *
          <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
          {fieldErrors.phone && <span>{fieldErrors.phone}</span>}
        </label>
        <label>
          이메일
          <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
          {fieldErrors.email && <span>{fieldErrors.email}</span>}
        </label>
        <label>
          병원 유형 *
          <select value={form.hospitalType} onChange={(event) => updateField("hospitalType", event.target.value)}>
            <option value="">선택해주세요</option>
            {hospitalTypes.map((type) => (
              <option key={type} value={type}>
                {hospitalTypeLabels[type]}
              </option>
            ))}
          </select>
          {fieldErrors.hospitalType && <span>{fieldErrors.hospitalType}</span>}
        </label>
        <label>
          월평균 산모 고객 수
          <select
            value={form.monthlyMaternityRange}
            onChange={(event) => updateField("monthlyMaternityRange", event.target.value)}
          >
            <option value="">선택 안 함</option>
            <option value="under-50">50명 미만</option>
            <option value="50-100">50-100명</option>
            <option value="100-300">100-300명</option>
            <option value="over-300">300명 이상</option>
          </select>
        </label>
        <label>
          산후조리원 운영 여부
          <select
            value={form.hasPostpartumCenter}
            onChange={(event) => updateField("hasPostpartumCenter", event.target.value)}
          >
            <option value="">선택 안 함</option>
            <option value="yes">운영 중</option>
            <option value="no">운영 안 함</option>
            <option value="partner">제휴 조리원 있음</option>
          </select>
        </label>
      </div>

      <fieldset className="service-fieldset">
        <legend>희망 서비스 *</legend>
        <div className="checkbox-grid">
          {desiredServiceValues.map((service) => (
            <label key={service}>
              <input
                type="checkbox"
                checked={form.desiredServices.includes(service)}
                onChange={() => toggleService(service)}
              />
              <span>{desiredServiceLabels[service]}</span>
            </label>
          ))}
        </div>
        {fieldErrors.desiredServices && <span className="field-error">{fieldErrors.desiredServices}</span>}
      </fieldset>

      <label className="message-label">
        문의 내용
        <textarea
          rows={4}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="관심 있는 운영 방식이나 상담 희망 내용을 적어주세요."
        />
      </label>

      <label className="privacy-check">
        <input
          type="checkbox"
          checked={form.privacyAgreed}
          onChange={(event) => updateField("privacyAgreed", event.target.checked)}
        />
        <span>
          <ShieldCheck size={18} /> 상담 신청을 위해 병원명, 담당자명, 연락처, 이메일, 문의 내용을 수집하며,
          상담 및 제안서 안내 목적으로만 사용됩니다.
        </span>
      </label>
      {fieldErrors.privacyAgreed && <span className="field-error">{fieldErrors.privacyAgreed}</span>}

      <button className="primary-button form-submit" type="submit" disabled={submitState === "submitting"}>
        {submitState === "submitting" ? "접수 중..." : "상담 신청 접수하기"} <Send size={18} />
      </button>
      {message && <p className={`form-message ${submitState}`}>{message}</p>}
    </form>
  );
}

