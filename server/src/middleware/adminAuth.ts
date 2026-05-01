import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config, requireAdminConfig } from "../config.js";

export type AdminJwtPayload = {
  username: string;
};

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  try {
    requireAdminConfig();
  } catch {
    res.status(500).json({ ok: false, message: "관리자 인증 환경변수가 설정되지 않았습니다." });
    return;
  }

  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;

  if (!token) {
    res.status(401).json({ ok: false, message: "관리자 로그인이 필요합니다." });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.adminJwtSecret as string) as AdminJwtPayload;
    res.locals.admin = decoded;
    next();
  } catch {
    res.status(401).json({ ok: false, message: "관리자 로그인이 만료되었습니다." });
  }
}

