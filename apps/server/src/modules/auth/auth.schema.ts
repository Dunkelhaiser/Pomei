import { z as zod } from "zod";

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[\w_]+$/;

export const signUpSchema = zod.object({
    username: zod
        .string()
        .min(1, { message: "Enter your username" })
        .regex(usernameRegex, { message: "Username can only contain letters, numbers and underscores" })
        .min(3, { message: "Username must be at least 6 characters long" })
        .max(20, { message: "Username must be at most 20 characters long" }),
    email: zod.string().min(1, { message: "Enter your email" }).email({ message: "Enter valid email" }),
    password: zod
        .string()
        .min(1, { message: "Enter your password" })
        .min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignUpInput = zod.infer<typeof signUpSchema>;
