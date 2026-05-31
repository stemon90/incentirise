import express from "express";
import cors from "cors";
import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import logger from "./logger.js";

const { PrismaClient } = pkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url, ip: req.ip });
  next();
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

import authRouter from "./routes/auth.js";
import organizationsRouter from "./routes/organizations.js";
import staffRouter from "./routes/staff.js";
import youthRouter from "./routes/youth.js";
import behaviorsRouter from "./routes/behaviors.js";

app.use("/auth", authRouter);
app.use("/organizations", organizationsRouter);
app.use("/staff", staffRouter);
app.use("/youth", youthRouter);
app.use("/behaviors", behaviorsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
