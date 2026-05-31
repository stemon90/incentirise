import express from "express";
import { prisma } from "../index.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Submit a behavior request and optionally award provisional points
router.post("/", authenticate, async (req, res) => {
  const {
    name,
    description,
    minPoints,
    maxPoints,
    youthId,
    provisionalPoints,
    note,
  } = req.body;

  if (!name || minPoints === undefined || maxPoints === undefined) {
    return res
      .status(400)
      .json({ error: "Name, minPoints, and maxPoints are required" });
  }

  if (minPoints < 1 || maxPoints < minPoints) {
    return res
      .status(400)
      .json({
        error:
          "minPoints must be at least 1 and maxPoints must be >= minPoints",
      });
  }

  try {
    // Create the behavior request
    const behaviorRequest = await prisma.behaviorRequest.create({
      data: {
        name,
        description: description || null,
        minPoints: parseInt(minPoints),
        maxPoints: parseInt(maxPoints),
        organizationId: req.staff.organizationId,
        requestedById: req.staff.id,
      },
    });

    let transaction = null;

    // If provisional points requested, award them immediately
    if (youthId && provisionalPoints) {
      const pointsInt = parseInt(provisionalPoints);

      if (pointsInt < parseInt(minPoints) || pointsInt > parseInt(maxPoints)) {
        return res.status(400).json({
          error: `Provisional points must be between ${minPoints} and ${maxPoints}`,
        });
      }

      const youth = await prisma.youth.findFirst({
        where: {
          id: parseInt(youthId),
          organizationId: req.staff.organizationId,
        },
      });

      if (!youth) {
        return res.status(404).json({ error: "Youth not found" });
      }

      // We need a placeholder behavior for the transaction
      // Use the first behavior in the org as a placeholder
      const placeholderBehavior = await prisma.behavior.findFirst({
        where: { organizationId: req.staff.organizationId },
      });

      if (!placeholderBehavior) {
        return res
          .status(400)
          .json({
            error: "No behaviors exist yet — cannot award provisional points",
          });
      }

      const [tx] = await prisma.$transaction([
        prisma.pointTransaction.create({
          data: {
            youthId: parseInt(youthId),
            staffId: req.staff.id,
            behaviorId: placeholderBehavior.id,
            behaviorRequestId: behaviorRequest.id,
            points: pointsInt,
            note: note || `Provisional points for: ${name}`,
          },
        }),
        prisma.youth.update({
          where: { id: parseInt(youthId) },
          data: { points: { increment: pointsInt } },
        }),
      ]);

      transaction = tx;
    }

    res.status(201).json({ behaviorRequest, transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit behavior request" });
  }
});

// Get all behavior requests for an organization
router.get("/", authenticate, async (req, res) => {
  try {
    const requests = await prisma.behaviorRequest.findMany({
      where: { organizationId: req.staff.organizationId },
      include: {
        requestedBy: {
          select: { firstName: true, lastName: true, role: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch behavior requests" });
  }
});

// Approve or reject a behavior request
router.patch("/:id", authenticate, requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  if (!status || !["APPROVED", "REJECTED"].includes(status)) {
    return res
      .status(400)
      .json({ error: "Status must be APPROVED or REJECTED" });
  }

  try {
    const request = await prisma.behaviorRequest.findUnique({
      where: { id },
      include: { pointTransactions: true },
    });

    if (!request)
      return res.status(404).json({ error: "Behavior request not found" });
    if (request.status !== "PENDING") {
      return res
        .status(400)
        .json({ error: "Request has already been processed" });
    }

    if (status === "APPROVED") {
      // Create a real behavior from the request
      await prisma.$transaction([
        prisma.behaviorRequest.update({
          where: { id },
          data: { status: "APPROVED" },
        }),
        prisma.behavior.create({
          data: {
            name: request.name,
            description: request.description,
            minPoints: request.minPoints,
            maxPoints: request.maxPoints,
            organizationId: request.organizationId,
            isDefault: false,
          },
        }),
      ]);
    } else {
      // Rejected — reverse any provisional points
      const provisionalTransactions = request.pointTransactions;

      const updates = provisionalTransactions.map((tx) =>
        prisma.youth.update({
          where: { id: tx.youthId },
          data: { points: { decrement: tx.points } },
        }),
      );

      await prisma.$transaction([
        prisma.behaviorRequest.update({
          where: { id },
          data: { status: "REJECTED" },
        }),
        ...updates,
      ]);
    }

    const updated = await prisma.behaviorRequest.findUnique({
      where: { id },
      include: {
        requestedBy: { select: { firstName: true, lastName: true } },
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process behavior request" });
  }
});

export default router;
