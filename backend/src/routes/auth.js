import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";

const router = express.Router();

// Register a new staff member
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, role, organizationId } =
    req.body;

  if (!firstName || !lastName || !email || !password || !organizationId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existing = await prisma.staff.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const staff = await prisma.staff.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        role: role || "LEADER",
        organizationId: parseInt(organizationId),
      },
    });

    res.status(201).json({
      id: staff.id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      role: staff.role,
      organizationId: staff.organizationId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const staff = await prisma.staff.findUnique({ where: { email } });
    if (!staff) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, staff.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: staff.id,
        role: staff.role,
        organizationId: staff.organizationId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      token,
      staff: {
        id: staff.id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        role: staff.role,
        organizationId: staff.organizationId,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
