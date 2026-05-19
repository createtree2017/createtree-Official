import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config.js";
import { adminAuthRouter } from "./routes/adminAuth.js";
import { adminHospitalLeadsRouter } from "./routes/adminHospitalLeads.js";
import { hospitalLeadsRouter } from "./routes/hospitalLeads.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productionStaticDir = path.resolve(__dirname, "../../client");
const developmentStaticDir = path.resolve(__dirname, "../../..");
const staticDir = existsSync(path.join(productionStaticDir, "index.html"))
  ? productionStaticDir
  : developmentStaticDir;
const indexHtml = path.join(staticDir, "index.html");
const spaRoutes = new Set(["/", "/admin", "/admin/"]);

function noindexPrivateRoutes(_req: express.Request, res: express.Response, next: express.NextFunction) {
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  next();
}

app.set("trust proxy", 1);
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(
  cors({
    origin: config.corsOrigin ? config.corsOrigin.split(",").map((origin) => origin.trim()) : true
  })
);
app.use(express.json({ limit: "1mb" }));

app.use(["/api", "/admin"], noindexPrivateRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "ct-official-hospital-landing" });
});

app.use("/api/hospital-leads", hospitalLeadsRouter);
app.use("/api/admin", adminAuthRouter);
app.use("/api/admin/hospital-leads", adminHospitalLeadsRouter);

app.use("/api", (_req, res) => {
  res.status(404).json({
    ok: false,
    code: "NOT_FOUND",
    message: "요청한 API 경로를 찾을 수 없습니다."
  });
});

app.use(express.static(staticDir));

app.get(/.*/, (req, res) => {
  if (spaRoutes.has(req.path)) {
    res.sendFile(indexHtml);
    return;
  }

  res.status(404).type("text/plain").send("Not Found");
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`[server] ${message}`);
  res.status(500).json({
    ok: false,
    code: "SERVER_ERROR",
    message: "요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요."
  });
});

export const server = app.listen(config.port, () => {
  console.log(`[server] listening on port ${config.port}`);
});
