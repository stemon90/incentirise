import express from "express";
import { prisma } from "../index.js";
import { validate, createTaskSchema } from "../middleware/validate.js";

const router = express.Router();

// POST /tasks
router.post("/", validate(createTaskSchema), async (req, res) => {
  try {
    const { title, description, points } = req.body;
    const task = await prisma.task.create({
      data: { title, description, points },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /tasks/:id
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
