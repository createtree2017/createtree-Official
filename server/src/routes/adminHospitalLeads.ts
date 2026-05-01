import { Router } from "express";
import type { HospitalLeadStatus } from "../../../shared/hospital.js";
import { hospitalStatuses } from "../../../shared/hospital.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { getLeadById, listLeads, updateLeadStatus } from "../services/hospitalLeadService.js";

export const adminHospitalLeadsRouter = Router();

adminHospitalLeadsRouter.use(adminAuth);

adminHospitalLeadsRouter.get("/", async (req, res, next) => {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);

    const result = await listLeads({
      status: hospitalStatuses.includes(status as HospitalLeadStatus) ? (status as HospitalLeadStatus) : undefined,
      search,
      page: Number.isFinite(page) ? page : 1,
      limit: Number.isFinite(limit) ? limit : 20
    });

    res.json({ ok: true, ...result });
  } catch (error) {
    next(error);
  }
});

adminHospitalLeadsRouter.get("/:id", async (req, res, next) => {
  try {
    const lead = await getLeadById(req.params.id);

    if (!lead) {
      res.status(404).json({ ok: false, message: "리드를 찾을 수 없습니다." });
      return;
    }

    res.json({ ok: true, lead });
  } catch (error) {
    next(error);
  }
});

adminHospitalLeadsRouter.patch("/:id/status", async (req, res, next) => {
  try {
    const status = req.body?.status as HospitalLeadStatus | undefined;

    if (!status || !hospitalStatuses.includes(status)) {
      res.status(400).json({ ok: false, message: "상태값을 확인해주세요." });
      return;
    }

    const lead = await updateLeadStatus(req.params.id, status);

    if (!lead) {
      res.status(404).json({ ok: false, message: "리드를 찾을 수 없습니다." });
      return;
    }

    res.json({ ok: true, lead });
  } catch (error) {
    next(error);
  }
});
