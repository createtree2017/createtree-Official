import { Router } from "express";
import jwt from "jsonwebtoken";
import type { AdminLoginResponse } from "../../../shared/hospital.js";
import { config, requireAdminConfig } from "../config.js";
import { adminAuth } from "../middleware/adminAuth.js";

export const adminAuthRouter = Router();

adminAuthRouter.post("/login", (req, res) => {
  try {
    requireAdminConfig();
  } catch {
    const response: AdminLoginResponse = {
      ok: false,
      message: "관리자 인증 환경변수가 설정되지 않았습니다."
    };
    res.status(500).json(response);
    return;
  }

  const username = String(req.body?.username ?? "");
  const password = String(req.body?.password ?? "");

  if (username !== config.adminUsername || password !== config.adminPassword) {
    const response: AdminLoginResponse = {
      ok: false,
      message: "아이디 또는 비밀번호를 확인해주세요."
    };
    res.status(401).json(response);
    return;
  }

  const token = jwt.sign({ username }, config.adminJwtSecret as string, { expiresIn: "8h" });
  const response: AdminLoginResponse = {
    ok: true,
    token,
    username
  };
  res.json(response);
});

adminAuthRouter.get("/me", adminAuth, (_req, res) => {
  res.json({ ok: true, username: res.locals.admin.username });
});
