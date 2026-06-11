import express from "express";
import { prisma } from "../index.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Create prize (Admin only)
router.post("/", authenticate, requireAdmin, async (req, res) => {
  const { name, description, pointCost, quantity, requiresAdmin } = req.body;

  if (!name || pointCost === undefined) {
    return res.status(400).json({ error: "Name and pointCost are required" });
  }

  try {
    const prize = await prisma.prize.create({
      data: {
        name,
        description: description || null,
        pointCost: parseInt(pointCost),
        quantity: quantity ? parseInt(quantity) : 999,
        requiresAdmin: requiresAdmin || false,
        organizationId: req.staff.organizationId,
      },
    });
    res.status(201).json(prize);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create prize" });
  }
});

// Get all prizes for an organization
router.get("/", authenticate, async (req, res) => {
  try {
    const prizes = await prisma.prize.findMany({
      where: { organizationId: req.staff.organizationId },
      orderBy: { pointCost: "asc" },
    });
    res.json(prizes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch prizes" });
  }
});

// Get prize by ID
router.get("/:id", authenticate, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const prize = await prisma.prize.findUnique({ where: { id } });
    if (!prize) return res.status(404).json({ error: "Prize not found" });
    res.json(prize);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch prize" });
  }
});

// Update prize (Admin only)
router.patch("/:id", authenticate, requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, pointCost, quantity, requiresAdmin } = req.body;

  try {
    const prize = await prisma.prize.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(pointCost !== undefined && { pointCost: parseInt(pointCost) }),
        ...(quantity !== undefined && { quantity: parseInt(quantity) }),
        ...(requiresAdmin !== undefined && { requiresAdmin }),
      },
    });
    res.json(prize);
  } catch (err) {
    res.status(500).json({ error: "Failed to update prize" });
  }
});

// Delete prize (Admin only)
router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.prize.delete({ where: { id } });
    res.json({ message: "Prize deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete prize" });
  }
});

export default router;
