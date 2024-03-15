import { eq } from "drizzle-orm";
import { User, generateId } from "lucia";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { alphabet, generateRandomString, sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { Argon2id } from "oslo/password";
import { SignUpInput } from "./auth.schema.ts";
import { db } from "@/db/client.ts";
import { passwordResetCodes, users, verificationCodes } from "@/db/schema.ts";
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

export const generatePasswordResetToken = async (userId: string) => {
    await db.delete(passwordResetCodes).where(eq(passwordResetCodes.userId, userId));
    const tokenId = generateId(40);
    const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
    await db.insert(passwordResetCodes).values({
        userId,
        tokenHash,
        expiresAt: createDate(new TimeSpan(5, "m")),
    });
    return tokenId;
};

export const sendPasswordResetLink = async (link: string, email: string) => {
    const { error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Pomei - Password Reset",
        html: `<h1>Your password reset link: ${link}</h1>`,
    });

    if (error) {
        throw new Error("Failed to send reset link");
    }
};

export const verifyPasswordResetToken = async (token: string) => {
    const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
    const [passwordResetCode] = await db
        .select()
        .from(passwordResetCodes)
        .where(eq(passwordResetCodes.tokenHash, tokenHash));
    if (!passwordResetCode.tokenHash) {
        throw new Error("Invalid password reset token");
    }
    if (!isWithinExpirationDate(passwordResetCode.expiresAt)) {
        throw new Error("Password reset token expired");
    }
    return passwordResetCode;
};

export const updatePassword = async (userId: string, password: string) => {
    const hashedPassword = await new Argon2id().hash(password);
    await db.update(users).set({ password: hashedPassword }).where(eq(users.id, userId));
};

export const updateEmail = async (userId: string, email: string) => {
    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
        throw new Error("Email is already used");
    }
    await db.update(users).set({ email }).where(eq(users.id, userId));
};
