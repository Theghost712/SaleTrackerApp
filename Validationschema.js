import { z } from 'zod';

// Reusable parts
const emailValidation = z.string()
  .trim()
  .min(1, "Email is required")
  .email("Invalid email address");
const passwordValidation = z.string().min(8, "Password must be at least 8 characters");

// Login Schema
export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

// Register Schema (Reuses the logic above)
export const registerSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
