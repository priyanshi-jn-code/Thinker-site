import z from "zod"

 export const checkPoint = z.object({
    username : z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" })
    .max(50, { message: "Username cannot exceed 50 characters" })
    .regex(/[A-Z]/, { message: "Username must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Username must contain at least one lowercase letter" })
    .optional(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(8, { message: "Password cannot exceed 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one numeric value" })
    .regex(/[`~<>?,./!@#$%^&*()\-_+="|'{}[\];:\\]/, {
      message: "Password must contain at least one special character",
    }),
  email: z.string().email({ message: "Invalid email address" }),
});

  