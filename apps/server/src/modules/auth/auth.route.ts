import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { signUpHandler } from "./auth.controller.ts";
import { createdUserSchema, errorSchema, signUpSchema } from "./auth.schema.ts";

export const authRoutes = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
        "/sign_up",
        {
            schema: {
                body: signUpSchema,
                response: {
                    201: createdUserSchema,
                    400: errorSchema,
                    409: errorSchema,
                    500: errorSchema,
                },
            },
        },
        signUpHandler
    );
};
