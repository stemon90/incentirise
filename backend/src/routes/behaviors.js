import express from "express";
import { prisma } from "../index.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
const router = express.Router();

// Create behavior (Admin only)
router.post("/", authenticate, requireAdmin, async (req, res) => {
  const { name, description, minPoints, maxPoints, category } = req.body;
  if (!name || minPoints === undefined || maxPoints === undefined) {
    return res
      .status(400)
      .json({ error: "Name, minPoints, and maxPoints are required" });
  }
  if (minPoints < 1 || maxPoints < minPoints) {
    return res.status(400).json({
      error: "minPoints must be at least 1 and maxPoints must be >= minPoints",
    });
  }
  try {
    const behavior = await prisma.behavior.create({
      data: {
        name,
        description: description || null,
        minPoints: parseInt(minPoints),
        maxPoints: parseInt(maxPoints),
        category: category || null,
        organizationId: req.staff.organizationId,
      },
    });
    res.status(201).json(behavior);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create behavior" });
  }
});

// Get all behaviors for an organization
router.get("/", authenticate, async (req, res) => {
  try {
    const behaviors = await prisma.behavior.findMany({
      where: { organizationId: req.staff.organizationId },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
    res.json(behaviors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch behaviors" });
  }
});

// Get behavior by ID
router.get("/:id", authenticate, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const behavior = await prisma.behavior.findUnique({ where: { id } });
    if (!behavior) return res.status(404).json({ error: "Behavior not found" });
    res.json(behavior);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch behavior" });
  }
});

// Update behavior (Admin only)
router.patch("/:id", authenticate, requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, minPoints, maxPoints, category } = req.body;
  try {
    const behavior = await prisma.behavior.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(minPoints !== undefined && { minPoints: parseInt(minPoints) }),
        ...(maxPoints !== undefined && { maxPoints: parseInt(maxPoints) }),
        ...(category !== undefined && { category }),
      },
    });
    res.json(behavior);
  } catch (err) {
    res.status(500).json({ error: "Failed to update behavior" });
  }
});

// Delete behavior (Admin only)
router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.behavior.delete({ where: { id } });
    res.json({ message: "Behavior deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete behavior" });
  }
});

export default router;
