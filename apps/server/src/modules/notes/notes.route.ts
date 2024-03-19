import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createNoteHandler } from "./notes.controller.ts";
import { newNoteSchema, noteSchema } from "./notes.schema.ts";
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
};
