import { z as zod } from "zod";

export const signUpSchema = zod.object({
    email: zod.string().min(1, { message: "Enter your email" }).email({ message: "Enter valid email" }),
    password: zod
        .string()
        .trim()
        .min(1, { message: "Enter your password" })
        .min(6, { message: "Password must be at least 6 characters long" }),
});

export const createdUserSchema = zod.object({
    user: zod.object({
        id: zod.string(),
        email: zod.string(),
        createdAt: zod.date(),
    }),
});

export const signInSchema = zod.object({
    email: zod.string().min(1, { message: "Enter your email" }),
    password: zod.string().min(1, { message: "Enter your password" }),
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

export const errorSchema = zod.object({
    message: zod.string(),
});

export const emptySchema = zod.object({});

export type SignUpInput = zod.infer<typeof signUpSchema>;
export type SignInInput = zod.infer<typeof signInSchema>;
