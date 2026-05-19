import { Router } from "express";
import { validate, createRewardSchema } from "../middleware/validate.js";
import {
  createReward,
  getAllRewards,
  getRewardById,
} from "../controllers/rewards.js";

const router = Router();

router.post("/", validate(createRewardSchema), createReward);
router.get("/", getAllRewards);
router.get("/:id", getRewardById);

export default router;
