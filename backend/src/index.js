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

import usersRouter from "./routes/users.js";
app.use("/users", usersRouter);

import tasksRouter from "./routes/tasks.js";
app.use("/tasks", tasksRouter);

import rewardsRouter from "./routes/rewards.js";
app.use("/rewards", rewardsRouter);

import logicRouter from "./routes/logic.js";
app.use("/", logicRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
