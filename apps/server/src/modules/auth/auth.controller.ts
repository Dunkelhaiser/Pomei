import { FastifyReply, FastifyRequest } from "fastify";
import { z as zod } from "zod";
import { SignUpInput, signUpSchema } from "./auth.schema.ts";
import { createUser } from "./auth.service.ts";

export const signUpHandler = async (req: FastifyRequest<{ Body: SignUpInput }>, res: FastifyReply) => {
    const { username, email, password } = req.body;

    try {
        signUpSchema.parse({ username, email, password });
        const user = await createUser({ username, email, password });
        return res.code(201).send(user);
    } catch (err) {
        if (err instanceof zod.ZodError) {
            return res.code(400).send({ message: err.issues[0].message });
        }
        if (err instanceof Error) {
            return res.code(409).send({ message: err.message });
        }
        return res.code(500).send({ message: "Failed to sign up" });
    }
};
