import express from "express";
import bcrypt from "bcrypt";
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

// Create a new staff member (Admin only)
router.post("/", authenticate, requireAdmin, async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (role && !["ADMIN", "LEADER"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const existing = await prisma.staff.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const member = await prisma.staff.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        role: role || "LEADER",
        organizationId: req.staff.organizationId,
      },
    });

    res.status(201).json({
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      role: member.role,
      organizationId: member.organizationId,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create staff member" });
  }
});

export default router;
