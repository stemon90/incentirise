import { Router } from "express";
import { validate, createTaskSchema } from "../middleware/validate.js";
import { createTask, getAllTasks, getTaskById } from "../controllers/tasks.js";

const router = Router();

router.post("/", validate(createTaskSchema), createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);

export default router;
