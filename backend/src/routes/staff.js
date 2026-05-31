import express from "express";
import { prisma } from "../index.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get all staff for an organization
router.get("/", authenticate, async (req, res) => {
  try {
    const staff = await prisma.staff.findMany({
      where: { organizationId: req.staff.organizationId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        organizationId: true,
        createdAt: true,
      },
    });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch staff" });
  }
});

// Get staff by ID
router.get("/:id", authenticate, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const member = await prisma.staff.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        organizationId: true,
        createdAt: true,
      },
    });
    if (!member) return res.status(404).json({ error: "Staff not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch staff member" });
  }
});

// Update staff role (Admin only)
router.patch("/:id/role", authenticate, requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const { role } = req.body;

  if (!role || !["ADMIN", "LEADER"].includes(role)) {
    return res.status(400).json({ error: "Valid role is required" });
  }

  try {
    const member = await prisma.staff.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Failed to update role" });
  }
});

export default router;
