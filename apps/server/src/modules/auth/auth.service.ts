import { eq } from "drizzle-orm";
import { User } from "lucia";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";
import { Argon2id } from "oslo/password";
import { SignUpInput } from "./auth.schema.ts";
import { db } from "@/db/client.ts";
import { users, verificationCodes } from "@/db/schema.ts";
import { resend } from "@/utils/resend.ts";

export const getUserByEmail = async (email: string) => {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user.length === 0 ? null : user[0];
};

export const getUserById = async (id: string) => {
    const user = await db.select().from(users).where(eq(users.id, id));
    return user.length === 0 ? null : user[0];
};

export const createUser = async (input: SignUpInput) => {
    const { email, password } = input;

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await new Argon2id().hash(password);

    const [user] = await db
        .insert(users)
        .values({
            email,
            password: hashedPassword,
        })
        .returning({
            id: users.id,
            email: users.email,
            createdAt: users.createdAt,
        });

    return user;
};

export const genereateVerificationCode = async (userId: string) => {
    await db.delete(verificationCodes).where(eq(verificationCodes.userId, userId));
    const code = generateRandomString(5, alphabet("0-9"));
    await db.insert(verificationCodes).values({
        userId,
        code,
        expiresAt: createDate(new TimeSpan(5, "m")),
    });
    return code;
};

export const verifyVerificationCode = async (user: User, code: string) => {
    const [verificationCode] = await db.select().from(verificationCodes).where(eq(verificationCodes.userId, user.id));
    if (!verificationCode.code || verificationCode.code !== code) {
        throw new Error("Invalid verification code");
    }
    await db.delete(verificationCodes).where(eq(verificationCodes.userId, user.id));
    if (!isWithinExpirationDate(verificationCode.expiresAt)) {
        throw new Error("Verification code expired");
    }

    await db.update(users).set({ verifiedAt: new Date() }).where(eq(users.id, user.id));
};

export const sendVerificationCode = async (code: string, email: string) => {
    const { error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Pomei - Verification",
        html: `<h1>Your verification code: ${code}</h1>`,
    });

    if (error) {
        throw new Error("Failed to send verification code");
    }
};
