import express from 'express';
import { prisma } from '../index.js';

const router = express.Router();

// GET /tasks — return all tasks
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// GET /tasks/:id — return one task by ID
router.get('/:id', async (req, res) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /tasks — create a new task
router.post('/', async (req, res) => {
  const { title, description, points } = req.body;
  const task = await prisma.task.create({
    data: { title, description, points }
  });
  res.status(201).json(task);
});

export default router;