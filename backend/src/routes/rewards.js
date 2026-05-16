import express from 'express';
import { prisma } from '../index.js';

const router = express.Router();

// GET /rewards — return all rewards
router.get('/', async (req, res) => {
  const rewards = await prisma.reward.findMany();
  res.json(rewards);
});

// GET /rewards/:id — return one reward by ID
router.get('/:id', async (req, res) => {
  const reward = await prisma.reward.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  if (!reward) return res.status(404).json({ error: 'Reward not found' });
  res.json(reward);
});

// POST /rewards — create a new reward
router.post('/', async (req, res) => {
  const { title, description, pointCost } = req.body;
  const reward = await prisma.reward.create({
    data: { title, description, pointCost }
  });
  res.status(201).json(reward);
});

export default router;