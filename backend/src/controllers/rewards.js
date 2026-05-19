import { prisma } from "../index.js";

export async function createReward(req, res) {
  const { title, description, pointCost } = req.body;

  try {
    const reward = await prisma.reward.create({
      data: { title, description, pointCost },
    });
    res.status(201).json(reward);
  } catch (_err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllRewards(req, res) {
  try {
    const rewards = await prisma.reward.findMany();
    res.json(rewards);
  } catch (_err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getRewardById(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const reward = await prisma.reward.findUnique({ where: { id } });
    if (!reward) return res.status(404).json({ error: "Reward not found" });
    res.json(reward);
  } catch (_err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
