import { FastifyInstance } from "fastify";
import { signUpHandler } from "./auth.controller.ts";

export const authRoutes = async (app: FastifyInstance) => {
    app.post("/sign_up", signUpHandler);
};
