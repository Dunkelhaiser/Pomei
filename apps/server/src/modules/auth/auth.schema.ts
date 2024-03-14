import { z as zod } from "zod";

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[\w_]+$/;

export const signUpSchema = zod.object({
    username: zod
        .string()
        .trim()
        .min(1, { message: "Enter your username" })
        .min(3, { message: "Username must be at least 6 characters long" })
        .max(20, { message: "Username must be at most 20 characters long" })
        .regex(usernameRegex, { message: "Username can only contain letters, numbers and underscores" }),
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
        username: zod.string(),
        createdAt: zod.date(),
    }),
});

export const signInSchema = zod.object({
    login: zod.string().min(1, { message: "Enter your username/email" }),
    password: zod.string().min(1, { message: "Enter your password" }),
});

export const userResponseSchema = zod.object({
    user: zod.object({
        id: zod.string(),
        email: zod.string(),
        username: zod.string(),
        firstName: zod.string().nullable(),
        lastName: zod.string().nullable(),
        verifiedAt: zod.date().nullable(),
        updatedAt: zod.date(),
        createdAt: zod.date(),
    }),
});

export const errorSchema = zod.object({
    message: zod.string(),
});

export type SignUpInput = zod.infer<typeof signUpSchema>;
export type SignInInput = zod.infer<typeof signInSchema>;
