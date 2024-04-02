import { z as zod } from "zod";

const email = zod.string().min(1, { message: "Enter your email" });
const emailChecked = email.email({ message: "Enter valid email" });
const password = zod.string().trim().min(1, { message: "Enter your password" });
const passwordChecked = password
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(255, { message: "Password must be at most 255 characters long" });

export const emailSchema = zod.object({
    email: emailChecked,
});

export const passwordSchema = zod.object({
    password,
});

export const passwordSchemaWithConfirmation = zod
    .object({
        password: passwordChecked,
        confirmPassword: zod.string().trim().min(1, { message: "Confirm your password" }),
    })
    .refine((schemaData) => schemaData.password === schemaData.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export const signUpSchema = zod.object({
    email: emailChecked,
    password: passwordChecked,
});

export const signUpSchemaWithPasswordConfirmation = zod
    .object({
        email: emailChecked,
        password: passwordChecked,
        confirmPassword: zod.string().trim().min(1, { message: "Confirm your password" }),
    })
    .refine((schemaData) => schemaData.password === schemaData.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export const signInSchema = zod.object({
    email,
    password,
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
export type PasswordInputWithConfirmation = zod.infer<typeof passwordSchemaWithConfirmation>;
export type SignUpInput = zod.infer<typeof signUpSchema>;
export type SignUpInputWithPasswordConfirmation = zod.infer<typeof signUpSchemaWithPasswordConfirmation>;
export type SignInInput = zod.infer<typeof signInSchema>;
export type VerificationCodeInput = zod.infer<typeof verificationCodeSchema>;
export type ResetPasswordInput = zod.infer<typeof resetPasswordSchema>;
export type User = zod.infer<typeof userResponseSchema>["user"];
export type UserResponse = { user: User };
