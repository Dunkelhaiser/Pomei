import { FastifyReply, FastifyRequest } from "fastify";
import { SignUpInput } from "./auth.schema.ts";
import { createUser } from "./auth.service.ts";

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
