import { z as zod } from "zod";

const hexRegex = /^#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const newFolderSchema = zod.object({
    name: zod.string().trim().max(25, { message: "Name must be less than 25 characters long" }),
    color: zod.string().trim().regex(hexRegex, { message: "Invalid color code" }),
});

export const folderSchema = zod.object({
    id: zod.string(),
    name: zod.string(),
    color: zod.string(),
    order: zod.number(),
    createdAt: zod.date(),
    updatedAt: zod.date(),
});
export const foldersSchema = folderSchema.array();

export const getFolderSchema = zod.object({
    id: zod.string().uuid({ message: "Enter valid id format" }),
});

export type NewFolderInput = zod.infer<typeof newFolderSchema>;
export type GetFolderInput = zod.infer<typeof getFolderSchema>;
