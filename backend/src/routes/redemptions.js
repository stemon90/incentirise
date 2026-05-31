import express from "express";
import { prisma } from "../index.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Request a redemption
router.post("/", authenticate, async (req, res) => {
  const { youthId, prizeId } = req.body;

  if (!youthId || !prizeId) {
    return res.status(400).json({ error: "youthId and prizeId are required" });
  }

  try {
    const youth = await prisma.youth.findFirst({
      where: {
        id: parseInt(youthId),
        organizationId: req.staff.organizationId,
      },
    });

    if (!youth) return res.status(404).json({ error: "Youth not found" });

    const prize = await prisma.prize.findFirst({
      where: {
        id: parseInt(prizeId),
        organizationId: req.staff.organizationId,
      },
    });

    if (!prize) return res.status(404).json({ error: "Prize not found" });

    if (youth.points < prize.pointCost) {
      return res.status(400).json({
        error: `Not enough points. Youth has ${youth.points} but prize costs ${prize.pointCost}`,
      });
    }

    if (prize.quantity < 1) {
      return res.status(400).json({ error: "Prize is out of stock" });
    }

    const redemption = await prisma.redemption.create({
      data: {
        youthId: parseInt(youthId),
        prizeId: parseInt(prizeId),
        status: "PENDING",
      },
      include: {
        youth: { select: { firstName: true, lastName: true, points: true } },
        prize: { select: { name: true, pointCost: true, requiresAdmin: true } },
      },
    });

    res.status(201).json(redemption);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create redemption" });
  }
});

// Get all pending redemptions for an organization
router.get("/pending", authenticate, async (req, res) => {
  try {
    const redemptions = await prisma.redemption.findMany({
      where: {
        status: "PENDING",
        youth: { organizationId: req.staff.organizationId },
      },
      include: {
        youth: { select: { firstName: true, lastName: true, points: true } },
        prize: { select: { name: true, pointCost: true, requiresAdmin: true } },
        staff: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: "asc" },
    });
    res.json(redemptions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch redemptions" });
  }
});

// Approve or reject a redemption
router.patch("/:id", authenticate, async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  if (!status || !["APPROVED", "REJECTED"].includes(status)) {
    return res
      .status(400)
      .json({ error: "Status must be APPROVED or REJECTED" });
  }

  try {
    const redemption = await prisma.redemption.findUnique({
      where: { id },
      include: { prize: true, youth: true },
    });

    if (!redemption)
      return res.status(404).json({ error: "Redemption not found" });
    if (redemption.status !== "PENDING") {
      return res
        .status(400)
        .json({ error: "Redemption has already been processed" });
    }

    // Check if prize requires admin approval
    if (redemption.prize.requiresAdmin && req.staff.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "This prize requires Admin approval" });
    }

    if (status === "APPROVED") {
      // Deduct points and decrease quantity atomically
      await prisma.$transaction([
        prisma.redemption.update({
          where: { id },
          data: { status: "APPROVED", staffId: req.staff.id },
        }),
        prisma.youth.update({
          where: { id: redemption.youthId },
          data: { points: { decrement: redemption.prize.pointCost } },
        }),
        prisma.prize.update({
          where: { id: redemption.prizeId },
          data: { quantity: { decrement: 1 } },
        }),
      ]);
    } else {
      await prisma.redemption.update({
        where: { id },
        data: { status: "REJECTED", staffId: req.staff.id },
      });
    }

    const updated = await prisma.redemption.findUnique({
      where: { id },
      include: {
        youth: { select: { firstName: true, lastName: true, points: true } },
        prize: { select: { name: true, pointCost: true } },
        staff: { select: { firstName: true, lastName: true } },
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process redemption" });
  }
});

export default router;
