import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createNoteHandler, getNoteHandler } from "./notes.controller.ts";
import { getNoteSchema, newNoteSchema, noteSchema } from "./notes.schema.ts";
import { authHandler } from "../auth/auth.handler.ts";
import { messageSchema } from "@/utils/schema.ts";

export const notesRoutes = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
        "/",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Create new note",
                body: newNoteSchema,
                response: {
                    201: noteSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        createNoteHandler
    );
    app.withTypeProvider<ZodTypeProvider>().get(
        "/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Get specific note",
                params: getNoteSchema,
                response: {
                    200: noteSchema,
                    404: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        getNoteHandler
    );
};
