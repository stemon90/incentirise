import { prisma } from "../index.js";

export async function completeTask(req, res) {
  const { userId, taskId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const [_completion, updatedUser] = await prisma.$transaction([
      prisma.taskCompletion.create({
        data: { userId, taskId },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { points: { increment: task.points } },
      }),
    ]);

    res.json({ message: "Task completed", points: updatedUser.points });
  } catch (_err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function redeemReward(req, res) {
  const { userId, rewardId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const reward = await prisma.reward.findUnique({ where: { id: rewardId } });
    if (!reward) return res.status(404).json({ error: "Reward not found" });

    if (user.points < reward.pointCost) {
      return res.status(400).json({ error: "Insufficient points" });
    }

    const [_transaction, updatedUser] = await prisma.$transaction([
      prisma.transaction.create({
        data: { userId, rewardId, pointsSpent: reward.pointCost },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { points: { decrement: reward.pointCost } },
      }),
    ]);

    res.json({ message: "Reward redeemed", points: updatedUser.points });
  } catch (_err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
