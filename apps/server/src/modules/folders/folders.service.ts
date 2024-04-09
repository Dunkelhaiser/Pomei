import { and, count, desc, eq, ilike } from "drizzle-orm";
import { NewFolderInput } from "shared-types";
import { db } from "@/db/client.ts";
import { folders, notes } from "@/db/schema.ts";

export const getAllFolders = async (userId: string) => {
    const allFolders = await db.select().from(folders).where(eq(folders.userId, userId)).orderBy(folders.order);
    return allFolders;
};

export const getFoldersCount = async (userId: string) => {
    const foldersCount = await db.select({ count: count() }).from(folders).where(eq(folders.userId, userId));
    return foldersCount[0].count;
};

export const getAllFoldersPaginated = async (
    userId: string,
    limit = 10,
    page = 1,
    orderBy: "order" | "name" | "createdAt" | "updatedAt" = "order",
    order = "ascending"
) => {
    const foldersArr = await db
        .select()
        .from(folders)
        .where(eq(folders.userId, userId))
        .orderBy(order === "ascending" ? folders[orderBy] : desc(folders[orderBy]))
        .offset((page - 1) * limit)
        .limit(limit);
    const totalCount = await getFoldersCount(userId);
    const pages = Math.ceil(totalCount / limit);
    return {
        folders: foldersArr,
        totalPages: pages,
        totalCount,
    };
};

export const getFolderById = async (folderId: string, userId: string) => {
    const folder = await db
        .select()
        .from(folders)
        .where(and(eq(folders.id, folderId), eq(folders.userId, userId)));
    return folder.length ? folder[0] : null;
};

export const getFolderByOrder = async (order: number, userId: string) => {
    const folder = await db
        .select()
        .from(folders)
        .where(and(eq(folders.order, order), eq(folders.userId, userId)));
    return folder.length ? folder[0] : null;
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

export const searchFolder = async (name: string, userId: string) => {
    const foldersArr = await db
        .select()
        .from(folders)
        .where(and(eq(folders.userId, userId), ilike(folders.name, `%${name}%`)));
    return foldersArr;
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

export const deleteFolder = async (folderId: string, userId: string) => {
    const folder = await getFolderById(folderId, userId);
    if (!folder) {
        return null;
    }

    await db.delete(folders).where(eq(folders.id, folderId));
    return folder;
};

export const deleteFolderWithNotes = async (folderId: string, userId: string) => {
    const folder = await getFolderById(folderId, userId);
    if (!folder) {
        return null;
    }

    await db.update(notes).set({ isDeleted: true, isArchived: false }).where(eq(notes.folderId, folderId));
    await db.delete(folders).where(eq(folders.id, folderId));
    return folder;
};

export const editFolder = async (folderId: string, input: NewFolderInput, userId: string) => {
    const folder = await getFolderById(folderId, userId);
    if (!folder) {
        return null;
    }

    const [updatedFolder] = await db
        .update(folders)
        .set({ ...input, updatedAt: new Date() })
        .where(eq(folders.id, folderId))
        .returning();
    return updatedFolder;
};

export const reorderFolder = async (folderId: string, order: number, userId: string) => {
    const folder = await getFolderById(folderId, userId);
    if (!folder) {
        return null;
    }

    const oldOrder = folder.order;
    const folderToSwap = await getFolderByOrder(order, userId);
    if (!folderToSwap) {
        const [editedFolder] = await db
            .update(folders)
            .set({ order, updatedAt: new Date() })
            .where(eq(folders.id, folderId))
            .returning();
        return editedFolder;
    }

    const [editedFolder] = await db
        .update(folders)
        .set({ order: folderToSwap.order, updatedAt: new Date() })
        .where(eq(folders.id, folderId))
        .returning();
    await db.update(folders).set({ order: oldOrder }).where(eq(folders.id, folderToSwap.id));
    return editedFolder;
};
