import express from "express";
import { prisma } from "../index.js";
import { validate, createRewardSchema } from "../middleware/validate.js";

const router = express.Router();

// POST /rewards
router.post("/", validate(createRewardSchema), async (req, res) => {
  try {
    const { title, description, pointCost } = req.body;
    const reward = await prisma.reward.create({
      data: { title, description, pointCost },
    });
    res.status(201).json(reward);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /rewards
router.get("/", async (req, res) => {
  try {
    const rewards = await prisma.reward.findMany();
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /rewards/:id
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid reward ID" });
    }
    const reward = await prisma.reward.findUnique({ where: { id } });
    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }
    res.json(reward);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
