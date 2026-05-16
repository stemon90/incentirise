import express from 'express';
import { prisma } from '../index.js';

const router = express.Router();

// GET /users — return all users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// GET /users/:id — return one user by ID
router.get('/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /users — create a new user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: { name, email }
  });
  res.status(201).json(user);
});

export default router;
