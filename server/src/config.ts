import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const config = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL,
  databaseSsl: process.env.DATABASE_SSL ?? (process.env.NODE_ENV === "production" ? "require" : "disable"),
  corsOrigin: process.env.CORS_ORIGIN,
  publicSiteUrl: process.env.PUBLIC_SITE_URL,
  adminUsername: process.env.ADMIN_USERNAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  adminJwtSecret: process.env.ADMIN_JWT_SECRET,
  leadRateLimitPerHour: Number(process.env.LEAD_RATE_LIMIT_PER_HOUR ?? 5)
};

export function requireAdminConfig() {
  if (!config.adminUsername || !config.adminPassword || !config.adminJwtSecret) {
    throw new Error("ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_JWT_SECRET must be configured.");
  }
}
