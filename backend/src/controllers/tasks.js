import { prisma } from "../index.js";

export async function createTask(req, res) {
  const { title, description, points } = req.body;

  try {
    const task = await prisma.task.create({
      data: { title, description, points },
    });
    res.status(201).json(task);
  } catch (_err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllTasks(req, res) {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (_err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getTaskById(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (_err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
