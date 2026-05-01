import pg from "pg";
import type { QueryResultRow } from "pg";
import { config } from "./config.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: config.databaseSsl === "require" ? { rejectUnauthorized: false } : false
});

export async function query<T extends QueryResultRow>(text: string, params: unknown[] = []) {
  if (!config.databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return pool.query<T>(text, params);
}
