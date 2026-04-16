import { z } from "zod";

export const adminValidation = z
  .object({
    fullName: z
      .string({ message: "Full name is required" })
      .min(1, { message: "Full name is required" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Email is invalid" }),
    role: z
      .string({ message: "Role is required" })
      .min(1, { message: "Role is required" }),
    confirmPassword: z.string({ message: "Confirm password is required" }),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const adminEditValidation = z
  .object({
    fullName: z.string().min(3, "Full name is required").optional(),
    email: z.string().email("Invalid email").optional(),
    role: z.string().min(1, "Role is required").optional(),
    oldPassword: z.string(),
    newPassword: z.string()
  })
  .refine(
    (data) =>
      (!data.oldPassword && !data.newPassword) ||
      (data.oldPassword && data.newPassword),
    {
      message: "Both Old Password and New Password must be provided together",
      path: ["oldPassword", "newPassword"],
    }
  );
