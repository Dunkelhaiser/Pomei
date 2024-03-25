import { z as zod } from "zod";
import { getPaginated } from "../shared/shared.schema.ts";

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

export const getFolderByNameSchema = zod.object({
    name: zod.string().trim().min(1, { message: "Name must be at least 1 character long" }),
});

export const getFolderPaginatedSchema = zod.object({
    ...getPaginated,
    orderBy: zod.enum(["order", "name", "createdAt", "updatedAt"]).optional(),
});

export type NewFolderInput = zod.infer<typeof newFolderSchema>;
export type GetFolderByNameInput = zod.infer<typeof getFolderByNameSchema>;
export type GetFolderPaginatedInput = zod.infer<typeof getFolderPaginatedSchema>;
