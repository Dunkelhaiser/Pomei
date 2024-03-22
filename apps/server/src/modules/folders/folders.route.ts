import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { folderSchema, foldersSchema, newFolderSchema } from "./folder.schema.ts";
import { createFolderHandler, getAllFoldersHandler, loadFolderContentHandler } from "./folders.controller.ts";
import { notesSchema } from "../notes/notes.schema.ts";
import { authHandler } from "@/auth/auth.handler.ts";
import { messageSchema } from "@/utils/schema.ts";

export const foldersRoutes = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
        "/",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Create new folder",
                body: newFolderSchema,
                response: {
                    201: folderSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        createFolderHandler
    );
    app.withTypeProvider<ZodTypeProvider>().get(
        "/",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Get all folders",
                response: {
                    200: foldersSchema,
                    500: messageSchema,
                },
            },
        },
        getAllFoldersHandler
    );
    app.withTypeProvider<ZodTypeProvider>().get(
        "/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Get folder content",
                response: {
                    200: notesSchema,
                    404: messageSchema,
                    500: messageSchema,
                },
            },
        },
        loadFolderContentHandler
    );
};
