import { Router } from "express";
import type { CreateHospitalLeadResponse } from "../../../shared/hospital.js";
import { leadRateLimit } from "../middleware/rateLimit.js";
import { createLead } from "../services/hospitalLeadService.js";
import { getClientIp, getUserAgent } from "../utils/requestContext.js";
import { validateLeadInput } from "../validation/hospitalLeadValidation.js";

export const hospitalLeadsRouter = Router();

hospitalLeadsRouter.post("/", leadRateLimit, async (req, res, next) => {
  try {
    const validation = validateLeadInput(req.body);

    if (validation.honeypotTriggered) {
      const response: CreateHospitalLeadResponse = {
        ok: true,
        leadId: "accepted",
        message: "상담 신청이 접수되었습니다."
      };
      res.json(response);
      return;
    }

    if (!validation.ok) {
      const response: CreateHospitalLeadResponse = {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "필수 항목을 확인해주세요.",
        fields: validation.fields
      };
      res.status(400).json(response);
      return;
    }

    const lead = await createLead(validation.value, {
      ipAddress: getClientIp(req),
      userAgent: getUserAgent(req)
    });

    const response: CreateHospitalLeadResponse = {
      ok: true,
      leadId: lead.id,
      message: "상담 신청이 접수되었습니다. 병원 규모와 운영 목적에 맞는 구성을 확인해 연락드리겠습니다."
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});
