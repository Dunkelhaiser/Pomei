import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { folderSchema, foldersSchema, getFolderSchema, newFolderSchema, orderSchema } from "./folder.schema.ts";
import {
    createFolderHandler,
    deleteFolderHandler,
    editFolderHandler,
    getAllFoldersHandler,
    loadFolderContentHandler,
    reorderFolderHandler,
} from "./folders.controller.ts";
import { notesSchema } from "../notes/notes.schema.ts";
import { authHandler } from "@/auth/auth.handler.ts";
import { emptySchema, messageSchema } from "@/utils/schema.ts";

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
                params: getFolderSchema,
                response: {
                    200: notesSchema,
                    400: messageSchema,
                    404: messageSchema,
                    500: messageSchema,
                },
            },
        },
        loadFolderContentHandler
    );
    app.withTypeProvider<ZodTypeProvider>().delete(
        "/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Delete folder",
                params: getFolderSchema,
                response: {
                    204: emptySchema,
                    400: messageSchema,
                    404: messageSchema,
                    500: messageSchema,
                },
            },
        },
        deleteFolderHandler
    );
    app.withTypeProvider<ZodTypeProvider>().put(
        "/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Edit folder",
                params: getFolderSchema,
                body: newFolderSchema,
                response: {
                    200: folderSchema,
                    400: messageSchema,
                    404: messageSchema,
                    500: messageSchema,
                },
            },
        },
        editFolderHandler
    );
    app.withTypeProvider<ZodTypeProvider>().put(
        "/reorder/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Reorder folder",
                params: getFolderSchema,
                body: orderSchema,
                response: {
                    200: folderSchema,
                    400: messageSchema,
                    404: messageSchema,
                    500: messageSchema,
                },
            },
        },
        reorderFolderHandler
    );
};