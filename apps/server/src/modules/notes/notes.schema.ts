import { z as zod } from "zod";

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

export const getNoteSchema = zod.object({
    id: zod.string().uuid({ message: "Enter valid id format" }),
});

export const getNotePaginatedSchema = zod.object({
    // page: zod.number().min(1, { message: "Page must be greater than or equal to 1" }),
    // limit: zod.number().min(1, { message: "Page size must be greater than or equal to 1" }),
    page: zod.preprocess(
        (val) => Number(val),
        zod.number().min(1, { message: "Page must be greater than or equal to 1" })
    ),
    limit: zod.preprocess(
        (val) => Number(val),
        zod.number().min(1, { message: "Page size must be greater than or equal to 1" })
    ),
    orderBy: zod.enum(["order", "title", "createdAt", "updatedAt"]).optional(),
    // isAscending: zod.boolean().optional(),
    isAscending: zod
        .string()
        .refine((s) => s === "true" || s === "false")
        .transform((s) => s === "true")
        .optional(),
});

export const orderSchema = zod.object({
    order: zod.number().min(0, { message: "Order must be greater than or equal to 0" }),
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

export type NewNoteInput = zod.infer<typeof newNoteSchema> & { order: number };
export type GetNoteInput = zod.infer<typeof getNoteSchema>;
export type GetNotePaginatedInput = zod.infer<typeof getNotePaginatedSchema>;
export type OrderInput = zod.infer<typeof orderSchema>;
export type ArchiveInput = zod.infer<typeof archiveSchema>;
export type MoveToBinInput = zod.infer<typeof moveToBinSchema>;
export type FolderIdInput = zod.infer<typeof folderIdSchema>;
