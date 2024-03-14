import { FastifyReply, FastifyRequest } from "fastify";
import { Argon2id } from "oslo/password";
import { SignInInput, SignUpInput } from "./auth.schema.ts";
import { createUser, getUserByEmail } from "./auth.service.ts";
import { lucia } from "./auth.ts";

export const signUpHandler = async (req: FastifyRequest<{ Body: SignUpInput }>, res: FastifyReply) => {
    const { username, email, password } = req.body;
    try {
        const user = await createUser({ username, email, password });
        return res.code(201).send({ user: user[0] });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(409).send({ message: err.message });
        }
        return res.code(500).send({ message: "Failed to sign up" });
    }
};

export const signInHandler = async (req: FastifyRequest<{ Body: SignInInput }>, res: FastifyReply) => {
    const { login, password } = req.body;
    try {
        const user = await getUserByEmail(login);
        if (!user) {
            return res.code(400).send({ message: "Invalid credentials" });
        }

        const validPassword = await new Argon2id().verify(user.password, password);
        if (!validPassword) {
            return res.code(400).send({ message: "Invalid credentials" });
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        return res.code(200).headers({ "Set-Cookie": sessionCookie.serialize() }).send({ user });
    } catch (err) {
        return res.status(500).send("Failed to sign in");
    }
};
