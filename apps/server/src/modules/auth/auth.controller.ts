import { FastifyReply, FastifyRequest } from "fastify";
import { Argon2id } from "oslo/password";
import { SignInInput, SignUpInput, VerificationCodeInput } from "./auth.schema.ts";
import {
    createUser,
    genereateVerificationCode,
    getUserByEmail,
    sendVerificationCode,
    verifyVerificationCode,
} from "./auth.service.ts";
import { lucia } from "./auth.ts";

export const signUpHandler = async (req: FastifyRequest<{ Body: SignUpInput }>, res: FastifyReply) => {
    const { email, password } = req.body;
    try {
        const user = await createUser({ email, password });
        const verificationCode = await genereateVerificationCode(user.id);
        await sendVerificationCode(verificationCode, user.email);
        return res.code(201).send({ user });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(409).send({ message: err.message });
        }
        return res.code(500).send({ message: "Failed to sign up" });
    }
};

export const signInHandler = async (req: FastifyRequest<{ Body: SignInInput }>, res: FastifyReply) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
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

export const signOutHandler = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
        if (sessionId) {
            await lucia.invalidateSession(sessionId);
        }
        return res.code(204).send();
    } catch (err) {
        return res.status(500).send("Failed to sign out");
    }
};

export const terminateAllSessionsHandler = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        await lucia.invalidateUserSessions(req.user.id);
        return res.code(204).send();
    } catch (err) {
        return res.status(500).send("Failed to terminate all sessions");
    }
};

export const verificationCodeHandler = async (
    req: FastifyRequest<{ Body: VerificationCodeInput }>,
    res: FastifyReply
) => {
    try {
        await verifyVerificationCode(req.user, req.body.code);
        return res.code(200).send({ message: "Account verified" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.status(500).send("Failed to verify account");
    }
};
