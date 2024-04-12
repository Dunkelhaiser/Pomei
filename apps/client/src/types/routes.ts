import { z as zod } from "zod";

const search = zod.string().optional();
const order = zod.enum(["ascending", "descending"]).catch("ascending");

export const notesParamsSchema = zod.object({
    sort: zod.enum(["title", "createdAt", "updatedAt"]).catch("title"),
    order,
    searchBy: zod.enum(["title", "tags", "content"]).catch("title"),
    search,
});

export const foldersParamsSchema = zod.object({
    sort: zod.enum(["name", "createdAt", "updatedAt"]).catch("name"),
    order,
    search,
});

export type NotesRoutes = "/notes/" | "/_protected/archive" | "/_protected/bin" | "/_protected/folders/$folderId";
export type FoldersRoutes = "/_protected/folders/";
