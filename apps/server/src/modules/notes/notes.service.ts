import { and, arrayOverlaps, count, desc, eq, ilike } from "drizzle-orm";
import { NewNoteInput } from "shared-types";
import { getFolderById } from "../folders/folders.service.ts";
import { db } from "@/db/client.ts";
import { notes } from "@/db/schema.ts";

export const getNoteById = async (id: string, userId: string) => {
    const note = await db
        .select()
        .from(notes)
        .where(and(eq(notes.id, id), eq(notes.userId, userId)));
    return note.length ? note[0] : null;
};

export const getNoteByOrder = async (order: number, userId: string) => {
    const note = await db
        .select()
        .from(notes)
        .where(and(eq(notes.order, order), eq(notes.userId, userId)));
    return note.length ? note[0] : null;
};

export const getLastNoteOrder = async (userId: string) => {
    const lastNote = await db
        .select({ order: notes.order })
        .from(notes)
        .where(eq(notes.userId, userId))
        .orderBy(desc(notes.order))
        .limit(1);
    return lastNote.length ? lastNote[0].order : null;
};

export const getAllNotes = async (userId: string) => {
    const notesArr = await db.select().from(notes).where(eq(notes.userId, userId));
    return notesArr;
};

export const getNotesCount = async (userId: string) => {
    const notesCount = await db.select({ count: count() }).from(notes).where(eq(notes.userId, userId));
    return notesCount[0].count;
};

export const getAllNotesPaginated = async (
    userId: string,
    limit = 10,
    page = 1,
    orderBy: "order" | "title" | "createdAt" | "updatedAt" = "order",
    isAscending = true
) => {
    const notesArr = await db
        .select()
        .from(notes)
        .where(eq(notes.userId, userId))
        .orderBy(isAscending ? notes[orderBy] : desc(notes[orderBy]))
        .offset((page - 1) * limit)
        .limit(limit);
    const totalCount = await getNotesCount(userId);
    const pages = Math.ceil(totalCount / limit);
    return {
        notes: notesArr,
        totalPages: pages,
        totalCount,
    };
};

export const searchNotes = async (userId: string, input: string, searchBy: "title" | "content" | "tags" = "title") => {
    const notesArr = await db
        .select()
        .from(notes)
        .where(
            and(
                eq(notes.userId, userId),
                searchBy === "tags" ? arrayOverlaps(notes.tags, [input]) : ilike(notes[searchBy], `%${input}%`)
            )
        );
    return notesArr;
};

export const createNote = async (input: NewNoteInput, userId: string) => {
    const lastNoteOrder = await getLastNoteOrder(userId);
    let order = 0;
    if (lastNoteOrder !== null) {
        order = lastNoteOrder + 1;
    }
    const [newNote] = await db
        .insert(notes)
        .values({
            ...input,
            order,
            userId,
        })
        .returning();
    return newNote;
};

export const editNote = async (id: string, input: NewNoteInput, userId: string) => {
    const note = await getNoteById(id, userId);
    if (!note) {
        return null;
    }
    const updatedNote = { ...note, ...input };
    const [editedNote] = await db.update(notes).set(updatedNote).where(eq(notes.id, id)).returning();
    return editedNote;
};

export const duplicateNote = async (id: string, userId: string) => {
    const note = await getNoteById(id, userId);
    if (!note) {
        return null;
    }
    const lastNoteOrder = await getLastNoteOrder(userId);
    let order = 0;
    if (lastNoteOrder !== null) {
        order = lastNoteOrder + 1;
    }
    const [duplicatedNote] = await db
        .insert(notes)
        .values({
            title: note.title,
            content: note.content,
            tags: note.tags,
            isArchived: note.isArchived,
            folderId: note.folderId,
            userId: note.userId,
            order,
        })
        .returning();
    return duplicatedNote;
};

export const reorderNote = async (id: string, order: number, userId: string) => {
    const note = await getNoteById(id, userId);
    if (!note) {
        return null;
    }
    const oldOrder = note.order;
    const noteToSwap = await getNoteByOrder(order, userId);
    if (!noteToSwap) {
        const [editedNote] = await db.update(notes).set({ order }).where(eq(notes.id, id)).returning();
        return editedNote;
    }

    const [editedNote] = await db.update(notes).set({ order: noteToSwap.order }).where(eq(notes.id, id)).returning();
    await db.update(notes).set({ order: oldOrder }).where(eq(notes.id, noteToSwap.id));

    return editedNote;
};

export const archiveNote = async (id: string, archive: boolean, userId: string) => {
    const note = await getNoteById(id, userId);
    if (!note) {
        return null;
    }
    if (note.isDeleted) {
        throw new Error("Note is in bin");
    }
    const [archivedNote] = await db.update(notes).set({ isArchived: archive }).where(eq(notes.id, id)).returning();
    return archivedNote;
};

export const getArchive = async (userId: string) => {
    const archive = await db
        .select()
        .from(notes)
        .where(and(eq(notes.userId, userId), eq(notes.isArchived, true)));
    return archive;
};

export const moveToBin = async (id: string, move: boolean, userId: string) => {
    const note = await getNoteById(id, userId);
    if (!note) {
        return null;
    }
    const [deletedNote] = await db
        .update(notes)
        .set({ isDeleted: move, isArchived: false })
        .where(eq(notes.id, id))
        .returning();
    return deletedNote;
};

export const deleteNote = async (id: string, userId: string) => {
    const note = await getNoteById(id, userId);
    if (!note) {
        return null;
    }
    await db.delete(notes).where(eq(notes.id, id));
    return note;
};

export const emptyBin = async (userId: string) => {
    await db.delete(notes).where(and(eq(notes.userId, userId), eq(notes.isDeleted, true)));
};

export const getBin = async (userId: string) => {
    const bin = await db
        .select()
        .from(notes)
        .where(and(eq(notes.userId, userId), eq(notes.isDeleted, true)));
    return bin;
};

export const addToFolder = async (noteId: string, folderId: string, userId: string) => {
    const note = await getNoteById(noteId, userId);
    if (!note) {
        return null;
    }

    if (note.folderId) {
        throw new Error("Note already in folder");
    }

    const folder = await getFolderById(folderId, userId);
    if (!folder) {
        throw new Error("Folder does not exist");
    }

    const [editedNote] = await db.update(notes).set({ folderId }).where(eq(notes.id, noteId)).returning();
    return editedNote;
};

export const removeFromFolder = async (noteId: string, userId: string) => {
    const note = await getNoteById(noteId, userId);
    if (!note) {
        return null;
    }

    if (!note.folderId) {
        throw new Error("Note not in folder");
    }

    const [editedNote] = await db.update(notes).set({ folderId: null }).where(eq(notes.id, noteId)).returning();
    return editedNote;
};
