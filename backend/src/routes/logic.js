import express from "express";
import { prisma } from "../index.js";
import {
  validate,
  completeTaskSchema,
  redeemRewardSchema,
} from "../middleware/validate.js";

const router = express.Router();

// POST /complete-task
router.post(
  "/complete-task",
  validate(completeTaskSchema),
  async (req, res) => {
    try {
      const { userId, taskId } = req.body;

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const task = await prisma.task.findUnique({ where: { id: taskId } });
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      const completion = await prisma.taskCompletion.create({
        data: { userId, taskId },
      });

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { points: user.points + task.points },
      });

      res.status(201).json({
        message: "Task completed",
        pointsEarned: task.points,
        newBalance: updatedUser.points,
      });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  },
);

// POST /redeem-reward
router.post(
  "/redeem-reward",
  validate(redeemRewardSchema),
  async (req, res) => {
    try {
      const { userId, rewardId } = req.body;

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const reward = await prisma.reward.findUnique({
        where: { id: rewardId },
      });
      if (!reward) {
        return res.status(404).json({ error: "Reward not found" });
      }

      if (user.points < reward.pointCost) {
        return res.status(400).json({ error: "Insufficient points" });
      }

      const transaction = await prisma.transaction.create({
        data: { userId, rewardId, pointsSpent: reward.pointCost },
      });

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { points: user.points - reward.pointCost },
      });

      res.status(201).json({
        message: "Reward redeemed",
        pointsSpent: reward.pointCost,
        newBalance: updatedUser.points,
      });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  },
);

export default router;
