import { z as zod } from "zod";

const email = zod.string().min(1, { message: "Enter your email" }).email({ message: "Enter valid email" });
const password = zod
    .string()
    .trim()
    .min(1, { message: "Enter your password" })
    .min(6, { message: "Password must be at least 6 characters long" });

export const emailSchema = zod.object({
    email,
});

export const passwordSchema = zod.object({
    password,
});

export const signUpSchema = zod.object({
    email,
    password,
});

export const signInSchema = zod.object({
    email,
    password: zod
        .string()
        .min(1, { message: "Enter your password" })
        .min(8, { message: "Password must be at least 8 characters long" }),
});

export const userResponseSchema = zod.object({
    user: zod.object({
        id: zod.string(),
        email: zod.string(),
        verifiedAt: zod.date().nullable(),
        updatedAt: zod.date(),
        createdAt: zod.date(),
    }),
});

export const verificationCodeSchema = zod.object({
    code: zod
        .string()
        .trim()
        .min(5, { message: "Enter verification code" })
        .max(5, { message: "Enter verification code" }),
});

export const resetPasswordSchema = zod.object({
    token: zod.string().trim(),
});

export type EmailInput = zod.infer<typeof emailSchema>;
export type PasswordInput = zod.infer<typeof passwordSchema>;
export type SignUpInput = zod.infer<typeof signUpSchema>;
export type SignInInput = zod.infer<typeof signInSchema>;
export type VerificationCodeInput = zod.infer<typeof verificationCodeSchema>;
export type ResetPasswordInput = zod.infer<typeof resetPasswordSchema>;
