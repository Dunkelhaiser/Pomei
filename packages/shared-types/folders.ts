import { z as zod } from "zod";
import { getPaginated, resPaginated } from "./shared.ts";

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

export const foldersPaginatedSchema = zod.object({
    folders: foldersSchema,
    ...resPaginated,
});

export const getFolderSchema = zod.object({
    name: zod.string().trim().min(1, { message: "Name must be at least 1 character long" }),
});

export const getFolderPaginatedSchema = zod.object({
    ...getPaginated,
    orderBy: zod.enum(["order", "name", "createdAt", "updatedAt"]).optional(),
});

export type NewFolderInput = zod.infer<typeof newFolderSchema>;
export type GetFolderInput = zod.infer<typeof getFolderSchema>;
export type GetFolderPaginatedInput = Omit<zod.infer<typeof getFolderPaginatedSchema>, "isAscending"> & {
    isAscending?: "true" | "false";
};
export type Folder = zod.infer<typeof folderSchema>;
export type FoldersPaginated = zod.infer<typeof foldersPaginatedSchema>;
