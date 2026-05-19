import { Router } from "express";
import {
  validate,
  completeTaskSchema,
  redeemRewardSchema,
} from "../middleware/validate.js";
import { completeTask, redeemReward } from "../controllers/logic.js";

const router = Router();

router.post("/complete-task", validate(completeTaskSchema), completeTask);
router.post("/redeem-reward", validate(redeemRewardSchema), redeemReward);

export default router;
