import express from "express";
import { prisma } from "../index.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Create organization
router.post("/", async (req, res) => {
  const { name, pointName } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const org = await prisma.organization.create({
      data: {
        name,
        pointName: pointName || "points",
      },
    });
    res.status(201).json(org);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create organization" });
  }
});

// Public registration — create org and first admin together
router.post("/register", async (req, res) => {
  const { orgName, pointName, firstName, lastName, email, password } = req.body;

  if (!orgName || !firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existing = await prisma.staff.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const bcrypt = await import("bcrypt");
    const passwordHash = await bcrypt.default.hash(password, 10);

    const org = await prisma.organization.create({
      data: {
        name: orgName,
        pointName: pointName || "points",
        staff: {
          create: {
            firstName,
            lastName,
            email,
            passwordHash,
            role: "ADMIN",
          },
        },
      },
    });

    res.status(201).json({
      message: "Organization created successfully",
      orgId: org.id,
      orgName: org.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Get all organizations
router.get("/", authenticate, async (req, res) => {
  try {
    const orgs = await prisma.organization.findMany();
    res.json(orgs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch organizations" });
  }
});

// Get organization by ID
router.get("/:id", authenticate, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const org = await prisma.organization.findUnique({ where: { id } });
    if (!org) return res.status(404).json({ error: "Organization not found" });
    res.json(org);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch organization" });
  }
});

export default router;
