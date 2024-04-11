import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import schema from "shared-types";
import {
    addToFolderHandler,
    archiveNoteHandler,
    createNoteHandler,
    deleteNoteHandler,
    duplicateNoteHandler,
    editNoteHandler,
    emptyBinHandler,
    getAllNotesHandler,
    getAllNotesPaginatedHandler,
    getArchiveHandler,
    getArchivePaginatedHandler,
    getBinHandler,
    getNoteHandler,
    moveToBinHandler,
    removeFromFolderHandler,
    reorderNoteHandler,
    searchNotesHandler,
} from "./notes.controller.ts";
import { authHandler } from "@/auth/auth.handler.ts";

const {
    emptySchema,
    messageSchema,
    archiveSchema,
    folderIdSchema,
    getNotePaginatedSchema,
    getNotesSchema,
    moveToBinSchema,
    newNoteSchema,
    noteSchema,
    notesSchema,
    getByIdSchema,
    orderSchema,
    notesPaginatedSchema,
} = schema;

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
                params: getByIdSchema,
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
        "/all",
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
    app.withTypeProvider<ZodTypeProvider>().get(
        "/",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Get all notes with pagination",
                querystring: getNotePaginatedSchema,
                response: {
                    200: notesPaginatedSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        getAllNotesPaginatedHandler
    );
    app.withTypeProvider<ZodTypeProvider>().get(
        "/search",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Search for notes by title, content or tags",
                querystring: getNotesSchema,
                response: {
                    200: notesSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        searchNotesHandler
    );
    app.withTypeProvider<ZodTypeProvider>().put(
        "/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Edit note",
                params: getByIdSchema,
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
    app.withTypeProvider<ZodTypeProvider>().post(
        "/duplicate/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Duplicate note",
                params: getByIdSchema,
                response: {
                    201: noteSchema,
                    404: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        duplicateNoteHandler
    );
    app.withTypeProvider<ZodTypeProvider>().put(
        "/reorder/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Reorder note",
                params: getByIdSchema,
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
    app.withTypeProvider<ZodTypeProvider>().put(
        "/archive/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Archive or unarchive note",
                params: getByIdSchema,
                body: archiveSchema,
                response: {
                    200: noteSchema,
                    404: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        archiveNoteHandler
    );
    app.withTypeProvider<ZodTypeProvider>().get(
        "/archive",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Get archive with pagination",
                querystring: getNotePaginatedSchema,
                response: {
                    200: notesPaginatedSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        getArchivePaginatedHandler
    );
    app.withTypeProvider<ZodTypeProvider>().get(
        "/archive/all",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Get all notes in the archive",
                response: {
                    200: notesSchema,
                    500: messageSchema,
                },
            },
        },
        getArchiveHandler
    );
    app.withTypeProvider<ZodTypeProvider>().put(
        "/bin/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Move to bin or restore note",
                params: getByIdSchema,
                body: moveToBinSchema,
                response: {
                    200: noteSchema,
                    404: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        moveToBinHandler
    );
    app.withTypeProvider<ZodTypeProvider>().delete(
        "/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Permanently delete note",
                params: getByIdSchema,
                response: {
                    204: emptySchema,
                    404: messageSchema,
                    400: messageSchema,
                    500: messageSchema,
                },
            },
        },
        deleteNoteHandler
    );
    app.withTypeProvider<ZodTypeProvider>().delete(
        "/bin",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Permanently delete all notes from the bin",
                response: {
                    204: emptySchema,
                    500: messageSchema,
                },
            },
        },
        emptyBinHandler
    );
    app.withTypeProvider<ZodTypeProvider>().get(
        "/bin",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes"],
                description: "Get all notes in the bin",
                response: {
                    200: notesSchema,
                    500: messageSchema,
                },
            },
        },
        getBinHandler
    );
    app.withTypeProvider<ZodTypeProvider>().put(
        "/folder/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes", "folders"],
                description: "Add note to folder",
                params: getByIdSchema,
                body: folderIdSchema,
                response: {
                    200: noteSchema,
                    400: messageSchema,
                    404: messageSchema,
                    500: messageSchema,
                },
            },
        },
        addToFolderHandler
    );
    app.withTypeProvider<ZodTypeProvider>().delete(
        "/folder/:id",
        {
            preHandler: authHandler,
            schema: {
                tags: ["notes", "folders"],
                description: "Remove note from folder",
                params: getByIdSchema,
                response: {
                    200: noteSchema,
                    400: messageSchema,
                    404: messageSchema,
                    500: messageSchema,
                },
            },
        },
        removeFromFolderHandler
    );
};
