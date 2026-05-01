import type { NextFunction, Request, Response } from "express";
import { config } from "../config.js";
import { getClientIp } from "../utils/requestContext.js";

type RateBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateBucket>();
const oneHourMs = 60 * 60 * 1000;

export function leadRateLimit(req: Request, res: Response, next: NextFunction) {
  const limit = Math.max(1, config.leadRateLimitPerHour);
  const ip = getClientIp(req) ?? "unknown";
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + oneHourMs });
    next();
    return;
  }

  if (bucket.count >= limit) {
    res.status(429).json({
      ok: false,
      code: "RATE_LIMITED",
      message: "상담 신청이 잠시 많습니다. 잠시 후 다시 시도해주세요."
    });
    return;
  }

  bucket.count += 1;
  next();
}

