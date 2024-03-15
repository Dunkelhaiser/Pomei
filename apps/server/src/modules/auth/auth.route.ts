import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { signInHandler, signOutHandler, signUpHandler, terminateAllSessionsHandler } from "./auth.controller.ts";
import { authHandler } from "./auth.handler.ts";
import {
    createdUserSchema,
    errorSchema,
    signInSchema,
    userResponseSchema,
    signUpSchema,
    emptySchema,
} from "./auth.schema.ts";

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
    app.withTypeProvider<ZodTypeProvider>().post(
        "/sign_in",
        {
            schema: {
                body: signInSchema,
                response: {
                    200: userResponseSchema,
                    400: errorSchema,
                    500: errorSchema,
                },
            },
        },
        signInHandler
    );
    app.withTypeProvider<ZodTypeProvider>().post(
        "/sign_out",
        {
            preHandler: authHandler,
            schema: {
                response: {
                    204: emptySchema,
                    500: errorSchema,
                },
            },
        },
        signOutHandler
    );
    app.withTypeProvider<ZodTypeProvider>().post(
        "/terminate",
        {
            preHandler: authHandler,
            schema: {
                response: {
                    204: emptySchema,
                    500: errorSchema,
                },
            },
        },
        terminateAllSessionsHandler
    );
};
