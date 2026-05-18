import { z } from "zod";

// Reusable validation middleware factory
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((e) => e.message);
      return res.status(400).json({ error: errors[0] });
    }
    req.body = result.data;
    next();
  };
}

// Schemas
export const createUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name cannot be empty"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
});

export const createTaskSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty"),
  description: z.string().optional(),
  points: z
    .number({
      required_error: "Points is required",
      invalid_type_error: "Points must be a number",
    })
    .int("Points must be a whole number")
    .positive("Points must be greater than zero"),
});

export const createRewardSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty"),
  description: z.string().optional(),
  pointCost: z
    .number({
      required_error: "pointCost is required",
      invalid_type_error: "pointCost must be a number",
    })
    .int("pointCost must be a whole number")
    .positive("pointCost must be greater than zero"),
});

export const completeTaskSchema = z.object({
  userId: z
    .number({
      required_error: "userId is required",
      invalid_type_error: "userId must be a number",
    })
    .int()
    .positive(),
  taskId: z
    .number({
      required_error: "taskId is required",
      invalid_type_error: "taskId must be a number",
    })
    .int()
    .positive(),
});

export const redeemRewardSchema = z.object({
  userId: z
    .number({
      required_error: "userId is required",
      invalid_type_error: "userId must be a number",
    })
    .int()
    .positive(),
  rewardId: z
    .number({
      required_error: "rewardId is required",
      invalid_type_error: "rewardId must be a number",
    })
    .int()
    .positive(),
});
