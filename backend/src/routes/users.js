import express from "express";
import { prisma } from "../index.js";
import { validate, createUserSchema } from "../middleware/validate.js";

const router = express.Router();

// POST /users
router.post("/", validate(createUserSchema), async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "A user with that email already exists" });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /users/:id
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
