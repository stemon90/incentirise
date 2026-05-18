import express from "express";
import { prisma } from "../index.js";

const router = express.Router();

// POST /complete-task — user completes a task and earns points
router.post("/complete-task", async (req, res) => {
  const { userId, taskId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!user || !task) {
      return res.status(404).json({ error: "User or task not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { points: user.points + task.points },
    });

    const completion = await prisma.taskCompletion.create({
      data: { userId, taskId },
    });

    res.json({
      message: "Task completed!",
      points: updatedUser.points,
      completion,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /redeem-reward — user spends points on a reward
router.post("/redeem-reward", async (req, res) => {
  const { userId, rewardId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const reward = await prisma.reward.findUnique({ where: { id: rewardId } });

    if (!user || !reward) {
      return res.status(404).json({ error: "User or reward not found" });
    }

    if (user.points < reward.pointCost) {
      return res.status(400).json({ error: "Not enough points" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { points: user.points - reward.pointCost },
    });

    const transaction = await prisma.transaction.create({
      data: { userId, rewardId, pointsSpent: reward.pointCost },
    });

    res.json({
      message: "Reward redeemed!",
      points: updatedUser.points,
      transaction,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
