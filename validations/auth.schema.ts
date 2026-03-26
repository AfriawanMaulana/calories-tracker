import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().trim().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
