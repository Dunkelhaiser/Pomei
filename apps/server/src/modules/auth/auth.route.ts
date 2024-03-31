import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import schema from "shared-types";
import {
    resetPasswordTokenHandler,
    resetPasswordHandler,
    signInHandler,
    signOutHandler,
    signUpHandler,
    terminateAllSessionsHandler,
    verificationCodeHandler,
    changePasswordHandler,
    changeEmailHandler,
    deleteAccountHandler,
    resendVerificationCodeHandler,
} from "./auth.controller.ts";
import { authHandler } from "./auth.handler.ts";

const {
    signInSchema,
    userResponseSchema,
    signUpSchema,
    verificationCodeSchema,
    emailSchema,
    passwordSchema,
    resetPasswordSchema,
    emptySchema,
    messageSchema,
} = schema;

export const authRoutes = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
        "/sign_up",
        {
            schema: {
                tags: ["auth"],
                description: "Register a new account",
                body: signUpSchema,
                response: {
                    201: userResponseSchema,
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
                tags: ["auth"],
                description: "Sign in to an account",
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
                tags: ["auth"],
                description: "Sign out of the current session",
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
                tags: ["auth"],
                description: "Terminate all sessions",
                response: {
                    204: emptySchema,
                    500: messageSchema,
                },
            },
        },
        terminateAllSessionsHandler
    );
    app.withTypeProvider<ZodTypeProvider>().post(
        "/verify",
        {
            preHandler: authHandler,
            schema: {
                tags: ["auth"],
                description: "Verify account with code",
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
    app.withTypeProvider<ZodTypeProvider>().get(
        "/resend-verification-code",
        {
            preHandler: authHandler,
            schema: {
                tags: ["auth"],
                description: "Resend verification code",
                response: {
                    200: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        resendVerificationCodeHandler
    );
    app.withTypeProvider<ZodTypeProvider>().post(
        "/reset-password",
        {
            schema: {
                tags: ["auth"],
                description: "Send reset password email",
                body: emailSchema,
                response: {
                    200: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        resetPasswordTokenHandler
    );
    app.withTypeProvider<ZodTypeProvider>().post(
        "/reset-password/:token",
        {
            schema: {
                tags: ["auth"],
                description: "Reset password",
                params: resetPasswordSchema,
                body: passwordSchema,
                response: {
                    200: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        resetPasswordHandler
    );
    app.withTypeProvider<ZodTypeProvider>().post(
        "/change-password",
        {
            preHandler: authHandler,
            schema: {
                tags: ["auth"],
                description: "Change password",
                body: passwordSchema,
                response: {
                    200: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        changePasswordHandler
    );
    app.withTypeProvider<ZodTypeProvider>().post(
        "/change-email",
        {
            preHandler: authHandler,
            schema: {
                tags: ["auth"],
                description: "Change email",
                body: emailSchema,
                response: {
                    200: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        changeEmailHandler
    );
    app.withTypeProvider<ZodTypeProvider>().post(
        "/delete",
        {
            preHandler: authHandler,
            schema: {
                tags: ["auth"],
                description: "Delete account",
                body: passwordSchema,
                response: {
                    204: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        deleteAccountHandler
    );
};
