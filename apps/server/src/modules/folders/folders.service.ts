import { desc, eq } from "drizzle-orm";
import { NewFolderInput } from "./folder.schema.ts";
import { db } from "@/db/client.ts";
import { folders } from "@/db/schema.ts";

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
