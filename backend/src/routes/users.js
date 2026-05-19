import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { createUserSchema } from "../middleware/validate.js";
import { createUser, getAllUsers, getUserById } from "../controllers/users.js";

const router = Router();

router.post("/", validate(createUserSchema), createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;
