import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
    createNoteHandler,
    editNoteHandler,
    getAllNotesHandler,
    getNoteHandler,
    reorderNoteHandler,
} from "./notes.controller.ts";
import { getNoteSchema, newNoteSchema, noteSchema, notesSchema, orderSchema } from "./notes.schema.ts";
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
    app.withTypeProvider<ZodTypeProvider>().get(
        "/",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Get all notes",
                response: {
                    200: notesSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        getAllNotesHandler
    );
    app.withTypeProvider<ZodTypeProvider>().put(
        "/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Edit note",
                params: getNoteSchema,
                body: newNoteSchema,
                response: {
                    200: noteSchema,
                    404: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        editNoteHandler
    );
    app.withTypeProvider<ZodTypeProvider>().put(
        "/reorder/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Reorder note",
                params: getNoteSchema,
                body: orderSchema,
                response: {
                    200: noteSchema,
                    404: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        reorderNoteHandler
    );
};
