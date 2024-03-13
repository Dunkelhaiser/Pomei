import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { SignUpInput } from "./auth.schema.ts";
import { db } from "@/db/client.ts";
import { users } from "@/db/schema.ts";

export const getUserByEmail = async (email: string) => {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user.length === 0 ? null : user[0];
};

export const getUserByUsername = async (username: string) => {
    const user = await db.select().from(users).where(eq(users.username, username));
    return user.length === 0 ? null : user[0];
};

export const getUserById = async (id: string) => {
    const user = await db.select().from(users).where(eq(users.id, id));
    return user.length === 0 ? null : user[0];
};

export const createUser = async (input: SignUpInput) => {
    const { username, email, password } = input;
    const existingUsername = await getUserByUsername(username);
    if (existingUsername) {
        throw new Error("Username already exists");
    }

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await new Argon2id().hash(password);

    const user = await db
        .insert(users)
        .values({
            username,
            email,
            password: hashedPassword,
        })
        .returning({
            id: users.id,
            username: users.username,
            email: users.email,
            createdAt: users.createdAt,
        });

    return user;
};
