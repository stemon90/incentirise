import express from "express";
import { prisma } from "../index.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Create youth
router.post("/", authenticate, async (req, res) => {
  const { firstName, lastName, dob, grade } = req.body;

  if (!firstName || !lastName || !dob) {
    return res
      .status(400)
      .json({ error: "First name, last name, and date of birth are required" });
  }

  try {
    const youth = await prisma.youth.create({
      data: {
        firstName,
        lastName,
        dob: new Date(dob),
        grade: grade || null,
        organizationId: req.staff.organizationId,
      },
    });
    res.status(201).json(youth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create youth" });
  }
});

// Get all youth for an organization
router.get("/", authenticate, async (req, res) => {
  try {
    const youth = await prisma.youth.findMany({
      where: { organizationId: req.staff.organizationId },
      orderBy: { lastName: "asc" },
    });
    res.json(youth);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch youth" });
  }
});

// Get youth by ID
router.get("/:id", authenticate, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const youth = await prisma.youth.findUnique({ where: { id } });
    if (!youth) return res.status(404).json({ error: "Youth not found" });
    res.json(youth);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch youth" });
  }
});

// Get youth by QR code
router.get("/qr/:qrCode", authenticate, async (req, res) => {
  const { qrCode } = req.params;

  try {
    const youth = await prisma.youth.findUnique({ where: { qrCode } });
    if (!youth) return res.status(404).json({ error: "Youth not found" });
    res.json(youth);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch youth" });
  }
});

// Delete youth (Admin only)
router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.youth.delete({ where: { id } });
    res.json({ message: "Youth deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete youth" });
  }
});

export default router;
