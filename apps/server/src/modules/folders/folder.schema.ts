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

export const getFolderPaginatedSchema = zod.object({
    page: zod.preprocess(
        (val) => Number(val),
        zod.number().min(1, { message: "Page must be greater than or equal to 1" })
    ),
    limit: zod.preprocess(
        (val) => Number(val),
        zod.number().min(1, { message: "Page size must be greater than or equal to 1" })
    ),
    orderBy: zod.enum(["order", "name", "createdAt", "updatedAt"]).optional(),
    isAscending: zod
        .string()
        .refine((s) => s === "true" || s === "false")
        .transform((s) => s === "true")
        .optional(),
});

export const orderSchema = zod.object({
    order: zod.number().min(0, { message: "Order must be greater than or equal to 0" }),
});

export type NewFolderInput = zod.infer<typeof newFolderSchema>;
export type GetFolderInput = zod.infer<typeof getFolderSchema>;
export type GetFolderPaginatedInput = zod.infer<typeof getFolderPaginatedSchema>;
export type OrderInput = zod.infer<typeof orderSchema>;
