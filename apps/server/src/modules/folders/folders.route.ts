import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import schema from "shared-types";
import {
    createFolderHandler,
    deleteFolderHandler,
    deleteFolderWithNotesHandler,
    editFolderHandler,
    getAllFoldersHandler,
    getAllFoldersPaginatedHandler,
    loadFolderContentHandler,
    reorderFolderHandler,
    searchFolderHandler,
} from "./folders.controller.ts";
import { authHandler } from "@/auth/auth.handler.ts";

const {
    emptySchema,
    getByIdSchema,
    orderSchema,
    messageSchema,
    folderSchema,
    foldersSchema,
    getFolderSchema,
    getFolderPaginatedSchema,
    newFolderSchema,
    notesSchema,
    foldersPaginatedSchema,
} = schema;

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
        "/all",
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
        "/",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Get all folders with pagination",
                querystring: getFolderPaginatedSchema,
                response: {
                    200: foldersPaginatedSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        getAllFoldersPaginatedHandler
    );
    app.withTypeProvider<ZodTypeProvider>().get(
        "/search",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Search for folder by name",
                querystring: getFolderSchema,
                response: {
                    200: foldersSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        searchFolderHandler
    );
    app.withTypeProvider<ZodTypeProvider>().get(
        "/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Get folder content",
                params: getByIdSchema,
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
                params: getByIdSchema,
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
    app.withTypeProvider<ZodTypeProvider>().delete(
        "/:id/notes",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Delete folder with notes",
                params: getByIdSchema,
                response: {
                    204: emptySchema,
                    400: messageSchema,
                    404: messageSchema,
                    500: messageSchema,
                },
            },
        },
        deleteFolderWithNotesHandler
    );
    app.withTypeProvider<ZodTypeProvider>().put(
        "/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["folders"],
                description: "Edit folder",
                params: getByIdSchema,
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
                params: getByIdSchema,
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
