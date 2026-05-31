import express from "express";
import { prisma } from "../index.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Award points to a youth
router.post("/award", authenticate, async (req, res) => {
  const { youthId, behaviorId, points, note } = req.body;

  if (!youthId || !behaviorId || !points) {
    return res
      .status(400)
      .json({ error: "youthId, behaviorId, and points are required" });
  }

  try {
    // Verify behavior exists and belongs to this organization
    const behavior = await prisma.behavior.findFirst({
      where: {
        id: parseInt(behaviorId),
        organizationId: req.staff.organizationId,
      },
    });

    if (!behavior) {
      return res.status(404).json({ error: "Behavior not found" });
    }

    // Validate points are within behavior range
    const pointsInt = parseInt(points);
    if (pointsInt < behavior.minPoints || pointsInt > behavior.maxPoints) {
      return res.status(400).json({
        error: `Points must be between ${behavior.minPoints} and ${behavior.maxPoints} for this behavior`,
      });
    }

    // Verify youth exists and belongs to this organization
    const youth = await prisma.youth.findFirst({
      where: {
        id: parseInt(youthId),
        organizationId: req.staff.organizationId,
      },
    });

    if (!youth) {
      return res.status(404).json({ error: "Youth not found" });
    }

    // Create transaction and update youth points atomically
    const [transaction, updatedYouth] = await prisma.$transaction([
      prisma.pointTransaction.create({
        data: {
          youthId: parseInt(youthId),
          staffId: req.staff.id,
          behaviorId: parseInt(behaviorId),
          points: pointsInt,
          note: note || null,
        },
      }),
      prisma.youth.update({
        where: { id: parseInt(youthId) },
        data: { points: { increment: pointsInt } },
      }),
    ]);

    res.status(201).json({
      transaction,
      newPointTotal: updatedYouth.points,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to award points" });
  }
});

// Get point history for a youth
router.get("/history/:youthId", authenticate, async (req, res) => {
  const youthId = parseInt(req.params.youthId);

  try {
    const transactions = await prisma.pointTransaction.findMany({
      where: { youthId },
      include: {
        behavior: true,
        staff: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch point history" });
  }
});

export default router;
