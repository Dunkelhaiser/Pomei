import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
    signInHandler,
    signOutHandler,
    signUpHandler,
    terminateAllSessionsHandler,
    verificationCodeHandler,
} from "./auth.controller.ts";
import { authHandler } from "./auth.handler.ts";
import {
    createdUserSchema,
    messageSchema,
    signInSchema,
    userResponseSchema,
    signUpSchema,
    emptySchema,
    verificationCodeSchema,
} from "./auth.schema.ts";

export const authRoutes = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
        "/sign_up",
        {
            schema: {
                body: signUpSchema,
                response: {
                    201: createdUserSchema,
                    400: messageSchema,
                    409: messageSchema,
                    500: messageSchema,
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
                    400: messageSchema,
                    500: messageSchema,
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
                    500: messageSchema,
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
                    500: messageSchema,
                },
            },
        },
        terminateAllSessionsHandler
    );
    app.withTypeProvider<ZodTypeProvider>().post(
        "/verificate",
        {
            preHandler: authHandler,
            schema: {
                body: verificationCodeSchema,
                response: {
                    200: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        verificationCodeHandler
    );
};
