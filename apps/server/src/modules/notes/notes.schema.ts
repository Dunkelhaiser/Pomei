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

export type NewNoteInput = zod.infer<typeof newNoteSchema>;
export type GetNoteInput = zod.infer<typeof getNoteSchema>;
