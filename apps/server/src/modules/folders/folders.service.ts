import { and, desc, eq } from "drizzle-orm";
import { NewFolderInput } from "./folder.schema.ts";
import { db } from "@/db/client.ts";
import { folders, notes } from "@/db/schema.ts";

export const getAllFolders = async (userId: string) => {
    const allFolders = await db.select().from(folders).where(eq(folders.userId, userId)).orderBy(folders.order);
    return allFolders;
};

export const getLastFolderOrder = async (userId: string) => {
    const lastFolder = await db
        .select({ order: folders.order })
        .from(folders)
        .where(eq(folders.userId, userId))
        .orderBy(desc(folders.order))
        .limit(1);
    return lastFolder.length ? lastFolder[0].order : null;
};

export const createFolder = async (folder: NewFolderInput, userId: string) => {
    const lastFolderOrder = await getLastFolderOrder(userId);
    let order = 0;
    if (lastFolderOrder !== null) {
        order = lastFolderOrder + 1;
    }
    const [newFolder] = await db
        .insert(folders)
        .values({ ...folder, order, userId })
        .returning();
    return newFolder;
};

export const getFolderById = async (folderId: string, userId: string) => {
    const folder = await db
        .select()
        .from(folders)
        .where(and(eq(folders.id, folderId), eq(folders.userId, userId)));
    return folder.length ? folder[0] : null;
};

export const loadFolderContent = async (folderId: string, userId: string) => {
    const folder = await getFolderById(folderId, userId);
    if (!folder) {
        return null;
    }

    const folderNotes = await db
        .select()
        .from(notes)
        .where(
            and(
                eq(notes.folderId, folderId),
                eq(notes.userId, userId),
                eq(notes.isArchived, false),
                eq(notes.isDeleted, false)
            )
        );

    return folderNotes;
};
