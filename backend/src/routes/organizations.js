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
