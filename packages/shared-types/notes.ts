import { z as zod } from "zod";
import { getPaginated, resPaginated } from "./shared.ts";

export const newNoteSchema = zod.object({
    title: zod.string().trim().max(255, { message: "Title must be less than 255 characters long" }).nullable(),
    content: zod.string().trim().nullable(),
    tags: zod.array(
        zod
            .string()
            .trim()
            .min(1, { message: "Tag must be at least 1 character long" })
            .max(20, { message: "Tag must be less than 20 characters long" })
    ),
});

export const noteSchema = zod.object({
    id: zod.string(),
    title: zod.string().max(255).nullable(),
    content: zod.string().nullable(),
    tags: zod.array(zod.string().max(20)).nullable(),
    order: zod.number(),
    isArchived: zod.boolean(),
    isDeleted: zod.boolean(),
    folderId: zod.string().nullable(),
    createdAt: zod.date(),
    updatedAt: zod.date(),
});
export const notesSchema = noteSchema.array();

export const notesPaginatedSchema = zod.object({
    notes: notesSchema,
    ...resPaginated,
});

export const getNotePaginatedSchema = zod.object({
    ...getPaginated,
    orderBy: zod.enum(["order", "title", "createdAt", "updatedAt"]).optional(),
});

export const archiveSchema = zod.object({
    archive: zod.boolean(),
});

export const moveToBinSchema = zod.object({
    moveToBin: zod.boolean(),
});

export const folderIdSchema = zod.object({
    folderId: zod.string().uuid({ message: "Enter valid id format" }),
});

export const getNotesSchema = zod.object({
    title: zod.string().trim().min(1, { message: "Title must be at least 1 character long" }),
    searchBy: zod.enum(["title", "content", "tags"]).optional(),
});

export const searchNotesPaginatedSchema = zod.object({
    title: zod.string().trim().min(1, { message: "Title must be at least 1 character long" }),
    searchBy: zod.enum(["title", "content", "tags"]).optional(),
    page: getPaginated.page,
    limit: getPaginated.limit,
});

export type NewNoteInput = zod.infer<typeof newNoteSchema> & { order: number };
export type GetNotePaginatedInput = zod.infer<typeof getNotePaginatedSchema>;
export type ArchiveInput = zod.infer<typeof archiveSchema>;
export type MoveToBinInput = zod.infer<typeof moveToBinSchema>;
export type FolderIdInput = zod.infer<typeof folderIdSchema>;
export type GetNotesInput = zod.infer<typeof getNotesSchema>;
export type SearchNotesPaginatedInput = zod.infer<typeof searchNotesPaginatedSchema>;
export type Note = zod.infer<typeof noteSchema>;
export type NotesPaginated = zod.infer<typeof notesPaginatedSchema>;
